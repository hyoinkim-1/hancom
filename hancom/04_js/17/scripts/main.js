// 1. 결과 찍을 곳 + 서버 주소
const out = document.querySelector("#out");
const API = "http://localhost:3000/users";

// 2. 결과를 화면에 보기 좋게 찍는 함수
const show = (label, data) => {
  out.textContent = `${label}\n${JSON.stringify(data)}`;
};


// 2-1. 서버가 주는 키 순서가 매번 달라서(id/name 뒤죽박죽), 찍기 전에 { id, name } 순서로 통일
const norm = (data) =>
  Array.isArray(data)
    ? data.map(u => ({ num: u.num, name: u.name, id: u.id }))
    : { num: data.num, name: data.name, id: u.id };


// 4. READ (읽기) — GET
document.querySelector("#btn-read").addEventListener("click", async () => {
  const res = await fetch(API);
  const users = await res.json();
  show("READ 결과", norm(users));
  // 변환 전: Response { status: 200, body: ReadableStream }
  // 변환 후: [{ id: 1, name: "Kim" }, { id: 2, name: "Lee" }]
  // res.json() 후 users는 배열 / norm() → 키 순서 정렬 / show() → 화면 출력
});

const next_idx = async ()=>{
  const users = await fetch(API);
  const user_list = await users.json();
  // id가 문자열("1", "gnBXAFgrc8s" 등)이라 숫자로 변환 후 최댓값 + 1
  const maxNum = user_list.reduce((max, u) => Math.max(max, Number(u.num) || 0), 0);
  return String(maxNum + 1);
}

// 3. CREATE (생성) — POST
document.querySelector("#btn-create").addEventListener("click", async () => {
  const nextIdx = await next_idx();
  console.log(nextIdx);
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John", num: nextIdx})
  })
  const data = await res.json();   // body를 한 번만 파싱
  console.log(data);               // 콘솔로 확인
  show("CREATE 결과", data);       // 화면 출력

  debugger;
  
//   show("CREATE 결과", norm(await res.json()));
  // 변환 전: Response { status: 200, body: ReadableStream }
  // 변환 후: { id: 1, name: "John" }
  // res.json() → JSON 파싱 / norm() → 키 순서 정렬(id, name) / show() → 화면 출력
});



// 5. UPDATE (수정) — PUT
document.querySelector("#btn-update").addEventListener("click", async () => {
  const res = await fetch(`${API}/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Jane" })
  });
  show("UPDATE 결과", norm(await res.json()));
  // 변환 전: Response { status: 200, body: ReadableStream }
  // 변환 후: { id: 1, name: "Jane" }
  // res.json() → JSON 파싱 / norm() → 키 순서 정렬(id, name) / show() → 화면 출력
});

// 6. DELETE (삭제) — DELETE
document.querySelector("#btn-delete").addEventListener("click", async () => {
  await fetch(`${API}/1`, { method: "DELETE" });
  show("DELETE 결과", "1번 사용자 삭제됨");
});