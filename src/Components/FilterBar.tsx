import React, { useState } from "react";
import "../Styles/FilterBar.css";

interface FilterBarProps {
  onFilter: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilter = async () => {
    setIsLoading(true);
    await onFilter(category);
    setIsLoading(false);
  };

  const handleClear = () => {
    setCategory("");
    onFilter("");
  };

  const hasActiveFilter = category !== "";

  return (
    <div
      className={`filter-bar ${hasActiveFilter ? "active" : ""} ${
        isLoading ? "loading" : ""
      }`}
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Selecionar categoria"
      >
        <option value="">Todas as categorias</option>
        <option value="Doce">🍰 Doce</option>
        <option value="Salgado">🧂 Salgado</option>
      </select>

      <button
        onClick={handleFilter}
        disabled={isLoading}
        aria-label="Aplicar filtro"
      >
        {isLoading ? "Filtrando..." : "Filtrar"}
      </button>

      {hasActiveFilter && (
        <>
          <span className="filter-indicator">{category}</span>
          <button
            className="clear-button"
            onClick={handleClear}
            aria-label="Limpar filtro"
          >
            Limpar
          </button>
        </>
      )}
    </div>
  );
};

export default FilterBar;
