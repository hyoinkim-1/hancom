    // <h1 id="greet">안녕하세요!</h1>
    // <input id="name" placeholder="이름">
    // <button id="save">저장</button>
    // <button id="reset">지우기</button>

const greet = document.querySelector("#greet");
const input = document.querySelector("#name");
const btn_save = document.querySelector("#save");
const btn_reset = document.querySelector("#reset");


const saved = localStorage.getItem("name");
if(saved){
    greet.textContent = `안녕, ${saved}`;
}

btn_save.addEventListener("click",()=>{
    const inputText = input.value;
    if (!inputText){return ;}
    localStorage.setItem("name", inputText);
    greet.textContent = `안녕, ${inputText}`;    
});

btn_reset.addEventListener("click",()=>{
    localStorage.removeItem("name");
    greet.textContent = `안녕하세요!`;   
});