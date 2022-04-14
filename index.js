import { Nav, Header, Footer, Main } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(st = state.Home) {
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
  //st in here is view state not application st
  console.log("ADD EVENT LISTENERS STATE", st);

  if (st.view === "Shop") {
    console.log(st.view);
    for (let element of document.getElementsByClassName("Add")) {
      element.onclick = event => {
        console.log(st.products[event.target.dataset.product]);
        state.Cart.items.push(st.products[event.target.dataset.product]);
        router.navigate("/Cart");
      };
    }
  }
  if (st.view === "Kawaii") {
    console.log(st.view);
    for (let element of document.getElementsByClassName("Add")) {
      element.onclick = event => {
        console.log(st.jewelry[event.target.dataset.product]);
        state.Cart.items.push(st.jewelry[event.target.dataset.product]);
        router.navigate("/Cart");
      };
    }
  }
  if (st.view === "Anime") {
    console.log(st.view);
    for (let element of document.getElementsByClassName("Add")) {
      element.onclick = event => {
        console.log(st.electronics[event.target.dataset.product]);
        state.Cart.items.push(st.electronics[event.target.dataset.product]);
        router.navigate("/Cart");
      };
    }
  }
  console.log(st.view);
  if (st.view === "Cart") {
    document.getElementsByClassName("CheckOut").onclick = function() {
      console.log("You have made a purchase");
      alert(`Your purchase has been made!`);
    };
    for (let element of document.getElementsByClassName("Remove")) {
      element.onclick = event => {
        console.log(event.target.dataset.product);
        console.log(state.Cart.items);
        // debugger;
        state.Cart.items.splice(event.target.dataset.product, 1);
        console.log(state.Cart.items);
        render(state.Cart);
      };
    }
  }
  document.getElementsByClassName("fas fa-user-circle").onclick = function() {
    render(state.Profile);
  };
  // if (st.view === "Profile") {
  //   document.getElementById("Orders").onclick = function() {
  //     render(state.Orders);
  //   };
  //   alert(`This is a placeholder`);
  // document.getElementById("search").onclick = function() {
  //   alert(`This is a placeholder`);
  // };
}

router.hooks({
  before: (done, params) => {
    console.log("made it to hooks");
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    if (view === "Home") {
      console.log("HIT HOME");
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
        )
        .then(response => {
          console.log("THEN RESPONSE", response);
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
          console.log(response.data);
          state.Shop.products = response.data;
          state.Shop.price = response.price;
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
    } else if (view === "Anime") {
      axios
        .get(`${process.env.PLACEHOLDER_ELECTRONICS}`)
        .then(response => {
          console.log(response.data);
          state.Anime.electronics = response.data;
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
    "/": () => {
      console.log("made it to router on default");
      render(state.Home);
    },
    ":view": params => {
      console.log("Inside Router", params);
      let view = capitalize(params.data.view);
      render(state[view]);
    }
  })
  .resolve();
