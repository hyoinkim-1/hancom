from ultralytics import YOLO
import cv2

# 1. 모델 로드
model = YOLO("yolo11n-pose.pt")

# 2. 모델 추론 (이미지 경로 입력)
results = model("./captured_images/image.jpg")

# 3. 결과 시각화
result_image = results[0].plot()

# 4. 결과 이미지 저장
output_image_path = "./captured_images/image-pose.jpg"
cv2.imwrite(output_image_path, result_image)
print(f"예측 결과 이미지가 잘 저장 되었습니다. {output_image_path}")