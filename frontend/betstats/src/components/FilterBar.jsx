import React from "react";

export default function FilterBar(props) {
    return (
        <div className="header w-full flex flex-col items-center relative">
            <div className="navbar">
                <h2 className="p-10 text-3xl font-semibold">MMA Metrics</h2>   
            </div>
            <div className={`hamburger ${props.filterOpen ? "opened" : ""}`} onClick={props.toggleFilter}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            <div className={`dimmer ${props.filterOpen ? "opened" : ""}`}></div>
            <div className={`filter-bar flex flex-col items-center gap-y-2 rounded-lg bg-almostWhite p-4 lg:w-4/5 xl:w-3/5 xxl:w-1/2 ${props.filterOpen ? "opened" : ""}`}>
                <h3 className="text-lg font-semibold">Filter Betting Stats</h3>
                <h4 className="self-start font-semibold">By Volume - <span>Filter based on users minimum amount of picks</span></h4>
                <form className="w-full">
                    <fieldset className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <label className="flex flex-col gap-1" htmlFor="big-fav-pick">
                            Big Favorite 
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="bigFavPick"
                                id="big-fav-pick"
                                value={props.pickFilters.bigFavPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="sm-fav-pick">
                            Small Favorite
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="smFavPick"
                                id="sm-fav-pick"
                                value={props.pickFilters.smFavPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="sm-dog-pick">
                            Small Underdog
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="smDogPick"
                                id="sm-dog-pick"
                                value={props.pickFilters.smDogPick}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="big-dog-pick">
                            Big Underdog
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="bigDogPick"
                                id="big-dog-pick"
                                value={props.pickFilters.bigDogPick}
                                onChange={props.handleChange}
                            />
                        </label>
                    </fieldset>                
                </form>
                <h4 className="self-start font-semibold">By ROI - <span>Filter based on users minimum ROI</span></h4>
                <form className="w-full">
                    <fieldset className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <label className="flex flex-col gap-1" htmlFor="big-fav-roi">
                            Big Favorite 
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="bigFavRoi"
                                id="big-fav-roi"
                                value={props.pickFilters.bigFavRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="sm-fav-roi">
                            Small Favorite
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="smFavRoi"
                                id="sm-fav-roi"
                                value={props.pickFilters.smFavRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="sm-dog-roi">
                            Small Underdog
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="smDogRoi"
                                id="sm-dog-roi"
                                value={props.pickFilters.smDogRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                        <label className="flex flex-col gap-1" htmlFor="big-dog-roi">
                            Big Underdog
                            <input
                                className="h-8 rounded-lg indent-3 shadow-lg"
                                type="number"
                                name="bigDogRoi"
                                id="big-dog-roi"
                                value={props.pickFilters.bigDogRoi}
                                onChange={props.handleChange}
                            />
                        </label>
                    </fieldset>
                </form>
                <div className="btn-container flex gap-4 my-2 self-end">
                    <button className="reset-btn bg-red w-20 h-9 text-white rounded-md active:scale-95" type="button" onClick={props.resetFilter}>Reset</button>
                    <button className="filter-btn bg-darkGray w-20 h-9 text-white rounded-md active:scale-95" type="button">Filter</button>
                </div>
            </div>
        </div>
    )
}