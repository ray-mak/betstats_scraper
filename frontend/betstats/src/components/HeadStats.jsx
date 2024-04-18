import React from "react";

export default function HeadStats(props) {
    return (
        <div className="h2h-container">
          <img src={props.fighter1Stats.img} alt="Picture of Alex Perez"/>
          <table>
            <tbody>
              <tr>
                <td className="fighter-name">Alex Pereira</td>
                <td>vs</td>
                <td className="fighter-name">Jamahal Hill</td>
              </tr>
              <tr>
                <td>36</td>
                <td>Age</td>
                <td>32</td>
              </tr>
              <tr>
                <td>6' 4"</td>
                <td>Height</td>
                <td>6' 4"</td>
              </tr>
              <tr>
                <td>205 lbs.</td>
                <td>Weight</td>
                <td>205 lbs.</td>
              </tr>
              <tr>
                <td>79"</td>
                <td>Reach</td>
                <td>79"</td>
              </tr>
            </tbody>
          </table>
          <img src="https://images.tapology.com/headshot_images/13299/large/alex-perez.jpg?1601654127" alt="Picture of Alex Perez"/>
        </div>
    )
}