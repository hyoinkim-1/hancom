# STEP 02 : 기초 연산 (Operations)
# 산술 연산자와 코드를 줄여주는 복합 대입 연산자

# --- 산술 연산자 ---
a = 5
b = 2
print(a + b)   # 7    덧셈
print(a - b)   # 3    뺄셈
print(a * b)   # 10   곱셈
print(a / b)   # 2.5  나눗셈
print(a // b)  # 2    몫
print(a % b)   # 1    나머지
print(a ** b)  # 25   거듭제곱

# --- 문자열 연산 ---
s1 = "hello"
s2 = "world"
print(s1 + s2)  # helloworld  (이어붙이기)
print(s1 * 2)   # hellohello  (반복)

# --- 복합 대입 연산자 ---
# score += 10 은 score = score + 10 의 짧은 표현 — 반복문에서 자주 등장
score = 0
score += 10    # 10  ( score = score + 10 )
score -= 3     # 7   ( score = score - 3  )
score *= 2     # 14  ( score = score * 2  )
score /= 2     # 7.0 ( score = score / 2  )

# 요약:
# - / 는 항상 float 반환(2.5), // 는 몫만, % 는 나머지, ** 는 거듭제곱
# - 문자열도 + 로 잇고 * 로 반복 가능
# - +=, -=, *=, /= 로 자기 자신을 갱신 (누적 계산에 필수)
