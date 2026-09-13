//  ข้อที่ 1: ระบบตรวจทะเบียน (Error-first Callback)

'use strict';

// ข้อมูลนักศึกษา 4 คน เก็บไว้ในไฟล์นี้เลย ไม่ export ออกไปข้างนอก
const students = [
  { id: '6501', name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', score: 78 },
  { id: '6502', name: 'สมหญิง รักเรียน', major: 'วิทยาการคอมพิวเตอร์', score: 65 },
  { id: '6503', name: 'วิชัย ขยันเรียน', major: 'เทคโนโลยีสารสนเทศ', score: 88 },
  { id: '6504', name: 'มานี ตั้งใจดี', major: 'วิศวกรรมซอฟต์แวร์', score: 55 },
];

// fetchStudentById(id, callback) - ตัวหลักของข้อนี้ ทำแบบ error-first
function fetchStudentById(id, callback) {
  // เช็ครูปแบบ id ก่อนเลย ยังไม่ต้องหน่วงเวลาเพราะยังไม่ได้ไปแตะฐานข้อมูล
  if (typeof id !== 'string' || id.trim() === '') {
    callback(new Error('รหัสนักศึกษาไม่ถูกต้อง'));
    return; // เรียก callback(error) แล้วต้อง return ทุกครั้ง เดี๋ยวโค้ดข้างล่างจะรันต่อ
  }

  // จำลองว่ากำลังไปค้นฐานข้อมูล หน่วง 300ms
  setTimeout(() => {
    const student = students.find((s) => s.id === id);

    if (!student) {
      callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
      return;
    }

    // ส่งสำเนากลับไป ไม่ส่ง object ตัวจริงจาก array ตรง ๆ
    callback(null, { ...student });
  }, 300);
}

// ลองเรียกใช้ให้ครบ 3 กรณีตามโจทย์
function runAllCases() {
  // ก) id มีจริง
  fetchStudentById('6501', (error, student) => {
    if (error) {
      console.log('[กรณี ก - มีจริง] เกิดข้อผิดพลาด:', error.message);
      return;
    }
    console.log('[กรณี ก - มีจริง] พบข้อมูล:', student);
  });

  // ข) id ไม่มีอยู่จริง
  fetchStudentById('9999', (error, student) => {
    if (error) {
      console.log('[กรณี ข - ไม่มี] เกิดข้อผิดพลาด:', error.message);
      return;
    }
    console.log('[กรณี ข - ไม่มี] พบข้อมูล:', student);
  });

  // ค) id ผิดรูปแบบ (ส่ง number เข้าไปแทน string)
  fetchStudentById(42, (error, student) => {
    if (error) {
      console.log('[กรณี ค - ผิดรูปแบบ] เกิดข้อผิดพลาด:', error.message);
      return;
    }
    console.log('[กรณี ค - ผิดรูปแบบ] พบข้อมูล:', student);
  });
}

runAllCases();

// ---------- คำถามท้ายไฟล์ ----------
//
// 1) ถ้าลืมเช็ค error แล้วรีบอ่าน .name เลย จะเป็นยังไง?
//    เช่นเขียนว่า fetchStudentById('9999', (error, student) => { console.log(student.name); })
//    พอ id ไม่เจอ ตัว student ที่ส่งมาจะเป็น undefined (เพราะ callback ถูกเรียกแบบ
//    callback(error) เฉย ๆ ไม่มีค่าที่สอง) พอไปเรียก .name ต่อจาก undefined มันเลย
//    throw TypeError: Cannot read properties of undefined (reading 'name') ตรง
//    บรรทัด console.log(student.name) นั่นแหละ ถ้าไม่มี try-catch ครอบ โปรแกรม
//    ก็ crash ไปเลย
//
// 2) ทำไมต้อง return หลังเรียก callback(error)?
//    เพราะเรียก callback ไปแล้วโค้ดมันไม่ได้หยุดเองนะ ถ้าไม่ return บรรทัดถัดไป
//    ก็ยังรันต่อ เผลอ ๆ อาจไปเรียก callback(null, student) ซ้ำอีกรอบ กลายเป็นเรียก
//    callback สองครั้งในคำขอเดียว ฝั่งคนใช้ก็งงว่าตกลงจะเอาผลไหนกันแน่ ใส่ return
//    ไว้ก็แค่บอกว่า "จบเคสนี้แล้ว" ไม่ให้มันรันเลยไปแตะส่วนที่เหลือ

module.exports = { fetchStudentById };