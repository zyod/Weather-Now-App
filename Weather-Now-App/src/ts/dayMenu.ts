namespace WeatherApp {
  export function buildDayMenu() {
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
}
