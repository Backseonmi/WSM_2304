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
const KEY  = "531661bf0bd04c158cbf3b61dc03a521";
//console.log(KEY);
const ATPT_OFCDC_SC_CODE = "B10"; //서울특별시교육청
const SD_SCHUL_CODE = "7010569"; //미림여자정보과학고등학교
let MLSV_YMD = "20221019"; //2022년 10월 19일
let MMEAL_SC_CODE = 3; //석식
let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;
url += `?KEY=${KEY}`;
url += `&Type=json`;
url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
url += `&MLSV_YMD=${MLSV_YMD}`;
url += `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`;
console.log(url);
