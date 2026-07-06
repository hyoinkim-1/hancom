const nameInput = document.querySelector("#name");
const out = document.querySelector("#out");
const greet = document.querySelector("#greet");


let nameText = "";
// greet.addEventListener("click",()=>{
//     let myName = name.value;
//     out.textContent = `안녕, ${myName}`;
// });

nameInput.addEventListener("input",()=>{
    nameText = nameInput.value;
    console.log(nameInput.value);
    out.textContent = `안녕, ${nameInput.value}`;
})


greet.addEventListener("click",()=>{
})


