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
const growthFill = document.getElementById("growth-fill");
const feedButton = document.getElementById("feed-button");
const playButton = document.getElementById("play-button");
const nextDayButton = document.getElementById("next-day-button");
const startOverButton = document.getElementById("start-over-button");

// The name of the one storage slot where the dog is saved in the browser
const STORAGE_KEY = "virtualDogParkPetV1";

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

  // Every new dog starts the same way.
  // The growth stage is not stored — it is worked out from the day number.
  myDog = {
    name: cleanName,
    breed: info.name,
    photo: info.photo,
    dayNumber: 1,
    happiness: 50
  };

  adoptForm.hidden = true; // hide the form…
  dogStatus.hidden = false; // …and show the dog
  saveDog();
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
  dogStage.textContent = getGrowthStage(myDog.dayNumber);
  dogHappiness.textContent = myDog.happiness;
  happinessFill.style.width = myDog.happiness + "%";
  // Growth bar: 25% on day 1, 50% on day 2, 75% on day 3, full from day 4
  growthFill.style.width = Math.min(myDog.dayNumber, 4) * 25 + "%";
}

// The growth rules: day 1 is a Puppy, days 2 and 3 are a Young Dog,
// and from day 4 onwards the dog is an Adult Dog.
function getGrowthStage(dayNumber) {
  if (dayNumber === 1) {
    return "Puppy";
  }
  if (dayNumber <= 3) {
    return "Young Dog";
  }
  return "Adult Dog";
}

// --- Saving and loading with localStorage ---

// Save the dog in the browser's localStorage under the one storage key.
// JSON.stringify turns the dog object into a text string for storage.
function saveDog() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(myDog));
}

// Bring back the saved dog, or null if there is nothing saved.
// JSON.parse turns the saved text string back into an object.
function loadDog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return null;
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    return null; // the saved text was broken, so start fresh
  }
}

// Feed or Play: add 10 happiness, but never let it go above 100
function addHappiness(amount) {
  myDog.happiness = Math.min(myDog.happiness + amount, 100);
  saveDog();
  renderDog();
}

// Next Day: the day number goes up by 1 and happiness drops a little,
// but it never goes below 0.
function nextDay() {
  myDog.dayNumber = myDog.dayNumber + 1;
  myDog.happiness = Math.max(myDog.happiness - 5, 0);
  saveDog();
  renderDog();
}

// Start Over: ask first. Only delete the dog if the visitor confirms.
function startOver() {
  const sure = window.confirm(
    "Are you sure? This will delete " + myDog.name + " and all saved progress."
  );
  if (!sure) {
    return; // they clicked Cancel, so keep the dog
  }
  localStorage.removeItem(STORAGE_KEY); // delete the saved dog
  myDog = null;
  dogStatus.hidden = true; // hide the dog…
  adoptForm.hidden = false; // …and show the adoption form again
  nameInput.value = "";
  nameError.textContent = "";
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
nextDayButton.addEventListener("click", nextDay);
startOverButton.addEventListener("click", startOver);

// When the page loads, bring the saved dog back if there is one.
// This is why the dog is still there after refreshing the page.
const savedDog = loadDog();
if (savedDog !== null) {
  myDog = savedDog;
  adoptForm.hidden = true;
  dogStatus.hidden = false;
  renderDog();
}
