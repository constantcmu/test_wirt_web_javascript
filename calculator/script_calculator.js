// เพิ่มค่าลงในจอแสดงผล
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// เคลียร์จอแสดงผล
function clearDisplay() {
    document.getElementById('display').value = '';
}

// ลบตัวสุดท้าย
function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// คำนวณผลลัพธ์
function calculate() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}