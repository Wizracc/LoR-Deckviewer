import React, { Component } from "react";
import "./../styles/Header.css";
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Link className="Header" to="/">
        <h1> Wizracc's Deck Viewer </h1>
      </Link>
    );
  }
}

export default Header;
