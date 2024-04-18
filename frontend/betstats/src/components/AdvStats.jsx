import React from "react";
import { useState } from "react";

export default function AdvStats() {
    const [statsToggled, setStatsToggled] = useState(false)
    
    function toggleStats() {
        setStatsToggled(prevState => !prevState)
    }

    return (
        <div className="adv-stats-container">
          <div className="adv-stats-label" onClick={toggleStats}>
            ADVANCED STATS
            <img className={`arrow ${statsToggled ? "toggled" : ""}`} src="https://github.com/ray-mak/betstats_scraper/assets/154634286/cfefafe9-844c-4407-95c9-5772db995f21" alt="down arrow icon"/> 
          </div>
          <div className={`adv-stats ${statsToggled ? "toggled" : ""}`}>
            <table>
              <tbody>
                <tr>
                  <td>5.10</td>
                  <td>Strikes Landed per Minute</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Striking Accuracy</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Strikes Absorbed per Minute</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Striking Defense</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Takedown Average</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Takedown Accuracy</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Takedown Defense</td>
                  <td>7.18</td>
                </tr>
                <tr>
                  <td>5.10</td>
                  <td>Submission Attempts</td>
                  <td>7.18</td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>
    )
}