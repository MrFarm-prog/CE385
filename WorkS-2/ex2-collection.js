// ex2-collection.js
// Workshop 2 - ข้อที่ 2 ทะเบียนนักศึกษา

const students = [
    {
        id: "68001",
        name: "Somchai",
        major: "CE",
        score: 85,
        contact: {
            email: "somchai@example.com",
            phone: "0811111111"
        }
    },
    {
        id: "68002",
        name: "Somsri",
        major: "IT",
        score: 72,
        contact: {
            email: "somsri@example.com",
            phone: "0822222222"
        }
    },
    {
        id: "68003",
        name: "Anan",
        major: "CE",
        score: 48,
        contact: {
            email: "anan@example.com",
            phone: "0833333333"
        }
    },
    {
        id: "68004",
        name: "Mali",
        major: "IT",
        score: 91,
        contact: {
            email: "mali@example.com",
            phone: "0844444444"
        }
    },
    {
        id: "68005",
        name: "Narin",
        major: "CE",
        score: 63,
        contact: {
            email: "narin@example.com",
            phone: "0855555555"
        }
    },
    {
        id: "68006",
        name: "Ploy",
        major: "IT",
        score: 45,
        contact: {
            email: "ploy@example.com",
            phone: "0866666666"
        }
    }
];

// ค้นหานักศึกษาจาก id
const findById = (students, id) => {
    return students.find(student => student.id === id);
};

// ค้นหานักศึกษาตามสาขา
const findByMajor = (students, major) => {
    return students.filter(student => student.major === major);
};

// ตรวจว่ามีนักศึกษาที่คะแนนต่ำกว่า 50 หรือไม่
const hasFailingStudent = (students) => {
    return students.some(student => student.score < 50);
};

// ค้นหา email โดยไม่ให้เกิด error หากไม่มี contact
const getEmail = (students, id) => {
    const student = findById(students, id);
    return student?.contact?.email ?? "ไม่พบข้อมูลติดต่อ";
};


// -------------------- ทดสอบ --------------------

console.log("findById:", findById(students, "68001"));
console.log("findByMajor CE:", findByMajor(students, "CE"));
console.log("hasFailingStudent:", hasFailingStudent(students));

// กรณีไม่พบข้อมูล
console.log("findById 9999:", findById(students, "9999"));
console.log("getEmail 9999:", getEmail(students, "9999"));

// เพิ่มนักศึกษาที่ไม่มี contact โดยไม่แก้ array ต้นฉบับ
const newStudent = {
    id: "68007",
    name: "Korn",
    major: "CE",
    score: 70
};

const updatedStudents = [...students, newStudent];

console.log("email 68007:", getEmail(updatedStudents, "68007"));
console.table(updatedStudents);
