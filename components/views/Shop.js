import html from "html-literal";

export default st => html`
  <h1>You have reached the Shopping Page!</h1>
  ${st.products.map(product => `<div>${product.title}</div>`)}
`;
