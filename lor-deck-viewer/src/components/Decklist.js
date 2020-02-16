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
      valid: false,
      images: {}
    };
    this.fetchDeck = this.fetchDeck.bind(this);
    this.preloadImages = this.fetchImages.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.fetchDeck();
  }

  fetchDeck() {
    const code = this.state.code;
    fetch(`http://decks.wizra.cc/json/${code}`)
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

  fetchImages() {
    const deck = this.state.deck;
    let object = {};
    for (let card of deck) {
      let code = card.code;
      let image = new Image();
      image.src = `http://decks.wizra.cc/image/${code}`;
      object = { ...object, [code]: image };
    }
    this.setState({ ...this.state, images: object });
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
          {!this.state.valid && <p className="error">Invalid deck code</p>}
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
            {this.state.deck.map(cardInfo => (
              <img
                src={`http://decks.wizra.cc/image/${cardInfo.code}`}
                className={
                  cardInfo.code === this.state.hovered ? "visible" : "hidden"
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Decklist;
