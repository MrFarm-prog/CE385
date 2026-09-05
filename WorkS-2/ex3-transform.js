// ex3-transform.js
// Workshop 2 - ข้อที่ 3 สรุปผลการเรียน

// ใช้ข้อมูลชุดเดียวกับข้อที่ 2
const students = [
    { id: "68001", name: "Somchai", major: "CE", score: 85 },
    { id: "68002", name: "Somsri", major: "IT", score: 72 },
    { id: "68003", name: "Anan", major: "CE", score: 48 },
    { id: "68004", name: "Mali", major: "IT", score: 91 },
    { id: "68005", name: "Narin", major: "CE", score: 63 },
    { id: "68006", name: "Ploy", major: "IT", score: 45 }
];

// คืน array ของชื่อ
const getNames = (students) => {
    return students.map(student => student.name);
};

// คืน array ของนักศึกษาที่คะแนน >= 50
const getPassedStudents = (students) => {
    return students.filter(student => student.score >= 50);
};

// ผลรวมคะแนนทั้งหมด
const getTotalScore = (students) => {
    return students.reduce((total, student) => total + student.score, 0);
};

// ค่าเฉลี่ยคะแนน ปัดทศนิยม 2 ตำแหน่ง
// ถ้า array ว่าง ให้คืน 0 ไม่ใช่ NaN
const getAverageScore = (students) => {
    if (students.length === 0) return 0;

    const total = getTotalScore(students);
    return Number((total / students.length).toFixed(2));
};

// นับจำนวนตามเกรด
const countByGrade = (students) => {
    return students.reduce((result, student) => {
        const score = student.score;

        let grade;

        if (score >= 80) grade = "A";
        else if (score >= 75) grade = "B+";
        else if (score >= 70) grade = "B";
        else if (score >= 65) grade = "C+";
        else if (score >= 60) grade = "C";
        else if (score >= 55) grade = "D+";
        else if (score >= 50) grade = "D";
        else grade = "F";

        result[grade] = (result[grade] ?? 0) + 1;

        return result;
    }, {});
};

// หานักศึกษาที่คะแนนสูงสุด
const getTopStudent = (students) => {
    if (students.length === 0) return undefined;

    return students.reduce((top, student) => {
        return student.score > top.score ? student : top;
    });
};


// -------------------- ทดสอบ --------------------

console.log("Names:", getNames(students));
console.log("Passed:", getPassedStudents(students));
console.log("Total:", getTotalScore(students));
console.log("Average:", getAverageScore(students));
console.log("Grade count:", countByGrade(students));
console.log("Top student:", getTopStudent(students));

// ทดสอบ array ว่าง
const emptyStudents = [];

console.log("Empty names:", getNames(emptyStudents));
console.log("Empty passed:", getPassedStudents(emptyStudents));
console.log("Empty total:", getTotalScore(emptyStudents));
console.log("Empty average:", getAverageScore(emptyStudents));
console.log("Empty grade count:", countByGrade(emptyStudents));
console.log("Empty top student:", getTopStudent(emptyStudents));

// ต่อ filter -> map -> reduce
const cePassedAverage = students
    .filter(student => student.major === "CE")
    .filter(student => student.score >= 50)
    .map(student => student.score)
    .reduce((total, score, index, scores) => {
        if (index === scores.length - 1) {
            return (total + score) / scores.length;
        }
        return total + score;
    }, 0);

console.log("CE passed average:", cePassedAverage);
