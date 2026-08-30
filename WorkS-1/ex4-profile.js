// 4: ตัดเกรดจากคะแนน


function toGrade(score) {

  if (score < 0 || score > 100) {
    return "คะแนนไม่ถูกต้อง ต้องอยู่ระหว่าง 0-100 และไม่ตัดเกรดให้";
  }

  if (score >= 80) {
    return "A";
  } else if (score >= 75) {
    return "B+";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 65) {
    return "C+";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 55) {
    return "D+";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F";
  }
}

const testScores = [95, 80, 79, 75, 70, 65, 60, 55, 50, 49, 0, -5, 120];

for (const score of testScores) {
  console.log(`คะแนน ${score} → เกรด ${toGrade(score)}`);
}