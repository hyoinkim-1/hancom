"""
03 : YOLO로 실시간 탐지 (YOLO + ITS)

ITS API CCTV URL → cv2.VideoCapture 연결 → 프레임 반복 → YOLO로 차량·사람 탐지

포인트
  • cv2.VideoCapture(URL)  — 웹캠 번호(0,1...) 대신 스트림 URL → IP 카메라·CCTV 동일 처리
  • cap.isOpened()         — 스트림 살아있는 동안 while 반복
  • cv2.WINDOW_NORMAL      — 창 크기 마우스 조절 가능 (기본은 고정 크기)
  • q 키 종료              — waitKey(1) & 0xFF == ord("q"), 1ms 대기 + 키 비트 추출
  • cap.release() + destroyAllWindows() — 자원 반환 필수, 안 하면 다음 실행 시 카메라 잠김
"""

from ultralytics import YOLO
import cv2                     # 영상·이미지 처리 도구 (OpenCV)
import urllib.request, json
import pandas as pd

key = "db5c00dc1fce45c49049bff225a0fea6"   # ITS 인증 키
Type, getType = "its", "json"
minX, maxX, minY, maxY = 120.95, 127.02, 30.55, 37.69

# 1. API → CCTV URL : ITS 서버에서 CCTV 목록 받아 표로 정리
url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}&getType={getType}"
)
response = urllib.request.urlopen(url_cctv)
json_object = json.loads(response.read().decode("utf-8"))
cctv_play = pd.json_normalize(
    json_object["response"]["data"], sep=''
)

# 2. 1000번 CCTV 선택
test_url = cctv_play["cctvurl"][1000]

# 3. 비디오 스트림 열기
#    (왜?) URL은 단지 "주소" → 실제 프레임을 받으려면 캡처 객체(cap)에 연결
cap = cv2.VideoCapture(test_url)

# 4. YOLO 모델 로드 → 학습된 가중치 파일(.pt)을 메모리에 올림
model = YOLO("yolo11n.pt")

# 5. 프레임 반복 처리
#    (왜 while?) 영상은 시간축 → 끝날 때까지 한 장씩 계속 받아야 실시간 처리
while cap.isOpened():              # 스트림 살아있는 동안 반복
    success, frame = cap.read()    # 다음 프레임 1장 가져옴
    if not success:                # 프레임 못 받으면 종료
        print("프레임 읽기 실패 . . .")
        break

    results = model(frame)         # 탐지 실행 → 박스·라벨 결과
    annotated = results[0].plot()  # 결과를 그림 위에 박스로 그리기

    cv2.namedWindow("OPENAPI", cv2.WINDOW_NORMAL)   # 창 크기 자유 조절
    cv2.imshow("OPENAPI", annotated)                # 화면에 표시

    # (왜 waitKey & 0xFF?) 1ms 대기하며 키 입력 받음 → q 누르면 루프 탈출
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# 6. 자원 해제
cap.release()             # 스트림 닫기
cv2.destroyAllWindows()   # 모든 창 닫기
