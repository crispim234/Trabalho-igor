import React, { useState, useEffect } from "react";
import { useRecipes } from "../Context/RecipeContext";
import RecipeCard from "../Components/RecipeCard";
import FilterBar from "../Components/FilterBar";
import RecipeForm from "../Components/RecipeForm";
import type { Recipe } from "../Types";
import "./RecipesList.css";

const RecipesList: React.FC = () => {
  const { recipes } = useRecipes();
  const [filtered, setFiltered] = useState<Recipe[]>(recipes);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFiltered(recipes);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [recipes]);

  const handleFilter = (category: string) => {
    setIsLoading(true);
    setActiveFilter(category);

    setTimeout(() => {
      setFiltered(
        category ? recipes.filter((r) => r.category === category) : recipes
      );
      setIsLoading(false);
    }, 300);
  };

  const clearFilter = () => {
    handleFilter("");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getStats = () => {
    const total = recipes.length;
    const doces = recipes.filter((r) => r.category === "Doce").length;
    const salgados = recipes.filter((r) => r.category === "Salgado").length;
    const filtered_count = filtered.length;

    return { total, doces, salgados, filtered_count };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="recipes-list-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <span className="loading-text">Carregando receitas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="recipes-list-page">
      {" "}
      {/* Esta é a classe principal */}
      <div className="main-container">
        {" "}
        {/* Container do CSS global */}
        <h1>Lista de Receitas</h1>
        <p className="recipes-subtitle">
          Descubra receitas incríveis e compartilhe suas criações culinárias
        </p>
        <div className="recipes-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.doces}</span>
            <span className="stat-label">Doces</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.salgados}</span>
            <span className="stat-label">Salgados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.filtered_count}</span>
            <span className="stat-label">Exibindo</span>
          </div>
        </div>
        <div className="recipes-controls">
          <h2>Controles</h2>
          <FilterBar onFilter={handleFilter} />

          {activeFilter && (
            <div className="active-filter-indicator">
              Filtro ativo: {activeFilter}
              <button
                onClick={clearFilter}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          )}

          {showForm && <RecipeForm />}
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhuma receita encontrada</h3>
            <p>
              {activeFilter
                ? `Não há receitas na categoria "${activeFilter}". Tente outro filtro ou adicione uma nova receita.`
                : "Ainda não há receitas cadastradas. Que tal adicionar a primeira?"}
            </p>
            <button className="empty-state-button" onClick={toggleForm}>
              {showForm ? "Fechar Formulário" : "Adicionar Receita"}
            </button>
          </div>
        ) : (
          <div className="recipes-grid">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
        <button
          className="fab-button"
          onClick={toggleForm}
          title="Adicionar Receita"
        >
          {showForm ? "✕" : "+"}
        </button>
      </div>
    </div>
  );
};

export default RecipesList;
