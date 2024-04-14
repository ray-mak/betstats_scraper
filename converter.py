import json

with open('user_stats.json', "r") as f:
    data = json.load(f)

filteredData = []
for item in data: 
    isNan = False
    for key, value in item['user_stats'].items():
        if "roi" in value and value["roi"] == "nan":
            isNan=True
        if "total_picks" in value:
            item["user_stats"][key]['total_picks'] = value['total_picks'].split()[0]
        if "roi" in value: 
            item["user_stats"][key]["roi"] = value["roi"].replace("%", "")
    if not isNan:
        filteredData.append(item)

with open("user_stats_updated.json", "w") as f:
    json.dump(filteredData, f, indent=2)