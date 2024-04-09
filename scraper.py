import requests
from bs4 import BeautifulSoup

url = "https://www.betmma.tips/free_ufc_betting_tips.php?Event=1444"

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

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

second_td = []
for tr_element in first_tr_elements:
    second_td_element = tr_element.find_all("td", recursive=False)
    second_td.append(second_td_element[1])

#fighter_pairs will hold the matchup info

fighter_pairs = []
for td_element in second_td:
    a_elements = td_element.find_all("a")
    fighter_names = []
    for a_element in a_elements:
        if a_element.text.strip() and len(fighter_names) < 3:
            fighter_names.append(a_element.text.strip())
            
    fighter_pair = {
        "fighter1": {"name": fighter_names[0]},
        "fighter2": {"name": fighter_names[2]}
    }
    fighter_pairs.append(fighter_pair)


#this table holds the betting tips for both fighters
tips_table = second_td[0].find("table")
fighter1_td = tips_table.find("td")

fighter1_a_elements = fighter1_td.find_all("a")
fighter1_tips = []

for a_element in fighter1_a_elements:
    text = ""
    next_sibling = a_element.next_sibling
    while next_sibling:
        if isinstance(next_sibling, str):
            
            text += next_sibling.strip()
        else:
            
            break
       
        next_sibling = next_sibling.next_sibling
    

    fighter1_tips.append(text.strip())


# for a_element in fighter1_a_elements:
#     href = a_element.get("href")
#     next_sibling = a_element.find_next_sibling()
#     text = ""
#     while next_sibling:
#         if isinstance(next_sibling, str):
#             text += next_sibling.strip()
#         elif " @" in next_sibling.get_text():
#             text += next_sibling.get_text().strip()
#             break
#         next_sibling = next_sibling.find_next_sibling()
#     amount, odds = text.split("@")
#     fighter1_tips.append({"href": href, "amount": amount.strip(), "odds": odds.strip()})

print(fighter1_tips)
# first_td = second_td_elements[0]
# first_td_html = str(first_td)
# with open("first_td.html",  "w", encoding="utf-8") as f:
#     f.write(first_td_html)

# for index in range(0, len(matchups), 2):
#     table = matchups[index]
#     matchups_text=str(table.prettify())
#     with open(f"matchup_{index}", "w", encoding="utf-8") as f:
#         f.write(matchups_text)

