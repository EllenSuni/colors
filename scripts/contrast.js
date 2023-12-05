//. Get elements to variables
const lightShadeSwatch = document.getElementById("light-shade-box"),
  lightShadeInput = document.getElementById("light-shade-input"),
  lightShadePicker = document.getElementById("light-shade-picker"),
  lightAccentSwatch = document.getElementById("light-accent-box"),
  lightAccentInput = document.getElementById("light-accent-input"),
  lightAccentPicker = document.getElementById("light-accent-picker"),
  mainColorSwatch = document.getElementById("main-color-box"),
  mainColorInput = document.getElementById("main-color-input"),
  mainColorPicker = document.getElementById("main-color-picker"),
  darkAccentSwatch = document.getElementById("dark-accent-box"),
  darkAccentInput = document.getElementById("dark-accent-input"),
  darkAccentPicker = document.getElementById("dark-accent-picker"),
  darkShadeSwatch = document.getElementById("dark-shade-box"),
  darkShadeInput = document.getElementById("dark-shade-input"),
  darkShadePicker = document.getElementById("dark-shade-picker"),
  combinationList = document.getElementById("combination-list"),
  selectedCombinations = document.getElementById("selected-combination-list"),
  checkColorsBtn = document.getElementById("check-colors"),
  loader = document.getElementById("loader"),
  filterSelect = document.getElementById("filter-select");

//. Object to store colors
let colors = {
  lightShade: "#e0e0e6",
  lightAccent: "#acadbe",
  mainColor: "#70728f",
  darkAccent: "#414253",
  darkShade: "#19191f",
};
if (window.localStorage.length) {
  colors = {
    lightShade: localStorage.getItem("lightShade"),
    lightAccent: localStorage.getItem("lightAccent"),
    mainColor: localStorage.getItem("mainColor"),
    darkAccent: localStorage.getItem("darkAccent"),
    darkShade: localStorage.getItem("darkShade"),
  };
}

//. Set starting point for color swatches
lightShadeSwatch.style.backgroundColor = colors.lightShade;
lightShadeInput.value = colors.lightShade;
lightShadePicker.value = colors.lightShade;

lightAccentSwatch.style.backgroundColor = colors.lightAccent;
lightAccentInput.value = colors.lightAccent;
lightAccentPicker.value = colors.lightAccent;

mainColorSwatch.style.backgroundColor = colors.mainColor;
mainColorInput.value = colors.mainColor;
mainColorPicker.value = colors.mainColor;

darkAccentSwatch.style.backgroundColor = colors.darkAccent;
darkAccentInput.value = colors.darkAccent;
darkAccentPicker.value = colors.darkAccent;

darkShadeSwatch.style.backgroundColor = colors.darkShade;
darkShadeInput.value = colors.darkShade;
darkShadePicker.value = colors.darkShade;

//. Variable to use in loops
let i = 0;

let swatches = [];

//. Function to add the background color to swatches
function showColor(swatch, input) {
  swatch.style.background = input.value;
}

//. Event listeners for user input to set swatch color
lightShadeInput.addEventListener("input", () => {
  colors.lightShade = lightShadeInput.value;
  lightShadePicker.value = lightShadeInput.value;
  showColor(lightShadeSwatch, lightShadeInput);
  localStorage.setItem("lightShade", colors.lightShade);
});

lightShadePicker.addEventListener("input", () => {
  colors.lightShade = lightShadePicker.value;
  lightShadeInput.value = lightShadePicker.value;
  showColor(lightShadeSwatch, lightShadePicker);
  localStorage.setItem("lightShade", colors.lightShade);
});

lightAccentInput.addEventListener("input", () => {
  colors.lightAccent = lightAccentInput.value;
  lightAccentPicker.value = lightAccentInput.value;
  showColor(lightAccentSwatch, lightAccentInput);
  localStorage.setItem("lightAccent", colors.lightAccent);
});
lightAccentPicker.addEventListener("input", () => {
  colors.lightAccent = lightAccentPicker.value;
  lightAccentInput.value = lightAccentPicker.value;
  showColor(lightAccentSwatch, lightAccentPicker);
  localStorage.setItem("lightAccent", colors.lightAccent);
});

