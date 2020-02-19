import React, { Component } from "react";
import Minicard from "./Minicard";
import Header from "./Header";
import "./../styles/Decklist.css";
import Graphs from "./Graphs";
//import M from "materialize-css";

class Decklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.match.params.code,
      deck: [],
      hovered: false,
      valid: false,
      mouseX: 0,
      mouseY: 0,
      bounder: "top"
    };
    this.fetchDeck = this.fetchDeck.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount() {
    this.fetchDeck();
  }

  fetchDeck() {
    const code = this.state.code;
    fetch(`https://decks.wizra.cc/json/${code}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          ...this.state,
          code: code,
          deck: data.deck.sort((a, b) => (a.cost > b.cost ? 1 : -1)),
          valid: data.deck.length !== 0
        })
      );
  }

  handleHover(e, id) {
    let thing = e.currentTarget.getBoundingClientRect();
    let x = thing["right"];
    let y = e.clientY - 150;
    let bounder = this.state.bounder;
    if (y > window.innerHeight - 475) {
      y = y - 250;
    }

    this.setState({
      ...this.state,
      hovered: id,
      mouseX: x,
      mouseY: y,
      bounder: bounder
    });
  }

  handleLeave(evt) {
    this.setState({
      ...this.state,
      hovered: false
    });
  }

  normalize(str) {
    return str.toLowerCase().replace(/\s/g, "");
  }

  render() {
    return (
      <div>
        <div>
          {this.state.deck.map(cardInfo => (
            <img
              alt={`${cardInfo.name}`}
              key={`img${cardInfo.code}`}
              src={`https://dd.b.pvp.net/latest/set1/en_us/img/cards/${cardInfo.code}.png`}
              className={
                cardInfo.code === this.state.hovered ? "visible" : "hidden"
              }
              style={{
                position: "absolute",
                left: this.state.mouseX,
                [this.state.bounder]: this.state.mouseY,
                width: "300px"
              }}
            />
          ))}
        </div>
        <Header />
        <div className="Decklist">
          {!this.state.valid && <p className="error">Invalid deck code</p>}
          <div className="cards">
            {this.state.deck.map(cardInfo => (
              <Minicard
                onMouseEnter={e => this.handleHover(e, cardInfo.code)}
                onMouseLeave={this.handleLeave}
                count={cardInfo.count}
                name={cardInfo.name}
                cost={cardInfo.cost}
                region={this.normalize(cardInfo.region)}
                rarity={this.normalize(cardInfo.rarity)}
                key={cardInfo.code}
              />
            ))}
          </div>
          {this.state.valid && <Graphs code={this.state.code} />}
        </div>
      </div>
    );
  }
}

export default Decklist;
