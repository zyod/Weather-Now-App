namespace WeatherApp {
  export const hide = (el: HTMLElement) => el.classList.add("is-hidden");
  export const show = (el: HTMLElement) => el.classList.remove("is-hidden");

  export function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach((m) => hide(m as HTMLElement));
    hide(suggestionsBox);
  }

  export function bindDropdown(btn: HTMLButtonElement, menu: HTMLElement) {
    btn.addEventListener("click", (e) => {
      if (btn.disabled) return;
      e.stopPropagation();

      const open = !menu.classList.contains("is-hidden");
      closeAllDropdowns();
      if (!open) show(menu);
    });

    menu.addEventListener("click", (e) => e.stopPropagation());
  }

  export function setUnitsClickable(canClick: boolean) {
    unitsBtn.disabled = !canClick;
    if (!canClick) hide(unitsMenu);
  }

  export function setLoading(on: boolean) {
    if (on) {
      desktopContainer.classList.add("is-loading");

      detailValues.forEach((el) => ((el as HTMLElement).textContent = "-"));
      selectedDayTxt.textContent = "-";

      locationTxt.textContent = "-";
      dateTxt.textContent = "-";
      tempTxt.textContent = "-";
    } else {
      desktopContainer.classList.remove("is-loading");
    }
  }

  export function showErrorOnly() {
    show(errorSection);
    hide(howTxt);
    hide(searchSection);
    hide(desktopContainer);

    setUnitsClickable(false);
    closeAllDropdowns();
  }

  export function showMainOnly() {
    hide(errorSection);
    show(howTxt);
    show(searchSection);
    show(desktopContainer);

    // Hide search-related messages
    const searchLoading = document.querySelector(".search-loading") as HTMLElement;
    const searchNoResult = document.querySelector(".search-no-result") as HTMLElement;
    if (searchLoading) hide(searchLoading);
    if (searchNoResult) hide(searchNoResult);

    setUnitsClickable(true);
  }
}
