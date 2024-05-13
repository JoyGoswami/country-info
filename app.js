const URL = "https://restcountries.com/v3.1/all";

let DataArr = [];

// Elements
const select = document.querySelector("#select-region");
const parentElement = document.querySelector(".country-view");

// 1. get the data from api
// 2. process the data get necessery values
// 3. send the data {check it what is selected in select el} to create elements
// 4. display the data

// getting the data from api
const getCountries = async () => {
  let response = await fetch(URL);
  let data = await response.json();
  processData(data);
};

// it will pass the data through forEach loop
// it will pass data to displayData function depending on what is selected in select element
function processData(datas) {
  //when user make changes
  //ul gets emptied
  select.addEventListener("change", () => {
    parentElement.innerHTML = "";
  });

  datas.forEach((data) => {
    // before filtering it sends data to displayData function
    // when user logs in , he sees this unfiltered data
    displayData(data);
    DataArr.push(data);
    // it filters data and sends filtered data to displayData
    select.addEventListener("change", () => {
      if (select.value === "All") {
        displayData(data);
      } else if (data.region === select.value) {
        displayData(data);
      }
    });
  });
  getCountryNameSuggestion(DataArr);
  // processInputData(DataArr);
}

// displaydata gets filtered data from processData function
// it stores necessary values
// it passes necessary data to createElement function which creates dom element
function displayData(data) {
  // console.log(data);
  const flag = data.flags.svg;
  const name = data.name.common;
  const population = data.population;
  const region = data.region;
  const capital = data.capital?.[0];

  // parent div and it has col class
  const parentEl = createElement(
    "div",
    ["col", "gy-5"],
    null,
    null,
    parentElement
  );

  // Card container el
  const cardContEl = createElement(
    "div",
    ["card-cont"],
    { id: name },
    null,
    parentEl
  );

  // card image
  const cardImg = createElement(
    "img",
    ["card-img", "img-fluid"],
    { src: flag },
    null,
    cardContEl
  );

  // card body
  const cardBody = createElement(
    "div",
    ["card-body", "p-4", "fs-6"],
    null,
    null,
    cardContEl
  );

  // country name
  const countryName = createElement(
    "p",
    ["country-name", "fs-5", "fw-bold"],
    null,
    name,
    cardBody
  );

  // population cont el
  const populationContEl = createElement("p", ["mt-3"], null, null, cardBody);
  const populationLabelEl = createElement(
    "span",
    ["fw-bold"],
    null,
    "Population: ",
    populationContEl
  );
  const populationValue = createElement(
    "span",
    ["country-population"],
    null,
    population,
    populationContEl
  );

  // region cont el
  const regionContEl = createElement("p", null, null, null, cardBody);
  const regionLabelEl = createElement(
    "span",
    ["fw-bold"],
    null,
    "Region: ",
    regionContEl
  );
  const regionValue = createElement(
    "span",
    ["country-region"],
    null,
    region,
    regionContEl
  );

  // capital cont el
  const capitalContEl = createElement("p", null, null, null, cardBody);
  const capitalLabelEl = createElement(
    "span",
    ["fw-bold"],
    null,
    "Capital: ",
    capitalContEl
  );
  const capitalValue = createElement(
    "span",
    ["country-capital"],
    null,
    capital,
    capitalContEl
  );

  getDetailedViewData(cardContEl, data);
}

function getDetailedViewData(elements, data) {
  elements.addEventListener("click", () => {
    if (data.name.common === elements.id) {
      document.querySelector(".country-view").classList.add("hide");
      document.querySelector(".expand-view").classList.remove("hide");

      document.querySelector(".main-nav").classList.add("hide");
      document.querySelector(".expand-view-nav").classList.remove("hide");

      showDetailedView(data);
    }
  });

  // value from input search
  const input = document.querySelector("#search");
  input.addEventListener("change", (e) => {
    let value = e.target.value.toLowerCase();
    let countryName = data.name.common.toLowerCase();
    if (countryName === value) {
      document.querySelector(".country-view").classList.add("hide");
      document.querySelector(".expand-view").classList.remove("hide");

      document.querySelector(".main-nav").classList.add("hide");
      document.querySelector(".expand-view-nav").classList.remove("hide");

      showDetailedView(data);
      input.value = "";
      const parentUlEl = document.querySelector(".suggestion-ul");
      parentUlEl.innerHTML = "";
    }
  });
}

