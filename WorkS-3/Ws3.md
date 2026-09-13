// ex1-callback.js — Error-first Callback
เป็นระบบจำลองการค้นหาข้อมูลนักศึกษาจากรหัส id โดยใช้ Error-first Callback
หลักการทำงาน
-ตรวจสอบก่อนว่า id เป็น String และไม่ใช่ค่าว่าง
-ถ้าข้อมูลไม่ถูกต้อง จะส่ง Error กลับทันที
-ถ้าข้อมูลถูกต้อง จะจำลองการค้นหาด้วย setTimeout 300ms
-ถ้าเจอนักศึกษา จะส่งข้อมูลกลับด้วย callback(null, student)
-ถ้าไม่เจอ จะส่ง Error กลับ
-ใช้ return หลังเกิด Error เพื่อป้องกันไม่ให้โค้ดส่วนต่อไปทำงานซ้ำ

// ex2-promise.js — แปลง Callback เป็น Promise
เป็นการทำงานจากข้อ 1 มาเปลี่ยนจาก Callback เป็น Promise เพื่อให้จัดการกับ Asynchronous Code ได้ง่ายขึ้น
หลักการทำงาน
-ใช้ new Promise() แทน Callback
-ถ้าเกิดข้อผิดพลาดใช้ reject()
-ถ้าทำงานสำเร็จใช้ resolve()
-ใช้ .then() สำหรับผลลัพธ์ และ .catch() สำหรับ Error
-ใช้ .finally() สำหรับคำสั่งที่ต้องทำทุกกรณี

// ex3-async-await.js — async/await และลำดับ vs ขนาน
เปลี่ยนจากการใช้ .then() มาใช้ async/await และเปรียบเทียบการทำงานแบบทีละคนกับการทำงานพร้อมกัน
หลักการทำงาน
-reportSequential() ใช้ await ใน for...of ทำให้ต้องรอนักศึกษาแต่ละคนให้เสร็จก่อน จึงใช้เวลาประมาณ 900ms
-reportParallel() ใช้ Promise.all() และ map() เพื่อค้นหานักศึกษาทั้ง 3 คนพร้อมกัน จึงใช้เวลาประมาณ 300ms
-safeReport() ใช้ try-catch-finally เพื่อจัดการทั้งกรณีสำเร็จและเกิด Error

// ex4-combinators.js — เลือก Promise Combinator ให้เหมาะกับงาน
เลือก Promise Combinator ให้เหมาะกับสถานการณ์ต่าง ๆ
-สถานการณ์	Combinator	เหตุผล
-เปิดหน้าแรก	Promise.all	ต้องได้ข้อมูลครบทุกส่วน ถ้าส่วนใดล้มเหลวก็เปิดไม่ได้
-แจ้งเตือนผลสอบ	Promise.allSettled	ต้องการรู้ผลของทุกช่อง แม้บางช่องจะล้มเหลว
-Mirror Server	Promise.any	ขอแค่ Server ตัวใดตัวหนึ่งตอบสำเร็จก็พอ
-ค้นฐานข้อมูล	Promise.race	ให้ข้อมูลจากฐานข้อมูลแข่งกับ Timeout ถ้าช้าเกิน 800ms ให้ใช้ข้อมูลสำรอง
