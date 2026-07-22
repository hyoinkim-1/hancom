"""
04 : 함수로 정리하기 (함수 분리 & 재사용)

반복되는 API 호출 코드를 def its_cctv() 함수로 묶음
→ 다른 파일에서 import 한 줄로 CCTV URL 획득

함수화의 장점
  • 재사용    — 다른 파일 import 한 줄로 사용
  • 매개변수  — cctv_index 값만 바꿔 원하는 CCTV 선택
  • 가독성    — 메인 로직에서 API 세부 코드 은닉 → 깔끔
  • 유지보수  — API 주소·키 바뀌어도 함수 1곳만 수정
"""

import urllib.request, json
import pandas as pd


# (왜 함수화?) STEP 02 코드 한 덩어리 → 매번 복붙 비효율
#              함수로 묶으면 다른 파일에서 1줄로 재사용, 인덱스만 바꿔 호출
def its_cctv(cctv_index=77):     # 매개변수 기본값 77 → 안 넣어도 동작
    key = "db5c00dc1fce45c49049bff225a0fea6"
    Type, getType = "its", "json"
    minX, maxX, minY, maxY = 120.95, 127.02, 30.55, 37.69

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
    test_url = cctv_play["cctvurl"][cctv_index]
    print(f"선택된 CCTV URL : {test_url},  CCTV 번호 : {cctv_index}")
    return test_url      # 함수 결과 → 호출한 쪽이 받아 사용


# 함수 가져와서 YOLO 통합
# 다른 파일에서는 : from v015_04_its_function import its_cctv
if __name__ == "__main__":
    from ultralytics import YOLO
    import cv2

    # 함수 한 줄로 URL 획득 → STEP 02·03 코드 17줄이 이제 1줄로 압축
    test_url = its_cctv(50)            # 50번 CCTV 선택, 다른 번호로 자유 변경

    cap = cv2.VideoCapture(test_url)   # URL → 프레임 캡처 객체
    model = YOLO("yolo11n.pt")         # 학습된 가중치 로드

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print("프레임 읽기 실패")
            break

        results = model(frame)          # 탐지 실행
        annotated = results[0].plot()   # 박스·라벨 그리기

        cv2.namedWindow("ITS_YOLO", cv2.WINDOW_AUTOSIZE)    # 창 크기 자동
        cv2.imshow("ITS_YOLO", annotated)

        if cv2.waitKey(1) & 0xFF == ord('q'):               # q → 종료
            break

    cap.release()             # 스트림 해제 (필수)
    cv2.destroyAllWindows()   # 창 모두 닫기
