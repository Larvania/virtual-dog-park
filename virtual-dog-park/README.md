# Virtual Dog Park 🐾

A small, beginner-friendly website built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no external APIs. Visitors can browse a mini dog encyclopedia and adopt a virtual dog that grows from day to day.

> **Note on images:** the dog pictures are original SVG illustrations created for this project. They are simple drawings, not photographs of real dogs.

## Features

- Welcome section with a button that shows a random dog greeting
- **Dog Encyclopedia** with three breeds — Beagle, Golden Retriever, and Poodle — each with short notes on size, personality, and everyday care
- **My Virtual Dog**: choose a breed, name your dog, and adopt it
  - Name is trimmed of leading/trailing spaces (spaces inside are allowed) and limited to 20 characters, with helpful error messages
  - **Feed** and **Play** buttons raise happiness
  - **Next Day** button makes the dog grow older
  - **Start Over** button deletes progress, but asks for confirmation first
  - Growth and happiness are shown both as bars and in text, so the stage is never conveyed by size or colour alone
- Progress is saved in the browser and restored after a page refresh
- Responsive layout that works on phones and laptops

## Previewing the page

The site is fully static. The easiest way to preview it is with a local server:

1. **VS Code Live Server** (recommended): open this folder in VS Code, right-click `index.html`, and choose **Open with Live Server** (install the *Live Server* extension first if you do not have it).
2. **Python alternative**: run `python -m http.server 8642` in this folder, then open `http://localhost:8642` in your browser.
3. You can also simply double-click `index.html` — the page has no server-side features, so it works directly from the file system.

## Growth and happiness rules

- Every new dog starts on **Day 1** as a **Puppy** with **happiness 50**.
- **Feed** / **Play**: happiness **+10**, never above **100**.
- **Next Day**: day **+1**, happiness **−5**, never below **0**.
- Growth stages: Day 1 = **Puppy**, Days 2–3 = **Young Dog**, Day 4 and beyond = **Adult Dog**.

## Where is my pet saved?

Your adopted dog (name, breed, day number, and happiness) is stored **locally in your own browser** using `localStorage`, under the single key `virtualDogParkPetV1`. Nothing is uploaded to any server, and the progress is **not connected to a GitHub account** — pushing or pulling the repository will not move your pet. Refreshing the page brings the dog back; the **Start Over** button deletes it; clearing your browser data also removes it. Progress is kept per browser and per device.

## Manual testing checklist

- [ ] Adopt with an empty name (or spaces only) → a helpful error message appears
- [ ] Adopt with a name longer than 20 characters → a helpful error message appears
- [ ] Adopt with a valid name (e.g. `Air Bud`, spaces inside allowed) → the dog card shows name, breed, Day 1, Puppy, happiness 50
- [ ] Feed / Play raise happiness by 10 and stop at 100
- [ ] Next Day adds 1 to the day, subtracts 5 happiness, and never goes below 0
- [ ] Day 2–3 shows "Young Dog"; Day 4 and later show "Adult Dog"; the growth bar fills up
- [ ] Refresh the page → the adopted dog is restored
- [ ] Start Over → *Cancel* keeps the dog; *OK* returns to the adoption form and clears saved progress
- [ ] Resize to phone width → cards stack in one column with no cut-off text
- [ ] Hover/inspect images → all four images have descriptive alt text

## Project structure

```
index.html    — page structure (welcome, My Virtual Dog, encyclopedia)
style.css     — colors, layout, responsive grid, buttons, bars
script.js     — greeting button, adoption, growth, happiness, localStorage
assets/       — three original SVG dog illustrations
```
