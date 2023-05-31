import { getCurrentUser } from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: currentUser.id,
          },
        },
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen_by: true,
          },
        },
      },
    });

    console.log('getConversations:');
    console.log(conversations);

    return conversations;
  } catch (err: any) {
    console.error(err);
    return [];
  }
};
