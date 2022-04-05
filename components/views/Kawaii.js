import html from "html-literal";
// import snake from "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg";
export default st => html`
  <h1>Kawaii</h1>
  ${st.jewelry.map(
    jewelry => `<div class="Jewelry" data-id="${jewelry.id}">
  ${jewelry.title}
  <img src="${jewelry.image}"/>
  <h3 type="button" class="Add">Add To Cart</h3>
  </div>`
  )}
`;
