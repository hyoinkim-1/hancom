# STEP 07 : zip() — 두 리스트 짝지어 묶기
# 따로 떨어진 두 리스트를 지퍼처럼 같은 자리끼리 맞물려 한 쌍으로 묶는 함수
# STEP 06 for 문과 짝꿍 — 한 번에 두 리스트를 같이 돌고 싶을 때 사용

# --- 기본 — 두 리스트 같이 돌리기 ---
names = ["뽀삐", "초코", "쿠키"]
scores = [95, 88, 72]
for name, score in zip(names, scores):
    print(f"{name}: {score}점")
# 뽀삐: 95점 / 초코: 88점 / 쿠키: 72점

# --- for문 없이 ① list(zip(...)) 결과 한 번에 받기 ---
pairs = list(zip(names, scores))
print(pairs)
# [('뽀삐', 95), ('초코', 88), ('쿠키', 72)]   -> (이름, 점수) 튜플 리스트

# --- for문 없이 ② dict(zip(...)) 한 줄로 딕셔너리 만들기 ---
keys = ["이름", "나이", "직업"]
values = ["홍길동", 30, "개발자"]
person = dict(zip(keys, values))
print(person)
# {'이름': '홍길동', '나이': 30, '직업': '개발자'}

# 요약:
# - zip() 은 여러 리스트를 같은 자리끼리 묶기만 함 (짝짓기)
# - list(zip(...)) : 번호로 꺼냄  pairs[0]
# - dict(zip(...)) : 이름표(키)로 꺼냄  person["이름"]
# - 길이가 다르면 짧은 쪽 기준으로 끝남
