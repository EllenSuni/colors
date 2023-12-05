const ctx = document.getElementById("myChart"),
  swatch = document.getElementById("swatch"),
  swatchInput = document.getElementById("swatch-input"),
  swatchPicker = document.getElementById("swatch-picker");

//. Set starting color
let colorValues = { Red: 123, Green: 92, Blue: 12 },
  swatchColor = "#899277";

swatch.style.backgroundColor = swatchColor;
swatchInput.value = swatchColor;
swatchPicker.value = swatchColor;

fetchColorValues(899277);

//. Defining chart
let myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Green", "Blue"],
    datasets: [
      {
        label: "Färgmängd",
        data: [colorValues],
        borderWidth: 1,
        backgroundColor: ["#ff0000", "#00ff00", "#0000ff"],
      },
    ],
  },
  options: {
    scales: {
      y: {
        // Y-axis is now always 0-255
        max: 255,
      },
    },
  },
});

//. Eventlisteners on inputs
swatchInput.addEventListener("input", () => {
  swatchColor = swatchInput.value;
  swatch.style.background = swatchColor;
  swatchPicker.value = swatchInput.value;
  // Remove #. Make it a function if more instances are added
  strippedCode = swatchColor.substring(1);
  fetchColorValues(strippedCode);
});

swatchPicker.addEventListener("input", () => {
  swatchColor = swatchPicker.value;
  swatch.style.background = swatchColor;
  swatchInput.value = swatchPicker.value;
  // Remove #. Make it a function if more instances are added
  strippedCode = swatchColor.substring(1);
  fetchColorValues(strippedCode);
});

//. Fetching the rgb-values of selected color
function fetchColorValues(strippedCode) {
  fetch(`https://www.thecolorapi.com/id?hex=${strippedCode}`)
    .then((response) => response.json())
    .then((result) => {
      setColors(result.rgb);
    });
}

//. Set the rgb-values to chart and update with new data
function setColors(rgb) {
  colorValues = {};
  console.log(rgb);
  colorValues.Red = rgb.r;
  colorValues.Green = rgb.g;
  colorValues.Blue = rgb.b;
  myChart.data.datasets[0].data = colorValues;
  myChart.update(colorValues);
}
