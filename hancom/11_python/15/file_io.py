# STEP 15 : 파일 입출력 (with)
# with 는 파일을 다 쓰면 자동으로 닫아주는 안전장치
# 들여쓴 블록이 끝나면 알아서 닫혀 데이터 손실·자원 낭비를 막아줌

# --- 파일 쓰기 — "w" 모드 (없으면 새로, 있으면 덮어쓰기) ---
with open("./memo.txt", "w", encoding="utf-8") as f:
    f.write("안녕, 파이썬!\n")
    f.write("with문이 자동으로 닫아줌\n")
# 블록을 빠져나오면 파일은 알아서 닫힘

# --- 파일 읽기 — "r" 모드 ---
with open("./memo.txt", "r", encoding="utf-8") as f:
    text = f.read()          # read()=전체 한 번에, readlines()=줄 단위 리스트
print(text)

# --- 이어 쓰기 — "a" 모드 (append) ---
with open("./memo.txt", "a", encoding="utf-8") as f:
    f.write("새로운 한 줄 추가\n")
# 기존 내용은 그대로, 끝에만 한 줄이 더 붙음

# 요약 — 세 가지 모드만 기억:
# - "w" 새로 쓰기 (기존 내용 덮어쓰기)
# - "r" 읽기
# - "a" 이어 쓰기 (기존 뒤에 덧붙이기)
# - 한글 깨짐 방지를 위해 encoding="utf-8" 명시 권장
