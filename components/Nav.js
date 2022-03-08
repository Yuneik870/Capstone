import html from "html-literal";

export default links => html`
  <nav>
    <ul>
      <li>
        ${links.map(
          el =>
            `<li><a href="/${el.title}" title="${el.title}" data-navigo>${el.text}</a></li>`
        )}
      </li>
    </ul>
    <label for="search">Search</label>
    <input type="search" name="search" id="search" placeholder="search" />
    <i class="far fa-search"></i>
    <i href="Cart.html" class="fas fa-shopping-cart"></i>
    <i class="fas fa-user-circle"></i>
  </nav>
`;
