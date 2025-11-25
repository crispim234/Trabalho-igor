import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../Context/RecipeContext";
import RecipeCard from "../Components/RecipeCard";
import type { Recipe } from "../Types";
import "../Pages/Home.css";

const Home: React.FC = () => {
  const { recipes } = useRecipes();
  const [popular, setPopular] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento e seleção de receitas populares
    const timer = setTimeout(() => {
      setPopular(recipes.slice(0, 2)); // Simula populares
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [recipes]);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Seção Hero */}
        <section className="hero-section">
          <h1 className="hero-title">Bem-vindo ao Site de Receitas!</h1>
          <p className="hero-subtitle">
            Descubra receitas incríveis, compartilhe suas criações culinárias e
            conecte-se com outros amantes da gastronomia. Sua jornada culinária
            começa aqui!
          </p>
          <div className="hero-actions">
            <Link to="/recipes" className="hero-button primary">
              Explorar Receitas
            </Link>
            <Link to="/about" className="hero-button secondary">
              Saiba Mais
            </Link>
          </div>
        </section>

        {/* Seção de Receitas Populares */}
        <section className="popular-section">
          <h2 className="popular-title">Receitas Populares</h2>
          <p className="popular-subtitle">
            As receitas mais amadas pela nossa comunidade
          </p>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #007bff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px",
                }}
              ></div>
              <p style={{ color: "#6c757d" }}>
                Carregando receitas populares...
              </p>
            </div>
          ) : popular.length > 0 ? (
            <div className="popular-recipes">
              {popular.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="empty-popular">
              <h3>Nenhuma receita ainda</h3>
              <p>
                Seja o primeiro a adicionar uma receita e torne-se parte da
                nossa comunidade culinária!
              </p>
              <Link to="/recipes" className="hero-button primary">
                Adicionar Primeira Receita
              </Link>
            </div>
          )}
        </section>

        {/* Seção de Features */}
        <section className="features-section">
          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h3 className="feature-title">Fácil de Usar</h3>
            <p className="feature-description">
              Interface intuitiva para adicionar, editar e organizar suas
              receitas favoritas.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3 className="feature-title">Busca Inteligente</h3>
            <p className="feature-description">
              Encontre rapidamente receitas por categoria, ingredientes ou nome.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3 className="feature-title">Comunidade Ativa</h3>
            <p className="feature-description">
              Compartilhe experiências, dicas e avaliações com outros
              cozinheiros.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
