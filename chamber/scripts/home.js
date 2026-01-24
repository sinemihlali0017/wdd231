// MOBILE MENU
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// FOOTER DATES
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// WEATHER — using One Call API (OpenWeatherMap)
const apiKey = '06a6c5f6c3a1e76cfe6f77cc074bee0a'; // <- replace with your real API key
// Johannesburg coordinates: lat, lon :contentReference[oaicite:0]{index=0}
const lat = -26.195246;
const lon = 28.034088;
const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}';

async function loadWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather API error");
        const data = await response.json();

        // Current weather
        const now = data.current;
        document.getElementById("current-temp").textContent = now.temp.toFixed(1);
        document.getElementById("weather-desc").textContent = now.weather[0].description;

        // 3-day forecast (using daily array)
        const forecastList = document.getElementById("forecast-list");
        forecastList.innerHTML = "";

        // data.daily[0] is today, so skip it; use next 3 days
        for (let i = 1; i <= 3; i++) {
            const day = data.daily[i];
            const li = document.createElement("li");

            const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
            });
            li.textContent = `${date}: ${day.temp.day.toFixed(1)}°C – ${day.weather[0].description}`;
            forecastList.appendChild(li);
        }
    } catch (err) {
        console.error("Weather load error:", err);
        document.getElementById("current-temp").textContent = "-";
        document.getElementById("weather-desc").textContent = "Unavailable";
        const forecastList = document.getElementById("forecast-list");
        forecastList.innerHTML = "<li>Forecast unavailable.</li>";
    }
}
loadWeather();

// SPOTLIGHT MEMBERS
async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("members.json not found");
        const members = await response.json();

        // Filter for gold or silver
        const filtered = members.filter(
            (m) => m.membership === "Gold" || m.membership === "Silver"
        );

        // Shuffle
        const shuffled = filtered.sort(() => Math.random() - 0.5);

        // Select 2 or 3 spotlight cards
        const spotlightCount = Math.random() > 0.5 ? 3 : 2;
        const selected = shuffled.slice(0, spotlightCount);

        const container = document.getElementById("spotlight-container");
        container.innerHTML = "";

        selected.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("spotlight");

            card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} logo" onerror="this.src='images/placeholder.png';">
        <h3>${member.name}</h3>
        <p>${member.membership} Member</p>
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Spotlight load error:", err);
        const container = document.getElementById("spotlight-container");
        container.innerHTML = "<p>Spotlights unavailable.</p>";
    }
}

loadSpotlights();
