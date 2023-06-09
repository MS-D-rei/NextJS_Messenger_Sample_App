import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const isUnAuthorized = !currentUser?.id || !currentUser.email

    if (isUnAuthorized) {
      return new NextResponse('Unauthorized', { status: 400 })
    }

  } catch (err) {
    console.log(err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
