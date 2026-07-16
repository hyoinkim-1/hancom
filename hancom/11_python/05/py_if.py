# STEP 05 : 조건문 (if / elif / else)
# "만약 ~라면" 상황별 판단. 위에서부터 조건을 확인하고 처음 맞는 블록만 실행

# --- 기본 구조 — 비가 오면 우산 챙기기 ---
is_raining = True
if is_raining:
    print("우산을 챙겨요!")   # True이므로 이 줄 실행
else:
    print("우산 없어도 돼요")

# --- elif 활용 — 오늘 기온에 따른 옷차림 ---
temperature = 28  # 오늘 기온 (°C)
if temperature >= 30:
    print("덥다! 반팔 입기")
elif temperature >= 20:
    print("딱 좋아! 가볍게 입기")   # 이 줄 출력 (28 >= 20)
elif temperature >= 10:
    print("쌀쌀해, 겉옷 챙기기")
else:
    print("추워! 두꺼운 코트 입기")

# 요약:
# - if → elif → else 순으로 위에서부터 검사, 처음 True 인 블록만 실행하고 나머지는 건너뜀
# - elif 는 여러 개 가능, else 는 어떤 조건도 안 맞을 때의 기본
# - 들여쓰기(indent)로 블록을 구분하는 것이 파이썬의 핵심 문법
