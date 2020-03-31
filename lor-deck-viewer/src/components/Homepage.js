import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../styles/Homepage.css";
import M from "materialize-css";
import Header from "./Header";
import Footer from "./Footer";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "CEBACAIBAYEQCBJEE4UCWMJSGU3DQAQCAEAQIIQDAECRMGZCAA" };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    M.Sidenav.init(this.sidenav);
  }

  handleChange(evt) {
    this.setState({
      code: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="Homepage">
          <form className="form">
            <label className="label" htmlFor="code">
              <h2>Legends of Runeterra Deck Code:</h2>
            </label>
            <input
              className="input-field"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              placeholder={"Export your Legends of Runeterra deck and paste the code here"}
            />
            <Link to={`/${this.state.code}`}>
              <button className="waves-effect waves-light btn">
                Go<i class="material-icons right">chrome_reader_mode</i>
              </button>
            </Link>
          </form>
        </div>
        <Footer/>
      </div>
    );
  }
}
