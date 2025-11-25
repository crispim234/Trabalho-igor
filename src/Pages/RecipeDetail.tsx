import React from "react";
import { useParams } from "react-router-dom";
import { useRecipes } from "../Context/RecipeContext";
import CommentSection from "../Components/CommentSection";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes } = useRecipes();
  const recipe = recipes.find((r) => r.id === parseInt(id || "0"));

  if (!recipe) return <p>Receita não encontrada.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>Categoria: {recipe.category}</p>
      <h3>Ingredientes</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Instruções</h3>
      <p>{recipe.instructions}</p>
      <CommentSection recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetail;
