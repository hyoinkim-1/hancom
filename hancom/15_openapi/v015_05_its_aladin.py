"""
05 : 알라딘 Open API — 도서 검색·베스트셀러·신간

알라딘이 제공하는 도서 관련 Open API.
키워드로 책을 검색하거나 베스트셀러·신간 목록을 가져올 수 있음.

API 키 발급
  • 알라딘 Open API 신청 : https://blog.aladin.co.kr/openapi/popup/6695306
  • API 문서(구글 Docs)  : https://docs.google.com/document/d/1mX-WxuoGs8Hy-QalhHcvuV17n50uGI2Sg_GHofgiePE
"""

import requests

API_KEY = "YOUR_TTB_KEY"
url = "https://www.aladin.co.kr/ttb/api/ItemList.aspx"

params = {
    "ttbkey": API_KEY,
    "QueryType": "Bestseller",  # Bestseller / NewAll / NewSpecial
    "MaxResults": 10,
    "SearchTarget": "Book",
    "output": "js",
    "Version": "20131101"
}

res = requests.get(url, params=params)
data = res.json()
for item in data["item"]:
    print(item["title"], "|", item["author"])
