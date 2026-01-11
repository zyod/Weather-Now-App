namespace WeatherApp {
  export function mapWeather(code: number): string {
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

  const IMG_BY_STATE: Record<string, string> = {
    Drizzle: "./assets/images/icon-drizzle.webp",
    Fog: "./assets/images/icon-fog.webp",
    "Partly-cloudy": "./assets/images/icon-partly-cloudy.webp",
    Overcast: "./assets/images/icon-overcast.webp",
    Rain: "./assets/images/icon-rain.webp",
    Snow: "./assets/images/icon-snow.webp",
    Storm: "./assets/images/icon-storm.webp",
    Sunny: "./assets/images/icon-sunny.webp"
  };

  export function setImage(img: HTMLImageElement, state: string) {
    img.src = IMG_BY_STATE[state] || IMG_BY_STATE.Overcast;
  }
}
