"use strict";

const cardContainer = document.querySelector(".card-container");
const selectColaboratori = document.querySelector(".count-colaboratori");
const searchInput = document.querySelector("#searchBar");
let colaboratori = [];
let logos = [];

searchInput.addEventListener("input", (e) => {
  const dateInput = e.target.value.toLowerCase().replace(/\s+/g, "");
  const colaboratoriFiltrati = colaboratori.filter((colaborator) =>
    colaborator.name.toLowerCase().replace(/\s+/g, "").includes(dateInput)
  );
  displayColaboratori(colaboratoriFiltrati);
});

fetch("https://api.peviitor.ro/v1/logo/")
  .then((response) => response.json())
  .then((data) => {
    selectColaboratori.textContent = `avem scrapere pentru ${data.companies.length} de companii !`;
    colaboratori = data.companies;
    console.log(data.companies);
    displayColaboratori(colaboratori);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

function displayColaboratori(colaboratori) {
  cardContainer.innerHTML = "";
  colaboratori.forEach((collaborator) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const link = document.createElement("a");

    const allToLowerCase = collaborator.name.toLowerCase().replace(/\s+/g, "");

    const assetPath = `./assets/${allToLowerCase}.png`;

    fetch(assetPath).then((response) => {
      if (response.ok) {
        image.src = assetPath;
      } else {
        image.src = collaborator.logo;
      }
    });

    image.alt = collaborator.name;
    image.onerror = () => {
      image.src = "./assets/logonotfound.png";
    };

    title.textContent = allToLowerCase;
    link.href = `https://peviitor.ro/rezultate?q=${allToLowerCase}&country=Rom%C3%A2nia&page=1             `;

    link.appendChild(image);
    link.appendChild(title);
    div.appendChild(link);
    cardContainer.appendChild(div);
  });
}
