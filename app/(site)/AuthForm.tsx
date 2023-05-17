'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsloading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);

    if (variant === 'REGISTER') {
      // Axios Register
    }

    if (variant === 'LOGIN') {
      // NextAuth Login
    }

    setIsloading(false);
  };

  const socialAction = (action: string) => {
    setIsloading(true);

    // NextAuth Social Login

    setIsloading(false);
  };

  return (
    <div className="mt-8 sm:w-full sm:mx-auto sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg ms:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(submitHandler)}
        ></form>
      </div>
    </div>
  );
}

export default AuthForm;
