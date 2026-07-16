# STEP 13 : 예외 처리 (try / except)
# 오류가 날 수 있는 코드는 try 블록에, 오류 났을 때 할 일은 except 블록에 작성
# try 에서 오류 발생 시 즉시 except 로 이동, 오류 없으면 except 는 건너뜀

# --- 기본 구조 — ValueError (값 형식이 잘못됨) ---
user_input = input("미터 값을 입력해주세요: ")
try:
    meters = float(user_input)   # 숫자 변환 시도
    feet = meters * 3.28084
    print(f"{meters}m는 {feet:.2f}ft입니다.")
except ValueError:
    print("숫자를 입력해주세요.")  # 변환 실패 시 실행

# --- ZeroDivisionError (0으로 나눔) ---
try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌 수 없어요!")

# --- TypeError (서로 다른 타입끼리 연산) ---
try:
    result = "나이: " + 20
except TypeError:
    print("문자열과 숫자는 바로 합칠 수 없어요! str(20) 으로 변환 필요")

# 요약:
# - try: 위험한 코드 / except 오류종류: 대처 코드
# - ValueError(값 형식), ZeroDivisionError(0 나눗셈), TypeError(타입 불일치) 등
#   오류 종류별로 나눠서 잡을 수 있음
