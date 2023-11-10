# Team3_FE

<p align="center">
    <img src="docs/LogoTitle-Orange.png" alt="Logo" width="60%"/>

</p>

<p align="center">번개 지향 볼링 모집 커뮤니티 "번개볼링"의 프론트엔드 레포지토리입니다.</p>

> <p align="center">[카카오 테크 캠퍼스](https://www.kakaotechcampus.com/) 1기 부산대 3조 프로젝트입니다.</p>

## Collaborators

**<p align="center">Frontend</p>**

<div align="center">

|                         리마인더                         |                          타임 키퍼                          |
| :------------------------------------------------------: | :---------------------------------------------------------: |
|          [강주호](https://github.com/kjh302903)          |          [허동혁](https://github.com/Heo-Donghyuk)          |
| <img src="https://github.com/kjh302903.png" width="100"> | <img src="https://github.com/Heo-Donghyuk.png" width="100"> |

</div>

**<p align="center">Backend</p>**

<div align="center">

|                          조장                          |                        테크 리더                        |                        기획 리더                         |                       리액셔너                        |
| :----------------------------------------------------: | :-----------------------------------------------------: | :------------------------------------------------------: | :---------------------------------------------------: |
|          [박소현](https://github.com/sososo0)          |          [안혜준](https://github.com/jagaldol)          |          [김기해](https://github.com/xcelxlorx)          |          [김윤재](https://github.com/yunzae)          |
| <img src="https://github.com/sososo0.png" width="100"> | <img src="https://github.com/jagaldol.png" width="100"> | <img src="https://github.com/xcelxlorx.png" width="100"> | <img src="https://github.com/yunzae.png" width="100"> |

</div>

## Introduction

`기존의 볼링 관련 서비스`에서는 `볼링 한판`을 치기 위해서 동호회, 소모임에 가입을 해야하는 `번거로운 과정`이 필요합니다. 소모임, 밴드 앱 또한 일회성의 가벼운 만남이 아닌 주기적으로 참여를 할 회원을 모집하고 있습니다.

**`번개 볼링`은 기존의 소모임, 스포츠 모임 서비스와 다른 번개모임, `빠른 매칭`을 목표로 하고 있습니다.**

---

<details>
    <summary><h3>기획</h3></summary>
#### 5Whys

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/81746373/5084761e-b0af-42f1-9962-a87db722c67c" width="50%"/>

#### 1Pager 기획

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/81746373/d7e87208-6fc5-407c-aa7f-5f21442e69b6" width="100%"/>
</details>

### 둘러보기

- **[실제 배포 링크](https://ka02fa9a0d9a2a.user-app.krampoline.com/)**
- **[api문서](https://bungae.jagaldol.dev:8080/api/docs/swagger)**

### 깃헙 레포지토리

- **[FrontEnd Repository](https://github.com/Step3-kakao-tech-campus/Team3_FE)**
- **[BackEnd Repository](https://github.com/Step3-kakao-tech-campus/Team3_BE)**

## System Structure

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/81746373/2086f92a-42da-4be2-9eb9-1232e2f0bcce" alt="Logo" width="100%"/>

### 전체 구성도

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/81746373/2086f92a-42da-4be2-9eb9-1232e2f0bcce" alt="Logo" width="100%"/>

<details>

<summary><h4>ERD(ER - Diagram) - [ERD 협업 링크](https://www.erdcloud.com/d/GHYAMbQS9pzC6k8ZB)</h4></summary>

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/81746373/d5f7380f-6ee2-4b68-b94f-c588f40829ec" alt="Logo" width="100%"/>

- 참여신청 테이블(applicant_tb)

  ```text
  승인 상태가 false 인 경우 프론트에서 수락 / 거절 처리합니다.
  거절 시 참여 신청 테이블에서 delete 됩니다.
  수락 시 status가 true가 되면서 수락 / 거절 처리됩니다.
  게시글이 모집완료되면 평가하기 활성화됨 status가 True인 사람들은 게시글에 달려있는 status True인 사람들을 서로 평가할 수 있습니다.
  ```

- 모집글 테이블(comment_tb)

  ```text
  마감 계산은 아래와 같습니다.
  마감 = is_close || (now due_time)
  ```

- 댓글 테이블(comment_tb)

  ```text
  일반 댓글의 경우 부모 댓글id가 NULL입니다.
  대댓글 일 시 부모 댓글id가 존재합니다.
  게시글에 달린 댓글을 전체 조회해서 부모 id에 맞게 조합하여 계층형으로 전달 가능합니다.
  댓글 데이터 삭제 시, delete하지 않고 작성자 id와 내용만 null 처리합니다.
  (부모id를 참조해야하므로 row를 삭제해서는 안됩니다.)
  ```

</details>

## Tech Stack

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/>
    <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  </p>
  <p>
    <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=React Query&logoColor=white"/>
    <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=Recoil&logoColor=white"/>
    <img src="https://img.shields.io/badge/Sharp-99CC00?style=flat-square&logo=Sharp&logoColor=white"/>
  </p>
</div>

## How to Start

#### Requirement

- Node.js 16.14.0 이상

#### 시작하기

1. 프로젝트 클론

   ```jsx
   $ git clone https://github.com/Step3-kakao-tech-campus/Team3_FE.git
   ```

2. 프로젝트 의존성 설치

   ```jsx
   $ npm install
   # 또는
   $ npm i
   ```

3. 개발 서버 실행

   ```jsx
   $ npm run dev
   ```

- 사용 가능한 스크립트
  ```jsx
  $ npm run dev : 개발 서버 실행
  $ npm run build : 프로젝트 빌드
  $ npm run start : 프로덕션 서버 실행
  ```

## FEATURES
#### 메인 페이지
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/20ab031b-2b43-43b3-a686-e23db3c9e3dc" width="470px" height="375.5px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/5a0cb055-0987-4b4f-91c0-cc3490399005" width="160px" height="342.5px" />

- 모임을 희망하는 지역과 모집 여부를 선택하여 검색이 가능합니다.
- 게시글 카드를 클릭하여 모집글 상세 페이지로 이동할 수 있습니다.
- Infinity scroll을 적용하여 끊임 없이 새로운 게시글을 확인할 수 있습니다.
- 글쓰기 버튼을 클릭하여 글쓰기 페이지로 이동할 수 있습니다.
  
---
#### 게시글 상세 페이지

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/81ab6be0-4389-463b-b74c-81902e9e9492" width="474px" height="383.5px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/99732aaa-1901-43b8-a978-000f676fadeb" width="161.5px" height="347px" />

- 모집 상세 내용을 조회할 수 있습니다.
- 모임에 대한 신청 및 취소가 가능합니다.
- 모집자는 신청자 확인 및 수락, 거절이 가능합니다.
- 댓글을 확인 및 작성할 수 있습니다.

---
#### 게시글 작성, 수정 페이지

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/f421b93f-a5a5-421d-ab93-5ce0a576c872" width="472.5px" height="375px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/37248cf9-f455-41c3-931e-a3b68939a1e7" width="161px" height="339.5px" />

- 제목, 모집 지역, 모임 일시, 마감 일시, 내용을 입력하여  모집글 작성 및 수정이 가능합니다.

---
#### 내 쪽지함

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/7138249b-77f6-403a-b2a9-bb3a17493c5a" width="469px" height="381px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/693286b8-837b-4076-9386-1df52b799514" width="160x" height="340.5px" />

- 유저 검색 모달을 통해 닉네임으로 대화를 원하는 유저를 검색할 수 있습니다.
- 대화방을 더블 클릭하여 개별 쪽지 페이지로 이동 가능합니다.
- 생성된 대화방을 선택하여 삭제할 수 있습니다.

---
#### 일대일 대화방

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/c3341508-4514-4bd3-a2d6-756a81cec547" width="460.5px" height="373px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/3b227f88-3a80-4cb9-a66e-86ae6320a0da" width="159px" height="328px" />

- 상대에게 쪽지를 전송할 수 있습니다.
- 보낸 쪽지를 선택하여 삭제할 수 있습니다.
- Infinity scroll을 적용하여 끊임 없이 지난 대화를 확인할 수 있습니다.

---
#### 스코어보드 페이지

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/8365c693-24ea-4901-959c-85585ab5c78a" width="468.5px" height="367.5px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/f1ff4262-d972-4900-816e-c2a1989d47ce" width="160.5px" height="321.5px" />

- 유저의 상세 기록을 확인할 수 있습니다.
- 모집 지역, 기간, 글의 상태에 따른 기록을 조회할 수 있습니다.
- 참여한 기록에 대한 점수, 이미지를 등록 및 수정할 수 있습니다.
- 유저가 등록한 점수와 이미지를 확인할 수 있습니다.
- 함께 참여한 유저에 대한 별점 등록이 가능합니다.
- Infinity scroll을 적용하여 끊임 없이 기록을 확인할 수 있습니다.

---
#### 볼링장 검색 페이지

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/b2ffde51-6e30-48c8-af41-e70f6d695bf2" width="437px" height="379.5px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/c13d7577-e6f7-44ea-be07-587e10f58319" width="161.5px" height="334.5px" />

- 검색어를 통해 볼링장을 검색할 수 있습니다.
- 검색 결과를 클릭하여 볼링장 정보 페이지로 이동할 수 있습니다.

---
#### 마이페이지

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/40dcb052-2da5-4edd-a17e-b64cae24941d" width="470.5px" height="387.5px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/538615d3-6c62-4e2d-9f5f-b696ac9be54b" width="161px" height="337.5px" />

- 자신의 닉네임, 지역, 프로필 이미지를 변경할 수 있습니다.
- 자신의 매너점수와 average를 확인할 수 있습니다.

---

