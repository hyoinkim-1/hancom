from ultralytics import YOLO
import cv2

stream_url = "https://strm1.spatic.go.kr/live/57.stream/playlist.m3u8"

cap = cv2.VideoCapture(stream_url)

model = YOLO("yolo11n.pt")

while cap.isOpened():                        # 스트림이 정상 열려 있는 동안 반복
    success, frame = cap.read()              # 프레임 한 장 읽기 (success=True/False, frame=이미지)
    if not success:
        print("CCTV URL 확인 또는 웹캠 확인해주세요.")
        break                                # 읽기 실패 → 루프 종료
    
    results = model.track(frame, persist=True, conf=0.6)
    anotated_frame = results[0].plot()

    cv2.namedWindow("YOLO_TRACKING", cv2.WINDOW_NORMAL)    
    cv2.imshow("YOLO_TRACKING", anotated_frame)            # 창에 프레임 표시 (창 제목="CCTV URL")

    # 'q' 키 누르면 종료 (waitKey 없으면 영상이 안 보임)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("q키를 눌러서 종료")
        break                                # q 키 입력 시 루프 탈출

cap.release()              # 스트림 자원 해제
cv2.destroyAllWindows()    # 모든 OpenCV 창 닫기