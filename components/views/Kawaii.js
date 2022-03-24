import html from "html-literal";
// import snake from "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg";
export default st => html`
  <h1>You have reached the Kawaii Page!</h1>
  ${st.jewelry.map(
    jewelry => `<div class="Jewelry" data-id="${jewelry.id}">
  ${jewelry.title}
  <img src="${jewelry.image}"/>
  </div>`
  )}
`;
