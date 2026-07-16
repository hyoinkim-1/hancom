# STEP 10 : pyfiglet + termcolor
# 두 라이브러리를 함께 써서 아스키 아트 텍스트에 색상까지 입히기
# figlet_format 으로 만든 텍스트를 colored 에 넘기면 컬러풀한 아스키 아트 완성

# --- 조합 예제 ---
import pyfiglet
from termcolor import colored

py_text = pyfiglet.figlet_format("Hello")
color_text = colored(py_text, "red")
print(color_text)

# --- 배경색 + 스타일까지 ---
py_text2 = pyfiglet.figlet_format("Python")
color_text2 = colored(py_text2, "yellow", "on_blue", ["bold"])
print(color_text2)

# 요약:
# - pyfiglet 로 모양(아스키 아트)을 만들고 -> termcolor 로 색을 입히는 조합
# - 함수의 출력을 다른 함수의 입력으로 넘기는 "함수 연결" 패턴
