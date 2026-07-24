---
description: 오늘 git 작업 내역을 스탠드업 형식으로 요약
allowed-tools: Bash(git log:*), Bash(git status:*), Bash(git diff:*)
---

오늘 날짜의 git 커밋과 변경사항입니다:

- 오늘 커밋: !`git log --since=midnight --oneline`
- 현재 상태: !`git status --short`

위 내용을 한국어 스탠드업 형식으로 요약해줘:

- 🟢 **어제/오늘 한 일**: 커밋 기준 3줄 이내
- 🟡 **진행 중**: 아직 커밋 안 된 변경 파일
- 🔴 **막힌 것 / 다음 할 일**: 있으면 추정해서, 없으면 "없음"

이모지와 불릿으로 간결하게.
