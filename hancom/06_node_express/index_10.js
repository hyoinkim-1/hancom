const URL = "http://192.168.10.28:5000/hancom/김효인/users"
const AUTH_TOKEN = "HANCOM";
const names = "강성원 강하영 김정아 김정현 김해냄 김효인 박진 안치호 양하은 유민성 이도연 이현우 임소정 전욱진 정기준 정선민 정유진 표후동 한유진 한윤지".split(" ")


const makeUrl = (userID)=>{
    return `${URL}/${userID}`
}

const makeConfig = (method, body) =>{
    if(body) return {
        method : method,
        headers : {'Authorization' : AUTH_TOKEN},
        body : {body}
    }


    else{
        return {
        method : method,
        headers : {'Authorization' : AUTH_TOKEN},
        }
    }
}

const customFetchHandler = (userId, method = 'GET', body = null)=> fetch(makeUrl(userId), makeConfig(method, body))

// 아래를 통해 names에 포함되지 않은 이름들에 DELETE요청.
// DELETE완료 후 length 측정해보니 20(전체수강생) 
// 추가 POST나 PUT은 필요없을 것이라 생각.

// fetch(URL, {method : 'GET', headers: {'Authorization' : AUTH_TOKEN}})
//     .then(res=>res.json())
//     .then(data=>{
//         console.log(typeof(data),data.length)
//         // data = 배열
//         data.forEach(async (item)=>{
//             if(!names.includes(item.name)){
//                 try{
//                     const res = await customFetch(item.id, 'DELETE')
//                     console.log(res);
//                 }catch(err){console.log(err);}
//             }
//         })
//     })



const main = document.querySelector(".grid");

const grid_1 = document.createElement("div");
grid_1.classList.add("subGrid");
const grid_2 = document.createElement("div");
grid_2.classList.add("subGrid");

const gridArray = [grid_1,grid_2];

gridArray.forEach(e=>main.appendChild(e))
let gridIdx = 0;


// fetch(URL, {method : 'GET', headers: {'Authorization' : AUTH_TOKEN}})
//     .then(res=>res.json())
//     .then(data=>{
//         data.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
//         console.log(data);
//         data.forEach((e,i) => {
//             if(i===10) gridIdx++;
//             const cell = document.createElement("div");
//             cell.classList.add('cell');
//             cell.innerText = e.name;
//             gridArray[gridIdx].appendChild(cell);
//         });
//     })

async function getData(url,config) {
  const res = await fetch(url, config);
  const data = await res.json();
  console.log(data);
  return data;
}

(async () => {
    const data = await getData(URL, makeConfig());
    data.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    data.forEach((e,i) => {
        if(i===10) gridIdx++;
        const cell = document.createElement("div");
        cell.classList.add('cell');
        cell.innerText = e.name;
        gridArray[gridIdx].appendChild(cell);
    });
})();


//   -   한유진 한윤지   김정아 김정현   -  
// 이도연 강하영 정유진   김해냄 정기준 표후동
// 정선민 양하은 유민성     -   전욱진 이현우
//   -    박진  김효인   강성원 임소정 안치호