namespace WeatherApp {
  export function renderHourly(dayIndex: number) {
    if (!hourly || !daily) return;

    const dayISO = daily.time[dayIndex]; // YYYY-MM-DD
    let start = hourly.time.findIndex((t: string) => t.startsWith(dayISO));
    if (start === -1) return;

    // For today: start from "now" (next 24 hours view)
    if (dayIndex === 0) {
      const nowIdx = hourly.time.indexOf(currentTimeISO);
      if (nowIdx !== -1) start = nowIdx;
    }

    hourlyContainers.forEach((row, i) => {
      const idx = start + i;

      const timeTxt = row.querySelector(".time-txt") as HTMLElement;
      const img = row.querySelector(".weather-hour-img") as HTMLImageElement;
      const tempEl = row.querySelector(".temp-txt") as HTMLElement;

      // If out of range, show placeholders (prevents stuck/crash)
      if (idx < 0 || idx >= hourly.time.length) {
        timeTxt.textContent = "-";
        tempEl.textContent = "-";
        return;
      }

      timeTxt.textContent = new Date(hourly.time[idx]).toLocaleTimeString("en", { hour: "numeric" });
      setImage(img, mapWeather(hourly.weather_code[idx]));
      tempEl.textContent = `${Math.round(hourly.temperature_2m[idx])}°`;
    });
  }
}
