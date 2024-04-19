import React from "react";
import { useState } from "react";

export default function BetStats(props) {
    const [statsToggled, setStatsToggled] = useState(false)
    
    function toggleStats() {
        setStatsToggled(prevState => !prevState)
    }

    return (
        <div className="bet-stats-container">
          <button className="adv-stats-btn" onClick={toggleStats}>
            BETTING STATS
            <img className={`arrow ${statsToggled ? "toggled" : ""}`} src="https://github.com/ray-mak/betstats_scraper/assets/154634286/f74fa00d-47db-47b6-9fcb-0428e89c1bcc" alt="down arrow icon"/>
          </button>
          <div className={`bet-stats ${statsToggled ? "toggled" : ""}`}>
            <table>
              <tbody>
                <tr>
                  <td>{props.fighter1FavROI}</td>
                  <td>ROI as Favorite</td>
                  <td>{props.fighter2FavROI}</td>
                </tr>
                <tr>
                  <td>{props.fighter1DogROI}</td>
                  <td>ROI as Underdog</td>
                  <td>{props.fighter2DogROI}</td>
                </tr>
                <tr>
                  <td>{props.sharpCount1}</td>
                  <td>Sharp Bets</td>
                  <td>{props.sharpCount2}</td>
                </tr>
                <tr>
                  <td>{props.squareCount1}</td>
                  <td>Square Bets</td>
                  <td>{props.squareCount2}</td>
                </tr>
              </tbody>
            </table>  
          </div>
       </div>
    )
}