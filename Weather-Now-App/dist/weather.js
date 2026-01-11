var WeatherApp;
(function (WeatherApp) {
    WeatherApp.units = { temp: "celsius", wind: "kmh", precip: "mm" };
    WeatherApp.lastPlace = null;
    WeatherApp.hourly = null;
    WeatherApp.daily = null;
    WeatherApp.currentTimeISO = "";
    WeatherApp.selectedDayIndex = 0;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    WeatherApp.errorSection = document.querySelector(".error-section");
    WeatherApp.retryBtn = document.querySelector(".retry-btn");
    WeatherApp.howTxt = document.querySelector(".how-txt");
    WeatherApp.searchSection = document.querySelector(".search-section");
    WeatherApp.desktopContainer = document.querySelector(".desktop-container");
    WeatherApp.locationTxt = document.querySelector(".location-txt");
    WeatherApp.dateTxt = document.querySelector(".date-txt");
    WeatherApp.tempTxt = document.querySelector(".tempreture-txt");
    WeatherApp.weatherImg = document.querySelector(".weather-img");
    WeatherApp.detailValues = document.querySelectorAll(".weather-det-txt-2");
    WeatherApp.dailyContainers = document.querySelectorAll(".weather-by-day-container");
    WeatherApp.hourlyContainers = document.querySelectorAll(".weather-by-hour-container");
    WeatherApp.searchInput = document.querySelector(".search-txt");
    WeatherApp.searchBtn = document.querySelector(".search-btn");
    WeatherApp.suggestionsBox = document.querySelector(".search-suggestions");
    WeatherApp.unitsBtn = document.querySelector(".units-btn");
    WeatherApp.unitsMenu = document.querySelector("#units-menu");
    WeatherApp.switchImperialBtn = document.querySelector(".dropdown-action");
    WeatherApp.dayBtn = document.querySelector(".day-btn");
    WeatherApp.dayMenu = document.querySelector("#day-menu");
    WeatherApp.selectedDayTxt = document.querySelector(".select-day-txt");
    WeatherApp.themeBtn = document.querySelector(".theme-btn");
    WeatherApp.themeIcon = document.querySelector(".theme-icon");
    WeatherApp.themeTxt = document.querySelector(".theme-txt");
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    WeatherApp.hide = (el) => el.classList.add("is-hidden");
    WeatherApp.show = (el) => el.classList.remove("is-hidden");
    function closeAllDropdowns() {
        document.querySelectorAll(".dropdown-menu").forEach((m) => WeatherApp.hide(m));
        WeatherApp.hide(WeatherApp.suggestionsBox);
    }
    WeatherApp.closeAllDropdowns = closeAllDropdowns;
    function bindDropdown(btn, menu) {
        btn.addEventListener("click", (e) => {
            if (btn.disabled)
                return;
            e.stopPropagation();
            const open = !menu.classList.contains("is-hidden");
            closeAllDropdowns();
            if (!open)
                WeatherApp.show(menu);
        });
        menu.addEventListener("click", (e) => e.stopPropagation());
    }
    WeatherApp.bindDropdown = bindDropdown;
    function setUnitsClickable(canClick) {
        WeatherApp.unitsBtn.disabled = !canClick;
        if (!canClick)
            WeatherApp.hide(WeatherApp.unitsMenu);
    }
    WeatherApp.setUnitsClickable = setUnitsClickable;
    function setLoading(on) {
        if (on) {
            WeatherApp.desktopContainer.classList.add("is-loading");
            WeatherApp.detailValues.forEach((el) => (el.textContent = "-"));
            WeatherApp.selectedDayTxt.textContent = "-";
            WeatherApp.locationTxt.textContent = "-";
            WeatherApp.dateTxt.textContent = "-";
            WeatherApp.tempTxt.textContent = "-";
        }
        else {
            WeatherApp.desktopContainer.classList.remove("is-loading");
        }
    }
    WeatherApp.setLoading = setLoading;
    function showErrorOnly() {
        WeatherApp.show(WeatherApp.errorSection);
        WeatherApp.hide(WeatherApp.howTxt);
        WeatherApp.hide(WeatherApp.searchSection);
        WeatherApp.hide(WeatherApp.desktopContainer);
        setUnitsClickable(false);
        closeAllDropdowns();
    }
    WeatherApp.showErrorOnly = showErrorOnly;
    function showMainOnly() {
        WeatherApp.hide(WeatherApp.errorSection);
        WeatherApp.show(WeatherApp.howTxt);
        WeatherApp.show(WeatherApp.searchSection);
        WeatherApp.show(WeatherApp.desktopContainer);
        // Hide search-related messages
        const searchLoading = document.querySelector(".search-loading");
        const searchNoResult = document.querySelector(".search-no-result");
        if (searchLoading)
            WeatherApp.hide(searchLoading);
        if (searchNoResult)
            WeatherApp.hide(searchNoResult);
        setUnitsClickable(true);
    }
    WeatherApp.showMainOnly = showMainOnly;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function getTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark")
            return saved;
        return "dark";
    }
    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (theme === "light") {
            WeatherApp.themeIcon.textContent = "☀️";
            WeatherApp.themeTxt.textContent = "Light";
        }
        else {
            WeatherApp.themeIcon.textContent = "🌙";
            WeatherApp.themeTxt.textContent = "Dark";
        }
    }
    function initTheme() {
        WeatherApp.themeBtn.addEventListener("click", () => {
            const current = getTheme();
            const newTheme = current === "dark" ? "light" : "dark";
            setTheme(newTheme);
        });
        setTheme(getTheme());
    }
    WeatherApp.initTheme = initTheme;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function mapWeather(code) {
        if (code === 0)
            return "Sunny";
        if ([1, 2].includes(code))
            return "Partly-cloudy";
        if (code === 3)
            return "Overcast";
        if ([45, 48].includes(code))
            return "Fog";
        if ([51, 53, 55].includes(code))
            return "Drizzle";
        if ([61, 63, 65].includes(code))
            return "Rain";
        if ([71, 73, 75].includes(code))
            return "Snow";
        if ([95, 96, 99].includes(code))
            return "Storm";
        return "Overcast";
    }
    WeatherApp.mapWeather = mapWeather;
    const IMG_BY_STATE = {
        Drizzle: "./assets/images/icon-drizzle.webp",
        Fog: "./assets/images/icon-fog.webp",
        "Partly-cloudy": "./assets/images/icon-partly-cloudy.webp",
        Overcast: "./assets/images/icon-overcast.webp",
        Rain: "./assets/images/icon-rain.webp",
        Snow: "./assets/images/icon-snow.webp",
        Storm: "./assets/images/icon-storm.webp",
        Sunny: "./assets/images/icon-sunny.webp"
    };
    function setImage(img, state) {
        img.src = IMG_BY_STATE[state] || IMG_BY_STATE.Overcast;
    }
    WeatherApp.setImage = setImage;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function refreshUnitsUI() {
        WeatherApp.unitsMenu.querySelectorAll(".dropdown-item").forEach((btn) => {
            btn.classList.remove("is-selected");
            btn.setAttribute("aria-selected", "false");
            const check = btn.querySelector(".checkmark");
            if (check)
                check.remove();
            const t = (btn.textContent || "").trim();
            let selected = false;
            if (t.includes("Celsius") && WeatherApp.units.temp === "celsius")
                selected = true;
            if (t.includes("Fahrenheit") && WeatherApp.units.temp === "fahrenheit")
                selected = true;
            if (t === "km/h" && WeatherApp.units.wind === "kmh")
                selected = true;
            if (t === "mph" && WeatherApp.units.wind === "mph")
                selected = true;
            if (t.includes("Millimeters") && WeatherApp.units.precip === "mm")
                selected = true;
            if (t.includes("Inches") && WeatherApp.units.precip === "inch")
                selected = true;
            if (selected) {
                btn.classList.add("is-selected");
                btn.setAttribute("aria-selected", "true");
                const img = document.createElement("img");
                img.className = "checkmark";
                img.src = "./assets/images/icon-checkmark.svg";
                img.alt = "";
                btn.appendChild(img);
            }
        });
    }
    WeatherApp.refreshUnitsUI = refreshUnitsUI;
    function initUnitsMenu() {
        WeatherApp.switchImperialBtn.addEventListener("click", () => {
            const isMetric = WeatherApp.units.temp === "celsius" && WeatherApp.units.wind === "kmh" && WeatherApp.units.precip === "mm";
            WeatherApp.units = isMetric
                ? { temp: "fahrenheit", wind: "mph", precip: "inch" }
                : { temp: "celsius", wind: "kmh", precip: "mm" };
            refreshUnitsUI();
            WeatherApp.hide(WeatherApp.unitsMenu);
            if (WeatherApp.lastPlace)
                WeatherApp.loadWeather(WeatherApp.lastPlace);
        });
        WeatherApp.unitsMenu.querySelectorAll(".dropdown-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                const t = (btn.textContent || "").trim();
                if (t.includes("Celsius"))
                    WeatherApp.units.temp = "celsius";
                if (t.includes("Fahrenheit"))
                    WeatherApp.units.temp = "fahrenheit";
                if (t === "km/h")
                    WeatherApp.units.wind = "kmh";
                if (t === "mph")
                    WeatherApp.units.wind = "mph";
                if (t.includes("Millimeters"))
                    WeatherApp.units.precip = "mm";
                if (t.includes("Inches"))
                    WeatherApp.units.precip = "inch";
                refreshUnitsUI();
                WeatherApp.hide(WeatherApp.unitsMenu);
                if (WeatherApp.lastPlace)
                    WeatherApp.loadWeather(WeatherApp.lastPlace);
            });
        });
    }
    WeatherApp.initUnitsMenu = initUnitsMenu;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    let searchLoadingEl = null;
    let searchNoResultEl = null;
    async function performSearch(q) {
        const query = (q || "").trim();
        if (query.length < 2) {
            WeatherApp.hide(WeatherApp.suggestionsBox);
            WeatherApp.hide(searchLoadingEl);
            WeatherApp.hide(searchNoResultEl);
            return;
        }
        // Show loading indicator
        WeatherApp.hide(WeatherApp.suggestionsBox);
        WeatherApp.hide(searchNoResultEl);
        WeatherApp.show(searchLoadingEl);
        try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=3&language=en&format=json`;
            const res = await fetch(geoUrl);
            const data = await res.json();
            // Hide loading
            WeatherApp.hide(searchLoadingEl);
            WeatherApp.suggestionsBox.innerHTML = "";
            if (!data.results || data.results.length === 0) {
                // Show no result found
                WeatherApp.hide(WeatherApp.suggestionsBox);
                WeatherApp.show(searchNoResultEl);
                return;
            }
            // Hide no result, show suggestions
            WeatherApp.hide(searchNoResultEl);
            data.results.forEach((p) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "dropdown-item";
                b.textContent = `${p.name}, ${p.country}`;
                b.addEventListener("click", () => {
                    WeatherApp.searchInput.value = p.name;
                    WeatherApp.hide(WeatherApp.suggestionsBox);
                    WeatherApp.hide(searchLoadingEl);
                    WeatherApp.hide(searchNoResultEl);
                    WeatherApp.loadWeather(p);
                });
                WeatherApp.suggestionsBox.appendChild(b);
            });
            WeatherApp.show(WeatherApp.suggestionsBox);
        }
        catch (_a) {
            WeatherApp.hide(searchLoadingEl);
            WeatherApp.hide(WeatherApp.suggestionsBox);
            WeatherApp.show(searchNoResultEl);
        }
    }
    function initSearch() {
        searchLoadingEl = document.querySelector(".search-loading");
        searchNoResultEl = document.querySelector(".search-no-result");
        // Remove auto-suggestions on input - only allow manual search via button
        WeatherApp.searchInput.addEventListener("input", () => {
            // Clear any existing suggestions/no-result when user types
            WeatherApp.hide(WeatherApp.suggestionsBox);
            WeatherApp.hide(searchLoadingEl);
            WeatherApp.hide(searchNoResultEl);
        });
        // Only search when button is clicked
        WeatherApp.searchBtn.addEventListener("click", () => {
            performSearch(WeatherApp.searchInput.value);
        });
        // Also allow Enter key to trigger search
        WeatherApp.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                performSearch(WeatherApp.searchInput.value);
            }
        });
    }
    WeatherApp.initSearch = initSearch;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function renderHourly(dayIndex) {
        if (!WeatherApp.hourly || !WeatherApp.daily)
            return;
        const dayISO = WeatherApp.daily.time[dayIndex]; // YYYY-MM-DD
        let start = WeatherApp.hourly.time.findIndex((t) => t.startsWith(dayISO));
        if (start === -1)
            return;
        // For today: start from "now" (next 24 hours view)
        if (dayIndex === 0) {
            const nowIdx = WeatherApp.hourly.time.indexOf(WeatherApp.currentTimeISO);
            if (nowIdx !== -1)
                start = nowIdx;
        }
        WeatherApp.hourlyContainers.forEach((row, i) => {
            const idx = start + i;
            const timeTxt = row.querySelector(".time-txt");
            const img = row.querySelector(".weather-hour-img");
            const tempEl = row.querySelector(".temp-txt");
            // If out of range, show placeholders (prevents stuck/crash)
            if (idx < 0 || idx >= WeatherApp.hourly.time.length) {
                timeTxt.textContent = "-";
                tempEl.textContent = "-";
                return;
            }
            timeTxt.textContent = new Date(WeatherApp.hourly.time[idx]).toLocaleTimeString("en", { hour: "numeric" });
            WeatherApp.setImage(img, WeatherApp.mapWeather(WeatherApp.hourly.weather_code[idx]));
            tempEl.textContent = `${Math.round(WeatherApp.hourly.temperature_2m[idx])}°`;
        });
    }
    WeatherApp.renderHourly = renderHourly;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function buildDayMenu() {
        if (!WeatherApp.daily)
            return;
        WeatherApp.dayMenu.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            const label = new Date(WeatherApp.daily.time[i]).toLocaleDateString("en", { weekday: "long" });
            const b = document.createElement("button");
            b.type = "button";
            b.className = "dropdown-item";
            b.textContent = label;
            b.addEventListener("click", () => {
                WeatherApp.selectedDayIndex = i;
                WeatherApp.selectedDayTxt.textContent = label;
                WeatherApp.hide(WeatherApp.dayMenu);
                WeatherApp.renderHourly(i);
            });
            WeatherApp.dayMenu.appendChild(b);
        }
    }
    WeatherApp.buildDayMenu = buildDayMenu;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    async function loadWeather(place) {
        try {
            WeatherApp.showMainOnly();
            WeatherApp.closeAllDropdowns();
            WeatherApp.lastPlace = place;
            WeatherApp.setLoading(true);
            const forecastUrl = `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${place.latitude}` +
                `&longitude=${place.longitude}` +
                `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code` +
                `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
                `&hourly=temperature_2m,weather_code` +
                `&temperature_unit=${WeatherApp.units.temp}` +
                `&wind_speed_unit=${WeatherApp.units.wind}` +
                `&precipitation_unit=${WeatherApp.units.precip}` +
                `&timezone=auto`;
            const [res] = await Promise.all([
                fetch(forecastUrl),
                new Promise((resolve) => setTimeout(resolve, 1000))
            ]);
            if (!res.ok)
                throw new Error("Forecast failed");
            const data = await res.json();
            WeatherApp.hourly = data.hourly;
            WeatherApp.daily = data.daily;
            WeatherApp.currentTimeISO = data.current.time;
            // CURRENT
            WeatherApp.locationTxt.textContent = `${place.name}, ${place.country}`;
            const date = new Date(WeatherApp.currentTimeISO);
            const dayName = date.toLocaleDateString("en", { weekday: "long" });
            const month = date.toLocaleDateString("en", { month: "short" });
            const day = date.getDate();
            const year = date.getFullYear();
            WeatherApp.dateTxt.textContent = `${dayName}, ${month} ${day}, ${year}`;
            WeatherApp.tempTxt.textContent = `${Math.round(data.current.temperature_2m)}°`;
            WeatherApp.detailValues[0].textContent = `${Math.round(data.current.apparent_temperature)}°`;
            WeatherApp.detailValues[1].textContent = `${Math.round(data.current.relative_humidity_2m)}%`;
            const windLabel = WeatherApp.units.wind === "kmh" ? "km/h" : "mph";
            const precipLabel = WeatherApp.units.precip === "mm" ? "mm" : "in";
            WeatherApp.detailValues[2].textContent = `${Math.round(data.current.wind_speed_10m)} ${windLabel}`;
            WeatherApp.detailValues[3].textContent = `${Math.round(data.current.precipitation)} ${precipLabel}`;
            WeatherApp.setImage(WeatherApp.weatherImg, WeatherApp.mapWeather(data.current.weather_code));
            // DAILY (7)
            WeatherApp.dailyContainers.forEach((wrap, i) => {
                const dayTxt = wrap.querySelector(".day-txt");
                const img = wrap.querySelector(".weather-day-img");
                const high = wrap.querySelector(".temp-high-txt");
                const low = wrap.querySelector(".temp-low-txt");
                dayTxt.textContent = new Date(WeatherApp.daily.time[i]).toLocaleDateString("en", { weekday: "short" });
                WeatherApp.setImage(img, WeatherApp.mapWeather(WeatherApp.daily.weather_code[i]));
                high.textContent = `${Math.round(WeatherApp.daily.temperature_2m_max[i])}°`;
                low.textContent = `${Math.round(WeatherApp.daily.temperature_2m_min[i])}°`;
            });
            // DAY SELECTOR
            WeatherApp.selectedDayIndex = 0;
            WeatherApp.selectedDayTxt.textContent = new Date(WeatherApp.daily.time[0]).toLocaleDateString("en", { weekday: "long" });
            WeatherApp.buildDayMenu();
            WeatherApp.refreshUnitsUI();
            WeatherApp.renderHourly(0);
            WeatherApp.setLoading(false);
        }
        catch (_a) {
            WeatherApp.setLoading(false);
            WeatherApp.showErrorOnly();
        }
    }
    WeatherApp.loadWeather = loadWeather;
})(WeatherApp || (WeatherApp = {}));
var WeatherApp;
(function (WeatherApp) {
    function initApp() {
        // dropdowns
        WeatherApp.bindDropdown(WeatherApp.unitsBtn, WeatherApp.unitsMenu);
        WeatherApp.bindDropdown(WeatherApp.dayBtn, WeatherApp.dayMenu);
        document.addEventListener("click", WeatherApp.closeAllDropdowns);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape")
                WeatherApp.closeAllDropdowns();
        });
        // theme
        WeatherApp.initTheme();
        // menus
        WeatherApp.initUnitsMenu();
        WeatherApp.initSearch();
        // initial UI
        WeatherApp.refreshUnitsUI();
        WeatherApp.setLoading(true);
        // retry
        WeatherApp.retryBtn.addEventListener("click", () => {
            if (WeatherApp.lastPlace)
                WeatherApp.loadWeather(WeatherApp.lastPlace);
        });
        // default location: Berlin
        fetch("https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json")
            .then((r) => r.json())
            .then((d) => {
            if (!d.results || d.results.length === 0) {
                WeatherApp.showErrorOnly();
                return;
            }
            WeatherApp.loadWeather(d.results[0]);
        })
            .catch(() => WeatherApp.showErrorOnly());
    }
    WeatherApp.initApp = initApp;
})(WeatherApp || (WeatherApp = {}));
window.addEventListener("DOMContentLoaded", () => {
    WeatherApp.initApp();
});
