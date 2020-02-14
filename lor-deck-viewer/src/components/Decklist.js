import React, { Component } from "react";
import "./../styles/Decklist.css";

class Decklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.match.params.code,
      deck: [],
      hovered: null
    };
    this.fetchDeck = this.fetchDeck.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.fetchDeck();
  }

  fetchDeck() {
    const code = this.state.code;
    fetch(`http://localhost:4000/deck/${code}`)
      .then(res => res.json())
      .then(data =>
        this.setState({ ...this.state, code: code, deck: data.deck })
      );
  }

  handleHover(id) {
    this.setState({
      ...this.state,
      hovered: id
    });
  }

  handleLeave(evt) {
    this.setState({
      ...this.state,
      hovered: null
    });
  }

  normalize(str) {
    return str.toLowerCase().replace(/\s/g, "");
  }

  render() {
    return (
      <div className="Decklist">
        <ul>
          {this.state.deck.map(cardInfo => (
            <li
              onMouseEnter={() => this.handleHover(cardInfo.code)}
              onMouseLeave={this.handleLeave}
            >
              {cardInfo.count}, {cardInfo.name}
            </li>
          ))}
        </ul>
        {this.state.hovered !== null && (
          <img src={`http://localhost:4000/image/${this.state.hovered}`} />
        )}
      </div>
    );
  }
}

export default Decklist;
