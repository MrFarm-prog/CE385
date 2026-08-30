//  1: แนะนำตัว


const nickname = "ฟาร์ม"; 
const studentId = "67112134"; 
const age = 22; 
const major = "วิศวกรรมคอมพิวเตอร์"; 
const registeredSubjects = 6; 

const currentYear = 2569;
const yearsRemaining = 2;
const graduationYear = currentYear + yearsRemaining;

const profileCard = `
===== บัตรแนะนำตัว =====
ชื่อเล่น       : ${nickname}
รหัสนักศึกษา   : ${studentId}
อายุ           : ${age} ปี
สาขาวิชา       : ${major}
ลงทะเบียน      : ${registeredSubjects} วิชา
ปีที่จะจบ      : ${graduationYear} ← คำนวณจาก ${currentYear} + จำนวนปีที่เหลือ (สมมติเหลืออีก ${yearsRemaining} ปี)
========================
`;

console.log(profileCard);