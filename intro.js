// intro.js
document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");

  // Hide the intro screen after 3 seconds
  setTimeout(() => {
    introScreen.classList.add("hidden");
  }, 3000); // 3000 milliseconds = 3 seconds
});