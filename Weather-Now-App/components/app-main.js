class AppMain extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <main class="app-main" role="main">
        <section class="main-section" aria-label="Weather application main content">

          <section 
            class="error-section is-hidden" 
            role="alert"
            aria-live="assertive"
            aria-label="Error message"
          >
            <img 
              class="error-img" 
              src="./assets/images/icon-error.svg" 
              alt="Error icon"
              aria-hidden="true"
            />
            <h1 class="som-wnt-wrng-txt">Something Went Wrong</h1>
            <p class="error-details-txt">
              We couldn't connect to server (API error). Please try<br />again in
              a few moments
            </p>
            <button 
              class="retry-btn"
              aria-label="Retry loading weather data"
            >
              <img 
                class="retry-img" 
                src="./assets/images/icon-retry.svg" 
                alt=""
                aria-hidden="true"
              />
              Retry
            </button>
          </section>

          <h1 class="how-txt">How's the sky looking today?</h1>

          <section class="search-section" aria-label="Location search">
            <input
              type="text"
              id="search-input"
              class="search-txt"
              placeholder="Search for a place..."
              aria-label="Search for a location"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded="false"
            />

            <div
              class="search-suggestions is-hidden"
              id="search-suggestions"
              role="listbox"
              aria-label="Search suggestions"
              aria-live="polite"
            ></div>

            <img 
              class="search-img" 
              src="./assets/images/icon-search.svg" 
              alt=""
              aria-hidden="true"
            />
            <button 
              class="search-btn"
              aria-label="Search for weather in the entered location"
            >
              Search
            </button>
          </section>

          <section 
            class="search-loading is-hidden" 
            role="status"
            aria-live="polite"
            aria-label="Search in progress"
          >
            <img 
              class="search-loading-img" 
              src="./assets/images/icon-loading.svg" 
              alt=""
              aria-hidden="true"
            />
            <p class="search-loading-txt">Search in progress</p>
          </section>

          <section 
            class="search-no-result is-hidden" 
            role="alert"
            aria-live="assertive"
            aria-label="No search result found"
          >
            <img 
              class="search-no-result-img" 
              src="./assets/images/icon-error.svg" 
              alt="No result icon"
              aria-hidden="true"
            />
            <h1 class="search-no-result-txt">No search result found!</h1>
          </section>

          <section 
            class="desktop-container is-loading"
            aria-label="Weather forecast data"
          >
            <section class="desktop-left-wrapper">

              <section 
                class="weather-section"
                aria-label="Current weather conditions"
              >
                <div 
                  class="weather-loading" 
                  aria-live="polite"
                  aria-label="Loading weather data"
                  role="status"
                >
                  <div class="loading-dots" aria-hidden="true">
                    <span></span><span></span><span></span>
                  </div>
                  <p class="loading-txt">Loading...</p>
                </div>

                <div class="weather-content" aria-label="Current weather information">
                  <div class="location-date-container">
                    <p class="location-txt" aria-label="Location">Berlin, Germany</p>
                    <time class="date-txt" datetime="2025-08-05" aria-label="Current date">
                      Tuseday, Aug 5, 2025
                    </time>
                  </div>

                  <div class="temp-container">
                    <img
                      class="weather-img"
                      src="./assets/images/icon-sunny.webp"
                      alt="Sunny weather condition"
                      aria-hidden="false"
                    />
                    <p class="tempreture-txt" aria-label="Current temperature">
                      <span aria-hidden="true">20</span><span aria-label="degrees">°</span>
                    </p>
                  </div>
                </div>
              </section>

              <section 
                class="weather-details-section"
                aria-label="Additional weather details"
              >
                <div class="weather-details-container" role="group" aria-label="Feels like temperature">
                  <p class="weather-det-txt">Feels Like</p>
                  <p class="weather-det-txt-2" aria-label="Feels like temperature value">-</p>
                </div>

                <div class="weather-details-container" role="group" aria-label="Humidity">
                  <p class="weather-det-txt">Humidity</p>
                  <p class="weather-det-txt-2" aria-label="Humidity percentage">-</p>
                </div>

                <div class="weather-details-container" role="group" aria-label="Wind speed">
                  <p class="weather-det-txt">Wind</p>
                  <p class="weather-det-txt-2" aria-label="Wind speed">-</p>
                </div>

                <div class="weather-details-container" role="group" aria-label="Precipitation">
                  <p class="weather-det-txt">Precipitation</p>
                  <p class="weather-det-txt-2" aria-label="Precipitation amount">-</p>
                </div>
              </section>

              <section class="daily-forecast-section" aria-label="7-day weather forecast">
                <h2 class="daily-forecast-txt">Daily forecast</h2>

                <div class="daily-forecast-container" role="list" aria-label="Daily weather forecast">
                  ${Array.from({ length: 7 }).map(() => `
                    <div class="weather-by-day-container" role="listitem">
                      <p class="day-txt">-</p>
                      <img class="weather-day-img" src="./assets/images/icon-overcast.webp" alt="" />
                      <div class="temp-high-low-container">
                        <p class="temp-high-txt">-</p>
                        <p class="temp-low-txt">-</p>
                      </div>
                    </div>
                  `).join("")}
</section>
            </section>

            <section class="desktop-right-wrapper">
              <section class="hourly-forecast-section" aria-label="Hourly weather forecast">
                <div class="hourly-forecast-container">
                  <h2 class="hourly-forecast-txt">Hourly forecast</h2>

                  <div class="dropdown-anchor">
                    <button
                      type="button"
                      class="day-btn"
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      aria-label="Select day for hourly forecast"
                      id="day-select-button"
                    >
                      <p class="select-day-txt">-</p>
                      <img
                        src="./assets/images/icon-dropdown.svg"
                        class="drop-day-icon"
                        alt=""
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      class="dropdown-menu is-hidden"
                      id="day-menu"
                      role="listbox"
                      aria-labelledby="day-select-button"
                      aria-label="Select day for hourly forecast"
                    ></div>

                </div>
                </div>

                ${Array.from({ length: 24 }).map(() => `
                  <div class="weather-by-hour-container" role="listitem">
                    <div class="weather-by-hour-wrapper">
                      <img class="weather-hour-img" src="./assets/images/icon-overcast.webp" alt="" />
                      <time class="time-txt">-</time>
                    </div>
                    <p class="temp-txt">-</p>
                  </div>
                `).join("")}
</section>
            </section>
          </section>
        </section>
      </main>
    `;
  }
}

customElements.define("app-main", AppMain);
