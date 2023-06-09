import prisma from '@/app/libs/prismadb';
import { getSessionAtServer } from '@/app/actions/getSession';

export const getCurrentUser = async () => {
  try {
    const session = await getSessionAtServer();
    // console.log(session);
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
