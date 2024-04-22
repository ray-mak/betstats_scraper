import React from "react"
import { useState, useEffect } from "react"
import AdvStats from "./components/AdvStats"
import BetStats from "./components/BetStats"
import HeadStats from "./components/HeadStats"
import FilterBar from "./components/FilterBar"

function App() {
  const [matchups, setMatchups] = useState([])
  const [fighterStats, setFighterStats] = useState([])
  const [userStats, setUserStats] = useState([])
  const [pickFilters, setPickFilters] = useState({"smDogPick": "", "smFavPick": "", "bigFavPick": "", "bigDogPick": "", "smDogRoi": "", "bigDogRoi": "", "smFavRoi": "", "bigFavRoi": ""})
  const [filterOpen, setFilterOpen] = useState(false)

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
            if (userBetStats.user_stats.big_fav.roi <= 0) {
              squareCount++
            } else if (userBetStats.user_stats.big_fav.roi >= pickFilters.bigFavRoi) {
              sharpCount++
            }
        } else if (userOdds >= 1.54 && userOdds < 2 && userBetStats.user_stats.sm_fav.total_picks >= pickFilters.smFavPick) {
            if (userBetStats.user_stats.sm_fav.roi <= 0) {
              squareCount++
            } else if (userBetStats.user_stats.sm_fav.roi >= pickFilters.smFavRoi) {
              sharpCount++
            }
        } else if (userOdds >= 2 && userOdds <= 2.86 && userBetStats.user_stats.sm_dog.total_picks >= pickFilters.smDogPick) {
            if (userBetStats.user_stats.sm_dog.roi <= 0) {
              squareCount++
            } else if (userBetStats.user_stats.sm_dog.roi >= pickFilters.smDogRoi) {
              sharpCount++
            }
        } else if (userOdds > 2.86 && userBetStats.user_stats.big_dog.total_picks >= pickFilters.bigDogPick) {
            if (userBetStats.user_stats.big_dog.roi <= 0) {
              squareCount++ 
            } else if (userBetStats.user_stats.sm_dog.roi >= pickFilters.bigDogRoi) {
              sharpCount++
            }
        }
      }
    })
    return {sharpCount, squareCount}
  }

  const matchupCards = matchups.map((matchup, index) => {
    const fighter1Stats = fighterStats.find(fighter => fighter.name === matchup.fighter1.name)
    const fighter1DogROI = fighter1Stats.fighter_roi.dog_roi
    const fighter1FavROI = fighter1Stats.fighter_roi.fav_roi

    const fighter2Stats = fighterStats.find(fighter => fighter.name === matchup.fighter2.name)
    const fighter2DogROI = fighter2Stats.fighter_roi.dog_roi
    const fighter2FavROI = fighter2Stats. fighter_roi.fav_roi

    const {sharpCount: sharpCount1, squareCount: squareCount1} = calculateBetStats(matchup.fighter1.tips)
    const {sharpCount: sharpCount2, squareCount: squareCount2} = calculateBetStats(matchup.fighter2.tips)

    return (
      <div className="matchup-container" key={index}>
        <HeadStats 
          fighter1Stats={fighter1Stats}
          fighter2Stats={fighter2Stats}
        />
        <AdvStats 
          fighter1Stats={fighter1Stats}
          fighter2Stats={fighter2Stats}
        />
        <BetStats 
          fighter1DogROI = {fighter1DogROI}
          fighter1FavROI = {fighter1FavROI}
          fighter2DogROI = {fighter2DogROI}
          fighter2FavROI = {fighter2FavROI}
          sharpCount1 = {sharpCount1}
          squareCount1 = {squareCount1}
          sharpCount2 = {sharpCount2}
          squareCount2 = {squareCount2}
        />
      </div>
    )
  })

  function handleChange(e) {
    const {name, value} = e.target
    setPickFilters(prevFilters => {
      return {
        ...prevFilters,
        [name]: parseFloat(value) || ""
      }
    })
  }
  
  function resetFilter() {
    setPickFilters({"smDogPick": "", "smFavPick": "", "bigFavPick": "", "bigDogPick": "", "smDogRoi": "", "bigDogRoi": "", "smFavRoi": "", "bigFavRoi": ""})
  }

  function toggleFilter() {
    setFilterOpen(prevState => !prevState);
    document.body.style.overflow = filterOpen ? "auto" : "hidden"
  }
  
  return (
    <>
    <FilterBar 
        pickFilters={pickFilters}
        handleChange={handleChange}
        resetFilter={resetFilter}
        toggleFilter={toggleFilter}
        filterOpen={filterOpen}
      />
    <div className={`main-container ${filterOpen ? "opened" : ""}`}>
      {matchupCards}
    </div>
    </>
  )
}

export default App
