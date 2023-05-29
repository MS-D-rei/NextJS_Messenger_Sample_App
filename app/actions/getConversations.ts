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
          every: {
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
          select: {
            senderId: true,
            seen_by: true,
          },
        },
      },
    });

    return conversations;
  } catch (err: any) {
    console.error(err);
    return [];
  }
};
