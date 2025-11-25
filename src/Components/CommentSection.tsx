import React, { useState } from "react";
import { useRecipes } from "../Context/RecipeContext";
import "../Styles/CommentSection.css";

interface CommentSectionProps {
  recipeId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId }) => {
  const { recipes, dispatch } = useRecipes();
  const recipe = recipes.find((r) => r.id === recipeId);
  const [comment, setComment] = useState<string>("");

  const handleAddComment = () => {
    if (recipe && comment.trim()) {
      dispatch({
        type: "ADD_COMMENT",
        payload: { id: recipeId, comment: comment.trim() },
      });
      setComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAddComment();
    }
  };

  if (!recipe) return <p>Receita não encontrada.</p>;

  return (
    <div className="comment-section">
      <h4>Comentários</h4>
      <ul>
        {recipe.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <div className="comment-input-container">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Adicionar comentário (Ctrl+Enter para enviar)"
          maxLength={500}
        />
        <button onClick={handleAddComment} disabled={!comment.trim()}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
