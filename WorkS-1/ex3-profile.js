// 3: เครื่องคิดเลขคะแนน


const workshopRaw = 48;
const attendance = 9;
const project = 17;
const midterm = 15;
const final = 24;

const WORKSHOP_MAX_RAW = 60;
const WORKSHOP_WEIGHT = 20;
const FULL_SCORE = 100;
const PASS_THRESHOLD = 80;


const workshopScore = (workshopRaw / WORKSHOP_MAX_RAW) * WORKSHOP_WEIGHT;

const totalScore = workshopScore + attendance + project + midterm + final;

const percentage = (totalScore / FULL_SCORE) * 100;

const pointsNeededFor80 = PASS_THRESHOLD - totalScore;

const summary = `
===== สรุปคะแนน CE385 =====
คะแนน Workshop (แปลงแล้ว) : ${workshopScore.toFixed(2)}
คะแนนเข้าเรียน              : ${attendance.toFixed(2)}
คะแนนโปรเจกต์                : ${project.toFixed(2)}
คะแนนกลางภาค                : ${midterm.toFixed(2)}
คะแนนปลายภาค                : ${final.toFixed(2)}
---------------------------
คะแนนรวม                    : ${totalScore.toFixed(2)}
คิดเป็นเปอร์เซ็นต์           : ${percentage.toFixed(2)}%
ต้องการอีกเพื่อให้ถึง 80     : ${pointsNeededFor80.toFixed(2)}
============================
`;

console.log(summary);