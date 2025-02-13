export const fetchMealDataBySearch = async (val) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    const { meals } = await res.json();
    
    // Retourne null si `meals` est un tableau vide ou undefined
    return meals && meals.length > 0 ? meals : null;
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    return null;
  }
};
  
  export const fetchMealsByCategory = async (category) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const { meals } = await res.json();
      return meals;
    } catch (err) {
      console.error("Erreur lors de la récupération des recettes par catégorie :", err);
      return null;
    }
  };
  
  export const fetchMealDetails = async (mealId) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const { meals } = await res.json();
      return meals ? meals[0] : null;
    } catch (err) {
      console.error("Erreur lors de la récupération des détails du plat :", err);
      return null;
    }
  };
  
  export const fetchRandomMeal = async () => {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const { meals } = await res.json();
      return meals && meals.length > 0 ? meals[0] : null;
    } catch (err) {
      console.error("Erreur lors de la récupération d'une recette random :", err);
      return null;
    }
  };
  
  export const fetchMealCategories = async () => {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const { categories } = await res.json();
      return categories;
    } catch (err) {
      console.error("Erreur lors de la récupération des catégories :", err);
      return null;
    }
  };
  