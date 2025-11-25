// src/types.ts
export interface Recipe {
  id: number;
  title: string;
  category: string;
  ingredients: string[];
  instructions: string;
  comments: string[];
}

export interface RecipeFormData {
  title: string;
  category: string;
  ingredients: string;
  instructions: string;
}

export interface CommentPayload {
  id: number;
  comment: string;
}
