import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    // check authorization

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // check whether conversation exists

    const { conversationId } = params;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen_by: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Conversation not found', { status: 400 });
    }

    // check whether lastMessage exists

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // update the lastMessage seen_by

    const updatedLastMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
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

    // trigger pusher event to update conversation

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedLastMessage],
    });

    const hasCurrentUserSeenLastMessage =
      lastMessage.seen_by.indexOf(currentUser) !== -1;
    if (hasCurrentUserSeenLastMessage) {
      return NextResponse.json(conversation);
    }

    // trigger pusher event to update lastMessage

    await pusherServer.trigger(
      conversationId,
      'message:update',
      updatedLastMessage
    );

    return NextResponse.json(updatedLastMessage);
  } catch (err) {
    console.error(err);
    return new NextResponse('conversationId seen POST error', { status: 500 });
  }
}
