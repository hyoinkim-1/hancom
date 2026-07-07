let person = {
  name: "콩이",   // 이름표(속성) name → 값 "콩이"
  age: 10         // 이름표(속성) age → 값 10
};

const out = document.querySelector("#out");

const render = ()=>{
    out.textContent = `${person.name} ${person.age}살`;
};
render();

document.querySelector("#up").addEventListener("click",()=>{
    person.age++;
    render();
});

document.querySelector("#rename").addEventListener("click",()=>{
    const nameInput = document.querySelector("#nameInput");

    if(nameInput){
        person.name = nameInput.value;
    } else{
        const input = document.createElement("input");
        input.setAttribute("id","nameInput");
        input.setAttribute("placeholder","이름 입력");
        const body = document.querySelector("body");
        body.appendChild(input);
    }
    render();
});