// 5: ระบบสั่งอาหาร

function getMenuPrice(menu) {
  let price;
  switch (menu) {
    case "ข้าวผัด":
    case "ข้าวมันไก่":
    case "ข้าวหมูแดง":
      price = 50;
      break;
    case "ผัดไทย":
      price = 60;
      break;
    case "ต้มยำกุ้ง":
      price = 120;
      break;
    default:

      price = 0;
      break;
  }
  return price;
}

function getSizeMultiplier(size) {
  switch (size) {
    case "ธรรมดา":
      return 1;
    case "พิเศษ":
      return 1.5;
    case "จัมโบ้":
      return 2;
    default:
      return 1;
  }
}

const order = [
  { menu: "ผัดไทย", size: "พิเศษ", qty: 2 },
  { menu: "ข้าวผัด", size: "ธรรมดา", qty: 1 },
  { menu: "ต้มยำกุ้ง", size: "จัมโบ้", qty: 1 },
  { menu: "ข้าวมันไก่", size: "ธรรมดา", qty: 3 },
  { menu: "ก๋วยเตี๋ยวลุยสวน", size: "ธรรมดา", qty: 1 },
];

let grandTotal = 0;

for (const item of order) {
  const unitPrice = getMenuPrice(item.menu);
  const multiplier = getSizeMultiplier(item.size);
  const lineTotal = unitPrice * multiplier * item.qty;
  grandTotal += lineTotal;

  console.log(`${item.menu} (${item.size}) x${item.qty} = ${lineTotal} บาท`);
}

console.log(`รวมทั้งบิล: ${grandTotal} บาท`);