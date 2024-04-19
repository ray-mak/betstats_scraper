import React from "react";

export default function HeadStats(props) {
    return (
        <div className="h2h-container">
          <div className="img-container">
            <img src={props.fighter1Stats.img} alt="Picture of Alex Perez"/>
          </div>
          <table className="span-2">
            <tbody>
              <tr>
                <td className="fighter-name">{props.fighter1Stats.name}</td>
                <td>vs</td>
                <td className="fighter-name">{props.fighter2Stats.name}</td>
              </tr>
              <tr>
                <td>{props.fighter1Stats.stats["Age:"]}</td>
                <td>Age</td>
                <td>{props.fighter2Stats.stats["Age:"]}</td>
              </tr>
              <tr>
                <td>{props.fighter1Stats.stats["Height:"]}</td>
                <td>Height</td>
                <td>{props.fighter2Stats.stats["Height:"]}</td>
              </tr>
              <tr>
                <td>{props.fighter1Stats.stats["Weight:"]}</td>
                <td>Weight</td>
                <td>{props.fighter2Stats.stats["Weight:"]}</td>
              </tr>
              <tr>
                <td>{props.fighter1Stats.stats["Reach:"]}</td>
                <td>Reach</td>
                <td>{props.fighter2Stats.stats["Reach:"]}</td>
              </tr>
            </tbody>
          </table>
          <div className="img-container">
            <img src={props.fighter2Stats.img} alt="Picture of Alex Perez"/>
          </div>    
        </div>
    )
}