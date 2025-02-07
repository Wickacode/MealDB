// Fonction pour afficher les informations d'un plat
const showMealInfo = (meal) => {
  const { strMeal, strMealThumb, strInstructions } = meal;

  // Mise à jour du titre et de l'image du plat
  const title = document.querySelector(".title");
  const img = document.querySelector(".img");
  const ingredientsOutput = document.querySelector(".ingredients");

  title.textContent = strMeal;
  img.style.backgroundImage = `url(${strMealThumb})`;

  // Récupération et affichage des ingrédients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  // Ajout de la classe .ing à chaque <li> dans la section .ingredients
  ingredientsOutput.innerHTML = ingredients
    .map((ingredient) => `<li class="ing">${ingredient}</li>`)
    .join("");

  // Ajouter un lien pour afficher les étapes de préparation
  const stepsLink = document.createElement("a");
  stepsLink.href = "#section-info-container";
  stepsLink.textContent = "Voir les étapes de préparation";
  stepsLink.classList.add("steps-link");
  stepsLink.style.cursor = "pointer";
  stepsLink.style.display = "block";
  stepsLink.style.marginTop = "10px";
  stepsLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".section-info-container").scrollIntoView({ behavior: "smooth" });
  });

  ingredientsOutput.appendChild(stepsLink);

  // Mise en forme des instructions avec gestion des sauts de ligne
  const formattedInstructions = strInstructions
    ? strInstructions.split(/\r?\n/).map(step => `<p>${step.trim()}</p>`).join("")
    : "Instructions not available.";

  // Affichage des instructions formatées
  const info = document.querySelector(".info");
  info.innerHTML = formattedInstructions;
};

// Fonction pour afficher un message d'erreur
const showAlert = () => {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.style.display = "block";
  const mainBtn = document.querySelector(".main-btn");
  mainBtn.style.display = "none";
};

// Fonction pour récupérer les données par recherche
const fetchMealDataBySearch = async (val) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    const { meals } = await res.json();
    return meals;
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    return null;
  }
};

// Fonction pour afficher les recettes d'une catégorie
const fetchMealsByCategory = async (category) => {
  try {
    // Réafficher la section category-meals
    const categoryContainer = document.querySelector(".category-meals");
    categoryContainer.style.display = "flex";

    // Afficher les flèches
    document.querySelector(".arrow-left").style.display = "block";
    document.querySelector(".arrow-right").style.display = "block";

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await res.json();

    if (meals) {
      categoryContainer.innerHTML = meals
        .map(meal => `
          <div class="meal-card" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img" />
          </div>
        `)
        .join("");

      // Ajouter des événements pour afficher les détails d'un plat
      const mealCards = document.querySelectorAll(".meal-card");
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

      // Initialiser le slider
      initializeSlider();
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des recettes par catégorie :", err);
  }
};

// Fonction pour récupérer les détails d'un plat par son ID
const fetchMealDetails = async (mealId) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const { meals } = await res.json();
    return meals ? meals[0] : null;
  } catch (err) {
    console.error("Erreur lors de la récupération des détails du plat :", err);
    return null;
  }
};

// Fonction pour effectuer une recherche
const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");
  const ingredientsOutput = document.querySelector(".ingredients");
  const errorMessage = document.querySelector(".error-message");

  // Cacher la section category-meals
  document.querySelector(".category-meals").style.display = "none";

  // Réinitialisation de l'affichage
  ingredientsOutput.innerHTML = "";
  errorMessage.style.display = "none";

  const val = input.value.trim();

  if (val) {
    const meals = await fetchMealDataBySearch(val);
    if (!meals) {
      showAlert();
      return;
    }
    meals.forEach(showMealInfo);
  } else {
    alert("Please try searching for a meal :)");
  }
};

// Fonction pour récupérer une recette random
const fetchRandomMeal = async () => {
  try {
    // Cacher la section category-meals
    document.querySelector(".category-meals").style.display = "none";

    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const { meals } = await res.json();
    if (meals && meals.length > 0) {
      showMealInfo(meals[0]);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération d'une recette random :", err);
  }
};

// Fonction pour récupérer la liste des catégories
const fetchMealCategories = async () => {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const { categories } = await res.json();

    if (categories) {
      const categoriesContainer = document.querySelector(".categories-list");
      categoriesContainer.innerHTML = categories
        .map(category => `<li class="category-item" data-category="${category.strCategory}">${category.strCategory}</li>`)
        .join("");

      // Ajouter des listeners pour afficher les recettes par catégorie
      const categoryItems = document.querySelectorAll(".category-item");
      categoryItems.forEach(item => {
        item.addEventListener("click", (e) => {
          const category = e.target.dataset.category;
          fetchMealsByCategory(category);
        });
      });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories :", err);
  }
};

// Fonction d'initialisation du slider
const initializeSlider = () => {
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");
  const categoryMeals = document.querySelector(".category-meals");

  // Fonction pour gérer l'affichage des flèches
  const updateArrowVisibility = () => {
    // Si le slider est au début, cacher la flèche de gauche
    if (categoryMeals.scrollLeft === 0) {
      leftArrow.style.display = "none";
    } else {
      leftArrow.style.display = "block";
    }

    // Si le slider est à la fin, cacher la flèche de droite
    if (categoryMeals.scrollWidth === categoryMeals.scrollLeft + categoryMeals.clientWidth) {
      rightArrow.style.display = "none";
    } else {
      rightArrow.style.display = "block";
    }
  };

  // Mettre à jour l'affichage des flèches au chargement
  updateArrowVisibility();

  // Défilement vers la gauche
  leftArrow.addEventListener("click", () => {
    categoryMeals.scrollBy({
      left: -200,  // Ajuste la valeur en fonction de la largeur des images
      behavior: 'smooth'
    });
    // Mettre à jour l'affichage des flèches après défilement
    setTimeout(updateArrowVisibility, 300); // 300ms pour attendre la fin de l'animation
  });

  // Défilement vers la droite
  rightArrow.addEventListener("click", () => {
    categoryMeals.scrollBy({
      left: 200,  // Ajuste la valeur en fonction de la largeur des images
      behavior: 'smooth'
    });
    // Mettre à jour l'affichage des flèches après défilement
    setTimeout(updateArrowVisibility, 300); // 300ms pour attendre la fin de l'animation
  });

  // Événement de scroll pour mettre à jour l'affichage des flèches
  categoryMeals.addEventListener('scroll', updateArrowVisibility);
};

// Cacher les flèches lorsque la catégorie est masquée
const hideArrowsWhenCategoryHidden = () => {
  const categoryContainer = document.querySelector(".category-meals");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  // Masquer les flèches si la section category-meals n'est pas visible
  if (categoryContainer.style.display === "none") {
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
  }
};

// Écouter la soumission du formulaire de recherche
const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);

// Gestion du clic sur l'icône de recherche
const magnifier = document.querySelector(".magnifier");
magnifier.addEventListener("click", searchMeal);

// Gestion du clic sur le bouton Random
const randomButton = document.querySelector(".random");
randomButton.addEventListener("click", fetchRandomMeal);

// Chargement des catégories lors de l'initialisation de la page
fetchMealCategories();
