const cnt = document.querySelector("#count");
const btn = document.querySelector("#btn");

let count = 0;

btn.addEventListener("click",()=>{
    count++;
    cnt.textContent = `${count}번 눌렀어요`;
});