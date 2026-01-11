namespace WeatherApp {
  export function initApp() {
    // dropdowns
    bindDropdown(unitsBtn, unitsMenu);
    bindDropdown(dayBtn, dayMenu);

    document.addEventListener("click", closeAllDropdowns);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllDropdowns();
    });

    // theme
    initTheme();

    // menus
    initUnitsMenu();
    initSearch();

    // initial UI
    refreshUnitsUI();
    setLoading(true);

    // retry
    retryBtn.addEventListener("click", () => {
      if (lastPlace) loadWeather(lastPlace);
    });

    // default location: Berlin
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
  }
}

window.addEventListener("DOMContentLoaded", () => {
  WeatherApp.initApp();
});
