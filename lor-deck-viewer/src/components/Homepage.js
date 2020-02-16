import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../styles/Homepage.css";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      code: evt.target.value
    });
  }

  render() {
    return (
      <div className="Homepage">
        <form className="form">
          <label className="label" htmlFor="code">Deck Code:</label>
          <input
            className="input"
            name="code"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <Link to={`/${this.state.code}`}>
            <button className="button">Boop!</button>
          </Link>
        </form>
      </div>
    );
  }
}
