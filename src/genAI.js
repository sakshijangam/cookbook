import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";

  const apiKey = AIzaSyBrFJ_b7JgKdYTC-ZbvVVxue-jG9xqZoyw;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function generateRecipe(ingredients) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(`
      Generate a recipe using the following ingredients: ${ingredients}. 
  
      Present the recipe in JSON format with the following keys:
  
      * **name:** The name of the recipe.
      * **ingredients:** A list of ingredients with quantities.
      * **instructions:** A list of step-by-step instructions.
      * **notes:** (Optional) Any additional notes or tips.
  
      Example JSON output:
  
      {
          "name": "Simple Tomato Soup",
          "ingredients": [
              "2 tbsp olive oil",
              "1 onion, chopped",
              "2 cloves garlic, minced",
              "1 lb tomatoes, diced",
              "4 cups vegetable broth",
              "Salt and pepper to taste",
              "Fresh basil for garnish"
          ],
          "instructions": [
              "Heat olive oil in a pot over medium heat.",
              "Sauté onion and garlic until softened.",
              "Add tomatoes and cook for 5 minutes.",
              "Pour in vegetable broth and bring to a boil.",
              "Reduce heat and simmer for 20 minutes.",
              "Blend until smooth (optional).",
              "Season with salt and pepper.",
              "Garnish with fresh basil."
          ],
          "notes": "For a creamier soup, add a splash of heavy cream."
      }
      `);
    const recipe = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
      console.log(recipe);
    return JSON.parse(recipe);
  }
              
export default generateRecipe;

