import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

console.log('Registering user started');
performance.mark('register-start');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        username,
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
