//오늘의 날짜
const showToday = () => {
    //오늘의 년, 월, 일, 요일 구하기
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay(); //요일: 0~6: 0:일요일, 6:토요일
    let namesOfTheDaysOfTheWeek_array = ["일", "월", "화", "수", "목", "금", "토"];
    day = namesOfTheDaysOfTheWeek_array[day]
    //console.log(year, month, date, day);
    let title = `${year}.${month}.${date}.(${day})`;
    //console.log(title);

    //HTML에 표시하기
    //let cardDateDivs = document.getElementsByClassName("card-date");
    let cardDateDivs = document.querySelectorAll(".card-date");
    //console.log(cardDateDivs);
    for (cardDateDiv of cardDateDivs){
        cardDateDiv.innerHTML = title;
    }
}
showToday();

//다가올 급식에 강조
const addNow = (mainCardId) => {
    //html -> js
    const mainCard = document.getElementById(mainCardId);
  
    //지금 몇시? 다음 식사 -> 몇번째 카드인지
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    // console.log(`${hour}시 ${minute}분`);
    let minutes = hour * 60 + minute; //현재 시와 분을 통해 분으로 단위통일
    
    //지금 시각 -> index
    //조식 끝: 7:30 -> 1
    //중식 끝: 13:10 -> 2
    //석식 끝: 18:10 -> 0
    let index = 0;
    if (18 * 60 + 10 <= minutes) {  //18:10 <= now
      index = 0;
    } else if (13 * 60 + 10 <= minutes) { //13:10 <= now
      index = 2;
    } else if (7 * 60 + 30 <= minutes) { //7:30 <= now
      index = 1;
    } else {
      index = 0;
    }
  
    let selectedCard = mainCard.getElementsByClassName('card')[index];
    //now 클래스 추가
    selectedCard.classList.add('now');
  }
  addNow('main-card');

  const showMenu = (json) => {
    //json -> 조식, 중식, 석식
    let breakfastMenu = "없음"
    let lunchMenu = "없음"
    let dinnerMenu = "없음"

    try{
        breakfastMenu = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
        //(5.13.) 삭제
        //괄호 열고, 숫자, 점 여러개 괄호 닫고
        breakfastMenu = breakfastMenu.replace(/\([0123456789\.]+\)/g, ""); //점문자를 사용하여 (5.13.)을 빈칸으로 대체하여 삭제하는 방법

    }catch{
    }
    try{
        lunchMenu = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"];
        //lunchMenu = lunchMenu.replace("배추", "");
        lunchMenu = lunchMenu.replace(/\([0-9\.]+\)/g, ""); //0123456789 == 0-9
    }catch{
    }
    try{
        dinnerMenu = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"];
        dinnerMenu = dinnerMenu.replace(/\([\d\.]+\)/g, ""); //0123456789 == \d
    }
    catch{
    }
    
    //조식, 중식, 석식 -> HTML
    //응답 오면, #breakfast, #lunch, #dinner에 출력하기
    let menus = document.querySelectorAll(".card-menu");
    let breakfast = menus[0];
    let lunch = menus[1];
    let dinner = menus[2];
    breakfast.innerHTML = breakfastMenu;
    lunch.innerHTML = lunchMenu;
    dinner.innerHTML = dinnerMenu;
}

  //오늘의 급식 메뉴 표시하기
  const showTodayMenu = () => {
    //년, 월, 일 구하기
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay();
    
    //급식 API rul 만들기
    const KEY  = "377ed98d04c94ea089f4463be2eb5e9d"; //급식 api를 받는 곳인 '나이스 교육정보 개방 포털'에 학교 계정으로 로그인해서 발급받은 인증키(탈퇴하면 사용할 수 없어짐)
    //console.log(KEY);
    const ATPT_OFCDC_SC_CODE = "B10";       //서울특별시교육청
    const SD_SCHUL_CODE = "7010569";        //미림여자정보과학고등학교
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.toString().padStart(2, "0")}`;
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;
    //console.log(url);

    //비동기로 호출하기
    //응답오면 표시하기
    fetch(url)    //비동기 호출
    .then((response) => response.json())    //응답데이터 -> json
    .then((json) => showMenu(json));     //json -> HTML에 표시하기
  };

  showTodayMenu();
