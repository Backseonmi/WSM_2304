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