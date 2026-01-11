namespace WeatherApp {
  export function refreshUnitsUI() {
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

  export function initUnitsMenu() {
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
  }
}
