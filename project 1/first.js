const iconelement = document.querySelector(".weather-icon");
const tempelement = document.querySelector(".temp-value p");
const descelement = document.querySelector(".temp-description p");
const locationelement = document.querySelector(".location p");
const notificationelement = document.querySelector(".notification");
const humidityelement = document.querySelector(".weather-details p:nth-child(1)");
const windSpeedElement = document.querySelector(".weather-details p:nth-child(2)");
const weatherDetailsElement = document.querySelector(".weather-details");
const dateElement = document.querySelector(".date-wrapper .date");
const timeelement = document.querySelector(".date-wrapper .date-value")

const weather = {};

weather.temprature = {
    unit: "celsius"
}

const kelvin = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setposition, showerror);
} else {
    notificationelement.style.display = "block";
    notificationelement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setposition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getweather(latitude, longitude);
}

function showerror(error) {
    notificationelement.style.display = "block";
    notificationelement.innerHTML = `<p> ${error.message} </p>`;
}

function getweather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temprature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.windSpeed = data.wind.speed;
        })
        .then(function() {
            displayweather();
        })
}

function displayweather() {
    iconelement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempelement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
    descelement.innerHTML = weather.description;
    locationelement.innerHTML = `${weather.city}, ${weather.country}`;
    humidityelement.innerHTML = `Humidity: ${weather.humidity}%`;
    windSpeedElement.innerHTML = `Wind Speed: ${weather.windSpeed} m/s`;
    dateElement.innerHTML = `Date : ${new Date().toLocaleDateString()}`;
    timeelement.innerHTML = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}

function celsiustofahrenhit(temperature) {
    return (temperature * 9 / 5) + 32;
}

tempelement.addEventListener("click", function() {
    if (weather.temprature.value === undefined) return;

    if (weather.temprature.unit === "celsius") {
        let fahrenhit = celsiustofahrenhit(weather.temprature.value);
        fahrenhit = Math.floor(fahrenhit);

        tempelement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temprature.unit = "fahrenhit";
    } else {
        tempelement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
        weather.temprature.unit = "celsius";
    }
});