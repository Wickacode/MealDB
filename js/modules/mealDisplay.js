// mealDisplay.js

export const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
  
    const title = document.querySelector(".title");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");
  
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
  
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
  
    const formattedInstructions = strInstructions
      ? strInstructions.split(/\r?\n/).map(step => `<p>${step.trim()}</p>`).join("")
      : "Instructions not available.";
  
    const info = document.querySelector(".info");
    info.innerHTML = formattedInstructions;
  };
  
  export const showAlert = () => {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";
    const mainBtn = document.querySelector(".main-btn");
    mainBtn.style.display = "none";
  };
  