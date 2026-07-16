# STEP 03 : 리스트 (List)
# 순서가 있고 · 수정 가능하며 · 중복을 허용하는 자료형

# --- 인덱싱 & 슬라이싱 ---
colors = ["red", "green", "blue"]
print(colors[0])    # red    (첫 번째)
print(colors[-1])   # blue   (마지막)
print(colors[0:2])  # ['red', 'green']  (슬라이싱: 시작 포함, 끝 미포함)

# --- 값 변경 & 주요 메서드 ---
colors[-1] = "black"         # 값 변경
colors.append("pink")        # 끝에 추가
colors.insert(0, "white")    # 특정 위치에 삽입
colors.remove("white")       # 값으로 제거

numbers = [8, 5, 3, 2, 7]
numbers.sort()               # 오름차순 정렬
numbers.sort(reverse=True)   # 내림차순 정렬
numbers.reverse()            # 순서 뒤집기
print(2 in numbers)          # True (포함 여부)

# 요약:
# - 인덱스는 0부터, 음수 인덱스는 뒤에서부터(-1 = 마지막)
# - 슬라이싱 [a:b] 는 a 이상 b 미만
# - append/insert/remove 로 원소 조작, sort/reverse 로 정렬, `in` 으로 포함 검사
