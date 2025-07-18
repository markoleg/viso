'use client';

import { useForm } from 'react-hook-form';
import api from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/lib/auth';

export default function AddRecipePage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await api.post('/recipes', data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    router.push('/recipes');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto mt-10 space-y-4">
      <input className="border w-full p-2" {...register('title')} placeholder="Title" />
      <textarea
        className="border w-full p-2"
        {...register('description')}
        placeholder="Description"
      />
      <textarea
        className="border w-full p-2"
        {...register('ingredients')}
        placeholder="Ingredients"
      />
      <textarea
        className="border w-full p-2"
        {...register('instructions')}
        placeholder="Instructions"
      />
      <button className="bg-purple-600 text-white px-4 py-2 w-full">Save Recipe</button>
    </form>
  );
}
