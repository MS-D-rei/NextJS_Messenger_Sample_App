import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    return NextResponse.json(newMessage);
  } catch (err) {
    console.error(err);
    return new NextResponse('Message POST Error', { status: 500 });
  }
}
