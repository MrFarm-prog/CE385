// ex1-functions.js
// Workshop 2 - ข้อที่ 1 ฟังก์ชันคำนวณคะแนน

const isValidScore = (score) => {
    return typeof score === "number" && score >= 0 && score <= 100;
};

const toGrade = (score) => {
    if (!isValidScore(score)) return "Invalid";

    const grades = [
        { grade: "A", min: 80 },
        { grade: "B+", min: 75 },
        { grade: "B", min: 70 },
        { grade: "C+", min: 65 },
        { grade: "C", min: 60 },
        { grade: "D+", min: 55 },
        { grade: "D", min: 50 },
        { grade: "F", min: 0 }
    ];

    return grades.find(item => score >= item.min).grade;
};

const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    if (!isValidScore(raw) || !isValidScore(full) || full === 0) return 0;
    return (raw / full) * weight;
};

const calculateTotal = (workshop, attendance, project, midterm, final) => {
    return workshop + attendance + project + midterm + final;
};


// -------------------- ทดสอบ --------------------

const students = [
    {
        id: "68001",
        name: "Somchai",
        scores: {
            workshop: calculateWorkshopScore(48),
            attendance: 10,
            project: 15,
            midterm: 20,
            final: 25
        }
    },
    {
        id: "68002",
        name: "Somsri",
        scores: {
            workshop: calculateWorkshopScore(55),
            attendance: 9,
            project: 18,
            midterm: 22,
            final: 30
        }
    },
    {
        id: "68003",
        name: "Anan",
        scores: {
            workshop: calculateWorkshopScore(35),
            attendance: 8,
            project: 12,
            midterm: 15,
            final: 20
        }
    }
];

// แสดงผลเป็นตาราง
const result = students.map(student => ({
    id: student.id,
    name: student.name,
    total: calculateTotal(
        student.scores.workshop,
        student.scores.attendance,
        student.scores.project,
        student.scores.midterm,
        student.scores.final
    )
}));

console.table(result);

// พิสูจน์ค่าเริ่มต้น
const score1 = calculateWorkshopScore(48);
const score2 = calculateWorkshopScore(48, 60, 20);

// ควรได้ค่าเท่ากัน
console.log("score1 === score2:", score1 === score2);

// full ใช้ค่าเริ่มต้น 60 แต่เปลี่ยน weight เป็น 25
const score3 = calculateWorkshopScore(48, undefined, 25);
console.log("score3:", score3);
