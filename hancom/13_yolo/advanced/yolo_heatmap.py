from ultralytics import solutions
import cv2

# 1. 비디오 경로 설정


video_path = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"
cap = cv2.VideoCapture(video_path)

# 2. 모델 로드 및 Heatmap 객체 생성
heatmap = solutions.Heatmap(
    model="yolo11n.pt",
    show=False,
    colormap=cv2.COLORMAP_MAGMA  # 색상 지도 (MAGMA = 보라~노랑)
)

# 3. 비디오 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("비디오 읽기 실패 . . .")
        break

    # 누적 히트맵 갱신 (show=False → 우리가 직접 창을 띄움)
    # 반환값은 SolutionResults 객체 — results[0].plot() 아니라 results.plot_im 사용
    results = heatmap(frame)

    # 처리된 프레임 표시
    cv2.imshow("HEATMAP", results.plot_im)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("q키를 눌러서 종료")
        break

# 4. 자원 해제
cap.release()
cv2.destroyAllWindows()