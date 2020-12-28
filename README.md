# MARKET BALGYUN POS SERVER PROJECT
## About Project
&nbsp;본 프로젝트는 JAKorea-SAP가 주최하는 사회적기업 디지털 전환 프로젝트의 일환입니다.  
&nbsp;사회적기업 디지털 전환 프로젝트는 JAKorea와 SAP가 함께하여 디지털화가 필요한 사회적기업에
IT 전공 대학생들이 자신의 전공을 활용하여 기업 맞춤형 솔루션을 제공하는 프로젝트입니다.  
&nbsp; 본 프로젝트는 Front-End와 Back-End(Web API 서버)로 구성된 웹 프로젝트이며 본 레포지토리는 Back-End 레포지토리입니다.

## 마켓 발견
<img src="https://user-images.githubusercontent.com/42201356/103173485-a417fc00-489e-11eb-9c3d-3fcb69bf4ac3.png" alt="마켓발견" width="45%" height="45%">

&nbsp;마켓발견은 경기도 의왕시에 위치한 기업이다. 마켓발견은 물건뿐만 아니라 사람도 업사이클링(update+ recycling)한다는 철학을 가진 기업으로써, 기부된 물건을 판매하고, 판매가 어려운 물건은 업사이클링하여 판매한다. 또한, 도자기만들기, 헌옷으로 머리끈만들기 등 강좌를 제공하는 사람과 배우고자하는 사람을 연결해주고, 장소를 대여해주며 사람들이 새로운 도전을 하도록 격려하는 사회적 기업이다.

### 요구사항
  1. 항상 정해진 물건만 판매하는 일반적인 매장과 달리 마켓 발견은 항상 다른 종류의 상품이 들어오기 때문에 매번 새로운 상품을 POS에 등록해야한다. 하지만 일반적인 POS 기기 특성상 상품을 매번 등록하기에는 시간이 많이 때문에 이를 효과적으로 줄일 수 있는 체계가 필요하다.  
  
  2. 상품 수가 많은 만큼 서로 유사한 상품이 많아 상품 이름만으로 재고의 파악이 어렵다. 새로운 식별자 및 관리 체계가 필요하다.  
  
  3. 일반 매입 상품외에도 마켓 발견에는 '위탁상품'이라는 고유한 판매형태가 있다. 이 위탁상품은 고객이 물건을 판매를 의뢰하는 형태로 일반 판매 상품과 다르게 위탁자, 위탁기간의 정산 방식 등의 이유로 등의 정보와 함께 관리된다. 이 위탁상품이라는 판매형태를 관리하기 위한 툴이 필요하다.  
  
  4. 물건의 종류가 다양하여 세부카테고리에 들어가기 애매한 경우가 있다. 이와 같은 경우 상위카테고리까지만 취급하여 판매에 이용하고 싶다.  
  
  5. 현재 운영중인 웹 사이트가 여러개여서 재고관리 뿐만 아니라 회원관리의 통합적인 관리가 어렵다. 재고와 회원를 통합적으로 관리할 수 있는 툴이 필요하다.  
  
  6. 솔루션 관리 비용 최소화  
  
  7. 통계를 위한 판매로그 작성 및 엑셀 파일로 출력 가능
  
  
  
### 솔루션  
  1. 재고 등록 시간의 단축을 위해 터치 기반 태블릿 도입, 다수의 직원이 휴대하며 동시에 재고, 회원 등록이 가능하게 함  
  
  2. 기존 POS를 대체하는 웹 기반 마켓발견 맞춤형 재고, 회원 관리 시스템 개발, 태블릿 사용을 전제로 터치에 용의하도록 설계
  
  3. 위탁 상품, 유사 상품 등을 관리하기 위한 새로운 상품 ID체계 도입, 데이터베이스 설계  
  
  4. 솔루션 관리 비용을 최소화 하기 위해 무료 호스팅 서비스 사용  
  

## 프로젝트 구성
### 개발 환경 및 개발 언어
| | tool |
| ------ | ------ |
| 개발언어 | ![issue badge](https://img.shields.io/badge/Node.js-14.15.3-brightgreen) |
| FrameWork | ![issue badge](https://img.shields.io/badge/Express-4.16.1-blue) |
| API | ![issue badge](https://img.shields.io/badge/jwt-8.5.1-orange) |
| 개발환경 | Windows |
| Database | ![issue badge](https://img.shields.io/badge/mongoDB-4.4.0-yellowgreen) |



### 프로젝트 구조도
<img src="https://user-images.githubusercontent.com/42201356/103192044-9738ee00-491a-11eb-912d-3eed499bdc2f.png" alt="프로젝트 구조도" width="75%" height="75%">  

### 데이터베이스 설계
<img src="https://user-images.githubusercontent.com/42201356/103176644-cd448680-48b6-11eb-8134-719581909191.png" alt="데이터베이스 설계">


  + 일반 상품 등록시 카테고리에 기반하여 6자리 이상의 고유의 ID를 발급받으며, 위탁상품은 구분을 위해 'C'로 시작하는 고유 ID를 부여 받음  
  
## Web API 서버
https://marketback.herokuapp.com/

## 클라이언트 페이지
https://market-balgyun.herokuapp.com/  

<a href="https://github.com/pjh4400/MarketBalgyun">Front-End 레포지토리</a>  

#### 웹사이트 화면 예시
<img src="https://user-images.githubusercontent.com/42201356/103176775-16e1a100-48b8-11eb-90ac-7ca6508d63d1.png" alt="웹사이트 화면 예시" width="50%" height="50%">


## Made By
- [숭실대 소프트웨어학부 18 김지헌]
- [숭실대 소프트웨어학부 18 변지현]
- [숭실대 소프트웨어학부 18 박재희]
- [숭실대 컴퓨터학부 18 손예진]

