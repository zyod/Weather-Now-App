window.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // STATE
  // ===============================
  type Units = {
    temp: "celsius" | "fahrenheit";
    wind: "kmh" | "mph";
    precip: "mm" | "inch";
  };

  let units: Units = { temp: "celsius", wind: "kmh", precip: "mm" };
  let lastPlace: any = null;
  let hourly: any = null;
  let daily: any = null;
  let currentTimeISO = "";
  let selectedDayIndex = 0;

  // ===============================
  // DOM
  // ===============================
  const errorSection = document.querySelector(".error-section") as HTMLElement;
  const retryBtn = document.querySelector(".retry-btn") as HTMLButtonElement;

  const howTxt = document.querySelector(".how-txt") as HTMLElement;
  const searchSection = document.querySelector(".search-section") as HTMLElement;
  const desktopContainer = document.querySelector(".desktop-container") as HTMLElement;

  const locationTxt = document.querySelector(".location-txt") as HTMLElement;
  const dateTxt = document.querySelector(".date-txt") as HTMLElement;
  const tempTxt = document.querySelector(".tempreture-txt") as HTMLElement;

  const weatherImg = document.querySelector(".weather-img") as HTMLImageElement;
  const detailValues = document.querySelectorAll(".weather-det-txt-2");

  const dailyContainers = document.querySelectorAll(".weather-by-day-container");
  const hourlyContainers = document.querySelectorAll(".weather-by-hour-container");

  const searchInput = document.querySelector(".search-txt") as HTMLInputElement;
  const searchBtn = document.querySelector(".search-btn") as HTMLButtonElement;
  const suggestionsBox = document.querySelector(".search-suggestions") as HTMLElement;

  const unitsBtn = document.querySelector(".units-btn") as HTMLButtonElement;
  const unitsMenu = document.querySelector("#units-menu") as HTMLElement;
  const switchImperialBtn = document.querySelector(".dropdown-action") as HTMLButtonElement;

  const dayBtn = document.querySelector(".day-btn") as HTMLButtonElement;
  const dayMenu = document.querySelector("#day-menu") as HTMLElement;
  const selectedDayTxt = document.querySelector(".select-day-txt") as HTMLElement;

  const themeBtn = document.querySelector(".theme-btn") as HTMLButtonElement;
  const themeIcon = document.querySelector(".theme-icon") as HTMLElement;
  const themeTxt = document.querySelector(".theme-txt") as HTMLElement;

  // ===============================
  // BASIC UI HELPERS
  // ===============================
  const hide = (el: HTMLElement) => el.classList.add("is-hidden");
  const show = (el: HTMLElement) => el.classList.remove("is-hidden");

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach((m) => hide(m as HTMLElement));
    hide(suggestionsBox);
  }

  function bindDropdown(btn: HTMLButtonElement, menu: HTMLElement) {
    btn.addEventListener("click", (e) => {
      // If disabled/un-clickable, do nothing
      if (btn.disabled) return;

      e.stopPropagation();
      const open = !menu.classList.contains("is-hidden");
      closeAllDropdowns();
      if (!open) show(menu);
    });
    menu.addEventListener("click", (e) => e.stopPropagation());
  }

  bindDropdown(unitsBtn, unitsMenu);
  bindDropdown(dayBtn, dayMenu);

  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  // ===============================
  // THEME TOGGLE
  // ===============================
  function getTheme(): "dark" | "light" {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // default
  }

  function setTheme(theme: "dark" | "light") {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    if (theme === "light") {
      themeIcon.textContent = "☀️";
      themeTxt.textContent = "Light";
    } else {
      themeIcon.textContent = "🌙";
      themeTxt.textContent = "Dark";
    }
  }

  themeBtn.addEventListener("click", () => {
    const current = getTheme();
    const newTheme = current === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  // Initialize theme on load
  setTheme(getTheme());

  // ===============================
  // VIEW MODES
  // ===============================
  function setUnitsClickable(canClick: boolean) {
    unitsBtn.disabled = !canClick;
    if (!canClick) hide(unitsMenu);
  }

  function setLoading(on: boolean) {
    if (on) {
      desktopContainer.classList.add("is-loading");

      // Required by you:
      // Replace the text in weather-det-txt-2 and select-day-txt with “-” while loading.
      detailValues.forEach((el) => (el.textContent = "-"));
      selectedDayTxt.textContent = "-";

      // Optional but helps avoid “old data flashing”:
      locationTxt.textContent = "-";
      dateTxt.textContent = "-";
      tempTxt.textContent = "-";
    } else {
      desktopContainer.classList.remove("is-loading");
    }
  }

  function showErrorOnly() {
    show(errorSection);
    hide(howTxt);
    hide(searchSection);
    hide(desktopContainer);

    // Make Units button unclickable on error page
    setUnitsClickable(false);

    closeAllDropdowns();
  }

  function showMainOnly() {
    hide(errorSection);
    show(howTxt);
    show(searchSection);
    show(desktopContainer);

    // Allow Units button on main UI
    setUnitsClickable(true);
  }

  // ===============================
  // WEATHER STATE
  // ===============================
  function mapWeather(code: number): string {
    if (code === 0) return "Sunny";
    if ([1, 2].includes(code)) return "Partly-cloudy";
    if (code === 3) return "Overcast";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([71, 73, 75].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Storm";
    return "Overcast";
  }

  // ===============================
  // IMAGES (YOUR FILES)
  // ===============================
  const IMG_BY_STATE: Record<string, string> = {
    Drizzle: "./assets/images/icon-drizzle.webp",
    Fog: "./assets/images/icon-fog.webp",
    "Partly-cloudy": "./assets/images/icon-partly-cloudy.webp",
    Overcast: "./assets/images/icon-overcast.webp",
    Rain: "./assets/images/icon-rain.webp",
    Snow: "./assets/images/icon-snow.webp",
    Storm: "./assets/images/icon-storm.webp",
    Sunny: "./assets/images/icon-sunny.webp",
  };

  function setImage(img: HTMLImageElement, state: string) {
    img.src = IMG_BY_STATE[state] || IMG_BY_STATE.Overcast;
  }

  // ===============================
  // UNITS MENU UI
  // ===============================
  function refreshUnitsUI() {
    unitsMenu.querySelectorAll(".dropdown-item").forEach((btn) => {
      btn.classList.remove("is-selected");
      btn.setAttribute("aria-selected", "false");

      const check = btn.querySelector(".checkmark");
      if (check) check.remove();

      const t = (btn.textContent || "").trim();
      let selected = false;

      if (t.includes("Celsius") && units.temp === "celsius") selected = true;
      if (t.includes("Fahrenheit") && units.temp === "fahrenheit") selected = true;
      if (t === "km/h" && units.wind === "kmh") selected = true;
      if (t === "mph" && units.wind === "mph") selected = true;
      if (t.includes("Millimeters") && units.precip === "mm") selected = true;
      if (t.includes("Inches") && units.precip === "inch") selected = true;

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

  switchImperialBtn.addEventListener("click", () => {
    const isMetric = units.temp === "celsius" && units.wind === "kmh" && units.precip === "mm";
    units = isMetric
      ? { temp: "fahrenheit", wind: "mph", precip: "inch" }
      : { temp: "celsius", wind: "kmh", precip: "mm" };

    refreshUnitsUI();
    hide(unitsMenu);
    if (lastPlace) loadWeather(lastPlace);
  });

  unitsMenu.querySelectorAll(".dropdown-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = (btn.textContent || "").trim();

      if (t.includes("Celsius")) units.temp = "celsius";
      if (t.includes("Fahrenheit")) units.temp = "fahrenheit";
      if (t === "km/h") units.wind = "kmh";
      if (t === "mph") units.wind = "mph";
      if (t.includes("Millimeters")) units.precip = "mm";
      if (t.includes("Inches")) units.precip = "inch";

      refreshUnitsUI();
      hide(unitsMenu);
      if (lastPlace) loadWeather(lastPlace);
    });
  });

  // ===============================
  // SEARCH SUGGESTIONS
  // ===============================
  let timer: number | null = null;

  async function showSuggestions(q: string) {
    const query = (q || "").trim();
    if (query.length < 2) {
      suggestionsBox.innerHTML = "";
      hide(suggestionsBox);
      return;
    }

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=3&language=en&format=json`;

      const res = await fetch(geoUrl);
      const data = await res.json();

      suggestionsBox.innerHTML = "";
      if (!data.results || data.results.length === 0) {
        hide(suggestionsBox);
        return;
      }

      data.results.forEach((p: any) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dropdown-item";
        b.textContent = `${p.name}, ${p.country}`;
        b.addEventListener("click", () => {
          searchInput.value = p.name;
          hide(suggestionsBox);
          loadWeather(p);
        });
        suggestionsBox.appendChild(b);
      });

      show(suggestionsBox);
    } catch {
      hide(suggestionsBox);
    }
  }

  searchInput.addEventListener("input", () => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => showSuggestions(searchInput.value), 250);
  });

  searchBtn.addEventListener("click", () => showSuggestions(searchInput.value));

  // ===============================
  // DAY MENU FROM API
  // ===============================
  function buildDayMenu() {
    if (!daily) return;

    dayMenu.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const label = new Date(daily.time[i]).toLocaleDateString("en", { weekday: "long" });

      const b = document.createElement("button");
      b.type = "button";
      b.className = "dropdown-item";
      b.textContent = label;

      b.addEventListener("click", () => {
        selectedDayIndex = i;
        selectedDayTxt.textContent = label;
        hide(dayMenu);
        renderHourly(i);
      });

      dayMenu.appendChild(b);
    }
  }

  // ===============================
  // LOAD WEATHER
  // ===============================
  async function loadWeather(place: any) {
    try {
      showMainOnly();
      closeAllDropdowns();

      lastPlace = place;
      setLoading(true);

      const forecastUrl =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${place.latitude}` +
        `&longitude=${place.longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&hourly=temperature_2m,weather_code` +
        `&temperature_unit=${units.temp}` +
        `&wind_speed_unit=${units.wind}` +
        `&precipitation_unit=${units.precip}` +
        `&timezone=auto`;

      const [res] = await Promise.all([
        fetch(forecastUrl),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      if (!res.ok) throw new Error("Forecast failed");

      const data = await res.json();

      hourly = data.hourly;
      daily = data.daily;
      currentTimeISO = data.current.time;

      // CURRENT
      locationTxt.textContent = `${place.name}, ${place.country}`;
      const date = new Date(currentTimeISO);
      const dayName = date.toLocaleDateString("en", { weekday: "long" });
      const month = date.toLocaleDateString("en", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      dateTxt.textContent = `${dayName}, ${month} ${day}, ${year}`;
      tempTxt.textContent = `${Math.round(data.current.temperature_2m)}°`;

      detailValues[0].textContent = `${Math.round(data.current.apparent_temperature)}°`;
      detailValues[1].textContent = `${Math.round(data.current.relative_humidity_2m)}%`;

      const windLabel = units.wind === "kmh" ? "km/h" : "mph";
      const precipLabel = units.precip === "mm" ? "mm" : "in";

      detailValues[2].textContent = `${Math.round(data.current.wind_speed_10m)} ${windLabel}`;
      detailValues[3].textContent = `${Math.round(data.current.precipitation)} ${precipLabel}`;

      setImage(weatherImg, mapWeather(data.current.weather_code));

      // DAILY (7)
      dailyContainers.forEach((wrap, i) => {
        const dayTxt = wrap.querySelector(".day-txt") as HTMLElement;
        const img = wrap.querySelector(".weather-day-img") as HTMLImageElement;
        const high = wrap.querySelector(".temp-high-txt") as HTMLElement;
        const low = wrap.querySelector(".temp-low-txt") as HTMLElement;

        dayTxt.textContent = new Date(daily.time[i]).toLocaleDateString("en", { weekday: "short" });
        setImage(img, mapWeather(daily.weather_code[i]));
        high.textContent = `${Math.round(daily.temperature_2m_max[i])}°`;
        low.textContent = `${Math.round(daily.temperature_2m_min[i])}°`;
      });

      // DAY SELECTOR
      selectedDayIndex = 0;
      selectedDayTxt.textContent = new Date(daily.time[0]).toLocaleDateString("en", { weekday: "long" });
      buildDayMenu();

      refreshUnitsUI();
      renderHourly(0);
      setLoading(false);
    } catch {
      setLoading(false);
      showErrorOnly();
    }
  }

  // ===============================
  // HOURLY (8 HOURS)
  // ===============================
  function renderHourly(dayIndex: number) {
    if (!hourly || !daily) return;

    const dayISO = daily.time[dayIndex]; // YYYY-MM-DD
    let start = hourly.time.findIndex((t: string) => t.startsWith(dayISO));
    if (start === -1) return;

    if (dayIndex === 0) {
      const nowIdx = hourly.time.indexOf(currentTimeISO);
      if (nowIdx !== -1) start = nowIdx;
    }

    hourlyContainers.forEach((row, i) => {
      const idx = start + i;

      const timeTxt = row.querySelector(".time-txt") as HTMLElement;
      const img = row.querySelector(".weather-hour-img") as HTMLImageElement;
      const tempEl = row.querySelector(".temp-txt") as HTMLElement;

      timeTxt.textContent = new Date(hourly.time[idx]).toLocaleTimeString("en", { hour: "numeric" });
      setImage(img, mapWeather(hourly.weather_code[idx]));
      tempEl.textContent = `${Math.round(hourly.temperature_2m[idx])}°`;
    });
  }

  // ===============================
  // RETRY
  // ===============================
  retryBtn.addEventListener("click", () => {
    if (lastPlace) loadWeather(lastPlace);
  });

  // ===============================
  // INIT
  // ===============================
  refreshUnitsUI();

  // Start in loading state (your HTML already has .is-loading, but TS enforces placeholders)
  setLoading(true);

  fetch("https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json")
    .then((r) => r.json())
    .then((d) => {
      if (!d.results || d.results.length === 0) {
        showErrorOnly();
        return;
      }
      loadWeather(d.results[0]);
    })
    .catch(() => showErrorOnly());
});
