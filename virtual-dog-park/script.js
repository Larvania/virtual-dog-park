// ============================================================
// Virtual Dog Park — script.js
// Two small features:
//   1. A button that shows a random dog greeting.
//   2. The current year in the footer.
// ============================================================

// ---------- 1. Random greeting button ----------

// A list of greetings the dogs might give you
const greetings = [
  "Woof woof! The Beagle says hi! 🐶",
  "The Golden Retriever is wagging its tail at you!",
  "Oui oui! The Poodle tips its topknot to you. 🎩",
  "All three dogs are happy you stopped by the park today!",
  "A friendly bark echoes across the virtual park…"
];

// Find the button and the paragraph we will write into
const button = document.getElementById("hello-button");
const greeting = document.getElementById("greeting");

// Every time the button is clicked, pick a random greeting
button.addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * greetings.length);
  greeting.textContent = greetings[randomNumber];
});

// ---------- 2. Current year in the footer ----------

const yearElement = document.getElementById("year");
yearElement.textContent = new Date().getFullYear();
