import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()  # 같은 폴더 .env → 환경변수로 로드

# 1단계 → 왜: 매 요청마다 인증·라우팅 반복 불필요. 어떻게: 클라이언트 1회 생성 후 재사용
client = InferenceClient(provider="auto",
                         api_key=os.environ["HUG_KEY"])  # auto → 무료 서버 자동 선택

# 2단계 → 왜: 모델 입력은 문자열 필수. 어떻게: input()으로 콘솔 1줄 수집
answer = input("질문을 입력해주세요. : ")

# 3단계 → 왜: LLM은 단일 질문 아닌 "대화 이력" 입력 받음. 어떻게: messages 리스트로 역할-내용 페어 전달
completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3.2:novita",  # :novita → novita.ai 무료 라우팅
    messages=[
        {
            "role": "user",       # 발화자 구분 (user/assistant/system)
            "content": answer     # 실제 질문 본문
        }
    ],
)

# 4단계 → 왜: API는 후보 답변 N개 반환 가능. 어떻게: choices[0]로 첫 응답 추출
print(completion.choices[0].message)