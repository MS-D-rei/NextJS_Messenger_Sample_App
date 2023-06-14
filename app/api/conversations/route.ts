import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
  try {
    // check whether user is authorized

    const currentUser = await getCurrentUser();
    const isUnAuthorized = !currentUser?.id || !currentUser.email;

    if (isUnAuthorized) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    // check whether request body is valid

    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    const isLessThanTwoMembers = !members || members.length < 2;
    const isNoGroupName = !name;
    if (isGroup && (isLessThanTwoMembers || isNoGroupName)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    // in case of group conversation, create new conversation with all members

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string; label: string }) => ({
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

      // trigger pusher event to update all users' conversation with new conversation

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });

      console.log('new GroupConversation:', newConversation);
      return NextResponse.json(newConversation);
    }

    // in case of one-to-one conversation, check whether conversation already exists

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

    // if conversation does not exist, create new conversation with two users

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

    // trigger pusher event to update conversation for both users

    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });

    console.log('new one-to-one conversation:', newConversation);

    return NextResponse.json(newConversation);
  } catch (err) {
    console.error(err);
    return new NextResponse('Conversation POST error', { status: 500 });
  }
}
