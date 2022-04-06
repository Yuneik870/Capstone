import html from "html-literal";

export default st => {
  console.log(st);
  return html`
    <h1>Shopping Cart!</h1>
    <pre><code>${JSON.stringify(st)}</code></pre>
    <h3 type="button" class="Remove">X</h3>
  `;
};
