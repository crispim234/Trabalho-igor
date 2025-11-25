import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

const Header: React.FC = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/recipes">Receitas</Link>
      <Link to="/about">Sobre</Link>
      <Link to="/contact">Contato</Link>
    </nav>
  </header>
);

export default Header;
