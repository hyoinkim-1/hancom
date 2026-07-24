# hancom-plugin

오늘 git 작업 내역을 스탠드업 형식으로 요약해주는 Claude Code 커스텀 플러그인.

## 설치

```
/plugin marketplace add hyoinkim-1/hancom
/plugin install hancom-plugin@hancom-marketplace
/reload-plugins
```

## 사용법

```
/standup
```

오늘 커밋과 미커밋 변경사항을 자동으로 긁어서 아래 형식으로 요약해줍니다:

- 🟢 **어제/오늘 한 일** — 커밋 기준
- 🟡 **진행 중** — 아직 커밋 안 된 파일
- 🔴 **막힌 것 / 다음 할 일**

## 구조

```
hancom-plugin/
├── .claude-plugin/plugin.json   # 플러그인 매니페스트
└── commands/standup.md          # /standup 슬래시 명령어
```
