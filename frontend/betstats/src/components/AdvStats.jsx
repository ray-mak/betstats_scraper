import React from "react";
import { useState } from "react";

export default function AdvStats(props) {
    const [statsToggled, setStatsToggled] = useState(false)
    
    function toggleStats() {
        setStatsToggled(prevState => !prevState)
    }

    return (
        <div className="adv-stats-container w-full mt-2 rounded-lg bg-darkGray">
          <button className="adv-stats-btn flex items-center w-full h-12 bg-transparent px-4 text-almostWhite" onClick={toggleStats}>
            ADVANCED STATS
            <img className={`arrow w-4 ml-auto object-contain duration-200 ${statsToggled ? "toggled" : ""}`} src="https://github.com/ray-mak/betstats_scraper/assets/154634286/cfefafe9-844c-4407-95c9-5772db995f21" alt="down arrow icon"/> 
          </button>
          <div className={`adv-stats flex justify-center max-h-0 overflow-hidden duration-200 ease-in ${statsToggled ? "toggled" : ""}`}>
            <table className="w-full md:w-3/5">
              <tbody>
                <tr>
                  <td>{props.fighter1Stats.stats["SLpM:"]}</td>
                  <td>Strikes Landed per Minute</td>
                  <td>{props.fighter2Stats.stats["SLpM:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["Str. Acc.:"]}</td>
                  <td>Striking Accuracy</td>
                  <td>{props.fighter2Stats.stats["Str. Acc.:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["SApM:"]}</td>
                  <td>Strikes Absorbed per Minute</td>
                  <td>{props.fighter2Stats.stats["SApM:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["Str. Def:"]}</td>
                  <td>Striking Defense</td>
                  <td>{props.fighter2Stats.stats["Str. Def:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["TD Avg.:"]}</td>
                  <td>Takedown Average</td>
                  <td>{props.fighter2Stats.stats["TD Avg.:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["TD Acc.:"]}</td>
                  <td>Takedown Accuracy</td>
                  <td>{props.fighter2Stats.stats["TD Acc.:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["TD Def.:"]}</td>
                  <td>Takedown Defense</td>
                  <td>{props.fighter2Stats.stats["TD Def.:"]}</td>
                </tr>
                <tr>
                  <td>{props.fighter1Stats.stats["Sub. Avg.:"]}</td>
                  <td>Submission Attempts</td>
                  <td>{props.fighter2Stats.stats["Sub. Avg.:"]}</td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>
    )
}