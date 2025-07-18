'use client';

import { useForm } from 'react-hook-form';
import api from '@/app/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await api.post('/auth/register', data);
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input className="border w-full p-2" {...register('email')} placeholder="Email" />
      <input
        className="border w-full p-2"
        {...register('password')}
        type="password"
        placeholder="Password"
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full hover:bg-blue-700 cursor-pointer">Register</button>
    </form>
  );
}
