# Team3_FE

<p align="center">
    <img src="docs/LogoTitle-Orange.png" alt="Logo" width="60%"/>

</p>

<p align="center">번개 지향 볼링 모집 커뮤니티 "번개볼링"의 프론트엔드 레포지토리입니다.</p>

> <p align="center">[카카오 테크 캠퍼스](https://www.kakaotechcampus.com/) 1기 부산대 3조 프로젝트입니다.</p>

## Collaborators

**<p align="center">Backend</p>**
<div align="center">

|                          조장                          |                        테크 리더                        |                        기획 리더                         |                       리액셔너                        |
| :----------------------------------------------------: | :-----------------------------------------------------: | :------------------------------------------------------: | :---------------------------------------------------: |
|          [박소현](https://github.com/sososo0)          |          [안혜준](https://github.com/jagaldol)          |          [김기해](https://github.com/xcelxlorx)          |          [김윤재](https://github.com/yunzae)          |
| <img src="https://github.com/sososo0.png" width="100"> | <img src="https://github.com/jagaldol.png" width="100"> | <img src="https://github.com/xcelxlorx.png" width="100"> | <img src="https://github.com/yunzae.png" width="100"> |
</div>

**<p align="center">Frontend</p>**
<div align="center">

|                         리마인더                         |                          타임 키퍼                          |
| :------------------------------------------------------: | :---------------------------------------------------------: |
|          [강주호](https://github.com/kjh302903)          |          [허동혁](https://github.com/Heo-Donghyuk)          |
| <img src="https://github.com/kjh302903.png" width="100"> | <img src="https://github.com/Heo-Donghyuk.png" width="100"> |
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

### ERD(ER - Diagram) - [ERD 협업 링크](https://www.erdcloud.com/d/GHYAMbQS9pzC6k8ZB)

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


## FEATURES


<br><br><br><br><br>

<details>
    <summary><h2>카카오 테크 캠퍼스 3단계 진행 보드</h2></summary>
    </br>

## 배포와 관련하여

```

최종 배포는 크램폴린으로 배포해야 합니다.

하지만 배포 환경의 불편함이 있는 경우를 고려하여

임의의 배포를 위해 타 배포 환경을 자유롭게 이용해도 됩니다. (단, 금액적인 지원은 어렵습니다.)

아래는 추가적인 설정을 통해 (체험판, 혹은 프리 티어 등)무료로 클라우드 배포가 가능한 서비스입니다.

ex ) AWS(아마존), GCP(구글), Azure(마이크로소프트), Cloudtype

```

## Notice

```
필요 산출물들은 수료 기준에 영향을 주는 것은 아니지만,
주차 별 산출물을 기반으로 평가가 이루어 집니다.

주차 별 평가 점수는 추 후 최종 평가에 최종 합산 점수로 포함됩니다.
```

![레포지토리 운영-001 (1)](https://github.com/Step3-kakao-tech-campus/practice/assets/138656575/acb0dccd-0441-4200-999a-981865535d5f)
![image](https://github.com/Step3-kakao-tech-campus/practice/assets/138656575/b42cbc06-c5e7-4806-8477-63dfa8e807a0)

[git flowchart_FE.pdf](https://github.com/Step3-kakao-tech-campus/practice/files/12521045/git.flowchart_FE.pdf)

</br>

## 필요 산출물

<details>
<summary>Step3. Week-1</summary>
<div>
    
✅**1주차**
    
```
    - 5 Whys
    - 마켓 리서치
    - 페르소나 & 저니맵
    - 와이어 프레임
    - 칸반보드
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-2</summary>
<div>
    
✅**2주차**
    
```
    - ERD 설계서
    
    - API 명세서
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-3</summary>
<div>
    
✅**3주차**
    
```
    - 최종 기획안
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-4</summary>
<div>
    
✅**4주차**
    
```
    - 4주차 github
    
    - 4주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-5</summary>
<div>
    
✅**5주차**
    
```
    - 5주차 github
    
    - 5주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-6</summary>
<div>
    
✅**6주차**
    
```
    - 6주차 github
    
    - 중간발표자료
    
    - 피어리뷰시트
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-7</summary>
<div>
    
✅**7주차**
    
```
    - 7주차 github
    
    - 7주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-8</summary>
<div>
    
✅**8주차**
    
```
    - 중간고사
    
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-9</summary>
<div>
    
✅**9주차**
    
```
    - 9주차 github
    
    - 9주차 노션
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-10</summary>
<div>
    
✅**10주차**
    
```
    - 10주차 github
    
    - 테스트 시나리오 명세서
    
    - 테스트 결과 보고서
```
    
</div>
</details>

---

<details>
<summary>Step3. Week-11</summary>
<div>
    
✅**11주차**
    
```
    - 최종 기획안
    
    - 배포 인스턴스 링크
```
    
</div>
</details>

---

## **과제 상세 : 수강생들이 과제를 진행할 때, 유념해야할 것**

```
1. README.md 파일은 동료 개발자에게 프로젝트에 쉽게 랜딩하도록 돕는 중요한 소통 수단입니다.
해당 프로젝트에 대해 아무런 지식이 없는 동료들에게 설명하는 것처럼 쉽고, 간결하게 작성해주세요.

2. 좋은 개발자는 디자이너, 기획자, 마케터 등 여러 포지션에 있는 분들과 소통을 잘합니다.
UI 컴포넌트의 명칭과 이를 구현하는 능력은 필수적인 커뮤니케이션 스킬이자 필요사항이니 어떤 상황에서 해당 컴포넌트를 사용하면 좋을지 고민하며 코드를 작성해보세요.

```

</br>

## **코드리뷰 관련: review branch로 PR시, 아래 내용을 포함하여 코멘트 남겨주세요.**

**1. PR 제목과 내용을 아래와 같이 작성 해주세요.**

PR 제목 : 부산대*0조*아이템명\_0주차

</br>

</div>

</details>
