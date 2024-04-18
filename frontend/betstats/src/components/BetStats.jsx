import React from "react";
import { useState } from "react";

export default function BetStats() {
    const [statsToggled, setStatsToggled] = useState(false)
    
    function toggleStats() {
        setStatsToggled(prevState => !prevState)
    }

    return (
        <div className="bet-stats-container">
          <div className="adv-stats-label" onClick={toggleStats}>
            BETTING STATS
            <img className={`arrow ${statsToggled ? "toggled" : ""}`} src="https://github.com/ray-mak/betstats_scraper/assets/154634286/f74fa00d-47db-47b6-9fcb-0428e89c1bcc" alt="down arrow icon"/>
          </div>
          <div className={`bet-stats ${statsToggled ? "toggled" : ""}`}>
            <table>
              <tbody>
                <tr>
                  <td>57.4%</td>
                  <td>ROI as Favorite</td>
                  <td>41.38%</td>
                </tr>
                <tr>
                  <td>57.4%</td>
                  <td>ROI as Underdog</td>
                  <td>41.38%</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Sharp Bets</td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Square Bets</td>
                  <td>22</td>
                </tr>
              </tbody>
            </table>  
          </div>
       </div>
    )
}