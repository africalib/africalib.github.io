const a=`
// class1.js
let captain = "Kim";
export default captain;

// class2.js
import captain from "./class1.js";
console.log(captain); // Kim
`;export{a as default};
