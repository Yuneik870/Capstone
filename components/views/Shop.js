import html from "html-literal";

export default st => html`
  <section id="Products">
    <h1>Shop</h1>
    ${st.products.map(
      (product, index) => `<div class="Shop" data-id="${product.id}">
    ${product.title} $${product.price}
    <img src="${product.image}"/>
    <h3 type="button" class="Add" data-product="${index}">Add To Cart</h3>
    </div>`
    )}
  </section>
`;
