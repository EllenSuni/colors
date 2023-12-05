const lightShadeSwatch = document.getElementById("light-shade"),
  lightShadeHex = document.getElementById("light-shade-hex"),
  lightAccentSwatch = document.getElementById("light-accent"),
  lightAccentHex = document.getElementById("light-accent-hex"),
  mainColorSwatch = document.getElementById("main-color"),
  mainColorHex = document.getElementById("main-color-hex"),
  darkAccentSwatch = document.getElementById("dark-accent"),
  darkAccentHex = document.getElementById("dark-accent-hex"),
  darkShadeSwatch = document.getElementById("dark-shade"),
  darkShadeHex = document.getElementById("dark-shade-hex"),
  boardHeading = document.getElementById("board-heading"),
  boardText = document.getElementById("board-text"),
  fontLink = document.getElementById("font-link"),
  searchInput = document.getElementById("search-input"),
  btn = document.getElementById("btn");

//. Get colors and font from web storage
let colors = {
    lightShade: localStorage.getItem("lightShade"),
    lightAccent: localStorage.getItem("lightAccent"),
    mainColor: localStorage.getItem("mainColor"),
    darkAccent: localStorage.getItem("darkAccent"),
    darkShade: localStorage.getItem("darkShade"),
  },
  font = localStorage.getItem("font");

//. Set swatches and examples to saved colors and font
lightShadeSwatch.style.background = colors.lightShade;
lightAccentSwatch.style.background = colors.lightAccent;
mainColorSwatch.style.background = colors.mainColor;
darkAccentSwatch.style.background = colors.darkAccent;
darkShadeSwatch.style.background = colors.darkShade;

boardHeading.style.background = colors.lightShade;
boardHeading.style.color = colors.darkAccent;

boardText.style.background = colors.lightShade;
boardText.style.color = colors.darkShade;

addFont(font);

lightShadeHex.textContent = colors.lightShade;
lightAccentHex.textContent = colors.lightAccent;
mainColorHex.textContent = colors.mainColor;
darkAccentHex.textContent = colors.darkAccent;
darkShadeHex.textContent = colors.darkShade;

//. Font functions
btn.addEventListener("click", () => {
  addFont(searchInput.value);
  localStorage.setItem("font", searchInput.value);
});

function addFont(font) {
  fontLink.setAttribute(
    "href",
    `https://fonts.googleapis.com/css2?display=swap&family=${font}`
  );
  boardHeading.style.fontFamily = font;
  boardText.style.fontFamily = font;
}

//. Pattern
const pattern = document.getElementById("pattern");

let patternIndex = 0;

do {
  pattern.innerHTML += `<div id="part${patternIndex}" class="container">
  <div class="top-left"></div>
  <div class="top-right"></div>
  <div class="bottom-left"></div>
  <div class="bottom-right"></div>
  </div>`;

  let element = document.getElementById(`part${patternIndex}`),
    elementChildren = document.getElementById(`part${patternIndex}`).children;

  function setColor(background, foreground) {
    element.style.background = background;
    for (let n = 0; n < 4; n++) {
      elementChildren[n].style.background = foreground;
    }
  }

  // Set the right color to the right place
  switch (patternIndex) {
    case 0:
      setColor(colors.darkShade, colors.lightShade);
      break;
    case 1:
      setColor(colors.darkAccent, colors.lightAccent);
      break;
    case 2:
      setColor(colors.mainColor, colors.darkShade);
      break;
    case 3:
      setColor(colors.lightShade, colors.lightAccent);
      break;
    case 4:
      setColor(colors.mainColor, colors.lightAccent);
      break;
    case 5:
      setColor(colors.lightShade, colors.mainColor);
      break;
    case 6:
      setColor(colors.darkShade, colors.darkAccent);
      break;
    case 7:
      setColor(colors.mainColor, colors.lightShade);
      break;
    case 8:
      setColor(colors.lightAccent, colors.darkShade);
      break;
    case 9:
      setColor(colors.darkAccent, colors.lightShade);
      break;
    case 10:
      setColor(colors.lightAccent, colors.mainColor);
      break;
    case 11:
      setColor(colors.darkShade, colors.lightAccent);
      break;
    case 12:
      setColor(colors.darkShade, colors.mainColor);
      break;
    case 13:
      setColor(colors.lightAccent, colors.darkAccent);
      break;
    case 14:
      setColor(colors.lightShade, colors.darkShade);
      break;
    case 15:
      setColor(colors.mainColor, colors.darkAccent);
      break;
    case 16:
      setColor(colors.lightShade, colors.darkAccent);
      break;
    case 17:
      setColor(colors.darkAccent, colors.mainColor);
      break;
    case 18:
      setColor(colors.lightAccent, colors.lightShade);
      break;
    case 19:
      setColor(colors.darkAccent, colors.darkShade);
      break;
  }
  patternIndex++;
} while (patternIndex < 20);
