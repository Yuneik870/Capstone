import { Nav, Logo, Header, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

function render(st) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Logo()}
  ${Footer()}
  `;
  router.updatePageLinks();
  addEventListeners(state);
}

function addEventListeners(st) {
  document.querySelectorAll("nav a").forEach(navLink =>
    navLink.addEventListener("click", event => {
      event.preventDefault();
      render(st[event.target.title]);
    })
  );
}

router.hooks({
  before: (done, params) => {
    const page =
      params && params.data && params.data.page
        ? capitalize(params.data.page)
        : "Home";

    if (page === "Home") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
        )
        .then(response => {
          state.Home.weather = {};
          state.Home.weather.city = response.data.name;
          state.Home.weather.temp = response.data.main.temp;
          state.Home.weather.feelsLike = response.data.main.feels_like;
          state.Home.weather.description = response.data.weather[0].main;
          done();
        });
    }
});

router
  .on({
    "/": () => render(state.Home),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(state[view]);
    }
  })
  .resolve();
