"""
08 : 네이버 Open API — 뉴스·책·쇼핑 검색

네이버 검색 결과를 API로 가져옴.
Client ID와 Client Secret 2가지 API 키를 헤더에 담아 사용.

API 키 발급
  • 네이버 개발자 : https://developers.naver.com
  • 애플리케이션 등록 → Client ID / Client Secret 발급

검색 타입별 엔드포인트
  • 뉴스   : /v1/search/news.json
  • 책     : /v1/search/book.json
  • 쇼핑   : /v1/search/shop.json
  • 블로그 : /v1/search/blog.json
"""

import requests

CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
url = "https://openapi.naver.com/v1/search/news.json"

headers = {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET
}
params = {
    "query": "인공지능",
    "display": 5,
    "sort": "date"
}

res = requests.get(url, headers=headers, params=params)
for item in res.json()["items"]:
    print(item["title"], "|", item["pubDate"])
