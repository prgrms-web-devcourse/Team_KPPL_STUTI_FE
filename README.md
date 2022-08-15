# STU·TI

<br/>

### **스터티아이** - MBTI 기반 개발 스터디 모집 서비스

<br/>

스터티아이는 개발 스터디 모집 또는 참여시 MBTI를 추천하여  
잘 맞는 성향의 사람끼리 스터디를 구성할 수 있게 도움을 줍니다.  

또한 스터티아이 커뮤니티를 통해  
스터디 진행이 막힐 때 도움을 요청하거나  
스터디 관련 정보 또는 배운 내용을 공유할 수 있습니다.

<br/>

👉 [프로젝트 바로가기](https://stu-ti.netlify.app/)  
👉 [백엔드 깃허브](https://github.com/prgrms-web-devcourse/Team_KPPL_STUTI_BE)

![미리보기](https://user-images.githubusercontent.com/73787590/184567810-e01273da-1904-4e0f-a6b7-c4457db99ba0.jpg)

<br/>

## 👬 TEAM 김팽박이 

#### 프론트엔드

| 이름 | 개발 | 기타 |
| :---: | :---: | :---: | 
| [팽건우(Paeng)](https://github.com/GeonWooPaeng) | 커뮤니티 게시물 목록 / 게시물 생성 / 게시물 수정 | 화면 및 기능 명세 |
| [김가연(Kaia)](https://github.com/lexie-kaia) | 스터디 목록 / 프로필 상세 / 프로필 수정 | 디자인 |
| [김정환(Padd)](https://github.com/padd60) | 스터디 상세 / 스터디 관리| 보일러 플레이트 |
| [박민제(Jay)](https://github.com/mieumje) | 스터디 생성 / 스터디 수정 | 코딩 컨벤션 문서화 |
| [이재웅(Mckee)](https://github.com/jaeung-E) | 로그인 / 회원가입 / 레이아웃 / 라우터 처리 | 깃 & 깃허브 워크플로우 |

#### 백엔드

| 이름 | 역할 | 
| :---: | :---: |
| [김성현(LA)](https://github.com/Gosh95) | Leader |
| [이용훈(Cheeseball)](https://github.com/YHLEE9753) | Developer |
| [이예림(Celine)](https://github.com/Leeyerimearth) | Developer |
| [이인후](https://github.com/ordilov) | Advisor |

<br/>

## 📅 개발 일정

2022.07.20~2022.08.16(28일)

| 구분 | 기간 | 항목 |
| :---: | :---: | :---: | 
| 1 | 07.20~07.26(7일) | 프로젝트 기획 |
| 2 | 07.27-08.07(12일) | 프론트엔드/ 백엔드 기능 개발 |
| 3 | 08.08~08.12(5일) | 통합 개발 및 배포 테스트 |
| 4 | 08.13~08.16(4일) | 버그픽스 및 리팩토링 |

<br/>

## 💻 기술 스택

#### 언어
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

#### 라이브러리
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/mui-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-D26AC2?style=for-the-badge)
![Storybook](https://img.shields.io/badge/storybook-FF4785.svg?&style=for-the-badge&logo=Storybook&logoColor=white)
![Axios](https://img.shields.io/badge/axios-%23323330.svg?style=for-the-badge) <br>

#### 배포
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

<br/>

## 📂 폴더 구조
```
src
├─ assets
│
├─ constants
├─ interfaces
├─ utils
├─ apis
│
├─ hooks
├─ stores
├─ styles
│
├─ components : 반복해서 사용되는 UI 요소를 정의하는 컴포넌트
├─ containers : 데이터를 읽고 가공해서 다른 컴포넌트로 전달하는 컴포넌트
├─ layout
├─ pages
├─ router
│
├─ App.tsx
└─ index.tsx
```

<br/>

## ➡️ Git & Github 워크플로우
[Git & Github 워크플로우](https://github.com/prgrms-web-devcourse/Team_KPPL_STUTI_FE/wiki/Git-&-Github-워크플로우)

<br/>

## 📋 코딩 컨벤션
[코딩 컨벤션](https://github.com/prgrms-web-devcourse/Team_KPPL_STUTI_FE/wiki/코딩-컨벤션)

<br/>

## 📩 API 명세
[API 명세](https://stuti.o-r.kr/stuti-api.html)

<br/>

## ✨ 주요 기능

| 구분 | 경로 | 화면 | 기능 |
| :--- | :--- | :---: | :--- | 
| 홈 | / | ![홈-320](https://user-images.githubusercontent.com/73787590/184576966-23ca26f0-1345-41da-bde1-7228eef09251.jpg) | • 스터디 목록, 스터디 삭제<br/>• 무한 스크롤<br/>• 필터 |
| 스터디 상세 | /study/:study_id | --- | • 스터디 상세 정보<br/>• 댓글 목록, 생성, 수정, 삭제 |
| 스터디 관리 | /study/:study_id/manage | --- | • 스터디 멤버 관리<br/>• 스터디 삭제 |
| 스터디 생성 | /study/create | --- | • 스터디 생성<br/>• 폼 유효성 검사 |
| 스터디 수정 | /study/:study_id/edit | ---  | • 스터디 수정 |
| 커뮤니티 | /community | --- | • 게시물 목록, 생성, 수정, 삭제<br/>• 댓글 목록, 생성, 수정, 삭제<br/>• 폼 유효성 검사<br/>• 무한 스크롤 |
| 프로필 상세 | /user/:user_id | --- | • 프로필 상세 정보<br/>• 스터디 목록<br/>• 게시물 목록 |
| 프로필 수정 | /user/:user_id/edit | --- | • 프로필 수정 |
| 회원 가입 | /signup | --- | • 회원가입 |
| 로그인 | /login | --- | • Oauth 처리 |

<br/>

## 📝 진행 과정
👉 [Notion 김팽박이](https://www.notion.so/backend-devcourse/01-f594a595e5784b9aafb16b116954b667)

<br/>

## 🧐 회고

- [팽건우(Paeng)]()
- [김가연(Kaia)]()
- [박민제(Jay)]()
- [김정환(Padd)]()
- [이재웅(Mckee)]()

<br/>


