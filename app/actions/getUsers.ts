import { getSessionAtServer } from './getSession';
import prisma from '@/app/libs/prismadb';

export const getUsers = async () => {
  const session = await getSessionAtServer();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};
