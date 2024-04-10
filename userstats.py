import requests
from bs4 import BeautifulSoup

userurl = "https://www.betmma.tips/twofivefive"
response = requests.get(userurl)
userpage = BeautifulSoup(response.text, "html.parser")

step_1 = userpage.find("table")
step_2 = step_1.find_all("tr", recursive=False)[3]
step_3 = step_2.find_all("td", recursive=False)[1]
step_4 = step_3.find("table")
step_5 = step_4.find("tr")
step_6 = step_5.find("td")
step_7 = step_6.find("table")

betting_stats = []



target_trs = target_table.find_all("tr")
big_fav_tds = target_trs[1].find_all("td")
sm_fav_tds = target_trs[2].find_all("td")
sm_dog_tds = target_trs[3].find_all("td")
big_dog_tds = target_trs[4].find_all("td")

big_fav = {"total_picks": big_fav_tds[1], "roi": big_fav_tds[7]}
sm_fav = {"total_picks": sm_fav_tds[1], "roi": sm_fav_tds[7]}
sm_dog = {"total_picks": sm_dog_tds[1], "roi": sm_dog_tds[7]}
big_dog = {"total_picks": big_dog_tds[1], "roi": big_dog_tds[7]}