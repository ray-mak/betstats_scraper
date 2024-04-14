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

    //Find the object in userStats with same name. 
    // const user1Stats = userStats.find(object => object.user === matchup.fighter1.tips.href)
    //access the "tips" array.
    let sharpCount1 = 0
    let squareCount1 = 0
    const fighter1tips = matchup.fighter1.tips 
    fighter1tips.forEach(tip => {
      const user1Stats= userStats.find(object => object.user === tip.href)
      const user1Odds = tip.odds
      if (user1Stats && user1Stats.user_stats) {
        if (user1Odds < 1.54) {
          user1Stats.user_stats.big_fav.roi <= 0 ? squareCount1++ : sharpCount1++ 
        } else if (user1Odds >= 1.54 && user1Odds < 2) {
          user1Stats.user_stats.sm_fav.roi <= 0 ? squareCount1++ : sharpCount1++
        } else if (user1Odds >= 2 && user1Odds <= 2.86) {
          user1Stats.user_stats.sm_dog.roi <= 0 ? squareCount1++ : sharpCount1++
        } else {
          user1Stats.user_stats.big_dog.roi <= 0 ? squareCount1++ : sharpCount1++
        }
      }  
    })
    
    return (
      <div className="matchup-container" key={index}>
        <div className="fighter1">
          <h2>{matchup.fighter1.name}</h2>
          <h3>Fighter ROI</h3>
          <p>ROI as Favorite: <span>{fighter1FavROI}</span></p>
          <p>ROI as Underdog: <span>{fighter1DogROI}</span></p>
          <h3>Betting Stats</h3>
          <p>Sharp Bets: <span>{sharpCount1}</span></p>
          <p>Square Bets: <span>{squareCount1}</span></p>
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
