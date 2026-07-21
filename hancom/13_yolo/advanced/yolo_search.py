from ultralytics import solutions
import ssl, certifi
# Windows 인증서 저장소에 손상된 항목이 있어 기본 컨텍스트 생성이 실패함 → certifi 번들 사용
ssl._create_default_https_context = lambda *a, **k: ssl.create_default_context(cafile=certifi.where())

# 1. 검색 앱 생성 — CPU에서 동작 (GPU면 "cuda")
app = solutions.SearchApp(
    data="captured_images",  # 내 사진 폴더 (선택)
    device="cpu"
)

# 2. 웹 서버 실행 → 브라우저에서 자동 오픈
app.run(debug=True)   # 개발용 / 운영 시 False