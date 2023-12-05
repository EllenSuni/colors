const citiesList = document.getElementById("cities-list"),
  addName = document.getElementById("add-name"),
  addPop = document.getElementById("add-pop"),
  addBtn = document.getElementById("add-btn"),
  changeName = document.getElementById("change-name"),
  changePop = document.getElementById("change-pop"),
  submitChangeBtn = document.getElementById("submit-change-btn"),
  closeModalBtn = document.getElementById("close-modal-btn"),
  changeModal = document.getElementById("change-modal"),
  xMark = document.getElementById("x-mark");

//. Display all cities
fetchCities();
function fetchCities() {
  fetch("https://avancera.app/cities/")
    .then((response) => response.json())
    .then((cities) => {
      displayCities(cities);
    });
}

function displayCities(cities) {
  citiesList.innerHTML = "";
  for (let i = 0; i < cities.length; i++) {
    citiesList.innerHTML += `<li>${cities[i].name}: ${cities[i].population} invånare <button onclick="remove('${cities[i].id}')">Ta bort</button><button onclick="change('${cities[i].name}', '${cities[i].population}', '${cities[i].id}')">Ändra</button></li>`;
  }
}

//. Delete a city on click
function remove(id) {
  fetch(`https://avancera.app/cities/${id}`, {
    method: "DELETE",
  }).then(() => fetchCities());
}

//. Change a city in a modal on click
function change(city, population, id) {
  changeModal.style.display = "flex";
  changeName.value = city;
  changePop.value = population;
  submitChangeBtn.addEventListener("click", () => {
    console.log("clicked");
    fetch("https://avancera.app/cities/" + id, {
      body: JSON.stringify({
        name: changeName.value,
        id: id,
        population: Number(changePop.value),
      }),
      headers: { "Content-type": "application/json" },
      method: "PATCH",
    }).then(() => fetchCities());
    changeModal.style.display = "none";
  });
}

xMark.addEventListener("click", () => {
  changeModal.style.display = "none";
});

//. Add a city from input fields
addBtn.addEventListener("click", () => {
  fetch("https://avancera.app/cities/", {
    body: JSON.stringify({
      name: addName.value,
      population: Number(addPop.value),
    }),
    headers: { "Content-type": "application/json" },
    method: "POST",
  })
    .then((response) => response.json())
    .then((cities) => {
      displayCities(cities);
    });
  addName.value = "";
  addPop.value = "";
});
