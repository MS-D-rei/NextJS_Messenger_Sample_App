import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const isUnAuthorized = !currentUser?.id || !currentUser.email;

    if (isUnAuthorized) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const body = await request.json();
    const { name, image } = body;

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updateUser);
  } catch (err) {
    console.log(err);
    return new NextResponse('Setting route error', { status: 500 });
  }
}
