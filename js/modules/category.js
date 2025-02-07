// category.js

import { fetchMealsByCategory } from './fetchMealData.js';
import { showMealInfo } from './mealDisplay.js';
import { fetchMealDetails } from './fetchMealData.js'; // Importer la fonction fetchMealDetails

export const displayMealsByCategory = async (category) => {
  try {
    const categoryContainer = document.querySelector(".category-meals");
    categoryContainer.style.display = "flex";

    document.querySelector(".arrow-left").style.display = "block";
    document.querySelector(".arrow-right").style.display = "block";

    const meals = await fetchMealsByCategory(category);

    if (meals) {
      categoryContainer.innerHTML = meals
        .map(meal => `
          <div class="meal-card" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img" />
          </div>
        `)
        .join("");

      const mealCards = document.querySelectorAll(".meal-card");
      mealCards.forEach(card => {
        card.addEventListener("click", async () => {
          const mealId = card.dataset.id;
          const mealDetails = await fetchMealDetails(mealId); // Utiliser fetchMealDetails ici
          if (mealDetails) {
            showMealInfo(mealDetails);
            document.querySelector(".top-content").scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des recettes par catégorie :", err);
  }
};
