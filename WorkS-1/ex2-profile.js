// 2: ชนิดข้อมูลและ typeof

const varString = "Hello DPU";
const varNumber = 67112134;
const varBoolean = true;
const varUndefined = undefined;
const varNull = null;
const varArray = [1, 2, 3];

console.log(`ค่า: ${varString} | ชนิด: ${typeof varString}`);
console.log(`ค่า: ${varNumber} | ชนิด: ${typeof varNumber}`);
console.log(`ค่า: ${varBoolean} | ชนิด: ${typeof varBoolean}`);
console.log(`ค่า: ${varUndefined} | ชนิด: ${typeof varUndefined}`);

console.log(`ค่า: ${varNull} | ชนิด: ${typeof varNull}`);
console.log(`ค่า: ${varArray} | ชนิด: ${typeof varArray}`);
console.log("typeof null:", typeof varNull); 

let declaredButNotAssigned;
console.log("ตัวแปรที่ประกาศแล้วยังไม่กำหนดค่า:", typeof declaredButNotAssigned); 

const notANumber = Number("abc"); 
console.log("ค่า NaN:", notANumber, "| typeof NaN:", typeof notANumber); 

const inputAge = "20";
const inputScore = "85.5";

const ageAfterConversion = Number(inputAge) + 5;
console.log(`แปลง inputAge เป็นตัวเลขแล้วบวก 5: ${ageAfterConversion}`);

const scoreAfterConversion = Number(inputScore).toFixed(1);
console.log(`แปลง inputScore แล้วแสดงผลทศนิยม 1 ตำแหน่ง: ${scoreAfterConversion}`);

console.log(`inputAge === 20: ${inputAge === 20}`); 
console.log(`Number(inputAge) === 20: ${Number(inputAge) === 20}`); 