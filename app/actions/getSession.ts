import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getSeesion = async () => {
  return await getServerSession(authOptions);
};
