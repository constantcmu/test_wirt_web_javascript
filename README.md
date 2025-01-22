# Crypto Price Tracker with Scientific Calculator

เว็บแอปพลิเคชันสำหรับติดตามราคา Cryptocurrency แบบเรียลไทม์ พร้อมเครื่องคิดเลขวิทยาศาสตร์

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
