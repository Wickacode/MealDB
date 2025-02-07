// slider.js

export const initializeSlider = () => {
    const leftArrow = document.querySelector(".arrow-left");
    const rightArrow = document.querySelector(".arrow-right");
    const categoryMeals = document.querySelector(".category-meals");
  
    const updateArrowVisibility = () => {
      if (categoryMeals.scrollLeft === 0) {
        leftArrow.style.display = "none";
      } else {
        leftArrow.style.display = "block";
      }
  
      if (categoryMeals.scrollWidth === categoryMeals.scrollLeft + categoryMeals.clientWidth) {
        rightArrow.style.display = "none";
      } else {
        rightArrow.style.display = "block";
      }
    };
  
    updateArrowVisibility();
  
    leftArrow.addEventListener("click", () => {
      categoryMeals.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
      setTimeout(updateArrowVisibility, 300);
    });
  
    rightArrow.addEventListener("click", () => {
      categoryMeals.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
      setTimeout(updateArrowVisibility, 300);
    });
  
    categoryMeals.addEventListener('scroll', updateArrowVisibility);
  };
  