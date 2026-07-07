const IMG_A = "https://picsum.photos/96?random=1";
const IMG_B = "https://picsum.photos/96?random=2";

const myImage = document.querySelector("#pic");
myImage.setAttribute("src",IMG_A);

myImage.onmouseover = ()=>{
    const mySrc = myImage.getAttribute("src");
    if(mySrc===IMG_A){
        myImage.setAttribute("src", IMG_B);
    } else{
        myImage.setAttribute("src", IMG_A);
    }
}


// - html Event attribute : https://www.w3schools.com/tags/ref_eventattributes.asp 참고
//     - onclick, onmouseover, onpaste 등등