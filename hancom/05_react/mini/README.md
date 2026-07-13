# 간단 가계부

React 학습용 미니프로젝트. 지출을 기록하고 대시보드/캘린더로 확인하는 가계부 앱.

## 목적

- 리액트 기본기 및 라우팅, 내장훅(state, effect, context) 연습
- 디자인 토큰 사용
- 커스텀 훅 사용
- 클로드코드 skill/서브에이전트 사용해보기


## 기능

- 지출 추가/수정/삭제, 카테고리별 분류
- 대시보드: 일별/월별 통계, 카테고리 비중
- 캘린더: 날짜별 지출 내역
- 이름 기반 사용자 구분 (로그인 없이 이름만 입력)
- 다크모드
- 반응형 레이아웃 (모바일에서 폼/통계 카드가 세로로 쌓임)
- TanStack Query + Suspense + ErrorBoundary, 토스트 알림
- 백엔드 `${method} ${url} ${statutsCode}` 형태의 로깅 기능

## 스택

- 프론트: React, React Router, Tailwind CSS, TanStack Query
- 백엔드: Express, MongoDB

## 실행

```bash
npm install
npm run dev          # 프론트 (localhost:5173)
```

백엔드는 `server/` 폴더에서:

```bash
cd server
npm install
```

`server/.env` 파일에 MongoDB 연결 정보 추가:

```
MONGODB_URI=mongodb+srv://...
```

```bash
npm run dev          # .env 읽어서 실행 (localhost:4000)
```

프론트가 다른 백엔드 주소를 쓰게 하려면 프로젝트 루트에 `.env` 만들고:

```
VITE_API_URL=http://localhost:4000
```
