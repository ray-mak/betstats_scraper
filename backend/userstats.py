import requests
from bs4 import BeautifulSoup
import json
import time
import random
import pymongo

with open("matchups_4_11.json") as f:
    data = json.load(f)

scraped_users = set()
user_stats = []

for fighter_pair in data:
    fighter1 = fighter_pair.get("fighter1")
    fighter2 = fighter_pair.get("fighter2")
    tips1 = fighter1.get("tips")
    for tip in tips1:
        href = tip["href"]
        userurl = f"https://www.betmma.tips/{href}"
        if href not in scraped_users:
            try:
                response = requests.get(userurl)
                if response.status_code == 200:
                    userpage = BeautifulSoup(response.text, "html.parser")
                    step_1 = userpage.find("table")
                    step_2 = step_1.find_all("tr", recursive=False)[3]
                    step_3 = step_2.find_all("td", recursive=False)[1]
                    step_4 = step_3.find("table")
                    step_5 = step_4.find("tr")
                    step_6 = step_5.find("td")
                    step_7 = step_6.find("table")

                    #find avg unit size
                    userpanel = userpage.select_one("#frm_profile")
                    userpanel_table = userpanel.find("table")
                    tr2 = userpanel_table.find_all("tr")[1]
                    tr2_td = tr2.find_all("td")[1]
                    tr2_td_table = tr2_td.find("table")
                    tr2_td_table_tr = tr2_td_table.find_all("tr")[5]
                    avg_bet = tr2_td_table_tr.find_all("td")[3].text.strip()

                    #find straight pick stats
                    target_trs = step_7.find_all("tr", recursive=False)[3]
                    target_trs_td = target_trs.find("td")
                    target_trs_td_table = target_trs_td.find("table")
                    sp_trs = target_trs_td_table.find_all("tr")

                    big_fav_tds = sp_trs[1].find_all("td")
                    sm_fav_tds = sp_trs[2].find_all("td")
                    sm_dog_tds = sp_trs[3].find_all("td")
                    big_dog_tds = sp_trs[4].find_all("td")

                    big_fav = {"total_picks": big_fav_tds[1].text, "roi": big_fav_tds[7].text}
                    sm_fav = {"total_picks": sm_fav_tds[1].text, "roi": sm_fav_tds[7].text}
                    sm_dog = {"total_picks": sm_dog_tds[1].text, "roi": sm_dog_tds[7].text}
                    big_dog = {"total_picks": big_dog_tds[1].text, "roi": big_dog_tds[7].text}

                    betting_stats = {
                        "user": href,
                        "user_stats" : {
                            "avg_bet": avg_bet,
                            "big_fav": big_fav,
                            "sm_fav": sm_fav,
                            "sm_dog": sm_dog,
                            "big_dog": big_dog
                        }
                    }
                    user_stats.append(betting_stats)
                    scraped_users.add(href)
                    delay = random.uniform(5.2, 7.8)
                    time.sleep(delay)
                else: 
                    print(f"Failed to scrape {userurl}: HTTP {response.status_code.code}")
            except requests.HTTPError as e:
                print(f"Failed to sceape {userurl}: {e}")
            except Exception as e:
                print(f"An error has occurred while scraping {userurl}: {e}")
        else: 
            print(f"{href} has already been scraped, skipping...")

    tips2 = fighter2.get("tips")
    for tip in tips2:
        href = tip["href"]
        userurl = f"https://www.betmma.tips/{href}"
        if href not in scraped_users:
            try:
                response = requests.get(userurl)
                if response.status_code == 200:
                    userpage = BeautifulSoup(response.text, "html.parser")
                    step_1 = userpage.find("table")
                    step_2 = step_1.find_all("tr", recursive=False)[3]
                    step_3 = step_2.find_all("td", recursive=False)[1]
                    step_4 = step_3.find("table")
                    step_5 = step_4.find("tr")
                    step_6 = step_5.find("td")
                    step_7 = step_6.find("table")

                    #find avg unit size
                    userpanel = userpage.select_one("#frm_profile")
                    userpanel_table = userpanel.find("table")
                    tr2 = userpanel_table.find_all("tr")[1]
                    tr2_td = tr2.find_all("td")[1]
                    tr2_td_table = tr2_td.find("table")
                    tr2_td_table_tr = tr2_td_table.find_all("tr")[5]
                    avg_bet = tr2_td_table_tr.find_all("td")[3].text.strip()

                    #find straight pick stats
                    target_trs = step_7.find_all("tr", recursive=False)[3]
                    target_trs_td = target_trs.find("td")
                    target_trs_td_table = target_trs_td.find("table")
                    sp_trs = target_trs_td_table.find_all("tr")

                    big_fav_tds = sp_trs[1].find_all("td")
                    sm_fav_tds = sp_trs[2].find_all("td")
                    sm_dog_tds = sp_trs[3].find_all("td")
                    big_dog_tds = sp_trs[4].find_all("td")

                    big_fav = {"total_picks": big_fav_tds[1].text, "roi": big_fav_tds[7].text}
                    sm_fav = {"total_picks": sm_fav_tds[1].text, "roi": sm_fav_tds[7].text}
                    sm_dog = {"total_picks": sm_dog_tds[1].text, "roi": sm_dog_tds[7].text}
                    big_dog = {"total_picks": big_dog_tds[1].text, "roi": big_dog_tds[7].text}

                    betting_stats = {
                        "user": href,
                        "user_stats" : {
                            "avg_bet": avg_bet,
                            "big_fav": big_fav,
                            "sm_fav": sm_fav,
                            "sm_dog": sm_dog,
                            "big_dog": big_dog
                        }
                    }
                    user_stats.append(betting_stats)
                    scraped_users.add(href)
                    delay = random.uniform(5.1, 8.7)
                    time.sleep(delay)
                else: 
                    print(f"Failed to scrape {userurl}: HTTP {response.status_code.code}")
            except requests.HTTPError as e:
                print(f"Failed to sceape {userurl}: {e}")
            except Exception as e:
                print(f"An error has occurred while scraping {userurl}: {e}")
        else: 
            print(f"{href} has already been scraped, skipping...")


# with open("userstats_4_11", "w") as json_file:
#     json.dump(user_stats, json_file, indent=2)

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["user_betstats"]
collection = db["4_11_24"]
collection.insert_many(user_stats)