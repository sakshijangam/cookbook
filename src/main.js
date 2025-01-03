import generateRecipe from "./genAI";
import generateNutrition from "./nutrition";
const titleBar = document.querySelector(".title-bar");
const textarea = document.getElementById("ingredients-input");
const findRecipeBtn = document.getElementById("find-recipe");
const findnutritionBtn= document.getElementById("nutrition-value");
const clearIpBtn = document.getElementById("clear-input");
const recipeContainer = document.getElementById("recipe-container");
let recipe = null;
let nutrition= null;

window.addEventListener("scroll", (event) => {
  if (window.scrollY > 61) {
    titleBar.classList.add("scrolled");
  } else {
    titleBar.classList.remove("scrolled");
  }
});

findRecipeBtn.addEventListener("click", async (event) => {
  const ingredients = textarea.value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients.");
    return;
  }

  try {
    findRecipeBtn.disabled = true;
    findRecipeBtn.textContent = "Loading...";

    recipe = await generateRecipe(ingredients);
    renderRecipe(recipe);
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  } finally {
    findRecipeBtn.disabled = false;
    findRecipeBtn.textContent = "Find Recipe";
  }
});


findnutritionBtn.addEventListener("click", async (event) => {
  const ingredients = textarea.value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients.");
    return;
  }

  try {
    findnutritionBtn.disabled = true;
    findnutritionBtn.textContent = "Loading...";

    nutrition = await generateNutrition(ingredients);
    rendernutrition(nutrition);
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  } finally {
    findnutritionBtn.disabled = false;
    findnutritionBtn.textContent = "Find Nutrition-value";
  }
});






clearIpBtn.addEventListener("click", (event) => {
  textarea.value = "";
  recipeContainer.innerHTML = "";
});

function renderRecipe(recipe) {
  recipeContainer.classList.add("hidden");
  recipeContainer.innerHTML = `
        <h1 class="text-head">${recipe.name}</h1>
        <div class="text-content" style="margin: 2rem 1.5rem">
          <h2>Ingredients:</h2>
          <ul class="section">
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}  
          </ul>

          <h2>Instructions:</h2>
          <ul class="section">
            ${recipe.instructions
              .map((instruction) => `<li>${instruction}</li>`)
              .join("")}
          </ul>

          <h2>Notes:</h2>
          <p class="section">${recipe.notes}</p>
        </div>
  `;
  recipeContainer.classList.remove("hidden");
}


function rendernutrition(nutrition) {
  recipeContainer.classList.add("hidden");
  recipeContainer.innerHTML = `
        <div class="text-content" style="margin: 2rem 1.5rem">
          <h2>Ingredients:</h2>
          <ul class="section">
          ${nutrition.ingredients
            .map((item) => `<li>
                <strong>${item.name}</strong><br>
                Calories: ${item.Calories}<br>
                Protein: ${item.Protein}<br>
                Fat: ${item.Fat}<br>
                Carbohydrates: ${item.Carbohydrates}<br>
                Fiber: ${item.Fiber}<br>
                Saturated Fat: ${item.SaturatedFat}<br>
                <em>${item.notes}</em>
              </li>`)
            .join("")}  
          </ul>
         
            <h2>Total Value:</h2>
                <ul class="section">
          ${nutrition.Total_value
            .map(
              (item) => `
              <li>
                <strong>${item.Nutrient}:</strong> ${item.Value}
              </li>
            `
            )
            .join("")}
        </ul>
          <h2>Notes:</h2>
          <p class="section">${nutrition.notes}</p>
        </div>
  `;
  recipeContainer.classList.remove("hidden");
}