const apiKey = "4cc7d597e58e50f3fd36cd42176c2c5b"; // Obtén una API Key de OpenWeatherMap

const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-result");

 searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página

  const ciudad = searchInput.value;
  if (ciudad) {
    await obtenerClima(ciudad);
  } else {
    alert("Por favor, ingrese una ciudad.");
  }
});

async function obtenerClima(ciudad) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      const temperature = Math.round(data.main.temp - 273.15);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;  
      const cityName = data.name;
      const country = data.sys.country;
      

      searchResults.innerHTML = `
      <p> Clima en ${cityName}, ${country}:</p>
      <p> Descripción: ${description}</p>
      <p> Temperatura: ${temperature}</p>  
      <p> humedad:     ${humidity}</p>
      <p> Velocidad del Viento:${weather}</p>
      `;
    } else {
      searchResults.textContent = "Ciudad no encontrada.";
    }
  } catch (error) {
    console.error("Error:", error);
    searchResults.textContent = "Ocurrió un error al obtener el clima.";
  }

  fetchWeather();

  setInterval(fetchWeather, 900000);
}
