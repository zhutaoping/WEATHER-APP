"use strict";

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={35525da445f656dff1788bc7bfd5db91}

// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={35525da445f656dff1788bc7bfd5db91}"
// );

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   const { latitude: lat, longitude: lng } = pos.coords;
// }

// function error(err) {
//   console.warn("ERROR(" + err.code + "): " + err.message);
// }

const getCoords = async () => {
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const coords = [pos.coords.latitude, pos.coords.longitude];
    return coords;
  } catch {
    (err) => console.log(err);
  }
};

const getCity = async (coords) => {
  try {
    const resGeo = await fetch(
      `https://geocode.xyz/${coords[0]},${coords[1]}?geoit=json`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await resGeo.json();
    //   console.log(dataGeo.city);
    const city = dataGeo.city;
    return city;
  } catch {
    (err) => console.log(err);
  }
};

const getWeather = async () => {
  try {
    const coords = await getCoords();
    const city = await getCity(coords);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35525da445f656dff1788bc7bfd5db91`
    );
    const data = await res.json();
    console.log(data);
  } catch {
    (err) => console.log(err);
  }
};

getWeather();
