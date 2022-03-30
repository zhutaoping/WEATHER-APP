"use strict";

const weatherContainer = document.querySelector(".weather");
const inputBox = document.querySelector(".inputBox");
const submitBtn = document.querySelector(".submitBtn");

class App {
  constructor() {
    submitBtn.addEventListener("click", this._getWeather.bind(this));

    inputBox.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }

  async _getWeather() {
    if (!inputBox.value) return;
    // const coords = await this._getCoords();
    // const city = await this._getCity(coords);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=35525da445f656dff1788bc7bfd5db91&units=metric&lang=zh_tw`
    );
    const data = await res.json();
    this._renderWeather(data);
  }

  _renderWeather(data) {
    weatherContainer.innerHTML = "";

    const html = `
      <div class="city__data">
        <h2 class="name">城市：${data.name}</h2>
        <h2 class="descriptiion">天氣：${data.weather[0].description}
        </h2>
        <h2 class="temp">氣溫：${data.main.temp} °C </h2>
        <h2 class="feels_like">體感：${data.main.feels_like}
        <h2>
        <h2 class="humidity">濕度：${data.main.humidity}
        </h2>
        <h2 class='visibility'>能見度：${data.visibility}
        </h2>
      </div>
    `;
    weatherContainer.insertAdjacentHTML("beforeend", html);
  }

  // async _getCoords() {
  //   try {
  //     const resPos = await new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(resolve, reject);
  //     });
  //     const coords = [resPos.coords.latitude, resPos.coords.longitude];
  //     return coords;
  //   } catch {
  //     (err) => console.log(err);
  //   }
  // }

  // async _getCity(coords) {
  //   try {
  //     const resGeo = await fetch(
  //       `https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json`
  //     );
  //     if (!resGeo.ok) throw new Error("Problem getting location data");
  //     const dataGeo = await resGeo.json();
  //     const city = dataGeo.city.split(" ");
  //     return city;
  //   } catch {
  //     (err) => console.log(err);
  //   }
  // }
}
const run = new App();
