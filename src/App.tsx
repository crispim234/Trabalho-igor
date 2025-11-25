import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./Context/RecipeContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import RecipesList from "./Pages/RecipesList";
import RecipeDetail from "./Pages/RecipeDetail";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipesList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </RecipeProvider>
  );
};

export default App;
