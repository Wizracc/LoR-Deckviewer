import React, { Component } from "react";
import "./../styles/Minicard.css";

class Minicard extends Component {
  render() {
    return (
      <div className={`${this.props.rarity} Minicard`}>
        <div
          className={`${this.props.region} grid`}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          <p className="cost">{this.props.cost}</p>
          <p className="name">{this.props.name}</p>
          <p className="count">{this.props.count}</p>
        </div>
      </div>
    );
  }
}

export default Minicard;
