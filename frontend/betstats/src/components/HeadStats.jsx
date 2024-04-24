import React from "react";

export default function HeadStats(props) {
    return (
        <div className="w-full flex justify-between items-center">
          <div className="w-60 h-60">
            <img className="w-full h-full object-cover rounded-lg" src={props.fighter1Stats.img} alt={`Picture of ${props.fighter1Stats.name}`}/>
          </div>
          <table className="w-1/2 border-collapse mx-2 my-1 span-2">
            <tbody>
              <tr>
                <td className="text-2xl text-red">{props.fighter1Stats.name}</td>
                <td>vs</td>
                <td className="text-2xl text-red">{props.fighter2Stats.name}</td>
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
          <div className="w-60 h-60">
            <img className="w-full h-full object-cover rounded-lg" src={props.fighter2Stats.img} alt={`Picture of ${props.fighter2Stats.name}`}/>
          </div>    
        </div>
    )
}