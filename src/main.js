"use strict";

const userInput = document.getElementById("text-input");
const searchBtn = document.getElementById("button");
const geoContainer = document.getElementById("geo-info");
const weatherContainer = document.getElementById("weather-info");
const resultContainer = document.getElementById("result-section");

// functions for the fetching the  geo location information

function renderCountry(data) {
  const html = `<div>
          <!-- Continent  -->
          <div><p class="font-bold text-[#2f4156]">COUNTRY IN ${
            data.region.toUpperCase() || "Unknown"
          }</p></div>
          <!-- Country and Flag  -->
          <div class="size-10 flex gap-3 items-center">
            <img src="${data.flags?.png}" alt="flag of ${
              data.flags?.common || "Unknown"
            }" />
            <p class="font-bold text-2xl">${data.name?.common}</p>
          </div>
        </div>

        <!-- additional info  -->
        <div class="flex gap-10">
          <div>
            <p class="font-bold text-[#2f4156]">CAPITAL</p>
            <p class="font-semibold text-2xl">${data.capital}</p>
          </div>

          <div>
            <p class="font-bold text-[#2f4156]">CURRENCY</p>
            <p class="font-semibold text-2xl">${
              data.currencies
                ? Object.values(data.currencies)[0]?.name
                : "Unknown"
            } <span class="text-sm">(${
              data.currencies ? Object.values(data.currencies)[0]?.symbol : ""
            })</span></p>
          </div>

          <div>
            <p class="font-bold text-[#2f4156]">POPULATION</p>
            <p class="font-semibold text-2xl">${
              data.population
                ? (+data.population / 1000000).toFixed(1) + "mil"
                : "Unknown"
            }</p>
          </div>
             <div>
            <p class="font-bold text-[#2f4156]">LANGUAGES</p>
            <p class="font-semibold text-2xl">${
              data.languages ? Object.values(data.languages)[0] : "Unknown"
            }</p>
          </div>
        </div>
  `;
  geoContainer.insertAdjacentHTML("beforeend", html);
}

function renderWeather(data) {
  const html = `
       <div>
          <h1 class="text-xl font-medium text-gray-700">${data.location?.name}'s Weather</h1>
            <p class="text-sm font-medium text-purple-900">${data?.location?.region}</p>
        </div>
        <!-- Three days forcast  -->
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">TODAY</p>
            <p class="flex flex-col font-bold text-xl">
              ${data.current?.temperature}&deg;C
              <span class="text-sm text-purple-950"
               /> <img class='size-6' src="${data?.current?.weather_icons[0]}" alt="picture for ${
                 data.current?.weather_descriptions[0] || "Unknown"
               }" </span>
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-purple-900">${data?.current?.weather_descriptions[0]}</p>
            <p class="font-bold text-xl">
              ${data?.current?.observation_time}
            </p>
          </div>
         
        </div>`;
  weatherContainer.insertAdjacentHTML("beforeend", html);
}

// Country Forecast API
const search = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (error) {
    console.error("Error getting data", error);
    geoContainer.insertAdjacentText(
      "beforeend",
      `<p class="error">Error: ${err.message}</p>`,
    );
  }
};

// Weather Forecast API
const weather = async function (capital) {
  try {
    const response = await fetch(
      `http://api.weatherstack.com/forecast?access_key=221e5ec245ed4d16a8fab7b899598c55&query=${capital}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    renderWeather(data);
    console.log(data);
  } catch (error) {
    console.error("Error getting data", error);
    geoContainer.insertAdjacentText(
      "beforeend",
      `<p class="error">Error: ${err.message}</p>`,
    );
  }
};

searchBtn.addEventListener("click", () => {
  const country = userInput.value;
  search(country);
  weather(country);
  resultContainer.classList.remove("hidden");
  weatherContainer.classList.remove("hidden");
  console.log("clicked");
});
