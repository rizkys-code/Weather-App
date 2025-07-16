const APIKEY = "0bdee6cdc822403182e62747251307";


const city = document.querySelector(".city").textContent;

function getIconEmoji(code, isNight){
    if([1000].includes(code)) return isNight ? "🌙" : "☀️";
    if([1003].includes(code)) return "⛅";
    if([1006, 1008].includes(code)) return "☁️";
    if([1030, 1135, 1147].includes(code)) return "🌫️";
    if([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return "🌧️";
    if([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return "🌨️";
    if([1069, 1204, 1207, 1249, 1252].includes(code)) return "🌨️";
    if([1072, 1168, 1171, 1198, 1201].includes(code)) return "🌨️";
    if([1087, 1273, 1276].includes(code)) return "⛈️";
    if([1114, 1117].includes(code)) return "❄️";
    if([1135, 1147].includes(code)) return "🌫️";
    if([1009].includes(code)) return "☁️";
    if([1150, 1153, 1180, 1183].includes(code)) return "🌦️";
    if([1186, 1189].includes(code)) return "🌧️";
    if([1192, 1195, 1243, 1246].includes(code)) return "🌧️";
    if([1249, 1252].includes(code)) return "🌧️";
    if([1198, 1201].includes(code)) return "🌨️";
    if([1204, 1207].includes(code)) return "🌨️";
    if([1210, 1213, 1216, 1219, 1255, 1258].includes(code)) return "🌨️";
    if([1222, 1225].includes(code)) return "❄️";
    if([1237, 1261, 1264].includes(code)) return "🧊";
    if([1240, 1243].includes(code)) return "🌧️";
    if([1246].includes(code)) return "🌧️";
    if([1249, 1252].includes(code)) return "🌨️";
    if([1255, 1258].includes(code)) return "🌨️";
    if([1261, 1264].includes(code)) return "🧊";
    if([1273, 1276].includes(code)) return "⛈️";
    if([1279, 1282].includes(code)) return "⛈️";
    return "🌤️";
}

function isNight(hour) {
    return hour >= 18 || hour < 6;
}

function getWeatherByCity(city) {
    const URL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=4`;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            const current = result.current;
            const location = result.location;

            // const localHour = new Date(location.localtime).getHours();
            const localHour = 22
            const nightMode = isNight(localHour);
            const emoji = getIconEmoji(current.condition.code, nightMode);
            const forecast = result.forecast;

            // Ambil elemen
            const body = document.body;
            const card = document.querySelector(".weather-card");
            const moon = document.querySelector(".moon");
            const sun = document.querySelector(".sun");

            if (nightMode) {
                body.dataset.mode = "night";
                card.dataset.mode = "night";
                sun.style.display = "none";
                moon.style.display = "block";
            } else {
                body.dataset.mode = "day";
                card.dataset.mode = "day";
                sun.style.display = "block";
                moon.style.display = "none";
            }

            // Update teks kota
            document.querySelector(".city").textContent = location.name;

            document.querySelector(".date").textContent = new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                month: "long",
                day: "numeric"
            });

            document.querySelector(".humidity").textContent = `💧 ${current.humidity}%`;
            document.querySelector(".wind").textContent = `💨 ${current.wind_kph}km/h`;
            document.querySelector(".temperature").textContent = `${current.temp_c}°C`;
            document.querySelector(".weather-icon").textContent = emoji;

            updateForecast(forecast.forecastday, nightMode);

        }).catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function updateForecast(day, nightMOde){
    const forecastItems = document.querySelectorAll(".forecast-item"); 
    day.forEach((day, index) => {
        const emoji = getIconEmoji(day.day.condition.code, nightMOde);
        const label = new Date(day.date).toLocaleDateString("id-ID", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

        if (forecastItems[index]) {
            forecastItems[index].querySelector(".weather-day").textContent = label;
            forecastItems[index].querySelector(".weather-icon").textContent = emoji;
            forecastItems[index].querySelector(".temperature-card").textContent = `${day.day.avgtemp_c}°C`;
        }
    })
}

window.onload = () => {
    getWeatherByCity(city);
};
