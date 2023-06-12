import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const isUnAuthorized = !currentUser?.id || !currentUser.email;

    if (isUnAuthorized) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    // if (isGroup && (!members || members.length < 2 || !name)) {
    //   return new NextResponse('Invalid data', { status: 400 })
    // }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string, label: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      console.log(newConversation);
      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        users: {
          every: {
            id: {
              in: [currentUser.id, userId],
            },
          },
        },
      },
    });

    const existingConversation = existingConversations[0];

    if (existingConversation) {
      console.log(existingConversation);
      return NextResponse.json(existingConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    console.log(newConversation);

    return NextResponse.json(newConversation);
  } catch (err) {
    console.error(err);
    return new NextResponse('Conversation POST error', { status: 500 });
  }
}
