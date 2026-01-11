namespace WeatherApp {
  let searchLoadingEl: HTMLElement | null = null;
  let searchNoResultEl: HTMLElement | null = null;

  async function performSearch(q: string) {
    const query = (q || "").trim();
    if (query.length < 2) {
      hide(suggestionsBox);
      hide(searchLoadingEl!);
      hide(searchNoResultEl!);
      return;
    }

    // Show loading indicator
    hide(suggestionsBox);
    hide(searchNoResultEl!);
    show(searchLoadingEl!);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=3&language=en&format=json`;

      const res = await fetch(geoUrl);
      const data = await res.json();

      // Hide loading
      hide(searchLoadingEl!);

      suggestionsBox.innerHTML = "";
      if (!data.results || data.results.length === 0) {
        // Show no result found
        hide(suggestionsBox);
        show(searchNoResultEl!);
        return;
      }

      // Hide no result, show suggestions
      hide(searchNoResultEl!);

      data.results.forEach((p: any) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dropdown-item";
        b.textContent = `${p.name}, ${p.country}`;
        b.addEventListener("click", () => {
          searchInput.value = p.name;
          hide(suggestionsBox);
          hide(searchLoadingEl!);
          hide(searchNoResultEl!);
          loadWeather(p);
        });
        suggestionsBox.appendChild(b);
      });

      show(suggestionsBox);
    } catch {
      hide(searchLoadingEl!);
      hide(suggestionsBox);
      show(searchNoResultEl!);
    }
  }

  export function initSearch() {
    searchLoadingEl = document.querySelector(".search-loading") as HTMLElement;
    searchNoResultEl = document.querySelector(".search-no-result") as HTMLElement;

    // Remove auto-suggestions on input - only allow manual search via button
    searchInput.addEventListener("input", () => {
      // Clear any existing suggestions/no-result when user types
      hide(suggestionsBox);
      hide(searchLoadingEl!);
      hide(searchNoResultEl!);
    });

    // Only search when button is clicked
    searchBtn.addEventListener("click", () => {
      performSearch(searchInput.value);
    });

    // Also allow Enter key to trigger search
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch(searchInput.value);
      }
    });
  }
}
