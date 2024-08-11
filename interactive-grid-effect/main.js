import "./style.css";

document.querySelector("#app").innerHTML = `
<div id="container">
  <div class="tile"></div>
</div>
`;

const container = document.querySelector("#container"),
  tile = document.querySelector(".tile");

for (let i = 0; i < 1599; i++) {
  container.appendChild(tile.cloneNode());
}
