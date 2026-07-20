from ultralytics import YOLO
import cv2  # OpenCV — 영상 처리·그리기 라이브러리

# 1. CCTV 스트리밍 URL 설정
stream_url = "http://210.99.70.120:1935/live/cctv009.stream/playlist.m3u8"

cap = cv2.VideoCapture(stream_url)            # URL을 열어 영상 캡처 객체 생성
model = YOLO("yolo11n.pt")

WARNING = 10

# 3. 실시간 프레임 처리
while cap.isOpened():                          # 스트림이 열려 있는 동안 반복
    success, frame = cap.read()                # 프레임 한 장 읽기
    if not success:
        print("웹캠을 못 읽었습니다.")
        break                                  # 읽기 실패 → 루프 종료
    
    results = model(frame)
    annotated_frame = results[0].plot()
    # 3-5. 표시할 값 (이후 YOLO 탐지 결과로 교체 가능)
    count = len(results[0].boxes)                                # 탐지된 객체 수 (예시 값)
    if count < WARNING:
        status, color = "safe", (255, 0, 0)                       
        # 상태 문자열 (예: Safe / Warning)
    else:
        status, color = "warning", (0, 0, 255)  
    # color = (255, 0, 0)                       # 글자색 — BGR 순서이므로 파랑

    # 3-6. 탐지 객체 수 및 상태 화면에 표시
    cv2.putText(
        annotated_frame,                                  # ① 글자를 그릴 영상(프레임)
        f"Detected : {count}, {status}",        # ② 출력할 문자열 (f-string 포맷)
        (10, 30),                               # ③ 좌측 상단 시작 좌표 (x=10, y=30)
        cv2.FONT_HERSHEY_SIMPLEX,                # ④ 폰트 스타일 (가장 보편적)
        1,                                      # ⑤ 폰트 크기 배율 (1.0 = 기본)
        color,                                  # ⑥ 글자색 (B, G, R)
        2,                                      # ⑦ 글자 두께 (픽셀)
        cv2.LINE_AA                             # (옵션) 안티앨리어싱 — 글자 매끈하게
    )

    # 3-7. OpenCV 윈도우 출력
    cv2.imshow("CCTV Detection", annotated_frame)        # 글자 그려진 프레임을 창에 띄움

    # 3-8. q 키를 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print('q 키를 눌러서 종료합니다.')
        break

# 4. 자원 해제
cap.release()              # 스트림 해제
cv2.destroyAllWindows()    # 모든 OpenCV 창 닫기