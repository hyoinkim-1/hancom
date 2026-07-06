// 1. 입력칸·기호 선택·결과 칸을 찾아 담기
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const op = document.querySelector("#op");
const out = document.querySelector("#out");


// 계산 버튼 누르면 실행
document.querySelector("#calc").addEventListener("click",()=>{
    const x = Number(a.value);
    const y = Number(b.value);
    let result;

    if (op.value === "+") { result = x + y; }
    else if (op.value === "-") { result = x - y; }
    else if (op.value === "*") { result = x * y; }
    else if (op.value === "/") { result = x / y; }
    else if (op.value === "%") { result = x % y; }
    else {result = x ** y;}

    out.textContent = `${x} ${op.value} ${y} = ${result}`
});


// const a = 1;
// const a1 = 1;
// const b = 2;
// const c = a;

// console.log(a!=b);
// console.log(a==a1);
// console.log(a!==a1);
// console.log(a===c);