import { Nav, Header, Footer, Main } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(st) {
  console.log("Render State", st);
  document.querySelector("#root").innerHTML = `
  ${Nav(state.Links)}
  ${Main(st)}
  ${Header(st)}
  ${Footer()}
  `;
  router.updatePageLinks();
  addEventListeners(st);
}

function addEventListeners(st) {
  document.querySelectorAll("nav a").forEach(navLink =>
    navLink.addEventListener("click", event => {
      event.preventDefault();
      render(st[event.target.title]);
    })
  );
  document.getElementsByClassName(`fas fa-shopping-cart`).onclick = function() {
    open("Cart.html");
  };

  document.getElementById(`search`).onclick = function() {
    alert(`This is a placeholder`);
  };
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    if (view === "Home") {
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
        })
        .catch(err => console.log(err));
    } else if (view === "Shop") {
      axios
        .get(`${process.env.PLACEHOLDER_PRODUCTS_API_URL}`)
        .then(response => {
          console.log(response.data[0].title);
          state.Shop.products = response.data;
          done();
        })
        .catch(error => {
          console.log("An error has ocurred", error);
        });
    } else if (view === "Kawaii") {
      axios
        .get(`${process.env.PLACEHOLDER_JEWELRY}`)
        .then(response => {
          console.log(response.data);
          state.Kawaii.jewelry = response.data;
          done();
        })
        .catch(error => {
          console.log("An error has ocurred", error);
        });
    } else {
      done();
    }
  }
});

router
  .on({
    // eslint-disable-next-line no-undef
    "/": () => render(st),
    ":view": params => {
      console.log("Inside Router", params);
      let view = capitalize(params.data.view);
      render(state[view]);
    }
  })
  .resolve();
