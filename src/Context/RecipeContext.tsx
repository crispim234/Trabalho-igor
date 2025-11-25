/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { Recipe, CommentPayload } from "../Types";

// Dados iniciais mockados
const initialRecipes: Recipe[] = [
  {
    id: 1,
    title: "Bolo de Chocolate",
    category: "Doce",
    ingredients: ["Farinha", "Chocolate"],
    instructions: "Misture e asse.",
    comments: [],
  },
  {
    id: 2,
    title: "Salada de Tomate",
    category: "Salgado",
    ingredients: ["Tomate", "Azeite"],
    instructions: "Corte e tempere.",
    comments: [],
  },
];

// Tipos para ações do reducer
type RecipeAction =
  | { type: "ADD_RECIPE"; payload: Omit<Recipe, "id" | "comments"> }
  | { type: "DELETE_RECIPE"; payload: number }
  | { type: "ADD_COMMENT"; payload: CommentPayload };

// Reducer
const recipeReducer = (state: Recipe[], action: RecipeAction): Recipe[] => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [...state, { ...action.payload, id: Date.now(), comments: [] }];
    case "DELETE_RECIPE":
      return state.filter((recipe) => recipe.id !== action.payload);
    case "ADD_COMMENT":
      return state.map((recipe) =>
        recipe.id === action.payload.id
          ? {
              ...recipe,
              comments: [...recipe.comments, action.payload.comment],
            }
          : recipe
      );
    default:
      return state;
  }
};

interface RecipeContextType {
  recipes: Recipe[];
  dispatch: React.Dispatch<RecipeAction>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recipes, dispatch] = useReducer(recipeReducer, initialRecipes);

  return (
    <RecipeContext.Provider value={{ recipes, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (!context)
    throw new Error("useRecipes must be used within RecipeProvider");
  return context;
};
