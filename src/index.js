import "preact/debug";
import "./style";
import { Component, render } from "preact";
import { Result } from "./result";

const SEARCH = "//api.github.com/search/repositories";

export default class App extends Component {
  state = {
    searchValue: "",
    results: Array
  };
  search = document.querySelectorAll(".search")[0];

  constructor(props) {
    super(props);
    this.search.addEventListener("keyup", (e) => {
      this.state.searchValue = e.target.value;
    });
  }

  componentDidMount() {
    fetch(`${SEARCH}?q=${this.state.searchValue}`)
      .then((r) => r.json())
      .then((json) => {
        this.state.results = (json && json.items) || "Nothing here.";
      });
  }

  render(props, { results = [] }) {
    return (
      <div>
        <div class="sidebar">
          <h1>GitHub Preact Search</h1>
          <sup>(NOTE: Not an official GitHub product.)</sup>
          <br />
          <input class="search" placeholder="Search" />
        </div>
        <div class="list">
          {results.map((result) => (
            <Result result={result} />
          ))}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
