class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header role="banner">
        <section class="header-section" aria-label="Site header">
          <img 
            src="./assets/images/logo.svg" 
            class="logo-img" 
            alt="Weather Now - Weather Forecast Application"
            aria-hidden="false"
          />

          <div class="header-right" role="toolbar" aria-label="Header controls">
            <button 
              type="button" 
              class="theme-btn" 
              aria-label="Toggle theme between dark and light mode"
              aria-pressed="false"
            >
              <span class="theme-icon" aria-hidden="true">🌙</span>
              <span class="theme-txt">Dark</span>
            </button>

            <div class="dropdown-anchor">
              <button
                type="button"
                class="units-btn"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-label="Select measurement units"
                id="units-button"
              >
                <img 
                  src="./assets/images/icon-units.svg" 
                  class="settings-icon" 
                  alt=""
                  aria-hidden="true"
                />
                <p class="units-txt">Units</p>
                <img
                  src="./assets/images/icon-dropdown.svg"
                  class="drop-down-icon"
                  alt=""
                  aria-hidden="true"
                />
              </button>

              <div
                class="dropdown-menu is-hidden"
                id="units-menu"
                role="listbox"
                aria-labelledby="units-button"
                aria-label="Measurement units selection"
              >
                <button 
                  class="dropdown-action"
                  aria-label="Switch all units to Imperial system"
                >
                  Switch to Imperial
                </button>

                <p class="dropdown-label" id="temp-label">Temperature</p>
                <button
                  class="dropdown-item is-selected"
                  role="option"
                  aria-selected="true"
                  aria-labelledby="temp-label"
                >
                  Celsius (&deg;C)
                  <img
                    class="checkmark"
                    src="./assets/images/icon-checkmark.svg"
                    alt="Selected"
                    aria-hidden="true"
                  />
                </button>
                <button 
                  class="dropdown-item" 
                  role="option" 
                  aria-selected="false"
                  aria-labelledby="temp-label"
                >
                  Fahrenheit (&deg;F)
                </button>

                <div class="dropdown-sep" role="separator" aria-hidden="true"></div>

                <p class="dropdown-label" id="wind-label">Wind Speed</p>
                <button
                  class="dropdown-item is-selected"
                  role="option"
                  aria-selected="true"
                  aria-labelledby="wind-label"
                >
                  km/h
                  <img
                    class="checkmark"
                    src="./assets/images/icon-checkmark.svg"
                    alt="Selected"
                    aria-hidden="true"
                  />
                </button>
                <button 
                  class="dropdown-item" 
                  role="option" 
                  aria-selected="false"
                  aria-labelledby="wind-label"
                >
                  mph
                </button>

                <div class="dropdown-sep" role="separator" aria-hidden="true"></div>

                <p class="dropdown-label" id="precip-label">Precipitation</p>
                <button
                  class="dropdown-item is-selected"
                  role="option"
                  aria-selected="true"
                  aria-labelledby="precip-label"
                >
                  Millimeters (mm)
                  <img
                    class="checkmark"
                    src="./assets/images/icon-checkmark.svg"
                    alt="Selected"
                    aria-hidden="true"
                  />
                </button>
                <button 
                  class="dropdown-item" 
                  role="option" 
                  aria-selected="false"
                  aria-labelledby="precip-label"
                >
                  Inches (in)
                </button>
              </div>
            </div>
          </div>
        </section>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
