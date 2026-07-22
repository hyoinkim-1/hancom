from transformers import pipeline

# 1. 요약 파이프라인 생성
# (왜) T5는 "task prefix + 입력 → 출력" 형태로 학습된 다목적 모델 → pipeline이 "summarize: " 접두사 자동 부착
# (참고) pipeline은 모델을 로컬로 내려받아 실행 → API 키 불필요
summarizer = pipeline("summarization", model="t5-small")
# (왜) Helsinki opus-mt에는 쓸 만한 en→ko 모델이 없음 → 다국어 모델 m2m100 사용
#      src_lang/tgt_lang으로 언어쌍 지정 (최초 1회 약 2GB 다운로드)
translator = pipeline("translation", model="facebook/m2m100_418M",
                      src_lang="en", tgt_lang="ko")
# 2. 요약할 원문 (영어 단락)
text = """A special 25th anniversary edition of the extraordinary
international bestseller... Santiago's journey teaches us about
the essential wisdom of listening to our hearts..."""

# 3. 요약 실행 (길이 옵션 지정)
# (왜) 기본값은 모델마다 다름 → 명시 지정해야 결과 길이 예측 가능
summary = summarizer(
    text,
    min_length=20,   # 최소 토큰 수 → 너무 짧은 요약 방지
    max_length=60,   # 최대 토큰 수 → 길이 폭주 방지
    do_sample=False  # 결정적(greedy) 생성 → 매번 동일 결과
)  # 반환: [{'summary_text': str}] 리스트

# 4. 결과 텍스트 추출 → 출력
sum_text = summary[0]['summary_text']  # 첫 결과의 'summary_text' 키 → 요약 문자열
trans_res = translator(sum_text)
print(f"요약된 문장 : {sum_text}")
print(f"번역된 문장 : {trans_res[0]['translation_text']}")