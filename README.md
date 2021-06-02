# 0kim-home.com (개발자 홈페이지)

>개발을 시작한지 2년이 되었지만 아직 제대로 된 토이 프로젝트나 포트폴리오를 관리하지 못하고 있었다.<br>
>따라서 이번기회에 홈페이지를 제작하여 개인 프로젝트를 관리하고 커리어를 업데이트하여 포트폴리오 <br>
>형태로 관리할 예정이다. 아직은 초기상태의 사이트이지만 React, Nodejs를 기반으로 웹을 구축해 놓았기 <br>
>때문에 해당 스택을 공부하며 꾸준히 업데이트할 생각이다. 
<br>

## 사이트 주소
- [http://0kim-home.com/](http://0kim-home.com/)
<br><br>

## 사용된 기술 스택
- **Html, Css, Javascript, React, Webpack, Babel**
- **NodeJS, Express, Mysql**
<br><br>

## 특징
|특징|이미지|설명|
|--|--|--|
|CSS|<img src="https://user-images.githubusercontent.com/47030781/120441140-3d53bd00-c3bf-11eb-9105-612b8c6f106d.png" width="250">| - **`반응형`** 웹사이트<br><br> - grid, flex 활용<br><br> - 주로 **`flex`** 기능을 활용<br> |
|Client Server Rendering|<img src="https://user-images.githubusercontent.com/47030781/120444122-4abe7680-c3c2-11eb-83d0-df897df54d89.png" width="750" height="350">| - **`비동기`** 방식의 CSR<br><br> - 리액트 **`함수형 컴포넌트`** 방식으로 화면 관리<br><br> - 리액트 `State, Props`를 활용한 상태관리<br><br> - `react-router-dom`과 `props.history` 기능을 활용한 페이지 이동|
|REST|<img src="https://user-images.githubusercontent.com/47030781/120446112-3a0f0000-c3c4-11eb-9cea-61c196257f38.png" width="700">|- 서버에 요청하는 Http method로 `Axios`라이브러리를 활용<br><br> - 영화의 id와 title을 파라미터로 활용하여 `Restful`하게 요청 <br><br> - 댓글 `생성(Post)`, `읽기(Get)` 기능을 추가<br><br> - 댓글 수정(Put), 삭제(Delete) 추가 예정|
|Server|<img src="https://user-images.githubusercontent.com/47030781/120447754-dede0d00-c3c5-11eb-8b79-86e89b7f48f1.png" width="600">|- 서버 Query 언어로 **`Mysql`** 활용<br><br> - `Express`의 Router 미들웨어를 활용하여 요청을 분리<br><br> - 서버에서 데이터 응답에 필요한 `body-parser, cors` 등의 js 미들웨어를 활용|
|Etc|||
