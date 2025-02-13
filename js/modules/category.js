import { fetchMealsByCategory } from './fetchMealData.js'; 
import { showMealInfo } from './mealDisplay.js'; 
import { fetchMealDetails } from './fetchMealData.js'; 

export const displayMealsByCategory = async (category) => {
  try {
    const categoryContainer = document.querySelector(".category-meals");
    const sliderContainer = document.querySelector(".slider-container"); // Définir le sliderContainer ici

    // Cacher temporairement le slider pour éviter un affichage saccadé
    sliderContainer.style.visibility = "hidden";

    const meals = await fetchMealsByCategory(category);

    if (meals) {
      // Précharger toutes les images
      const imagePromises = meals.map(meal => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = meal.strMealThumb;
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Erreur de chargement de l'image : ${meal.strMealThumb}`);
        });
      });

      // Attendre que toutes les images soient chargées
      const loadedImages = await Promise.all(imagePromises);

      // Générer le contenu des cartes en utilisant les images préchargées
      categoryContainer.innerHTML = meals
        .map((meal, index) => `
          <div class="meal-card" data-id="${meal.idMeal}" style="opacity: 0; transition: opacity 0.5s;">
            <img src="${loadedImages[index].src}" alt="${meal.strMeal}" class="meal-img" style="opacity: 0; transition: opacity 0.5s;" />
          </div>
        `)
        .join("");


      const mealCards = document.querySelectorAll(".meal-card");
      const images = document.querySelectorAll(".meal-img");

      // Appliquer l'effet de fondu une fois insérées dans le DOM
      setTimeout(() => {
        mealCards.forEach(card => card.style.opacity = "1");
        images.forEach(img => img.style.opacity = "1");
        sliderContainer.style.visibility = "visible"; // Rendre le slider visible après avoir inséré les images
        sliderContainer.style.display = "flex"; // Réafficher le slider avec flex
      }, 50); // Petit délai pour bien appliquer le rendu

      // Ajouter les événements pour afficher les détails des plats
      mealCards.forEach(card => {
        card.addEventListener("click", async () => {
          const mealId = card.dataset.id;
          const mealDetails = await fetchMealDetails(mealId);
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
