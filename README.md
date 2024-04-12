# Betting Stats Scraper

First commit - created a scraper to collect the matchups and usernames of users who posted their picks. There was a bit of difficulty navigating to the element that contained these matchups. After locating these matchup elements, I scraped the fighter names, users, and user betting information from each element and stored them in a variable, fighter_pairs

Second commit - The first commit was actually to scrape user data from the first matchup. I did it to practice the code. This second commit is to integrate that code into my fighter pairs function so that it scrapes the user data for each matchup.

Third commit - I created a separate python file to scrape individual user data. This way I can test the code without having to run it on every user. 

Fourth commit - I created a separate file to collect data on a fighters ROI on when they're an underdog and when they're a favorite. This will be added to the main scraper file.

Fifth commit - I updated the userstats.py and fighterstats.py to scrape all the data that was created by scraper.py. I decided not to integrate it into the scraper.py function to keep things more organized. 