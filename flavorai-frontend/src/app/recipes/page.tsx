'use client';

import { useEffect, useState } from 'react';
import api from '@/app/lib/api';
import { getToken } from '@/app/lib/auth';
import RatingStars from '../components/RatingStars';
import Link from 'next/link';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await api.get('/recipes');
      setRecipes(res.data);
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );
  const handleRate = async (recipeId: string, value: number) => {
    try {
      await api.patch(`/recipes/${recipeId}/rate`, { rating: value }, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })

      // оновлюємо локальний стейт без reload
      setRecipes(prev =>
        prev.map(r =>
          r.id === recipeId ? { ...r, rating: value } : r
        )
      )
    } catch (err) {
      console.error('Failed to rate recipe', err)
    }
  }
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <input
        type="text"
        placeholder="Search recipes by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />
      <ul className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} className="border p-4 rounded">
            <h2 className="font-semibold">{recipe.title}</h2>
            <p>{recipe.description}</p>
            {getToken() && (
              <RatingStars
                value={recipe.rating}
                onRate={(value: number) => handleRate(recipe.id, value)}
              />
            )}
            <Link className='text-blue-500 hover:underline block pt-2' href={`/recipes/${recipe.id}`}>View Recipe</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
