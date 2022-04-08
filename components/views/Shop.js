import html from "html-literal";

export default st => html`
  <section id="Products">
    <h1>Shop</h1>
    ${st.products.map(
      (product, index) => `<div class="Shop" data-id="${product.id}">
    <h2 class="productTitle">${product.title}</h2>
    <h2 class="productPrice">$${product.price}</h2>
    <img src="${product.image}"/>
    <h4 class="productDesc">${product.description}</h4>
    <h3 type="button" class="Add" data-product="${index}">Add To Cart</h3>
    </div>`
    )}
  </section>
`;
