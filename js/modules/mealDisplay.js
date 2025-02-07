export const showMealInfo = (meal) => {
  const { strMeal, strMealThumb, strInstructions } = meal;

  const title = document.querySelector(".title");
  const img = document.querySelector(".img");
  const ingredientsOutput = document.querySelector(".ingredients");
  const contentPresentation = document.querySelector(".content-presentation");
  const contentContainer = document.querySelector(".content-container");

  // Mise à jour du titre et de l'image
  title.textContent = strMeal;
  img.style.backgroundImage = `url(${strMealThumb})`;

  // Mise à jour des ingrédients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  ingredientsOutput.innerHTML = ingredients
    .map((ingredient) => `<li class="ing">${ingredient}</li>`)
    .join("");

  // Instructions formatées
  const formattedInstructions = strInstructions
    ? strInstructions.split(/\r?\n/).map(step => `<p>${step.trim()}</p>`).join("")
    : "Instructions not available.";

  const info = document.querySelector(".info");
  info.innerHTML = formattedInstructions;

  // Affiche la section contenant les détails de la recette
  const sectionInfoContainer = document.getElementById("section-info-container");
  sectionInfoContainer.style.display = "block";

  // Cache la div content-presentation si présente
  if (contentPresentation) {
    contentPresentation.style.display = "none";
  }

  // Assurer la visibilité de content-container
  if (contentContainer) {
    contentContainer.style.opacity = "1";
    contentContainer.style.transform = "none";
  }
};

export const showAlert = () => {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.style.display = "block";
};
