import html from "html-literal";

export default st => {
  // console.log("STATE IN CART VIEW", st);
  // let removeFromCart = index => {
  //   st.items.splice(index, 1);
  // };
  let total = 0;

  if (st.items.length < 1) {
    return html`
      <h1>Shopping Cart!</h1>
      <p>Your cart is currently empty!</p>
    `;
  }

  //onclick auto executes removeFromCart removed onclick until fixed

  return html`
    <h1>Shopping Cart!</h1>
    ${st.items.map((product, index) => {
      total += product.price;
      return `
        <div class="cartProduct">
          <h1 class="itemTitle">${product.title}</h1>
          <img class="itemImage" src=${product.image}></img>
          <p class="itemPrice">$${product.price}</p>
          <p class="itemRating">${product.rating}</p>
          <button data-product="${index}" class="Remove">X</button>
        </div>
        <button>CheckOut</button>`;
    })}
    <p>Total: $${total}</p>
  `;
};
