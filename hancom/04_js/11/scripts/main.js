    // <input id="n" type="number" value="5">
    // <button id="run">반복</button>
    // <button id="down">카운트다운</button>
    // <ul id="out"></ul>

const btn_run = document.querySelector("#run");
const btn_down = document.querySelector("#down");
const out = document.querySelector("#out");
const n = document.querySelector("#n");

btn_run.addEventListener("click",()=>{
    out.innerHTML = "";
    const cnt = Number(n.value);
    for(let i=1; i<=cnt ; i++){
        const li = document.createElement("li");
        li.textContent=`${i}번째`;
        out.appendChild(li);
    }
});


btn_down.addEventListener("click", ()=>{
    out.innerHTML = "";
    let cnt = Number(n.value);
    // for(let i = cnt; i>0 ; i--){
    //     const li = document.createElement("li");
    //     li.textContent= `${i}`;
    //     out.appendChild(li);
    // }

    while(cnt>0){
        const li = document.createElement("li");
        li.textContent= cnt;
        out.appendChild(li);
        cnt--;
    }
});

[1,2,3].forEach(element => {
    console.log(element);
});


// - 반복문
//     - for(초기값;종료조건;증감조건){} : `for(let i = 0; i < 10 ; i++){}`
//     - while(종료조건){} : `while(i > 10)`
//     - [Array|Map|Set].forEach(callBackFn) : `[1,2,3].forEach((el)⇒{console.log(el);})`