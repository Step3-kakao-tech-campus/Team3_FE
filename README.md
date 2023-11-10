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

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/20ab031b-2b43-43b3-a686-e23db3c9e3dc" width="313px" height="250px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/5a0cb055-0987-4b4f-91c0-cc3490399005" width="160px" height="342.5px" />

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/81ab6be0-4389-463b-b74c-81902e9e9492" width="313px" height="250px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/99732aaa-1901-43b8-a978-000f676fadeb" width="161.5px" height="331.3px" />

<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/f421b93f-a5a5-421d-ab93-5ce0a576c872" width="313px" height="250px" />
<img src="https://github.com/Step3-kakao-tech-campus/Team3_BE/assets/79841977/37248cf9-f455-41c3-931e-a3b68939a1e7" width="160px" height="342.5px" />



