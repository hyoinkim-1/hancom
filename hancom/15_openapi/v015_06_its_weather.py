"""
06 : 공공데이터포털 — 기상청 단기예보 API

기상청이 제공하는 초단기·단기 날씨 예보 데이터.
공공데이터포털(data.go.kr)에서 무료로 키를 발급받아 사용.

API 키 발급
  • 공공데이터포털 : https://www.data.go.kr
  • 검색 : "기상청 단기예보" → 활용신청 → Service Key 발급
"""

import requests

API_KEY = "YOUR_SERVICE_KEY"
url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"

params = {
    "serviceKey": API_KEY,
    "numOfRows": 10,
    "pageNo": 1,
    "dataType": "JSON",
    "base_date": "20250427",  # YYYYMMDD
    "base_time": "0500",      # 예보 기준 시각
    "nx": 60,                 # 서울 격자 X
    "ny": 127                 # 서울 격자 Y
}

res = requests.get(url, params=params)
items = res.json()["response"]["body"]["items"]["item"]
for item in items[:5]:
    print(item["category"], item["fcstValue"])