mainColorInput.addEventListener("input", () => {
  colors.mainColor = mainColorInput.value;
  mainColorPicker.value = mainColorInput.value;
  showColor(mainColorSwatch, mainColorInput);
  localStorage.setItem("mainColor", colors.mainColor);
});
mainColorPicker.addEventListener("input", () => {
  colors.mainColor = mainColorPicker.value;
  mainColorInput.value = mainColorPicker.value;
  showColor(mainColorSwatch, mainColorPicker);
  localStorage.setItem("mainColor", colors.mainColor);
});

darkAccentInput.addEventListener("input", () => {
  colors.darkAccent = darkAccentInput.value;
  darkAccentPicker.value = darkAccentInput.value;
  showColor(darkAccentSwatch, darkAccentInput);
  localStorage.setItem("darkAccent", colors.darkAccent);
});
darkAccentPicker.addEventListener("input", () => {
  colors.darkAccent = darkAccentPicker.value;
  darkAccentInput.value = darkAccentPicker.value;
  showColor(darkAccentSwatch, darkAccentPicker);
  localStorage.setItem("darkAccent", colors.darkAccent);
});

darkShadeInput.addEventListener("input", () => {
  colors.darkShade = darkShadeInput.value;
  darkShadePicker.value = darkShadeInput.value;
  showColor(darkShadeSwatch, darkShadeInput);
  localStorage.setItem("darkShade", colors.darkShade);
});
darkShadePicker.addEventListener("input", () => {
  colors.darkShade = darkShadePicker.value;
  darkShadeInput.value = darkShadePicker.value;
  showColor(darkShadeSwatch, darkShadePicker);
  localStorage.setItem("darkShade", colors.darkShade);
});

let fetchStatus;
//. Event listener and function for checkColorsBtn
checkColorsBtn.addEventListener("click", () => {
  fetchStatus = 0;

  //. Clear out list of combinations
  combinationList.innerHTML = "";
  //. Show loader and hide list of combinations
  loader.style.visibility = "visible";
  combinationList.style.visibility = "hidden";
  filterSelect.value = "ALL";
  swatches.splice(0, swatches.length);
  for (let color in colors) {
    background = colors[color];
    for (let color in colors) {
      textColor = colors[color];

      combinationList.innerHTML += `<div id="combination${i}" class="combination flex-row"></div>`;
      if (background === textColor) {
        addCombination(background, textColor, 1, i);
      } else {
        fetchColors(background, textColor, i);
      }
      i++;
    }
  }
});

//. Function that checks the color combination and sends back the score
function fetchColors(background, textColor, i) {
  fetch("https://www.aremycolorsaccessible.com/api/are-they", {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ colors: [background, textColor] }),
  })
    .then((response) => {
      if (response.status === 200) {
        fetchStatus += 1;
      }
      return fetchStatus, response.json();
    })
    .then((result) => {
      //. Convert result to number
      let points = parseFloat(result.contrast);
      //. Calls addCombination with values as arguments
      addCombination(background, textColor, points, i);
    });
}

//. Function to add a combination swatch to combination list
function addCombination(background, color, points, i) {
  addSwatch(background, color, points, i);
  //. Picks the div with the right index and add the swatch to the right place
  document.querySelector(`#combination${i}`).innerHTML = `
  <div class="combination-swatch flex-column" style="background-color:${background}">
    <p style="color:${color}">Test text</p>
    </div>
    <p>${points.toFixed(2)}</p>`;
}

//. Adding swatch information to an array with objects
function addSwatch(background, textColor, points, i) {
  swatches.splice(i, 0, {
    background: background,
    color: textColor,
    points: points,
    id: i,
  });

  if (fetchStatus === 20) {
    loader.style.visibility = "hidden";
    combinationList.style.visibility = "visible";
  }
}

//. Filter swatches according to points
filterSelect.addEventListener("change", () => {
  const sortedSwatches = swatches.sort((a, b) => a.id - b.id);
  let threshold = 0;
  combinationList.innerHTML = "";

  if (filterSelect.value === "AA") {
    threshold = 4.49;
  } else if (filterSelect.value === "AAA") {
    threshold = 6.99;
  }

  sortedSwatches.forEach((element) => {
    if (element.points > threshold) {
      combinationList.innerHTML += `<div id="combination${
        element.id
      }" class="combination flex-row"><div class="combination-swatch flex-column" style="background-color:${
        element.background
      }">
      <p style="color:${element.color}">Test text</p>
      </div>
      <p>${element.points.toFixed(2)}</p></div>`;
    }
  });
});
