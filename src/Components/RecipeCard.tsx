import React from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "../Types";
import "../Styles/RecipeCard.css";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
  <div className="recipe-card">
    <h3>{recipe.title}</h3>
    <p>Categoria: {recipe.category}</p>
    <Link to={`/recipe/${recipe.id}`}>Ver Detalhes</Link>
  </div>
);

export default RecipeCard;
