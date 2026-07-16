# STEP 06 : 반복문 for
# 리스트·문자열·range 등에서 요소를 하나씩 꺼내며 반복 작업 수행

# --- 기본 for 반복 ---
mixed = [1, "hello", 3.14, True]
for item in mixed:
    print(item)
# 1
# hello
# 3.14
# True

# --- enumerate — 인덱스 + 값 동시 출력 ---
for index, item in enumerate(mixed):
    print(f"index: {index}, item: {item}")
# index: 0, item: 1
# index: 1, item: hello
# index: 2, item: 3.14
# index: 3, item: True

# 요약:
# - for 변수 in 반복가능객체: 형태로 원소를 하나씩 꺼냄
# - enumerate() 로 감싸면 (인덱스, 값) 을 함께 받을 수 있음
