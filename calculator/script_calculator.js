// เพิ่มค่าลงในจอแสดงผล
function appendToDisplay(value) {
    let display = document.getElementById('display');
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
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
        let result = eval(display.value);
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        display.value = Number.isInteger(result) ? result : result.toFixed(8);
    } catch (e) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// เพิ่มเอฟเฟกต์เสียงเมื่อกดปุ่ม
function playClickSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiKQQgZaLvt559fFwdKn+PwtHMrCjiR1/LMeSwIN5DY89GBMwg0jdXz1YY4CDCJ0fPYijwILIXN89qOQAgpgcrz3ZJECCWAx/PglEcII3zE8+KWSgghe8Pz5ZlNCB94wPPonEsIHna+8+qfTggddbzz7KFQCBx0uvPvpFEIG3O48/GmUwgac7fz9KdUCBpytvP2qVYIGXK18/iqVwgZcrTz+qxYCBhxs/P8rVoIGHGy8/6uWwgXcLHz/69cCBdwsPMAsl0IF3Cv8wGyXggWb67zArNfCBZvrvMDtGAIFW+t8wW1YQgVbqzzBrZiCBRurfMIt2MIE26s8wm4ZAgTbavzCrllCBJtqvMMumYIEm2q8w27ZwgSbarxDrxoCBFsqfEQvWkIEWyp8RG+aggRbKnxEr9rCBBrqPETwGwIEGun8RTBbQgQa6fxFcJuCA9rpvEXw28ID2ul8RjEcAgPa6XxGcVxCA9qpPEaxnIIDmqk8RvHcwgOaqPxHMh0CA5po/EdyXUIDWmi8R7KdggNaaHxH8t3CA1poPEgy3gIDGmf8SHMeQgMaZ/xIs56CAxpn/Ejz3sIC2ie8STQfAgLaJ7xJdF9CAtonfEm0n4ICmid8SfTfwgKaJzxKNSACAlom/Ep1YEICWib8SrWgggJaJrxK9eDCAlomfEs2IQICGiZ8S3ZhQgIZ5nxLtqGCAhnmPEv24cIB2eY8TDciAgHZ5fxMd2JCAZnlvEy3ooIBmeW8TPfiwgGZ5XxNN+MCAVnlfE14I0IBWaU8TbhjggFZpTxN+KPCAVmk/E444AIBGaT8TnkkAgEZpPxOuWSCARlkvE75pMIA2WS8TzolAgDZZHxPeeVCAJlkfE+6JYIAmWQ8T/pmAgCZZDxQOqZCAFlkPFB65oIAGWP8ULsnAgAZY/xQ+2dCABlj/FE7p4I/2SO8UXvoAj/ZI7xRu+hCP9kjvFH8KII/mSN8Ujxowj+Y43xSfKkCP5jjPFJ86UI/mOM8Ur0pwj9Y4zxS/WoCP1jjPFM9qkI/WOL8U33qgj9YovxTvmrCP1iivFP+qwI/GKK8VD7rQj8YorxUfyuCPxiifFS/a8I/GKJ8VP+sAj7YonxVP+xCPtiiPFVALII+2KI8VYBswj7YojxVwK0CPpih/FYA7UI+mKH8VkEtgj6YofxWgW3CPpihvFbBrgI+WKG8VwHuQj5YobxXQi6CPlihfFeCbsI+GKF8V8Kuwj4YoXxYAu8CPhibvFhDL0I92Ju8WINvgj3Ym7xYw6/CPdibvFkD8AI92Jt8WUQwQj2Ym3xZhHCCPZibfFnEsMI9mJt8WgTxAj2YmzxaRTFCPVibPFqFcYI9WJs8WsWxwj1YmvxbBfICPVia/FtGMkI9WJr8W4Zygj0YmvxbxrLCPRia/FwG8wI9GJq8XEczgj0YmrxciURYVN0jp2HQzZ9x+mygx8Qh/f/wi4FQtHw1YYzEan//8ECAn/1/71CBXn7/7MFhP//6wWV//+gBrH//5YH0P//jAgx//+BCJb//3cJ////bgsY//9lC3b//1wM2///Uw1X//9KDML//0EN+f//OA4q//8wD1f//ykQgv//IhGt//8bEtj//xUT+f//DxQe//8KFT///wUWWv//AReA//');
    audio.play();
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});