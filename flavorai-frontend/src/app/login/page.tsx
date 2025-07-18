'use client';

import { useForm } from 'react-hook-form';
import api from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { setToken } from '@/app/lib/auth';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth()
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const res = await api.post('/auth/login', data);
    setToken(res.data);
    login();
    router.push('/recipes');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input className="border w-full p-2" {...register('email')} placeholder="Email" />
      <input
        className="border w-full p-2"
        {...register('password')}
        type="password"
        placeholder="Password"
      />
      <button className="bg-green-600 text-white px-4 py-2 w-full">Login</button>
    </form>
  );
}
