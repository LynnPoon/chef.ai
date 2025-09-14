import ReactMarkdown from "react-markdown";

export default function AiRecipe(props) {
  return (
    <section class="suggested-recipe-container" aria-live="polite">
      <h2>Chef.ai Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