function showDetailedView(data) {
  //console.log(data);

  const flag = data.flags.svg;
  document
    .querySelector(".expand-view-img")
    .setAttribute("src", data.flags.svg);
  const name = data.name.common;
  document.querySelector(".country-name-expand").textContent = data.name.common;
  const population = data.population;
  document.querySelector(".country-population-expand").textContent =
    data.population;

  const region = data.region;
  document.querySelector(".country-region-expand").textContent = data.region;

  const subRegion = data.subregion;
  document.querySelector(".country-subregion-expand").textContent =
    data.subregion;

  const capital = data.capital?.[0];
  document.querySelector(".country-capital-expand").textContent =
    data.capital?.[0];

  const tld = data.tld?.[0];
  document.querySelector(".tld").textContent = data.tld?.[0];

  let currencies;
  for (const currency in data.currencies) {
    currencies = data.currencies[currency].name;
    document.querySelector(".country-currencies-expand").textContent =
      data.currencies[currency].name;
  }

  let nativeName;
  for (const i in data.name.nativeName) {
    nativeName = data.name.nativeName[i].official;
    document.querySelector(".country-name-native").textContent =
      data.name.nativeName[i].official;
  }

  let languages = "";
  for (const lan in data.languages) {
    languages += data.languages[lan] + ", ";
    document.querySelector(".country-languages-expand").textContent =
      languages.slice(0, -2);
  }

  const borderCountriesEl = document.querySelector(".border-countries-ul");
  if (data.borders) {
    data.borders.forEach((border) => {
      createElement("li", ["neighbour"], null, border, borderCountriesEl);
    });
  } else {
    createElement(
      "li",
      ["disable"],
      null,
      "No Border Countries Found",
      borderCountriesEl
    );
  }
  const liEl = document.querySelectorAll(".neighbour");
  getNeighbouringCountryData();
}

function getNeighbouringCountryData() {
  const elements = document.querySelectorAll(".neighbour");

  elements.forEach((element) => {
    element.addEventListener("click", () => {
      DataArr.forEach((data) => {
        if (data.cca3 === element.textContent) {
          showDetailedView(data);
        }
      });
    });
  });
}

// function displayNeibourCountry(data){

// }

getCountries();

// =============================
// ===========Functions=========
// =============================
function createElement(tagName, clsName, attributes, text, parentElement) {
  // Create the element
  const element = document.createElement(tagName);

  let classNames;
  // adding Class
  if (clsName) {
    element.className = clsName.join(" ");
  }

  // adding attributes
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }

  //add text content
  if (text) {
    element.textContent = text;
  }

  // Append to parent
  if (parentElement) {
    parentElement.appendChild(element);
  }

  return element;
}

//back button
const bactBtn = document.querySelector(".back-btn");

bactBtn.addEventListener("click", () => {
  document.querySelector(".country-view").classList.remove("hide");
  document.querySelector(".expand-view").classList.add("hide");

  document.querySelector(".main-nav").classList.remove("hide");
  document.querySelector(".expand-view-nav").classList.add("hide");
});

// search suggestions
// getCCountryNameSuggestion function gets data from DataArr from processData function
// it filters country name and store it in countryNamaArr
// input element has a keyup eventlistener. when key is up it filters countryname stored in countryNameArr
// if input element has a value (not empty string) it passes the data to showSuggestions function
function getCountryNameSuggestion(countryNameData) {
  let countryNameArr = [];
  let input = document.querySelector("#search");
  countryNameData.forEach((data) => {
    countryNameArr.push(data.name.common);
  });
  input.addEventListener("keyup", (e) => {
    const filteredSuggestions = countryNameArr.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(e.target.value)
    );
    if (input.value) {
      showSuggestions(filteredSuggestions, countryNameData);
    }
  });
}

// showsuggestions has two parametre => one suggestions from getCountryNameSuggestion function
// another one is from processData function wwhich is DataArr
// it creates li elements based on suggestions
// these li's have a eventlistener
// when a li is clicked it checkes which data to show
// when it gets the data , it passes the data to showDetailedView function. to create domelement depending on click result

function showSuggestions(suggestions, mainData) {
  // console.log(mainData);
  const parentUlEl = document.querySelector(".suggestion-ul");
  let input = document.querySelector("#search");
  parentUlEl.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const suggestionLi = createElement(
      "li",
      ["suggestion-li"],
      null,
      suggestion,
      parentUlEl
    );
    suggestionLi.addEventListener("click", () => {
      //input.value = suggestionLi.textContent;
      parentUlEl.innerHTML = "";
      const countryData = mainData.filter(
        (data) => data.name.common === suggestionLi.textContent
      );
      document.querySelector(".country-view").classList.add("hide");
      document.querySelector(".expand-view").classList.remove("hide");

      document.querySelector(".main-nav").classList.add("hide");
      document.querySelector(".expand-view-nav").classList.remove("hide");
      showDetailedView(...countryData);
      input.value = "";
    });
  });
}
