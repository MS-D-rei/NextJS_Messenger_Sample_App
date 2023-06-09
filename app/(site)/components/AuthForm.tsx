'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from '@/app/(site)/components/AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users');
    }
  }, [session.status, router]);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);

    if (variant === 'REGISTER') {
      console.log('Submit handle started');
      console.log(data);

      axios
        .post('/api/register', data)
        .then(() => {signIn('credentials', { ...data, callbackUrl: '/users' })})
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
          console.log(err);
        });

      console.log('Submit handle ended');
    }

    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false }).then((callback) => {
        // console.log(callback);
        /* the content of callback in case of error
         * error: "Incorrect credentials"
         * ok: true
         * status: 200
         * url:null
         * */
        if (callback?.error) {
          toast.error(`Error: ${callback.error}`);
          console.log(callback.error);
        }

        if (callback?.ok && !callback.error) {
          toast.success('Logged in successfully!');
          router.push('/users');
        }
      });
    }

    setIsloading(false);
  };

  const socialAction = (action: string) => {
    setIsloading(true);

    // NextAuth Social Login
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(`Error: ${callback.error}`);
        console.log(callback.error);
      }

      if (callback?.ok && !callback.error) {
        toast.success('Logged in successfully!');
      }
    });

    setIsloading(false);
  };

  return (
    <div className="mt-8 sm:w-full sm:mx-auto sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg ms:px-10">
        {/* Login or Register form */}
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Username"
              type="text"
              required={false}
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            required={false}
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required={false}
            register={register}
            errors={errors}
          />
          <div>
            <Button type="submit" fullWidth={true} disabled={isLoading}>
              {variant}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          {/* Separater for Auth methods */}
          <div className="relative">
            <div
              className="
              absolute
              inset-0
              flex
              items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="flex relative justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Auth Social Buttons */}
          <div className="flex mt-6 gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => {
                socialAction('github');
              }}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => {
                socialAction('google');
              }}
            />
          </div>
        </div>

        {/* Link to toggle Login and Register */}
        <div
          className="
            flex
            justify-center
            text-sm
            gap-2
            mt-6
            px-2
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
