import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
  try {
    // check whether user is authorized

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // create new message

    const body = await request.json();
    const { message, image, conversationId } = body;

    const newMessage = await prisma.message.create({
      data: {
        text: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen_by: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen_by: true,
      },
    });

    // update conversation

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen_by: true,
          },
        },
      },
    });

    // trigger pusher event to update messages with new message

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    // trigger pusher event to update each user's conversation with lastMessage

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (err) {
    console.error(err);
    return new NextResponse('Message POST Error', { status: 500 });
  }
}
