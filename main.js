import { fetchMealDataBySearch, fetchRandomMeal, fetchMealCategories } from './js/modules/fetchMealData.js';
import { showMealInfo, showAlert } from './js/modules/mealDisplay.js';
import { displayMealsByCategory } from './js/modules/category.js';

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");
  const ingredientsOutput = document.querySelector(".ingredients");
  const errorMessage = document.querySelector(".error-message");

  document.querySelector(".category-meals").style.display = "none";
  ingredientsOutput.innerHTML = "";
  errorMessage.style.display = "none";

  const val = input.value.trim();

  if (val) {
    const meals = await fetchMealDataBySearch(val);
    if (!meals || meals.length === 0) {
      showAlert();
      return;
    }
    errorMessage.style.display = "none";
    meals.forEach(showMealInfo);

  } else {
    alert("Please try searching for a meal :)");
  }
});

const magnifier = document.querySelector(".magnifier");
magnifier.addEventListener("click", async () => {
  const input = document.querySelector(".input");
  const meals = await fetchMealDataBySearch(input.value);
  if (!meals) {
    showAlert();
    return;
  }
  meals.forEach(showMealInfo);
});

const randomButton = document.querySelector(".random");
randomButton.addEventListener("click", async () => {
  const randomMeal = await fetchRandomMeal();
  if (randomMeal) {
    showMealInfo(randomMeal);
  }
});

fetchMealCategories().then(categories => {
  const categoriesContainer = document.querySelector(".categories-list");
  categoriesContainer.innerHTML = categories
    .map(category => `<li class="category-item" data-category="${category.strCategory}">${category.strCategory}</li>`)
    .join("");

  const categoryItems = document.querySelectorAll(".category-item");
  categoryItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      displayMealsByCategory(category);
    });
  });
});

initializeSlider();
