# STEP 14 : 반복문 (while)
# while 은 조건이 True인 동안 코드를 계속 반복
# break 는 멈춤 버튼 — while 안에서 만나면 반복을 즉시 멈추고 빠져나옴

# --- while + 숫자 조건 — 카운트다운 ---
number = 5
while number > 0:
    print(number)
    number -= 1
print("발사!")
# 5 4 3 2 1 발사!

# --- while — 회전목마 N바퀴 ---
lap = 1
while lap <= 3:
    print(f"회전목마 {lap}바퀴!")
    lap += 1
print("끝!")

# --- while True + break — 올바른 입력 받을 때까지 반복 ---
def meters_to_feet(meters):
    return meters * 3.28084

while True:
    user_input = input("미터 값을 입력해주세요: ")
    try:
        meters = float(user_input)
        feet = meters_to_feet(meters)
        print(f"{meters}m는 {feet:.2f}ft입니다.")
        break          # 성공하면 루프 종료
    except ValueError:
        print("숫자를 입력해주세요. 다시 시도하세요.")

# 요약:
# - for 는 정해진 대상 반복, while 은 조건이 True 인 동안 반복
# - 조건 안에서 값을 바꿔줘야(number -= 1) 무한 루프를 피함
# - 횟수가 정해지지 않은 경우 while True + break 패턴을 씀
