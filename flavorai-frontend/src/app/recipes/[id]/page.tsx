'use client'
import { use, useEffect, useState } from 'react';
import api from '@/app/lib/api';
import RatingStars from '../../components/RatingStars';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/lib/auth';

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!recipe) return <div className="text-center mt-10 text-red-500">Recipe not found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <div className="mb-4 flex items-center">
        <RatingStars
          value={recipe.rating || 0}
          onRate={async (value: number) => {
            try {
              await api.patch(`/recipes/${id}/rate`, { rating: value }, {
                headers: {
                  Authorization: `Bearer ${getToken()}`
                }
              });
              // Refetch recipe to get updated average rating
              const res = await api.get(`/recipes/${id}`);
              setRecipe(res.data);
            } catch (err) {
              // Optionally show error
            }
          }}
        />
        
        {recipe.rating !== null && (
          <span className="ml-2 text-gray-600">{recipe.rating}/5</span>
        )}
      </div>
      <h2 className="text-xl font-semibold mt-4 mb-1">Description</h2>
      <p className="mb-4">{recipe.description}</p>
      <h2 className="text-xl font-semibold mb-1">Ingredients</h2>
      <pre className="mb-4 whitespace-pre-wrap bg-gray-50 p-2 rounded">{recipe.ingredients}</pre>
      <h2 className="text-xl font-semibold mb-1">Instructions</h2>
      <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded">{recipe.instructions}</pre>
    </div>
  );
}
