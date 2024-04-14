import json

with open('user_stats.json', "r") as f:
    data = json.load(f)

for item in data: 
    for key, value in item['user_stats'].items():
        if "total_picks" in value:
            item["user_stats"][key]['total_picks'] = value['total_picks'].split()[0]
        if "roi" in value: 
            item["user_stats"][key]["roi"] = value["roi"].replace("%", "")

with open("user_stats_updated.json", "w") as f:
    json.dump(data, f, indent=2)