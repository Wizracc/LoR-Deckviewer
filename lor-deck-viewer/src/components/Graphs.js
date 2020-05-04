import React, { Component } from "react";
import { Chart } from "react-google-charts";
import "./../styles/Graphs.css";

export default class Graphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        ["Cost", "Count1", "Count2", { role: "annotation" }],
        ["0", 0, 0, ""],
        ["1", 0, 0, ""],
        ["2", 0, 0, ""],
        ["3", 0, 0, ""],
        ["4", 0, 0, ""],
        ["5", 0, 0, ""],
        ["6", 0, 0, ""],
        ["7+", 0, 0, ""],
      ],
      typeCount: [],
    };

    this.fetchDeck = this.fetchDeck.bind(this);
    this.normalize = this.normalize.bind(this);
    this.typeToIndex = this.typeToIndex.bind(this);
    this.fetchDeck();
  }

  normalize(str) {
    return str.toLowerCase().replace(/\s/g, "");
  }

  typeToIndex(str) {
    let type = 0;
    switch (str) {
      case "Follower":
        type = 0;
        break;
      case "Champion":
        type = 1;
        break;
      case "Spell":
        type = 2;
        break;
      default:
        type = 0;
    }
    return type;
  }

  fetchDeck() {
    const code = this.props.code;
    fetch(`https://decks.wizra.cc/json/${code}`)
      .then((res) => res.json())
      .then((data) => {
        let faction1 = "";
        let faction2 = "";
        let cards1 = [0, 0, 0, 0, 0, 0, 0, 0];
        let cards2 = [0, 0, 0, 0, 0, 0, 0, 0];
        let types = [0, 0, 0];

        for (const card of data.deck) {
          if (faction1 === "") {
            faction1 = card.region;
          } else if (faction1 !== card.region) {
            faction2 = card.region;
          }

          if (faction1 === card.region) {
            cards1[card.cost <= 7 ? card.cost : 7] += card.count;
          } else {
            cards2[card.cost <= 7 ? card.cost : 7] += card.count;
          }

          types[this.typeToIndex(card.megatype)] += card.count;
        }

        let graphData = [
          ["Cost", faction1, faction2, { role: "annotation" }],
          ["0", cards1[0], cards2[0], cards1[0] + cards2[0]],
          ["1", cards1[1], cards2[1], cards1[1] + cards2[1]],
          ["2", cards1[2], cards2[2], cards1[2] + cards2[2]],
          ["3", cards1[3], cards2[3], cards1[3] + cards2[3]],
          ["4", cards1[4], cards2[4], cards1[4] + cards2[4]],
          ["5", cards1[5], cards2[5], cards1[5] + cards2[5]],
          ["6", cards1[6], cards2[6], cards1[6] + cards2[6]],
          ["7+", cards1[7], cards2[7], cards1[7] + cards2[7]],
        ];

        let typeCountData = [
          ["Type", "Count"],
          ["Followers", types[0]],
          ["Champions", types[1]],
          ["Spells", types[2]],
        ];

        const colors = {
          freljord: "#d7fffe",
          shadowisles: "#aaf0d1",
          demacia: "#fdfdaf",
          ionia: "#ffe4e1",
          noxus: "#ff817b",
          "piltover&zaun": "#ffd599",
          bilgewater: "#e07d62",
          "": "transparent",
        };

        let seriesData = {
          0: { color: colors[this.normalize(faction1)] },
          1: { color: colors[this.normalize(faction2)] },
        };

        console.log(seriesData);

        this.setState({
          deck: data.deck.sort((a, b) => (a.cost > b.cost ? 1 : -1)),
          data: graphData,
          typeCount: typeCountData,
          seriesData: seriesData,
        });
      });
  }

  render() {
    return (
      <div className="Graphs">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="300px"
          data={this.state.data}
          options={{
            title: "Card Costs",
            titleTextStyle: { color: "white" },
            isStacked: true,
            legend: "none",
            backgroundColor: "transparent",
            vAxis: {
              gridlines: {
                color: "transparent",
              },
              textStyle: {
                color: "transparent",
              },
              baselineColor: "white",
            },
            hAxis: {
              baselineColor: "white",
              textStyle: {
                color: "white",
              },
            },
            annotations: {
              alwaysOutside: "true",
              textStyle: { color: "#ffffff", auraColor: "#000000" },
              stem: { color: "transparent" },
            },
            enableInteractivity: "false",
            series: this.state.seriesData,
          }}
        />
        <Chart
          width="100%"
          height="400px"
          chartType="PieChart"
          loader="Loading Charts..."
          data={this.state.typeCount}
          options={{
            title: "Card Types",
            titleTextStyle: { color: "white" },
            backgroundColor: "transparent",
            legend: {
              position: "top",
              maxLines: 3,
              textStyle: { color: "white", auraColor: "black" },
            },
            pieSliceText: "value",
            pieSliceTextStyle: {
              color: "white",
              auraColor: "black",
              fontSize: 14,
            },
            pieHole: 0.5,
            colors: ["#66A", "#BB3", "#A33"],
          }}
        />
      </div>
    );
  }
}
