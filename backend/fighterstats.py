import requests
from bs4 import BeautifulSoup
import json
import time
import random
import pymongo
import urllib.request as urllib3
from googlesearch import search
from datetime import datetime

with open("./ufc_fn_nicolau_perez.json") as f:
    data = json.load(f)

fighters_stats = []

def getPage(fighter_name):
    nameSplit = fighter_name.split()
    if len(nameSplit) > 2:
        del nameSplit[1]
        updatedName = " ".join(nameSplit)
    else: 
        updatedName = fighter_name    
    query = "site:ufcstats.com " + updatedName
    for i in search(query, tld="com", num=3, stop=1, pause=2):
        url = i

        fighterpage = urllib3.urlopen(url)
        soup = BeautifulSoup(fighterpage, "html.parser")
        return soup
    
def getStats(fighter_name):
    soup = getPage(fighter_name)
    allUl = soup.find_all("ul")
    stats = []

    for ul in allUl:
        for li in ul.find_all("li"):
            if li.i and (str(li.i.string).strip() != ""):
                stat_name = str(li.i.string).strip()
                stat_num = str(li.contents[2]).strip()
                stats.append([stat_name, stat_num])
    
    allStats = {stat[0]: stat[1] for stat in stats}
    dob_str = allStats["DOB:"]
    dob_date = datetime.strptime(dob_str, "%b %d, %Y")
    today = datetime.today()
    age = today.year - dob_date.year - ((today.month, today.day) < (dob_date.month, dob_date.day))
    allStats["Age:"] = age
    return allStats

def calc_match_result(tr):
    td = tr.find_all("td")
    result = td[3].text
    am_odds_text = td[7].text.replace(",", "")
    if am_odds_text == "+inf":
        return None
    am_odds = float(am_odds_text)
    if am_odds > 0:
        dec_odds = round((am_odds/100) + 1, 2)
    else:
        dec_odds = round((100/abs(am_odds)) + 1, 2)
    return {"result": result, "odds": dec_odds}

def fighter_profile_scraper(profile_url, fighter_name):
    fighterres = requests.get(profile_url)
    fighterpage = BeautifulSoup(fighterres.text, "html.parser")
    delay = random.uniform(1.5, 2.8)
    time.sleep(delay)
    win_trs = fighterpage.find_all("tr", attrs={'bgcolor':"#EDFFE1"})
    loss_trs = fighterpage.find_all("tr", attrs={'bgcolor':"#FFF2F2"})
    match_results = []
    for tr in win_trs:
        match_result = calc_match_result(tr)
        if match_result:
            match_results.append(match_result)
    for tr in loss_trs: 
        match_result = calc_match_result(tr)
        if match_result:
            match_results.append(match_result)
            
    fav_count = 0
    fav_gain = 0
    dog_count = 0
    dog_gain = 0

    for match_result in match_results:
        odds = match_result["odds"]
        result = match_result["result"]
        if odds >= 2:
            dog_count += 1
            if result == "Won":
                dog_gain += odds
        else:
            fav_count += 1
            if result == "Won":
                fav_gain += odds

    if dog_count > 0:
        dog_roi = str(round(((dog_gain - dog_count) / dog_count) * 100, 2)) + "%"
    else: 
        dog_roi = "No matchups where fighter is underdog"

    if fav_count > 0:
        fav_roi = str(round(((fav_gain - fav_count) / fav_count) * 100, 2)) + "%"
    else:
        fav_roi = "No matchups where fighter is favorite"

    advStats = getStats(fighter_name)
    fighter_stat = {"name": fighter_name, "fighter_roi": {"fav_roi": fav_roi, "dog_roi": dog_roi}, "stats": advStats}
    fighters_stats.append(fighter_stat)


for matchup in data:
    fighter1_profile_url = matchup["fighter1"]["profile"]
    fighter2_profile_url = matchup["fighter2"]["profile"]
    fighter1_name = matchup["fighter1"]["name"]
    fighter2_name = matchup["fighter2"]["name"]

    fighter_profile_scraper(fighter1_profile_url, fighter1_name)
    fighter_profile_scraper(fighter2_profile_url, fighter2_name)
       

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["fighter_stats"]
collection = db["fighter_stats_nicolau_perez"]
collection.insert_many(fighters_stats)

