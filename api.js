//frontend api calls
export async function getHfRecipe(ingredients) {
  const res = await fetch("https://chef-ai-backend.fly.dev/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  return res.json();
}
