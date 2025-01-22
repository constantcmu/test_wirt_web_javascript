# Crypto Price Tracker with Scientific Calculator

เว็บแอปพลิเคชันสำหรับติดตามราคา Cryptocurrency แบบเรียลไทม์ พร้อมเครื่องคิดเลขวิทยาศาสตร์

## การพัฒนาด้วย GitHub Copilot

โปรเจคนี้ถูกพัฒนาด้วยความช่วยเหลือจาก GitHub Copilot โดยมีการปรับปรุงและเพิ่มฟีเจอร์ต่างๆ ดังนี้:

### การเปลี่ยนแปลงหลัก
1. สร้างโครงสร้างพื้นฐานของ Crypto Price Tracker
2. เพิ่มการแสดงกราฟแบบเรียลไทม์
3. เพิ่มเครื่องคิดเลขวิทยาศาสตร์
4. ปรับปรุง UI/UX และเพิ่ม Dark Mode

### Chat History ที่นำไปสู่การเปลี่ยนแปลง
1. "เพิ่ม ปุ่มคลิกขยายเพื่อดูกราฟหน้าใหม่ column ใหม่ถัดจาก last update"
   - เพิ่มคอลัมน์ Details
   - เพิ่มปุ่มดูกราฟแบบเต็มจอ
   - เพิ่มการอัพเดทกราฟแบบเรียลไทม์

2. "ให้กราฟหน้าที่กดขยาย กราฟ update เหมือนในช่อง chart-cell"
   - ปรับปรุงการอัพเดทข้อมูลกราฟ
   - เพิ่มการซิงค์ข้อมูลระหว่างหน้าหลักและหน้ากราฟ

3. "ตอนนี้ย้าย calculator.html ไปใน folder calculator แล้ว ช่วยปรับ code หน่อย"
   - จัดโครงสร้างโฟลเดอร์ใหม่
   - แยกไฟล์ CSS และ JavaScript
   - ปรับการอ้างอิงไฟล์

### ไฟล์ที่ถูกสร้างและแก้ไข
- `index.html`: หน้าหลักของแอพ
- `script.js`: JavaScript หลัก
- `/calculator/calculator.html`: เครื่องคิดเลข
- `/calculator/styles_calculator.css`: สไตล์ของเครื่องคิดเลข
- `/calculator/script_calculator.js`: โค้ดของเครื่องคิดเลข

## คุณสมบัติ

- แสดงราคา Cryptocurrency จาก 4 exchanges (Binance, Coinbase, Kraken, Bitkub)
- อัพเดทราคาแบบเรียลไทม์ทุก 1 วินาที
- แสดงกราฟราคาขนาดเล็กสำหรับแต่ละ exchange
- สามารถดูกราฟแบบเต็มจอได้พร้อมปรับช่วงเวลาอัพเดท
- มีเครื่องคิดเลขวิทยาศาสตร์ในตัว
- รองรับ Dark/Light mode
- แสดงเปอร์เซ็นต์การเปลี่ยนแปลงของราคา

## การติดตั้ง

1. Clone repository:
```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
```

2. เปิดโฟลเดอร์โปรเจค:
```bash
cd crypto-price-tracker
```

3. เปิดไฟล์ index.html ในเว็บบราวเซอร์ หรือใช้ Live Server

## โครงสร้างโปรเจค

```
crypto-price-tracker/
├── index.html          # หน้าหลักของแอพ
├── script.js           # JavaScript หลัก
├── README.md          # เอกสารนี้
└── calculator/        # โฟลเดอร์สำหรับเครื่องคิดเลข
    ├── calculator.html
    ├── styles_calculator.css
    └── script_calculator.js
```

## วิธีใช้งาน

1. เลือกคู่เหรียญที่ต้องการดูราคาจาก dropdown
2. ดูราคาและกราฟแบบเรียลไทม์จากแต่ละ exchange
3. คลิกปุ่ม "View" เพื่อดูกราฟแบบเต็มจอ
4. ใช้ปุ่ม "Open Calculator" เพื่อเปิดเครื่องคิดเลขวิทยาศาสตร์
5. สลับ Dark/Light mode ด้วยปุ่มด้านบนขวา

## เทคโนโลยีที่ใช้

- HTML5
- CSS3
- JavaScript
- Chart.js
- Bootstrap 5
- Font Awesome
- APIs จาก Exchanges ต่างๆ

## การพัฒนาต่อ

- [ ] เพิ่ม exchanges อื่นๆ
- [ ] เพิ่มการแจ้งเตือนราคา
- [ ] เพิ่มการบันทึกประวัติราคา
- [ ] เพิ่มการเปรียบเทียบราคาระหว่าง exchanges

## License

MIT License - สามารถนำไปใช้งานหรือดัดแปลงได้อย่างอิสระ
