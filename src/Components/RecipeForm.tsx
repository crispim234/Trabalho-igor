import React, { useState } from "react";
import { useRecipes } from "../Context/RecipeContext";
import type { RecipeFormData } from "../Types";
import "../Styles/RecipeForm.css";

const RecipeForm: React.FC = () => {
  const { dispatch } = useRecipes();
  const [form, setForm] = useState<RecipeFormData>({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_RECIPE",
      payload: { ...form, ingredients: form.ingredients.split(",") },
    });
    setForm({ title: "", category: "", ingredients: "", instructions: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Título"
        required
      />
      <input
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        placeholder="Categoria"
        required
      />
      <input
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        placeholder="Ingredientes (separados por vírgula)"
        required
      />
      <textarea
        value={form.instructions}
        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        placeholder="Instruções"
        required
      />
      <button type="submit">Adicionar Receita</button>
    </form>
  );
};

export default RecipeForm;
