import requests
from bs4 import BeautifulSoup

fighterurl = "https://www.betmma.tips/fighter_profile.php?FID=2426&Name=Cody_Brundage"
fighterres = requests.get(fighterurl)
fighterpage = BeautifulSoup(fighterres.text, "html.parser")

selected_td = fighterpage.find_all("td", attrs={'bgcolor':"#F7F7F7"})[1]
win_trs = fighterpage.find_all("tr", attrs={'bgcolor':"#EDFFE1"})
loss_trs = fighterpage.find_all("tr", attrs={'bgcolor':"#FFF2F2"})

match_results = []
for tr in win_trs:
    td = tr.find_all("td")
    result = td[3].text
    am_odds_text = td[7].text.replace(",", "")
    if am_odds_text == "+inf":
        continue
    am_odds = float(am_odds_text)
    if am_odds > 0:
        dec_odds = round((am_odds/100) + 1, 2)
    else:
        dec_odds = round((100/abs(am_odds)) + 1, 2)
    match_result = {"result": result, "odds": dec_odds}
    match_results.append(match_result)

for tr in loss_trs: 
    td = tr.find_all("td")
    result = td[3].text
    am_odds = float(td[7].text)
    if am_odds > 0:
        dec_odds = round((am_odds/100) + 1, 2)
    else:
        dec_odds = round((100/abs(am_odds)) + 1, 2)
    match_result = {"result": result, "odds": dec_odds}
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
    dog_roi = round(((dog_gain - dog_count) / dog_count) * 100, 2)
else: 
    dog_roi = "No matchups where fighter is underdog"

if fav_count > 0:
    fav_roi = round(((fav_gain - fav_count) / fav_count) * 100, 2)
else:
    fav_roi = "No matchups where fighter is favorite"

dog_roi_str = str(dog_roi) + "%"
fav_roi_str = str(fav_roi) + "%"

fighter_roi = {"fav_roi": fav_roi_str, "dog_roi": dog_roi_str}

print(fighter_roi)