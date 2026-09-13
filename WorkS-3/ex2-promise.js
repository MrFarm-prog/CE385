//  ข้อที่ 2: แปลง Callback เป็น Promise

'use strict';

// ก็อปข้อมูลจาก ex1 มาใช้เลยตามกติกา
const students = [
  { id: '6501', name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', score: 78 },
  { id: '6502', name: 'สมหญิง รักเรียน', major: 'วิทยาการคอมพิวเตอร์', score: 65 },
  { id: '6503', name: 'วิชัย ขยันเรียน', major: 'เทคโนโลยีสารสนเทศ', score: 88 },
  { id: '6504', name: 'มานี ตั้งใจดี', major: 'วิศวกรรมซอฟต์แวร์', score: 55 },
];

// กฎตัดเกรดเดิมจาก Workshop 2
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

// fetchStudentByIdAsync(id) - เวอร์ชัน Promise ของ fetchStudentById
// ห้ามใช้ async ในนี้ ใช้ new Promise ล้วน ๆ
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

// เรียกใช้ครบ 3 กรณี พร้อม .then/.catch/.finally
function runAllCases() {
  // ก) id มีจริง
  fetchStudentByIdAsync('6501')
    .then((student) => {
      console.log('[กรณี ก - มีจริง] พบข้อมูล:', student);
    })
    .catch((error) => {
      console.log('[กรณี ก - มีจริง] เกิดข้อผิดพลาด:', error.message);
    })
    .finally(() => {
      console.log('[กรณี ก] จบการทำงาน');
    });

  // ข) id ไม่มี
  fetchStudentByIdAsync('9999')
    .then((student) => {
      console.log('[กรณี ข - ไม่มี] พบข้อมูล:', student);
    })
    .catch((error) => {
      console.log('[กรณี ข - ไม่มี] เกิดข้อผิดพลาด:', error.message);
    })
    .finally(() => {
      console.log('[กรณี ข] จบการทำงาน');
    });

  // ค) id ผิดรูปแบบ
  fetchStudentByIdAsync(42)
    .then((student) => {
      console.log('[กรณี ค - ผิดรูปแบบ] พบข้อมูล:', student);
    })
    .catch((error) => {
      console.log('[กรณี ค - ผิดรูปแบบ] เกิดข้อผิดพลาด:', error.message);
    })
    .finally(() => {
      console.log('[กรณี ค] จบการทำงาน');
    });
}

runAllCases();

// โซ่ 3 ชั้น: ดึงข้อมูล -> แปลงเป็น {name, grade} -> แปลงเป็นข้อความ -> พิมพ์
fetchStudentByIdAsync('6501')
  .then((student) => {
    return { name: student.name, grade: toGrade(student.score) };
  })
  .then((info) => {
    return `รายงานผล: นักศึกษา ${info.name} ได้เกรด ${info.grade}`;
  })
  .then((reportLine) => {
    console.log('[โซ่ 3 ชั้น]', reportLine);
  })
  .catch((error) => {
    console.log('[โซ่ 3 ชั้น] เกิดข้อผิดพลาด:', error.message);
  });

// โบนัส: promisify(fn) แปลงฟังก์ชัน error-first ตัวไหนก็ได้ให้เป็น Promise
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  };
}

// เอาฟังก์ชันอื่นมาลองด้วย ไม่ใช่ของข้อ 1 - ทอยลูกเต๋าแบบ error-first
function rollDiceCallback(sides, callback) {
  setTimeout(() => {
    if (typeof sides !== 'number' || sides <= 0) {
      callback(new Error('จำนวนด้านของลูกเต๋าต้องเป็นตัวเลขที่มากกว่า 0'));
      return;
    }
    callback(null, Math.floor(Math.random() * sides) + 1);
  }, 200);
}

const rollDiceAsync = promisify(rollDiceCallback);

rollDiceAsync(6)
  .then((result) => {
    console.log('[promisify ทดสอบ] ทอยลูกเต๋าได้:', result);
  })
  .catch((error) => {
    console.log('[promisify ทดสอบ] เกิดข้อผิดพลาด:', error.message);
  });

// ลองยิงกรณี error ผ่าน promisify ด้วย
rollDiceAsync(-1)
  .then((result) => {
    console.log('[promisify ทดสอบ error] ทอยลูกเต๋าได้:', result);
  })
  .catch((error) => {
    console.log('[promisify ทดสอบ error] เกิดข้อผิดพลาด:', error.message);
  });

module.exports = { fetchStudentByIdAsync, toGrade, promisify };