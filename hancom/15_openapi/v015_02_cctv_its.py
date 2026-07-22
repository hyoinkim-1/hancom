"""
02 : CCTV 스트림 URL 받아오기

urllib로 API 호출 → JSON 응답 → pandas DataFrame 변환 → CCTV URL 선택

단계별 흐름
  ① 인증 키 → ② 도로 유형·영역 → ③ URL 조립 → ④ 요청
  → ⑤ bytes→str 디코딩 → ⑥ JSON 파싱 → ⑦ DataFrame 변환 → ⑧ CCTV URL 선택

핵심 함수
  • urllib.request.urlopen(url)          — 자료 요청하고 응답(response) 받기
  • response.read().decode("utf-8")      — bytes → str(한글 글자)
  • json.loads(json_str)                 — str → dict(파이썬 사전)
  • pd.json_normalize(data)              — 중첩 사전 → 평평한 표(DataFrame)
"""

import urllib.request   # 인터넷 주소로 자료 요청하는 도구
import json             # 글자로 된 자료를 사전(dict) 모양으로 바꾸는 도구
import pandas as pd     # 자료를 엑셀 같은 표로 다루는 도구

# 1. 인증 키 → 정부 사이트에서 받은 "비밀 번호", 이게 있어야 자료 줌
key = "db5c00dc1fce45c49049bff225a0fea6"

# 2. 도로 유형 (its=일반도로, ex=고속도로)
Type = "its"

# 3. 관심 영역 (경도·위도 범위) → 지도 위 사각형 안 CCTV만 요청
minX, maxX = 120.95, 127.02   # 동서(가로) 범위
minY, maxY = 30.55, 37.69     # 남북(세로) 범위
getType = "json"              # 응답 형식

# 4. API URL 조립
url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}&getType={getType}"
)

# 5. 요청 → 응답
response = urllib.request.urlopen(url_cctv)

# 6. bytes → str → dict
#    (왜 디코딩?) 서버는 전송용 bytes로 보냄 → 사람이 읽으려면 str로 풀어야 함
#    (왜 JSON 파싱?) str은 글자 덩어리 → dict여야 ["키"]로 값 접근 가능
json_str = response.read().decode("utf-8")   # bytes → str
json_object = json.loads(json_str)           # str → dict

# 7. 데이터프레임 변환 → 중첩 dict를 평평한 표로 펴서 행/열 인덱싱
cctv_play = pd.json_normalize(
    json_object["response"]["data"], sep=''
)

# 8. 77번 CCTV URL 출력
test_url = cctv_play["cctvurl"][77]
print(f"선택된 CCTV URL : {test_url}")
