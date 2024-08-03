const quizBtn = document.querySelector(".btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector('.exit-btn');
const continueBtn = document.querySelector('.continue-btn');
const main = document.querySelector('.main');

// When the quiz button is clicked
quizBtn.onclick = function() {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

// When the exit button is clicked
exitBtn.onclick = function() {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

// When the continue button is clicked, go to the new page
continueBtn.onclick = function() {
  window.location.href = "../pages/question.html";
};