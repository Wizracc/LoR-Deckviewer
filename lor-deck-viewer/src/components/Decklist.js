import React, { Component } from "react";
import Minicard from "./Minicard";
import Header from "./Header";
import "./../styles/Decklist.css";

class Decklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.match.params.code,
      deck: [],
      hovered: null,
      valid: false
    };
    this.fetchDeck = this.fetchDeck.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.fetchDeck();
  }

  fetchDeck() {
    const code = this.state.code;
    const port = process.env.PORT || 3000;
    fetch(`http://localhost:${port}/json/${code}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          ...this.state,
          code: code,
          deck: data.deck.sort((a, b) => (a.cost > b.cost ? 1 : -1)),
          hovered: data.deck[0].code,
          valid: data.deck.length !== 0
        })
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
      <div>
        <Header />
        <div className="Decklist">
          {!this.state.valid && (
            <p className="error">Invalid deck code</p>
          )}
          <div>
            {this.state.deck.map(cardInfo => (
              <Minicard
                onMouseEnter={() => this.handleHover(cardInfo.code)}
                count={cardInfo.count}
                name={cardInfo.name}
                cost={cardInfo.cost}
                region={this.normalize(cardInfo.region)}
                rarity={this.normalize(cardInfo.rarity)}
                key={cardInfo.code}
              />
            ))}
          </div>
          <div>
            {this.state.hovered !== null && (
              <img
                src={`http://localhost:${port}/image/${this.state.hovered}`}
                alt={this.state.hovered}
                fluid="true"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Decklist;
