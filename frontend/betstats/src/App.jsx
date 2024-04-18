import React from "react"
import { useState, useEffect } from "react"
import AdvStats from "./components/AdvStats"
import BetStats from "./components/BetStats"
import HeadStats from "./components/HeadStats"

function App() {
  const [matchups, setMatchups] = useState([])
  const [fighterStats, setFighterStats] = useState([])
  const [userStats, setUserStats] = useState([])
  const [pickFilters, setPickFilters] = useState({"smDogPick": 0, "smFavPick": 0, "bigFavPick": 400, "bigDogPick": 0})
 

  useEffect(() => {
    async function getMatchups() {  
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/matchups_4_11_updated.json")
      const data = await res.json()
      setMatchups(data)
    }
    async function getFighterStats() {
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/fighter_stats.json")
      const data = await res.json()
      setFighterStats(data)
    }
    async function getUserStats() {
      const res = await fetch("https://ray-mak.github.io/betstats_scraper/user_stats.json")
      const data = await res.json()
      setUserStats(data)
    }
    getFighterStats()
    getMatchups()
    getUserStats()
  }, [])

  const calculateBetStats = (tips) => {
    let sharpCount = 0
    let squareCount = 0
    tips.forEach(tip => {
      const userBetStats = userStats.find(object => object.user === tip.href)
      const userOdds = tip.odds
      if (userBetStats && userBetStats.user_stats) {
        if (userOdds < 1.54 && userBetStats.user_stats.big_fav.total_picks >= pickFilters.bigFavPick) {
          userBetStats.user_stats.big_fav.roi <= 0 ? squareCount++ : sharpCount++
        } else if (userOdds >= 1.54 && userOdds < 2 && userBetStats.user_stats.sm_fav.total_picks >= pickFilters.smFavPick) {
          userBetStats.user_stats.sm_fav.roi <= 0 ? squareCount++ : sharpCount++
        } else if (userOdds >= 2 && userOdds <= 2.86 && userBetStats.user_stats.sm_dog.total_picks >= pickFilters.smDogPick) {
          userBetStats.user_stats.sm_dog.roi <= 0 ? squareCount++ : sharpCount++
        } else if (userOdds > 2.86 && userBetStats.user_stats.big_dog.total_picks >= pickFilters.bigDogPick) {
          userBetStats.user_stats.big_dog.roi <= 0 ? squareCount++ : sharpCount++
        }
      }
    })
    return {sharpCount, squareCount}
  }

  const matchupCards = matchups.map((matchup, index) => {
    const fighter1Stats = fighterStats.find(fighter => fighter.name === matchup.fighter1.name)
    const fighter1DogROI = fighter1Stats.fighter_roi.dog_roi
    const fighter1FavROI = fighter1Stats.fighter_roi.fav_roi

    const fighter2stats = fighterStats.find(fighter => fighter.name === matchup.fighter2.name)
    const fighter2DogROI = fighter2stats.fighter_roi.dog_roi
    const fighter2FavROI = fighter2stats. fighter_roi.fav_roi

    const {sharpCount: sharpCount1, squareCount: squareCount1} = calculateBetStats(matchup.fighter1.tips)
    const {sharpCount: sharpCount2, squareCount: squareCount2} = calculateBetStats(matchup.fighter2.tips)

    return (
      <div className="matchup-container" key={index}>
        <HeadStats fighter1Stats={fighter1Stats}/>
        <AdvStats />
        <BetStats />
        {/* <div className="fighter1">
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
          <p>Sharp Bets: <span>{sharpCount2}</span></p>
          <p>Square Bets: <span>{squareCount2}</span></p>
        </div> */}
      </div>
    )
  })
  

 
  return (
    <div className="main-container">
      {matchupCards}
      {/* <div className="matchup-container">
        <HeadStats />
        <AdvStats />
        <BetStats />
      </div>    */}
    </div>
  )
}

export default App
