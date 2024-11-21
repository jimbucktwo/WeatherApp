document.addEventListener("DOMContentLoaded", function () {
  const apiKey = config.MY_KEY;
  const searchBox = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");
  const error2 = document.querySelector(".error");
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

  async function checkWeather(city) {
    try {
      const response = await fetch(apiURL + `&q=${city}`);
      const data = await response.json();

      if (response.ok) {
        const cityname = document.querySelector(".city");
        cityname.textContent = data.name;

        const temp = document.querySelector(".temp");
        temp.textContent = Math.round(data.main.temp) + "°C";

        const humidity = document.querySelector(".humidity");
        humidity.textContent = data.main.humidity + "%";

        const wind = document.querySelector(".wind");
        wind.textContent = data.wind.speed + "km/h";

        const weather = document.querySelector(".weather-icon");

        if (data.weather[0].main === "Clouds") {
          weather.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
          weather.src = "images/rain.png";
        } else if (data.weather[0].main === "Clear") {
          weather.src = "images/clear.png";
        } else if (data.weather[0].main === "Snow") {
          weather.src = "images/snow.png";
        } else if (data.weather[0].main === "Mist") {
          weather.src = "images/mist.png";
        } else {
          weather.src = "images/drizzle.png";
        }

        document.querySelector(".weather").style.display = "block";
      } else {
        error2.style.display = "block";
        document.querySelector(".weather").style.display = "none";
      }
    } catch (error) {
      error2.style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }
  }

  searchButton.addEventListener("click", function () {
    const city = searchBox.value;
    checkWeather(city);
  });
});
