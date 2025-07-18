'use client';

import { useEffect, useState } from 'react';
import api from '@/app/lib/api';
import { getToken } from '@/app/lib/auth';
import Link from 'next/link';

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await api.get('/recipes/my', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRecipes(res.data);
    };
    fetchRecipes();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
      <ul className="space-y-4">
        {recipes && recipes.map((recipe) => (
          <li key={recipe.id} className="border p-4 rounded">
            <h2 className="font-semibold">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <Link className='text-blue-500 hover:underline block pt-2' href={`/recipes/${recipe.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
