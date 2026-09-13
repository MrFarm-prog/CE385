// ข้อที่ 4: เลือก Combinator ให้ถูกงาน

'use strict';

// เครื่องมือจำลอง (ห้ามแก้)
const wait = (ms, value, willFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => (willFail ? reject(new Error(`${value} ล้มเหลว`)) : resolve(value)), ms);
  });

// สถานการณ์ 1: หน้าแรก
// ต้องได้ครบทั้งโปรไฟล์ ตารางเรียน ประกาศ ถึงจะเปิดหน้าได้ พลาดตัวเดียวก็เปิดไม่ได้
// เลยใช้ Promise.all ตรงตัว
async function scenario1(announceFail = false) {
  try {
    const [profile, timetable, announcement] = await Promise.all([
      wait(300, 'โปรไฟล์'),
      wait(400, 'ตารางเรียน'),
      wait(500, 'ประกาศ', announceFail),
    ]);
    console.log(`เปิดหน้าแรก: ${profile}, ${timetable}, ${announcement}`);
  } catch (error) {
    console.log(`หน้าแรกเปิดไม่ได้: ${error.message}`);
  }
}

// สถานการณ์ 2: แจ้งเตือนผลสอบ
// อยากรู้ผลของทุกช่องทาง ไม่ว่าจะสำเร็จหรือล้ม ช่องไหนล้มก็แค่รายงานว่าล้ม
// ไม่ให้กระทบช่องอื่น เลยใช้ Promise.allSettled
async function scenario2() {
  const channels = ['อีเมล', 'SMS', 'แอป'];
  const results = await Promise.allSettled([
    wait(300, 'อีเมล'),
    wait(500, 'SMS', true),
    wait(400, 'แอป'),
  ]);

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`ช่องสัญญาณ ${channels[i]}: สำเร็จ (${result.value})`);
    } else {
      console.log(`ช่องสัญญาณ ${channels[i]}: ล้มเหลว (${result.reason.message})`);
    }
  });
}

// สถานการณ์ 3: mirror server
// ขอแค่ตัวไหนสำเร็จก่อนก็พอ ไม่สนตัวที่ล้ม เลยใช้ Promise.any
async function scenario3() {
  try {
    const result = await Promise.any([
      wait(300, 'mirror-A', true),
      wait(600, 'mirror-B'),
    ]);
    console.log(`ได้ข้อมูลตัวแรกที่สำเร็จ → ใช้ข้อมูลจาก: ${result}`);
  } catch (error) {
    // จะมาตรงนี้ก็ต่อเมื่อ mirror ล้มหมดทุกตัว (จะได้ AggregateError)
    console.log('ทุก mirror server ล้มเหลว:', error.message);
  }
}

// สถานการณ์ 4: ค้นหาฐานข้อมูล + timeout
// รอฐานข้อมูลได้แค่ 800ms ถ้าช้ากว่านั้นต้องเลิกรอแล้วใช้แคชเก่าแทน
// เลยเอา wait จริงไปแข่งกับ timeoutPromise ด้วย Promise.race
function timeoutPromise(ms) {
  // ใช้ resolve ไม่ใช่ reject เพราะพอหมดเวลาเราอยากได้ "ค่าสำรอง" ไม่ใช่ error
  return new Promise((resolve) => {
    setTimeout(() => resolve('แคชเก่า'), ms);
  });
}

async function scenario4() {
  const result = await Promise.race([
    wait(1200, 'ข้อมูลจากฐานข้อมูล'),
    timeoutPromise(800),
  ]);
  console.log(`ผลลัพธ์การค้นหา: ${result}`);
}

// รันทั้ง 4 สถานการณ์เรียงกันใน main()
async function main() {
  console.log('=== สถานการณ์ 1: หน้าแรก (Promise.all) ===');
  await scenario1(false); // ทุกอย่างสำเร็จ
  await scenario1(true); // ประกาศล้มเหลว

  console.log('\n=== สถานการณ์ 2: แจ้งเตือนผลสอบ (Promise.allSettled) ===');
  await scenario2();

  console.log('\n=== สถานการณ์ 3: mirror server (Promise.any) ===');
  await scenario3();

  console.log('\n=== สถานการณ์ 4: ค้นหาฐานข้อมูล (Promise.race) ===');
  await scenario4();
}

main().catch((error) => {
  console.error('เกิดข้อผิดพลาดที่ไม่คาดคิดใน main():', error.message);
});