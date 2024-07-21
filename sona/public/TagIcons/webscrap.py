import requests
from bs4 import BeautifulSoup

filename = [
  "AttackDamage",
  "CritChance",
  "AttackSpeed",
  "ArmorPenetration",
  "On-Hit",
  "LifeSteal",
  "AbilityPower",
  "Mana",
  "MagicPenetration",
  "Health",
  "Armor",
  "MagicResist",
  "AbilityHaste",
  "MovementSpeed",
  "Omni-Vamp",
  "ManaRegen",
];

r = requests.get('https://lolshop.gg/')
soup = BeautifulSoup(r.content, 'html.parser')

s = soup.findAll('svg', class_='Filters_statIcon__ZVthK') 

res = []
for svg in s:
    svg = str(svg)
    newSVG = svg.replace('fill="none"', 'fill="#A49A7A" xmlns="http://www.w3.org/2000/svg"')
    newSVG = newSVG.replace('<svg class="Filters_statIcon__ZVthK"', '<svg')
    newSVG = newSVG.replace('viewbox="0 0 48 48"', 'viewBox="0 0 48 48"')
    res.append(newSVG)
res.pop(0)
res.append('<svg fill="#A49A7A" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path clip-rule="evenodd" d="M23.9967 41.7747C17.9651 41.7747 14.587 38.3255 13.2764 35.1092C10.7385 28.8806 16.8119 19.1343 23.9967 6.2251C31.1897 19.1472 37.2729 28.8847 34.7171 35.1092C33.4012 38.314 30.0167 41.7747 23.9967 41.7747Z" fill-rule="evenodd"></path></svg>')
for i in range(len(res)):
    f = open(f"{filename[i]}.svg", "w")
    f.write(res[i])
    f.close()
