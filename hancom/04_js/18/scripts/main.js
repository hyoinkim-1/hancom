
// 다크모드

const toggle = document.querySelector("#toggle");
if (localStorage.getItem("isDark") === "1") {
    document.documentElement.classList.add("dark");
}

toggle.addEventListener("click", () => {
    const nowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("isDark", nowDark ? "1" : "0");
    toggle.textContent = nowDark ? "라이트모드" : "다크모드"
});


// 투두 (등록, 삭제 : localStorage 사용 및 DOM 조작 연습)

const todo = [];


// 캐러셀 (앞으로, 뒤로, 자동, 마우스호버이벤트 : event, transition 연습)

const track = document.querySelector(".carousel__track");
let carousel__autoFlag = true;
let carousel__manualFlag = true;
let carousel__dir = -1;

track.addEventListener("mouseenter",()=>{
    carousel__autoFlag = false;
})
track.addEventListener("mouseleave",()=>{
    carousel__autoFlag = true;
})

const carousel__btnLeft = document.querySelector(".carousel__btn.left");

carousel__btnLeft.addEventListener("click",()=>{
    if(carousel__dir===-1){
        carousel__dir = 1;
        carousel__btnLeft.classList.add("active");
        carousel__btnRight.classList.remove("active");
    }
})

const carousel__btnRight = document.querySelector(".carousel__btn.right");

carousel__btnRight.addEventListener("click",()=>{
    if(carousel__dir===1){
        carousel__dir = -1;
        carousel__btnRight.classList.add("active");
        carousel__btnLeft.classList.remove("active");
    }
})

const carousel__btnPlayPause = document.querySelector(".carousel__btn.pause");

carousel__btnPlayPause.addEventListener("click", ()=>{
    carousel__btnPlayPause.textContent = carousel__manualFlag? "▶" : "⏸";
    carousel__manualFlag = !carousel__manualFlag;
})

let currentIndex = 0;
setInterval(() => {
  if(carousel__autoFlag && carousel__manualFlag){
    if(carousel__dir===-1){
        currentIndex++;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (currentIndex === 6) {          // 클론(7번째, 인덱스 6)에 도착
          setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
            track.offsetHeight;            // ← 강제 리플로우: 위 상태를 먼저 확정시킴
            track.style.transition = 'transform 0.5s ease';
          }, 500);                         // 클론으로 가는 애니메이션(0.5s)이 끝난 직후
        }
    }else{
        if (currentIndex === 0) {          // 0에서 뒤로: 애니메이션 전에 클론(6)으로 순간이동
          track.style.transition = 'none';
          track.style.transform = 'translateX(-600%)';
          track.offsetHeight;
          track.style.transition = 'transform 0.5s ease';
          currentIndex = 6;
        }
        currentIndex--;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
}, 1000);

// 테이블 (column 정렬 메서드 : 순회메서드 연습)