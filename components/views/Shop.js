import html from "html-literal";

export default st => html`
  <section id="Products">
    <h1>You have reached the Shopping Page!</h1>
    ${st.products.map(
      product => `<div class="Shop" data-id="${product.id}">
    ${product.title}
    <img src="${product.image}"/>
    </div>`
    )}
  </section>
`;
