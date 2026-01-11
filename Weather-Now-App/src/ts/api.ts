namespace WeatherApp {
  export async function loadWeather(place: any) {
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
        new Promise((resolve) => setTimeout(resolve, 1000))
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

      (detailValues[0] as HTMLElement).textContent = `${Math.round(data.current.apparent_temperature)}°`;
      (detailValues[1] as HTMLElement).textContent = `${Math.round(data.current.relative_humidity_2m)}%`;

      const windLabel = units.wind === "kmh" ? "km/h" : "mph";
      const precipLabel = units.precip === "mm" ? "mm" : "in";

      (detailValues[2] as HTMLElement).textContent = `${Math.round(data.current.wind_speed_10m)} ${windLabel}`;
      (detailValues[3] as HTMLElement).textContent = `${Math.round(data.current.precipitation)} ${precipLabel}`;

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
}
