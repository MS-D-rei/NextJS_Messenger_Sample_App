import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

console.log('Registering user started');
performance.mark('register-start');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const isMissingCredentials = !name || !email || !password;
    if (isMissingCredentials) {
      // this will be axios error.response.data and status
      // also will be axios error.request.response and status
      return new NextResponse('Missing credentials', { status: 400 });
    }

    const SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    console.log(`REGISTER ERROR: ${err}`);
    return new NextResponse('Internal error', { status: 500 });
  }
}

performance.mark('register-end');

performance.measure('register', 'register-start', 'register-end');
const result = performance.getEntriesByName('register')[0];
console.log(`Registering user ended - took ${result.duration}ms`);
