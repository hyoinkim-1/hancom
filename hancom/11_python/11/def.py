# STEP 11 : 함수 (def)
# 자주 쓰는 코드를 이름표를 붙여 묶어 둔 재사용 상자
# 한 번 정의하면 어디서든 같은 이름으로 불러 동일한 작업을 반복 가능

import pyfiglet

# 독스트링("""...""")       : 함수 첫 줄에 적는 설명서 (역할·매개변수·반환값)
# 매개변수 타입 힌트(: str)   : 받을 값의 자료형 표시
# 반환 타입 힌트(-> None)    : 돌려줄 값의 자료형 표시 (def 줄 끝에 화살표로)
def good_sentence(sentence: str) -> None:
    """
    입력된 문자열을 pyfiglet 형식으로 출력합니다.
    매개변수: sentence (str)
    반환: None — 출력만 수행
    """
    py_sentence = pyfiglet.figlet_format(sentence)
    print(py_sentence)

good_sentence("GOOD")

# 요약:
# - def 함수명(매개변수): 로 함수를 정의하고, 함수명(인자) 로 호출
# - 타입 힌트(: str, -> None)와 독스트링은 강제는 아니지만 가독성·안전성을 높임


def meter_to_feet(meter : float) -> float :
    feet = meter * 3.280804
    return feet

print(meter_to_feet(10))