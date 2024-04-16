from bs4 import BeautifulSoup
import urllib.request as urllib3
from googlesearch import search
from datetime import datetime

def getPage(name):
    nameSplit = name.split()
    if len(nameSplit) > 2:
        del nameSplit[1]
        updatedName = " ".join(nameSplit)
    else: 
        updatedName = name    
    query = "site:ufcstats.com " + updatedName
    for i in search(query, tld="com", num=3, stop=1, pause=2):
        url = i

        fighterpage = urllib3.urlopen(url)
        soup = BeautifulSoup(fighterpage, "html.parser")
        return soup

def getStats(name):
    soup = getPage(name)

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

test = getStats("marina alcalde rodriguez")
print(test)
