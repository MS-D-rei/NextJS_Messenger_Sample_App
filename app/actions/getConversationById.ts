import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!conversation) {
      return null;
    }

    const isUserInConversation = conversation.users.some(
      (user) => user.id === currentUser.id
    );

    if (!isUserInConversation) {
      return null;
    }

    console.log('getConversationById:', conversation);

    return conversation;
  } catch (err) {
    console.error(err);
    return null;
  }
};
