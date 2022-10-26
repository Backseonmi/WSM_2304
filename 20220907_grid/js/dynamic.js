// 현재 구하기
let now = new Date();

// 현재 년
let year = now.getFullYear();

// 현재 월
let month = now.getMonth(); // 0 ~ 11
month++;

const setCalendar = (year, month) => {
    // 1일이 무슨 요일?
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = firstDate.getDay();

    // 말일은 며칠?
    let lastDate = new Date(year, month, 0).getDate(); // 0일 => 이전 월의 마지막 일이 나옴

    // 제목 표시하기
    const setTitle = (year, month) => {
        // console.log(`${year}년 ${month}월`)

        // id는 바로 가져올 수 있음
        // let title_year = document.getElementById("title_year");
        title_year.innerHTML = year;
        // let title_month = document.getElementById("title_month");
        title_month.innerHTML = month;
    }
    setTitle(year, month);

    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];

    // 초기화
    dateGridContainerDiv.innerHTML = ""

    // 1 ~ 말일까지 grid-item 만들기
    for (let i = 1; i <= lastDate; i++) {
        // 요소 만들기
        let newDiv = document.createElement("div");

        // class에 grid-item 넣기
        newDiv.classList.add("grid-item");

        // text에 숫자 넣기
        newDiv.innerHTML = i;

        // 부모에 newDiv 달기
        dateGridContainerDiv.appendChild(newDiv);
    }

    // 1일에 해당하는 div를 grid-column-start: 요일 + 1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumnStart = firstDay + 1;
}

setCalendar(year, month);

// 이전 달 달력 보이기
const prevMonth = () => {
    month--;
    if(month == 0) {
        month = 12;
        year--;
    }
    setCalendar(year, month)
};

// 다음 달 달력 보이기
const nextMonth = () => {
    month++;
    if(month == 13) {
        month = 1;
        year++;
    }
    setCalendar(year, month);
}

const initButton = () => {
    //  HTML -> JS
    // const prev_btn = document.getElementById("prev-btn");
    // const next_btn = document.getElementById("next-btn");

     // js event 달기
    //  prev_btn.addEventListenr("click", prevMonth);
    //  nexy_btn.addEventListenr("click", nextMonth);
    prev_btn.onclick = prevMonth;
    next_btn.onclick = nextMonth;
}

initButton();

//급식 API, AJAX 급식데이터 가져오기
//.date-grid-container > .grid-item에 mouseover 이벤트 발생하면, handler를 지정하기
const handler = (event) => {
    //handler에서 year, month, date 정보를 가져와서 url 생성하기
    //console.log("click");
    let date = event.target.innerHTML;
    const KEY  = "377ed98d04c94ea089f4463be2eb5e9d"; //급식 api를 받는 곳인 '나이스 교육정보 개방 포털'에 학교 계정으로 로그인해서 발급받은 인증키(탈퇴하면 사용할 수 없어짐)
    //console.log(KEY);
    const ATPT_OFCDC_SC_CODE = "B10";       //서울특별시교육청
    const SD_SCHUL_CODE = "7010569";        //미림여자정보과학고등학교
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.padStart(2, "0")}`;
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;
    // console.log(url);
    getMenuByAPI(url);
}

//AJAX(Asynchronous JavaScript And XML)로 url 호출하기
const getMenuByAPI = (url) => {
    //XMLHttpRequest 만들기
    let xhr = new XMLHttpRequest();

    //callback
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            //success
            console.log("성공");
            // console.log(xhr.response);
            showMenu(xhr.response);
        }else{
            //fail
            //console.log("실패", xhr.status);
        }
    }

    //요청을 보낼 방식, url, 비동기여부 설정하기
    xhr.open("GET", url, true);

    //요청 전송하기
    xhr.send();
    
}

const showMenu = (jsonString) => {
    // console.log(jsonString);
    //jsonString -> json
    let json = JSON.parse(jsonString); //JSON.stringify(): json -> String
    // console.log(json);

    //json -> 조식, 중식, 석식
    let breakfastMenu = "없음"
    let lunchMenu = "없음"
    let dinnerMenu = "없음"

    try{
        breakfastMenu = json["mealServiceDietInfo"][1]["row"][0]["DDISH_NM"];
    }catch{
    }
    try{
        lunchMenu = json["mealServiceDietInfo"][1]["row"][1]["DDISH_NM"];
    }catch{
    }
    try{
        dinnerMenu = json["mealServiceDietInfo"][1]["row"][2]["DDISH_NM"];
    }
    catch{
    }
    
    //조식, 중식, 석식 -> HTML
    //응답 오면, #breakfast, #lunch, #dinner에 출력하기
    breakfast.innerHTML = breakfastMenu;
    lunch.innerHTML = lunchMenu;
    dinner.innerHTML = dinnerMenu;
}

let dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");

for(let gridItem of gridItems){
    //console.log(gridItem);
    //gridItem.onclick = console.log("click") //실행한 결과를 onclick에 넣는 것
    //gridItem.onclick = () => {console.log("click")} //onclick을 했을때 실행되고 return하는 것
    gridItem.onmouseover = handler; //mouseover일 때, 이벤트 처리하기
}

