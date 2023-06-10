import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
  conversationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    // Check whether the user is logged in

    const currentUser = await getCurrentUser();
    const isUnAuthorized = !currentUser?.id || !currentUser.email;

    if (isUnAuthorized) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check whether the conversation exists

    const { conversationId } = params;

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Conversation not found', { status: 400 });
    }

    // Delete the conversation

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        users: {
          some: {
            id: currentUser.id,
          },
        },
      },
    });

    console.log( "deletedConversation", deletedConversation );

    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.error(err);
    return new NextResponse('conversationId DELETE Error', { status: 500 });
  }
}
