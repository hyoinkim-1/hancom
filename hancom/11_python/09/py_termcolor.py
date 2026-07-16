# STEP 09 : termcolor — 컬러 출력
# 글자색·배경색·스타일을 적용해 터미널 출력을 컬러풀하게 꾸며주는 외부 라이브러리

# 설치:
#   pip install termcolor

# --- 사용 예제 ---
from termcolor import colored

# colored(문자열, 글자색, 배경색, attrs=[스타일])
result = colored("Hello", "red", "on_green", ["bold"])
print(result)

# 요약:
# - colored(문자열, 글자색, 배경색, [스타일]) 형태로 꾸민 문자열을 돌려줌
# - 배경색은 "on_green" 처럼 on_ 접두어, 스타일은 ["bold"] 같은 리스트로 전달
