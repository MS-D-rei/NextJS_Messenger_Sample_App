import prisma from '@/app/libs/prismadb';

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen_by: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log('getMessages:', messages);

    return messages;
  } catch (err) {
    console.error(err);
    return null;
  }
};
