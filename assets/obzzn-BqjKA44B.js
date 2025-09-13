const t=`
<!-- index.html -->
<html>
<body>
    <!-- 여기 -->
    <script type="module" src="class2.js"><\/script>
</body>
</html>

// class1.js
let captain = "Kim";
export default captain;

// class2.js
import captain from "./class1.js";
console.log(captain); // Kim
`;export{t as default};
