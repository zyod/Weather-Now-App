namespace WeatherApp {
  export let units: Units = { temp: "celsius", wind: "kmh", precip: "mm" };

  export let lastPlace: any = null;
  export let hourly: any = null;
  export let daily: any = null;
  export let currentTimeISO = "";
  export let selectedDayIndex = 0;
}
