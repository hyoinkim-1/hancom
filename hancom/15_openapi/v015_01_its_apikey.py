"""
01 : API 개요 & 키 설정

OpenAPI = 공공기관 데이터 창고의 자동문.
프로그램이 인증키(열쇠)를 들고 들어가 필요한 데이터만 꺼내옴.
여기서는 국토교통부 ITS(지능형교통시스템)에서 전국 도로 CCTV 영상을 가져옴.

서비스 흐름
  1. 인증키 신청 : 홈페이지 회원가입 후 apiKey 발급 요청
  2. 인증키 승인 : 이메일·웹으로 고유 키 전달받음
  3. 데이터 요청 : 키 + 조건(지역·종류)을 담아 URL 호출
  4. 데이터 응답 : 서버가 JSON으로 CCTV 영상 주소 반환

ITS API 주요 파라미터
  apiKey        발급받은 인증 키          db5c00dc...
  type          도로 유형                its(일반도로) / ex(고속도로)
  minX / maxX   경도 범위                120.95 ~ 127.02
  minY / maxY   위도 범위                30.55 ~ 37.69
  getType       응답 형식                json
"""

key = "db5c00dc1fce45c49049bff225a0fea6"
Type, getType = "its", "json"
minX, maxX = 120.95, 127.02
minY, maxY = 30.55, 37.69

# API URL 구조
url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}"
    f"&getType={getType}"
)

print(url_cctv)
