//show/hide menu: toggle menu
const toggleMenu = (toggleId, navListId) => {
//html -> js
const toggle = document.getElementById(toggleId);
const navList = document.getElementById(navListId);
const toggleIcon = toggle.getElementsByTagName("i")[0];
    
if(toggle && navList){
    //toggle click
    toggle.addEventListener("click",() => {
        //show/hide menu: .show-menu
        navList.classList.toggle('show-menu');
        //change toggle icon: bx-menu <-> bx-x
        toggleIcon.classList.toggle("bx-menu");
        toggleIcon.classList.toggle("bxs-x-square");
    });
 }  
};
toggleMenu("nav-toggle", "nav-list");


// const say = () => console.log("helllo world4");

// const say = () => { //람다함수(화살표 함수)
//     console.log("helllo world3");
// };

// const say = function(){
//     console.log("helllo world2");
// };

// function say(){
//     console.log("hello world");
// }
// say(); //콘솔로 출력하고 꼭 호출해야함

const addNow = (mainCardId) =>{
//html -> js
const mainCard = document.getElementById(mainCardId);

//지금 몇시? 다음 식사 -> 몇번째 카드인지?
let now = new Date();  // let와 var의 차이: let은 중괄호 사이의 로컬변수로 동작, var은 중괄호를 벗어난 함수내에서 존재
let hour = now.getHours();
let minute = now.getMinutes();
//console.log(`${hour}시 ${minute}분`);
let minutes = hour * 60 + minute; //현재 시와 분을 통해 분으로 단위통일

//지금 시각 -> index
//조식 끝: 7:30 -> 1
//중식 끝: 13:00 -> 2
//석식 끝: 18:10 -> 0
let index = 0;
if (18 * 60 + 10 <= minutes){ //18:10 <= now
    index = 0;
} else if (13 * 60 + 10 <= minutes){ //13:10 <= now
    index = 2;
} else if (7 * 60 + 30 <= minutes){ //7:30 <= now
    index = 1;
} else {
    index = 0;
}

let selectedCard = mainCard.getElementsByClassName('card')[index];
//.now 클래스 추가
selectedCard.classList.add('now');
}
addNow('main-card');