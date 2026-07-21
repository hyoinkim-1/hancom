from ultralytics import solutions

# 실행: streamlit run yolo_streamlit.py
# (python yolo_streamlit.py 로 실행하면 웹서버가 안 뜨고 경고만 나옴)

# 1. Streamlit 추론 인스턴스 생성
inf = solutions.Inference(model="yolo11n.pt")
# 2. 웹 UI 시작
inf.inference()
