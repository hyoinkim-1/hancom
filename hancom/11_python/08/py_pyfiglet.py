# STEP 08 : pyfiglet — 아스키 아트
# 텍스트를 큼지막한 아스키 아트로 변환해주는 외부 라이브러리

# 설치:
#   pip install pyfiglet

# --- 사용 예제 ---
import pyfiglet

sentence = pyfiglet.figlet_format("Hello")
print(sentence)

# 요약:
# - figlet_format(문자열) 에 문자열을 넘기면 큰 아스키 아트 문자열을 돌려줌
# - 외부 라이브러리라 pip install 로 먼저 설치해야 함
