//   <input id="s" value="hello">
//   <button id="go">분석</button>
//   <p id="out">글자를 넣고 분석을 눌러봐</p>


const s = document.querySelector("#s");
const go = document.querySelector("#go");
const out = document.querySelector("#out");

go.addEventListener("click",()=>{
    const text = s.value;
    out.innerHTML = 
    `글자 수(length): ${text.length}` + "<br>" +
    `대문자(toUpperCase): ${text.toUpperCase()}` + "<br>" +
    `e→E 바꾸기(replace): ${text.replace("ll", "E")}`;
});