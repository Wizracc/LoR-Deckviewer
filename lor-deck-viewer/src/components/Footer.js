import React, { Component } from "react";
import "./../styles/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>
          Wizracc's Deck Viewer isn’t endorsed by Riot Games and doesn’t reflect
          the views or opinions of Riot Games or anyone officially involved in
          producing or managing Legends of Runeterra. Legends of Runeterra and
          Riot Games are trademarks or registered trademarks of Riot Games, Inc.
          Legends of Runeterra © Riot Games, Inc.
        </p>
      </div>
    );
  }
}
