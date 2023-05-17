import Image from 'next/image';
import messengerLogo from '@/public/images/Messenger-Logo-PNG.png';
import AuthForm from '@/app/(site)/components/AuthForm';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          height={100}
          width={100}
          className="mx-auto w-auto"
          src={messengerLogo}
        ></Image>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
