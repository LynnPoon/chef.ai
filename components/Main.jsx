import React from "react";
import IngredientsList from "./IngredientsList";
import AiRecipe from "./AiRecipe";
import { getHfRecipe } from "../api";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    const recipeMarkdown = await getHfRecipe(ingredients);
    console.log(recipeMarkdown);

    setRecipe(recipeMarkdown || "No recipe returned");
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")?.trim();
    if (!newIngredient) return;
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function removeIngredient(indexToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient, index) => index !== indexToRemove),
    );
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          removeIngredient={removeIngredient}
          getRecipe={getRecipe}
        />
      )}

      {recipe && <AiRecipe recipe={recipe} />}
    </main>
  );
}
