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
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  // Ajout de la classe .ing à chaque <li> dans la section .ingredients
  ingredientsOutput.innerHTML = ingredients
    .map((ingredient) => `<li class="ing">${ingredient}</li>`)
    .join("");

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

// Fonction pour effectuer une recherche
const searchMeal = async (e) => {
  e.preventDefault();

  const input = document.querySelector(".input");
  const ingredientsOutput = document.querySelector(".ingredients");
  const errorMessage = document.querySelector(".error-message");

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
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const { meals } = await res.json();
    if (meals && meals.length > 0) {
      showMealInfo(meals[0]);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération d'une recette random :", err);
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
