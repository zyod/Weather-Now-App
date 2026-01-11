namespace WeatherApp {
  function getTheme(): "dark" | "light" {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
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

  export function initTheme() {
    themeBtn.addEventListener("click", () => {
      const current = getTheme();
      const newTheme = current === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });

    setTheme(getTheme());
  }
}
