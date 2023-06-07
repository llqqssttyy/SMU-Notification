# 🦌 SMU-Notification
> 상명대학교 공지사항 알리미
<br/>

## 👋 프로젝트 소개
평일 오후 9시마다 사이트에 올라온 공지사항을 스크래핑하여 메일로 보내주는 자동화 프로그램입니다.  
현재는 [상명대학교 공식 홈페이지](https://www.smu.ac.kr/ko/index.do)에 올라온 공지사항만 받아보실 수 있습니다.  
추후에 [상명대 SW중심사업단](https://swai.smu.ac.kr/)과 [상명대 컴퓨터과학과](https://cs.smu.ac.kr/cs/index.do) 추가 예정입니다.

### 실행 결과
![result](imgs/result.png)

<br/>

## 👏 개발 기간
- 2023.05.29 ~ (진행 중)

<br/>

## 👍 설치 및 실행방법  

1. 이 저장소를 클론합니다
   ```
   git clone https://github.com/llqqssttyy/SMU-Notification.git
   ```
2. 클론한 디렉토리로 이동해 의존성을 설치합니다.
   ```
   cd your-directory
   npm install
   ```
4. GitHub Actions를 활성화합니다.
3. GitHub Secrets에 환경변수를 추가합니다. 
   ```
   EMAIL_SERVICE=gmail
   EMAIL_ADDRESS=your-email
   EMAIL_PASSWORD=your-password
   ```
   gmail을 사용하실 경우 PASSWORD엔 2단계 인증을 통해 발급 받은 비밀번호를 넣어줘야 합니다. 해당 내용은 [이곳](https://github.com/llqqssttyy/TIL/blob/main/Crawling/Chapter4.md#gmail-2%EB%8B%A8%EA%B3%84-%EC%9D%B8%EC%A6%9D-%EC%84%A4%EC%A0%95)을 참고해주세요.

<br/>

## 👐 개발 환경
- **node.js**
- **cheerio**  
  스크래핑한 공지사항 페이지에서 데이터를 뽑고, 이메일 전송용 html을 동적으로 생성할 때 사용했습니다. 해당 내용은 [makeHTML.js](https://github.com/llqqssttyy/SMU-Notification/blob/main/utility/makeHTML.js)에서 확인 가능합니다.
- **axios**  
  HTTP 통신을 통해 스크래핑할 페이지의 html 문서를 불러오는 데 사용했습니다.
- **nodemailer**  
  이메일을 전송할 때 사용한 라이브러리입니다. transporter.sendMail() 함수를 async로 감싼 후 모듈화하여 사용했습니다. 해당 내용은 [sendMail.js](https://github.com/llqqssttyy/SMU-Notification/blob/main/utility/sendMail.js)에서 확인 가능합니다.
- **dotenv**  
  이메일 서비스, 이메일 주소, 비밀번호와 같이 민감한 정보를 .env 파일에 저장하고, 이를 사용하기 위해 해당 라이브러리를 이용했습니다.
- **Github Actions**  
  원하는 시점에 프로그램을 백그라운드에서 실행하기 위해 Github Actions의 main.yml 파일에 cron 설정을 했습니다.
