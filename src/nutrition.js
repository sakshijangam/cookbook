import{
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
  
  async function generateNutrition(ingredients) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(`You are an expert in nutritionist provide the details(fat,calories,protiens,fiber,carbohydrates) of following food items ${ingredients} , also calculate total  Calories. : ${ingredients}. 
  
      Present the nutrition in JSON format with the following keys:
  
    
      * **ingredients:** A list of ingredients with nutrition value.
      * **Total value:** total value of nutrition.
      * **notes:** (Optional) Any additional notes or tips.
  
      Example JSON output:
     ingredients: [
        {
          name: "Butter (1 tablespoon, ~14g)",
          Calories: "102 kcal",
          Protein: "0.1 g",
          Fat: "11.5 g",
          Carbohydrates: "<0.1 g",
          Fiber: "0 g",
          SaturatedFat: "7.1 g",
          notes: "Nutritional values can vary slightly depending on the type of butter (e.g., salted, unsalted)."
        }
      ],
      Total_value: [
        { Nutrient: "Calories", Value: "102 kcal" },
        { Nutrient: "Protein", Value: "0.1 g" },
        { Nutrient: "Fat", Value: "11.5 g" },
        { Nutrient: "Carbohydrates", Value: "<0.1 g" },
        { Nutrient: "Fiber", Value: "0 g" }
      ],
      notes: "Butter is calorie-dense and rich in fats. Consider using it in moderation for a balanced diet."
    };

        `);
    const nutrition = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
      console.log(nutrition);
    return JSON.parse(nutrition);
  }
              
export default generateNutrition;
