# STEP 12 : 반환 (return)
# return 은 함수가 만든 결과를 바깥으로 건네주는 명령어
# print 처럼 그냥 보여주는 게 아니라, 결과를 변수에 담아 다른 곳에서도 쓸 수 있게 함

from termcolor import colored

def highlight(text:str, color:str) -> str:
    return colored(text, color, "on_red", ["bold"])  # 꾸민 텍스트를 돌려줌

msg = highlight("중요 공지!")
print(msg)

# 요약:
# - return 값 : 함수를 즉시 끝내고 그 값을 호출한 쪽으로 돌려줌
# - print 는 화면 출력만, return 은 값을 넘겨줘 재사용 가능 (msg 에 저장)
# - return 이 없으면 함수는 None 을 반환
