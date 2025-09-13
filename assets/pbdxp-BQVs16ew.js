const t=`
<button onclick="read()">조회</button>
<div id="post">조회 결과 출력</div>

<script>
async function read() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (response.status === 200) {
        document.getElementById("post").innerText = await response.text();
    } else {
        window.alert("오류가 있습니다.")
    }
}
<\/script>
`;export{t as default};
