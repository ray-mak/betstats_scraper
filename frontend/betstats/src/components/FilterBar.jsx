import React from "react";

export default function FilterBar(props) {
    return (
        <div className="header">
            <div className="navbar">
                <h2>MMA Metrics</h2>
                
            </div>
            <div className={`hamburger ${props.filterOpen ? "opened" : ""}`} onClick={props.toggleFilter}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            <div className={`dimmer ${props.filterOpen ? "opened" : ""}`}></div>
            <div className={`filter-bar ${props.filterOpen ? "opened" : ""}`}>
                <h3>Filter Betting Stats</h3>
                <h4>By Volume - <span>Filter based on users minimum amount of picks</span></h4>
                <form>
                    <fieldset>
                        <label htmlFor="big-fav-pick">
                            Big Favorite 
                            <input
                                type="number"
                                name="bigFavPick"
                                id="big-fav-pick"
                                value={props.pickFilters.bigFavPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="sm-fav-pick">
                            Small Favorite
                            <input
                                type="number"
                                name="smFavPick"
                                id="sm-fav-pick"
                                value={props.pickFilters.smFavPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="sm-dog-pick">
                            Small Underdog
                            <input
                                type="number"
                                name="smDogPick"
                                id="sm-dog-pick"
                                value={props.pickFilters.smDogPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="big-dog-pick">
                            Big Underdog
                            <input
                                type="number"
                                name="bigDogPick"
                                id="big-dog-pick"
                                value={props.pickFilters.bigDogPick}
                                onChange={props.handleChange}
                            />
                        </label>
                    </fieldset>                
                </form>
                <h4>By ROI - <span>Filter based on users minimum ROI</span></h4>
                <form>
                    <fieldset>
                        <label htmlFor="big-fav-roi">
                            Big Favorite 
                            <input
                                type="number"
                                name="bigFavRoi"
                                id="big-fav-roi"
                                value={props.pickFilters.bigFavRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="sm-fav-roi">
                            Small Favorite
                            <input
                                type="number"
                                name="smFavRoi"
                                id="sm-fav-roi"
                                value={props.pickFilters.smFavRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="sm-dog-roi">
                            Small Underdog
                            <input
                                type="number"
                                name="smDogRoi"
                                id="sm-dog-roi"
                                value={props.pickFilters.smDogRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label htmlFor="big-dog-roi">
                            Big Underdog
                            <input
                                type="number"
                                name="bigDogRoi"
                                id="big-dog-roi"
                                value={props.pickFilters.bigDogRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                    </fieldset>
                </form>
                <div className="btn-container">
                    <button className="reset-btn" type="button" onClick={props.resetFilter}>Reset</button>
                    <button className="filter-btn" type="button">Filter</button>
                </div>
            </div>
        </div>
    )
}