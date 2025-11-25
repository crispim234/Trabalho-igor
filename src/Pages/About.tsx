import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About: React.FC = () => (
  <div className="about-page">
    <div className="main-container">
      <div className="about-container">
        <h1>Sobre</h1>
        <p>
          Este site foi criado para compartilhar receitas simples e deliciosas.
        </p>

        <div className="about-content">
          <div className="info-card">
            <h3>Nossa Missão</h3>
            <p>
              Democratizar o acesso a receitas deliciosas e fáceis de fazer,
              tornando a culinária acessível para todos os níveis de
              experiência.
            </p>
          </div>

          <div className="info-card">
            <h3>Nossa Visão</h3>
            <p>
              Ser a principal plataforma de receitas onde famílias se conectam
              através da comida e criam memórias especiais na cozinha.
            </p>
          </div>

          <div className="info-card">
            <h3>Nossos Valores</h3>
            <p>
              Simplicidade, qualidade e compartilhamento. Acreditamos que
              cozinhar deve ser prazeroso e que boas receitas devem ser
              compartilhadas.
            </p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Receitas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Usuários</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Comentários</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5★</span>
            <span className="stat-label">Avaliação</span>
          </div>
        </div>

        <div className="cta-section">
          <h3>Pronto para começar?</h3>
          <p>Explore nossas receitas e descubra novos sabores!</p>
          <Link to="/recipes" className="cta-button">
            Ver Receitas
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default About;
