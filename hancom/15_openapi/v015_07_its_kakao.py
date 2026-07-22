"""
07 : 카카오 Local API — 장소 검색·주소 변환

카카오가 제공하는 장소 검색, 좌표-주소 변환 API.
REST API 키 하나로 카카오맵·카카오톡 등 다양한 카카오 서비스에 연동 가능.

API 키 발급
  • 카카오 개발자 : https://developers.kakao.com
  • 앱 생성 → 앱 키 → REST API 키 복사
"""

import requests

API_KEY = "YOUR_REST_API_KEY"
url = "https://dapi.kakao.com/v2/local/search/keyword.json"

headers = {"Authorization": f"KakaoAK {API_KEY}"}
params = {
    "query": "강남역 카페",
    "size": 5
}

res = requests.get(url, headers=headers, params=params)
places = res.json()["documents"]
for p in places:
    print(p["place_name"], "|", p["address_name"])
