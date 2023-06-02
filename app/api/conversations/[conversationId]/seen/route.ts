import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
  conversationId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
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
      }
    });

    return NextResponse.json(updatedMessage);
  } catch (err) {
    console.error(err);
    return new NextResponse('conversationId seen POST error', { status: 500 });
  }
}
