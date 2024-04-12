import requests
from bs4 import BeautifulSoup
import re
import json
import time
import random
import pymongo

url = "https://www.betmma.tips/free_ufc_betting_tips.php?Event=1444"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

#navigate to desired table
first_table = soup.find("table")
step2 = first_table.find_all("tr", recursive=False)[3]
step3 = step2.find_all("td", recursive=False)[1]
step4 = step3.find("table")
step6 = step4.find("tr")
step7 = step6.find("td")
step8 = step7.find("table")
step10 = step8.find_all("tr", recursive=False)[1]
step11 = step10.find("td")
step12 = step11.find("table")
step14 = step12.find("tr")
step15 = step14.find("td")
matchups = step15.find_all("table")
selected_matchups = []
for index in range(0, len(matchups), 2):
    selected_matchups.append(matchups[index])

first_tr_elements = []
for table in selected_matchups:
    first_tr_element = table.find("tr")
    first_tr_elements.append(first_tr_element)

#This is an array of all the matchup containers
second_td = []
for tr_element in first_tr_elements:
    second_td_element = tr_element.find_all("td", recursive=False)
    second_td.append(second_td_element[1])

#scrape matchup information for each object in second_td

fighter_pairs = []
user_stats = []
for td_element in second_td:
    #collect the fighter names and associated href
    a_elements = td_element.find_all("a")
    fighter_info = []
    for a_element in a_elements:
        if a_element.text.strip() and len(fighter_info) < 3:
            fighter_info.append(a_element)
    fighter1_href = fighter_info[0].get("href")
    fighter2_href = fighter_info[2].get("href")

    #collect betting stats for fighters
    tips_table = td_element.find("table")
    fighter1_td = tips_table.find("td")
    fighter1_a_elements = fighter1_td.find_all("a")
    fighter1_tips = []
    for a_element in fighter1_a_elements:
        tip1_data = {}
        href = a_element.get("href")
        text = ""
        next_sibling = a_element.next_sibling
        tip1_data["href"] = href
        while next_sibling: 
            if isinstance(next_sibling, str):
                text += next_sibling.strip()
            else: 
                break
            next_sibling = next_sibling.next_sibling
        tip1_data["bet"] = text.strip()
        fighter1_tips.append(tip1_data) 

    fighter2_td = tips_table.find_all("td")[1]
    fighter2_a_elements = fighter2_td.find_all("a")
    fighter2_tips = []
    for a_element in fighter2_a_elements:
        tip2_data = {}
        href = a_element.get("href")
        tip2_data["href"] = href
        text = ""
        next_sibling = a_element.next_sibling
        while next_sibling:
            if isinstance(next_sibling, str):
                text += next_sibling.strip()
            else: break
            next_sibling = next_sibling.next_sibling
        tip2_data["bet"] = text.strip()
        fighter2_tips.append(tip2_data)

    pattern = r'[a-zA-Z()]'
    fighter1_tips_filtered = [tip1_data for tip1_data in fighter1_tips if not re.match(pattern, tip1_data["bet"].strip())]
    fighter2_tips_filtered = [tip2_data for tip2_data in fighter2_tips if not re.match(pattern, tip2_data["bet"].strip())]

    for tip1_data in fighter1_tips_filtered:
        if "bet" in tip1_data:
            bet_string = tip1_data["bet"]
            bet_amount, odds = bet_string.split(" @")
            tip1_data["bet_amount"] = bet_amount.strip()
            tip1_data["odds"] = odds.strip()
            del tip1_data["bet"]

    for tip2_data in fighter2_tips_filtered:
        if "bet" in tip2_data:
            bet_string = tip2_data["bet"]
            bet_amount, odds = bet_string.split(" @")
            tip2_data["bet_amount"] = bet_amount.strip()
            tip2_data["odds"] = odds.strip()
            del tip2_data["bet"]

    fighter_pair = {
        "fighter1": {"name": fighter_info[0].text.strip(), "tips": fighter1_tips_filtered, "profile": f"https://www.betmma.tips/{fighter1_href}"},
        "fighter2": {"name": fighter_info[2].text.strip(), "tips": fighter2_tips_filtered, "profile": f"https://www.betmma.tips/{fighter2_href}"}
    }
    fighter_pairs.append(fighter_pair)

with open("matchups_4_11_updated", "w") as json_file:
    json.dump(fighter_pairs, json_file, indent=2)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["event_stats"]
collection = db["ufc_300"]
collection.insert_many(fighter_pairs)