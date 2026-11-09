// ============================================================
// Virtual Dog Park — script.js
// Small features:
//   1. A button that shows a random dog greeting.
//   2. The current year in the footer.
//   3. My Virtual Dog: adopt a dog, feed it and play with it.
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

// ============================================================
// 3. My Virtual Dog
// ============================================================

// Details for each breed the visitor can adopt
const breedInfo = {
  beagle: { name: "Beagle", photo: "assets/beagle.svg" },
  golden: { name: "Golden Retriever", photo: "assets/golden-retriever.svg" },
  poodle: { name: "Poodle", photo: "assets/poodle.svg" }
};

// The visitor's dog. It is null until they adopt one.
let myDog = null;

// Find the parts of the page we will work with
const adoptForm = document.getElementById("adopt-form");
const breedSelect = document.getElementById("dog-breed");
const nameInput = document.getElementById("dog-name");
const nameError = document.getElementById("name-error");
const dogStatus = document.getElementById("dog-status");
const dogPhoto = document.getElementById("dog-photo");
const dogDisplayName = document.getElementById("dog-display-name");
const dogBreedDisplay = document.getElementById("dog-breed-display");
const dogDay = document.getElementById("dog-day");
const dogStage = document.getElementById("dog-stage");
const dogHappiness = document.getElementById("dog-happiness");
const happinessFill = document.getElementById("happiness-fill");
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");

// Check the name the visitor typed.
// Returns the clean name, or null if the name is not valid.
function getValidName(rawName) {
  const trimmed = rawName.trim(); // remove spaces at the start and the end only

  if (trimmed === "") {
    nameError.textContent = "Please give your dog a name. Spaces alone do not count!";
    return null;
  }

  if (trimmed.length > 20) {
    nameError.textContent = "That name is too long. Please use 20 characters or fewer.";
    return null;
  }

  nameError.textContent = ""; // the name is fine, clear any old message
  return trimmed;
}

// Runs when the visitor clicks the Adopt button
function adoptDog(event) {
  event.preventDefault(); // stop the browser reloading the page

  const cleanName = getValidName(nameInput.value);
  if (cleanName === null) {
    return; // the name was not valid, so stop here
  }

  const info = breedInfo[breedSelect.value];

  // Every new dog starts the same way
  myDog = {
    name: cleanName,
    breed: info.name,
    photo: info.photo,
    dayNumber: 1,
    growthStage: "Puppy",
    happiness: 50
  };

  adoptForm.hidden = true; // hide the form…
  dogStatus.hidden = false; // …and show the dog
  renderDog();
}

// Put the dog's details on the page.
// We always use textContent for the name so it is shown as plain text,
// never as HTML — this keeps the page safe.
function renderDog() {
  dogPhoto.src = myDog.photo;
  dogPhoto.alt = "Illustration of a " + myDog.breed + " named " + myDog.name + ".";
  dogDisplayName.textContent = myDog.name;
  dogBreedDisplay.textContent = myDog.breed;
  dogDay.textContent = myDog.dayNumber;
  dogStage.textContent = myDog.growthStage;
  dogHappiness.textContent = myDog.happiness;
  happinessFill.style.width = myDog.happiness + "%";
}

// Feed or Play: add 10 happiness, but never let it go above 100
function addHappiness(amount) {
  myDog.happiness = Math.min(myDog.happiness + amount, 100);
  renderDog();
}

// Connect the page to the functions above
adoptForm.addEventListener("submit", adoptDog);
nameInput.addEventListener("input", function () {
  nameError.textContent = ""; // clear the error as soon as they type again
});
feedButton.addEventListener("click", function () {
  addHappiness(10);
});
playButton.addEventListener("click", function () {
  addHappiness(10);
});
