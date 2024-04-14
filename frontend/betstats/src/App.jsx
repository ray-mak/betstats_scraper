import React from "react"
import { useState, useEffect } from "react"

function App() {
  const [matchups, setMatchups] = useState([])
  const [fighterROI, setFighterROI] = useState([])
  const [userStats, setUserStats] = useState([])
  
  useEffect(() => {
    async function getMatchups() {  
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/matchups_4_11_updated.json")
      const data = await res.json()
      setMatchups(data)
    }
    async function getFighterROI() {
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/fighter_stats.json")
      const data = await res.json()
      setFighterROI(data)
    }
    async function getUserStats() {
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/user_stats.json")
      const data = await res.json()
      setUserStats(data)
    }
    getFighterROI()
    getMatchups()
    getUserStats()
  }, [])

  const matchupCards = matchups.map((matchup, index) => {
    const fighter1stats = fighterROI.find(fighter => fighter.name === matchup.fighter1.name)
    const fighter1DogROI = fighter1stats.fighter_roi.dog_roi
    const fighter1FavROI = fighter1stats.fighter_roi.fav_roi

    const fighter2stats = fighterROI.find(fighter => fighter.name === matchup.fighter2.name)
    const fighter2DogROI = fighter2stats.fighter_roi.dog_roi
    const fighter2FavROI = fighter2stats. fighter_roi.fav_roi

    return (
      <div className="matchup-container" key={index}>
        <div className="fighter1">
          <h2>{matchup.fighter1.name}</h2>
          <h3>Fighter ROI</h3>
          <p>ROI as Favorite: <span>{fighter1FavROI}</span></p>
          <p>ROI as Underdog: <span>{fighter1DogROI}</span></p>
          <h3>Betting Stats</h3>
          <p>Sharp Bets: <span>50</span></p>
          <p>Square Bets: <span>24</span></p>
        </div>
        <div className="fighter2">
          <h2>{matchup.fighter2.name}</h2>
          <h3>Fighter ROI</h3>
          <p>ROI as Favorite: <span>{fighter2FavROI}</span></p>
          <p>ROI as Underdog: <span>{fighter2DogROI}</span></p>
          <h3>Betting Stats</h3>
          <p>Sharp Bets: <span>50</span></p>
          <p>Square Bets: <span>24</span></p>
        </div>
      </div>
    )
  })
  

  return (
    <div className="main-container">
      {matchupCards}
    </div>
  )
}

export default App
