//  ข้อที่ 3: async/await และลำดับ vs ขนาน

'use strict';

// ก็อปมาจาก ex2 (ในไฟล์นี้ห้ามใช้ .then ต้องใช้ await ล้วน ๆ)
const students = [
  { id: '6501', name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', score: 78 },
  { id: '6502', name: 'สมหญิง รักเรียน', major: 'วิทยาการคอมพิวเตอร์', score: 65 },
  { id: '6503', name: 'วิชัย ขยันเรียน', major: 'เทคโนโลยีสารสนเทศ', score: 88 },
  { id: '6504', name: 'มานี ตั้งใจดี', major: 'วิศวกรรมซอฟต์แวร์', score: 55 },
];

function toGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'D+';
  if (score >= 50) return 'D';
  return 'F';
}

function fetchStudentByIdAsync(id) {
  return new Promise((resolve, reject) => {
    if (typeof id !== 'string' || id.trim() === '') {
      reject(new Error('รหัสนักศึกษาไม่ถูกต้อง'));
      return;
    }
    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      if (!student) {
        reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
        return;
      }
      resolve({ ...student });
    }, 300);
  });
}

// ดึงทีละคนแบบเรียงลำดับ ด้วย await ใน for...of
async function reportSequential() {
  const ids = ['6501', '6502', '6503'];
  const start = Date.now();

  for (const id of ids) {
    try {
      const student = await fetchStudentByIdAsync(id);
      console.log(`(ลำดับ) พบ: ${student.name}`);
    } catch (error) {
      console.log(`(ลำดับ) ผิดพลาด: ${error.message}`);
    }
  }

  const elapsed = Date.now() - start;
  console.log(`reportSequential ใช้เวลารวม ${elapsed} ms`);
  return elapsed;
}

// ดึงพร้อมกันทั้ง 3 คนด้วย Promise.all
async function reportParallel(sequentialElapsed) {
  const ids = ['6501', '6502', '6503'];
  const start = Date.now();

  const students3 = await Promise.all(ids.map((id) => fetchStudentByIdAsync(id)));

  const elapsed = Date.now() - start;
  students3.forEach((student) => console.log(`(ขนาน) พบ: ${student.name}`));
  console.log(`reportParallel ใช้เวลารวม ${elapsed} ms`);

  if (typeof sequentialElapsed === 'number' && elapsed > 0) {
    const ratio = (sequentialElapsed / elapsed).toFixed(2);
    console.log(`reportParallel เร็วกว่า reportSequential ประมาณ ${ratio} เท่า`);
  }

  return elapsed;
}

// เช็คคนเดียว แบบกันพังเต็มที่ (try-catch-finally)
async function safeReport(id) {
  try {
    const student = await fetchStudentByIdAsync(id);
    console.log(`ข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`);
  } catch (error) {
    console.log(`ตรวจไม่พบ: ${error.message}`);
  } finally {
    console.log(`-- จบการตรวจสอบ ${id} --`);
  }
}

async function main() {
  console.log('=== ส่วนที่ 1: reportSequential ===');
  const seqTime = await reportSequential();

  console.log('\n=== ส่วนที่ 2: reportParallel ===');
  await reportParallel(seqTime);

  console.log('\n=== ส่วนที่ 3: safeReport ===');
  await safeReport('6501'); // id ที่พบ
  await safeReport('9999'); // id ที่ไม่พบ
}

main().catch((error) => {
  // กันไว้เผื่อ main() พังแบบไม่คาดคิด จะได้ไม่กลายเป็น unhandled rejection
  console.error('เกิดข้อผิดพลาดที่ไม่คาดคิดใน main():', error.message);
});

// ---------- คำถามท้ายไฟล์ ----------
//
// 1) ทำไม try-catch ครอบ await แล้วจับ reject ได้ แต่ครอบ callback ธรรมดาไม่ได้?
//    เพราะ await จะแปลง Promise ที่ reject ให้กลายเป็น throw ตรงจุดนั้นเลย พอมัน throw
//    ใน call stack เดียวกันกับ try-catch ก็เลยจับได้ปกติ แต่ callback อย่าง setTimeout
//    หรือ fetchStudentById แบบเก่า มันถูกเรียกใน event loop รอบถัดไป ซึ่งหลุดออกจาก
//    try-catch ที่เขียนไว้ไปนานแล้ว เลยจับไม่ได้ ต้องเช็ค error เองข้างในตัว callback
//    เลย
//
// 2) ถ้าลืม await หน้า Promise.all แล้วเอาผลไปใช้ต่อ จะเกิดอะไรขึ้น?
//    เช่น const result = Promise.all([...]); console.log(result.length);
//    ตัว result ตอนนั้นจะยังเป็น Promise ที่ pending อยู่ ไม่ใช่ array ผลลัพธ์
//    พอเอาไปใช้ต่อทันที เช่น .length หรือ .map(...) ก็จะได้ undefined หรือพัง
//    เป็น TypeError เพราะ Promise ไม่มี property พวกนี้ ต้อง await ก่อนถึงจะได้ค่า
//    จริงออกมาใช้

module.exports = { reportSequential, reportParallel, safeReport };