import html from "html-literal";

export default links => html`
  <nav>
    <ul>
      ${links.map(
        el =>
          `<a href="/${el.title}" title="${el.title}" data-navigo>${el.text}</a>`
      )}
    </ul>
    <!-- <label for="search">Search</label> -->
    <!-- <input type="search" name="search" id="search" placeholder="search" />
    <i class="far fa-search"></i> -->
    <i
      type="button"
      href="/Cart"
      id="shoppingCart"
      class="fas fa-shopping-cart"
      data-navigo
    ></i>
    <i type="button" href="/Profile" class="fas fa-user-circle" data-navigo></i>
  </nav>
`;
