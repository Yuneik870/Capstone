import html from "html-literal";

export default st => html`
  <h1><b>Anime</b></h1>
  ${st.electronics.map(
    (electronic, index) => `<div class="Shop" data-id="${electronic.id}">
    <h2 class="productTitle">${electronic.title}</h2>
    <h2 class="productPrice">$${electronic.price}</h2>
    <img src="${electronic.image}"/>
    <h4 class="productDesc">${electronic.description}</h4>
    <h3 type="button" class="Add" data-product="${index}">Add To Cart</h3>
    </div>`
  )}
`;
