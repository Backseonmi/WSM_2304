//현재 알아야 할 것들
//현재 구하기
let now = new Date();

//현재 년
let year = now.getFullYear();

//현재 월
let month = now.getMonth(); //0~11
month++;

const setCalendar = (year, month) => {
    //1일이 무슨 요일인가
    let firstDate = new Date(year, month - 1, 1);
    let firstDay = firstDate.getDay();

    //말일은 며칠인가
    let lastDate = new Date(year, month, 0).getDate();  //2022년 10월 0일 = 2022년 9월 말일

    //제목 표시하기
    const setTitle = (year, month) => {
        // console.log(`${year}년 ${month}월`)
        // let title_year = document.getElementById("title_year");
        title_year.innerHTML = year;    //니꼴라스 says
        // let title_month = document.getElementById("title_month");
        title_month.innerHTML = month;
    }
    setTitle(year, month);

    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];  //getElementsByClassName면 [0]쓰고 getElementByClassName면 숫자 안씀
    //1~말일까지 grid-item 만들기
    for(let i = 1; i <= lastDate; i++){
        //요소 만들기
        let newDiv = document.createElement("div");
        //class에 grid-item 넣기
        newDiv.classList.add("grid-item");
        //text에 숫자 넣기
        newDiv.innerHTML = i;
        //부모에 newDiv 달기
        dateGridContainerDiv.appendChild(newDiv);
    }

    //1일에 해당하는 div를 grid-column-start: 요일 +1;  
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumnStart = firstDay + 1;
}
setCalendar(year, month);