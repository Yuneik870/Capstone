import html from "html-literal";
// import snake from "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg";
export default st => html`
  <section id="Jewelry">
    <h1>Kawaii</h1>
    ${st.jewelry.map(
      (jewelry, index) => `<div class="Shop" data-id="${jewelry.id}">
    <h2 class="productTitle">${jewelry.title}</h2>
    <h2 class="productPrice">$${jewelry.price}</h2>
    <img src="${jewelry.image}"/>
    <h4 class="productDesc">${jewelry.description}</h4>
    <h3 type="button" class="Add" data-product="${index}">Add To Cart</h3>
    </div>`
    )}
  </section>
`;
