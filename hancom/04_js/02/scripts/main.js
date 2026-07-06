const title = document.querySelector("#title");
const btn = document.querySelector("#btn");

btn.addEventListener("click", ()=>{
    title.textContent = "Hello World!";
});