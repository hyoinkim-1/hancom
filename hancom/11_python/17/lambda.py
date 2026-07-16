# STEP 17 : 람다 함수 (lambda)
# lambda 는 함수를 한 줄로 짧게 줄여 쓰는 방법
# 짧으니까 한 번 쓰고 버리는 일회용 함수에 잘 어울림

# 양식:  함수명 = lambda 매개변수 : 반환값

fig = lambda text : pyfiglet.figlet_format(text)


# --- 여러 줄 레시피 — 일반 함수 (def) ---
def add(a, b):
    return a + b

print(add(7, 3))  # 10

# --- 한 줄 포스트잇 — 똑같은 일을 람다로 ---
add = lambda a, b: a + b
print(add(7, 3))  # 10

# --- 꾸미기 함수 — pyfiglet 을 람다로 한 줄에 ---
import pyfiglet

# 일반 함수로 만들면 (참고)
# def decorate_text(text):
#     return pyfiglet.figlet_format(text)

# 람다로 한 줄 줄임
decorate_text = lambda text: pyfiglet.figlet_format(text)
print( (lambda text: pyfiglet.figlet_format(text))("hi"))
py_text = decorate_text("Lambda")
print(py_text)

# 요약:
# - lambda 매개변수: 반환값  == 한 줄짜리 익명 함수 (return 없이 뒤의 식이 반환값)
# - 일반 함수 = 긴 편지 / 람다 = 짧은 쪽지
# - 한두 줄로 끝나는 간단한 일엔 람다, 단계가 많으면 def 가 어울림
