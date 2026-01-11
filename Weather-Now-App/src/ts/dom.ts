namespace WeatherApp {
  export const errorSection = document.querySelector(".error-section") as HTMLElement;
  export const retryBtn = document.querySelector(".retry-btn") as HTMLButtonElement;

  export const howTxt = document.querySelector(".how-txt") as HTMLElement;
  export const searchSection = document.querySelector(".search-section") as HTMLElement;
  export const desktopContainer = document.querySelector(".desktop-container") as HTMLElement;

  export const locationTxt = document.querySelector(".location-txt") as HTMLElement;
  export const dateTxt = document.querySelector(".date-txt") as HTMLElement;
  export const tempTxt = document.querySelector(".tempreture-txt") as HTMLElement;

  export const weatherImg = document.querySelector(".weather-img") as HTMLImageElement;
  export const detailValues = document.querySelectorAll(".weather-det-txt-2");

  export const dailyContainers = document.querySelectorAll(".weather-by-day-container");
  export const hourlyContainers = document.querySelectorAll(".weather-by-hour-container");

  export const searchInput = document.querySelector(".search-txt") as HTMLInputElement;
  export const searchBtn = document.querySelector(".search-btn") as HTMLButtonElement;
  export const suggestionsBox = document.querySelector(".search-suggestions") as HTMLElement;

  export const unitsBtn = document.querySelector(".units-btn") as HTMLButtonElement;
  export const unitsMenu = document.querySelector("#units-menu") as HTMLElement;
  export const switchImperialBtn = document.querySelector(".dropdown-action") as HTMLButtonElement;

  export const dayBtn = document.querySelector(".day-btn") as HTMLButtonElement;
  export const dayMenu = document.querySelector("#day-menu") as HTMLElement;
  export const selectedDayTxt = document.querySelector(".select-day-txt") as HTMLElement;

  export const themeBtn = document.querySelector(".theme-btn") as HTMLButtonElement;
  export const themeIcon = document.querySelector(".theme-icon") as HTMLElement;
  export const themeTxt = document.querySelector(".theme-txt") as HTMLElement;
}
