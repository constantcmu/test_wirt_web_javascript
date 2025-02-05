let currentPair = 'BTC/USDT';

const exchanges = [
    {
        name: 'Binance',
        getUrl: (pair) => `https://api.binance.com/api/v3/ticker/price?symbol=${pair.replace('/', '')}`
    },
    {
        name: 'Coinbase',
        getUrl: (pair) => `https://api.coinbase.com/v2/prices/${pair.replace('/USDT', '-USD')}/spot`
    },
    {
        name: 'Kraken',
        getUrl: (pair) => `https://api.kraken.com/0/public/Ticker?pair=${pair.replace('/', '')}`
    },
    {
        name: 'Bitkub',
        getUrl: (pair) => `https://api.bitkub.com/api/market/ticker?sym=THB_${pair.split('/')[0]}`
    }
];

let previousPrices = new Map();

// เพิ่มตัวแปรสำหรับเก็บประวัติราคา
const priceHistory = new Map(); // exchange -> [{timestamp, price}]
const MAX_HISTORY_POINTS = 24; // เก็บข้อมูล 24 จุด

function initializePriceHistory(exchange) {
    if (!priceHistory.has(exchange)) {
        priceHistory.set(exchange, []);
    }
}

function updatePriceHistory(exchange, price) {
    const history = priceHistory.get(exchange);
    history.push({ timestamp: new Date(), price });
    if (history.length > MAX_HISTORY_POINTS) {
        history.shift();
    }
}

function calculateChange(exchange) {
    const history = priceHistory.get(exchange);
    if (history.length < 2) return null;
    const oldestPrice = history[0].price;
    const newestPrice = history[history.length - 1].price;
    return ((newestPrice - oldestPrice) / oldestPrice) * 100;
}

function createChart(exchange, chartCtx) {
    const history = priceHistory.get(exchange);
    const labels = history.map(h => h.timestamp.toLocaleTimeString());
    const prices = history.map(h => h.price);
    
    // คำนวณการเปลี่ยนแปลงของราคา
    const priceChange = prices[prices.length - 1] - prices[0];
    const chartColor = priceChange >= 0 ? '#00c853' : '#ff1744';
    
    // สร้าง gradient ขนาดเล็กลง
    const ctx = chartCtx.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 20); // ปรับขนาดตามความสูง
    gradient.addColorStop(0, `${chartColor}20`);
    gradient.addColorStop(1, `${chartColor}00`);

    return new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: prices,
                borderColor: chartColor,
                borderWidth: 1,          // ปรับความหนาของเส้น
                tension: 0.4,
                fill: true,
                backgroundColor: gradient,
                pointRadius: 0,
                pointHoverRadius: 0,
                cubicInterpolationMode: 'monotone'
            }]
        },
        options: {
            plugins: { 
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: {
                    display: false,
                    beginAtZero: false
                }
            },
            responsive: true,
            maintainAspectRatio: true,   // เปลี่ยนเป็น true
            aspectRatio: 1,              // บังคับให้เป็นสี่เหลี่ยมจัตุรัส
            animation: {
                duration: 0
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                line: {
                    borderWidth: 1,  // ลดความหนาของเส้น
                    borderJoinStyle: 'round'
                }
            },
            devicePixelRatio: 2,  // เพิ่มความคมชัด
            layout: {
                padding: 1               // เพิ่ม padding เล็กน้อย
            }
        }
    });
}

function changeTradingPair() {
    currentPair = document.getElementById('tradingPair').value;
    clearTable();
    updateAllPrices();
}

function clearTable() {
    const table = document.getElementById('priceTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    previousPrices.clear();
}

async function fetchPrice(exchange) {
    try {
        const response = await fetch(exchange.getUrl(currentPair));
        const data = await response.json();
        let price;

        switch(exchange.name) {
            case 'Binance':
                price = parseFloat(data.price);
                break;
            case 'Coinbase':
                price = parseFloat(data.data.amount);
                break;
            case 'Kraken':
                const pairKey = Object.keys(data.result)[0];
                price = parseFloat(data.result[pairKey].c[0]);
                break;
            case 'Bitkub':
                const symbol = `THB_${currentPair.split('/')[0]}`;
                if (data[symbol]) {
                    price = parseFloat(data[symbol].last) / 35; // แปลง THB เป็น USD โดยประมาณ
                } else {
                    throw new Error('Symbol not found in Bitkub response');
                }
                break;
        }

        if (isNaN(price)) {
            throw new Error('Invalid price value');
        }

        return { name: exchange.name, pair: currentPair, price, timestamp: new Date() };
    } catch (error) {
        console.error(`Error fetching ${exchange.name}:`, error);
        return { name: exchange.name, pair: currentPair, price: 'Error', timestamp: new Date() };
    }
}

function viewDetailedChart(exchange) {
    const history = priceHistory.get(exchange);
    if (!history || history.length === 0) return;

    const chartData = JSON.stringify({
        exchange,
        pair: currentPair,
        history: history
    });

    const w = window.open('', '_blank');
    w.document.write(`
        <html>
        <head>
            <title>${exchange} - ${currentPair} Detailed Chart</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { margin: 20px; font-family: Arial, sans-serif; }
                .chart-container { width: 100%; height: 75vh; margin-top: 20px; }
                .btn-group .btn { font-size: 0.9rem; }
                .btn-group .btn.active { background-color: #0d6efd; color: white; }
                .back-button {
                    margin-right: 15px;
                    padding: 5px 15px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .back-button:hover {
                    background-color: #5a6268;
                }
                .header-container {
                    display: flex;
                    align-items: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="header-container">
                        <button class="back-button" onclick="window.close()">← Back</button>
                        <h2 class="mb-0">${exchange} - ${currentPair}</h2>
                    </div>
                    <div class="btn-group" role="group" id="timeframeButtons">
                        <button class="btn btn-outline-primary active" data-timeframe="1">1s</button>
                        <button class="btn btn-outline-primary" data-timeframe="30">30s</button>
                        <button class="btn btn-outline-primary" data-timeframe="60">1m</button>
                        <button class="btn btn-outline-primary" data-timeframe="900">15m</button>
                        <button class="btn btn-outline-primary" data-timeframe="3600">1h</button>
                        <button class="btn btn-outline-primary" data-timeframe="7200">2h</button>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="detailedChart"></canvas>
                </div>
            </div>
            <script>
                let data = ${chartData};
                let chart;
                let currentTimeframe = 1;
                let updateInterval;

                function createDetailedChart() {
                    const ctx = document.getElementById('detailedChart');
                    if (chart) {
                        chart.destroy();
                    }

                    const prices = data.history.map(h => h.price);
                    const priceChange = prices[prices.length - 1] - prices[0];
                    const chartColor = priceChange >= 0 ? '#00c853' : '#ff1744';
                    
                    chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.history.map(h => new Date(h.timestamp).toLocaleTimeString()),
                            datasets: [{
                                label: data.pair,
                                data: prices,
                                borderColor: chartColor,
                                tension: 0.4,
                                borderWidth: 2,
                                fill: false
                            }]
                        },
                        options: {
                            responsive: true,
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            plugins: {
                                zoom: {
                                    pan: {
                                        enabled: true,
                                        mode: 'xy',
                                    },
                                    zoom: {
                                        enabled: true,
                                        mode: 'xy',
                                    }
                                },
                                legend: {
                                    display: false // Hide legend again, was just for zoom test
                                },
                                tooltip: {
                                    enabled: true, // Enable tooltips
                                    mode: 'index',
                                    intersect: false
                                },
                                crosshair: { // Add crosshair plugin
                                    line: {
                                        color: '#aaaaaa',
                                        width: 1,
                                        dashPattern: [3, 3]
                                    },
                                    zoom: {
                                        enabled: false, // Disable zoom on crosshair
                                    },
                                    snap: {
                                        enabled: true, // Snap crosshair to data points
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    grid: {
                                        color: 'rgba(160, 160, 160, 0.4)', // More visible grid lines
                                        lineWidth: 0.5,
                                        borderDash: [2, 4]
                                    },
                                    ticks: {
                                        color: '#777' // Ticks color
                                    }
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(160, 160, 160, 0.4)', // More visible grid lines
                                        lineWidth: 0.5,
                                        borderDash: [2, 4]
                                    },
                                    ticks: {
                                        color: '#777'  // Ticks color
                                    }
                                },
                            },
                            animation: {
                                duration: 0
                            }
                        }
                    });
                }

                function updateChart() {
                    if (!window.opener || window.opener.closed) {
                        clearInterval(updateInterval);
                        return;
                    }
                    
                    const mainWindowHistory = window.opener.priceHistory.get('${exchange}');
                    if (mainWindowHistory && mainWindowHistory.length > 0) {
                        data.history = [...mainWindowHistory];
                        createDetailedChart();
                    }
                }

                // จัดการการคลิกปุ่มเลือกช่วงเวลา
                document.getElementById('timeframeButtons').addEventListener('click', (e) => {
                    if (e.target.matches('button')) {
                        document.querySelectorAll('#timeframeButtons button').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        e.target.classList.add('active');
                        const timeframe = parseInt(e.target.dataset.timeframe);
                        if (updateInterval) {
                            clearInterval(updateInterval);
                        }
                        updateInterval = setInterval(updateChart, timeframe * 1000);
                    }
                });

                // เริ่มต้นด้วยการอัพเดททุก 1 วินาที
                createDetailedChart();
                updateInterval = setInterval(updateChart, 1000);

                // ทำความสะอาด interval เมื่อปิดหน้าต่าง
                window.addEventListener('beforeunload', () => {
                    if (updateInterval) {
                        clearInterval(updateInterval);
                    }
                });
            </script>
        </body>
        </html>
    `);
}

function updateTable(priceData) {
    const table = document.getElementById('priceTable');
    const existingRow = Array.from(table.rows).find(row => row.cells[0].textContent === priceData.name);
    
    if (typeof priceData.price === 'number') {
        initializePriceHistory(priceData.name);
        updatePriceHistory(priceData.name, priceData.price);
    }

    const createCell = (content, className = '') => {
        const cell = document.createElement('td');
        cell.textContent = content;
        cell.className = className;
        cell.classList.add('fade-in');
        return cell;
    };

    if (existingRow) {
        // ลบบรรทัดนี้ออก
        // existingRow.classList.remove('highlight');
        // void existingRow.offsetWidth;
        // existingRow.classList.add('highlight');

        // Update existing row
        existingRow.cells[1].textContent = priceData.pair;
        
        // Update price
        const priceCell = document.createElement('td');
        priceCell.textContent = typeof priceData.price === 'number' ? 
            `$${priceData.price.toFixed(2)}` : priceData.price;
        priceCell.className = typeof priceData.price === 'number' && previousPrices.get(priceData.name) ?
            (priceData.price > previousPrices.get(priceData.name) ? 'price-up' : 
             priceData.price < previousPrices.get(priceData.name) ? 'price-down' : '') : '';
        existingRow.cells[2].replaceWith(priceCell);

        // Update chart
        const chartCell = existingRow.cells[3];
        chartCell.classList.remove('highlight-chart');
        void chartCell.offsetWidth; // Trigger reflow
        chartCell.classList.add('highlight-chart');
        const chartCanvas = chartCell.querySelector('canvas');
        if (chartCanvas && typeof priceData.price === 'number') {
            const chart = Chart.getChart(chartCanvas);
            if (chart) {
                chart.destroy();
            }
            createChart(priceData.name, chartCanvas);
        }

        // Update change percentage
        const changeCell = existingRow.cells[4];
        const change = calculateChange(priceData.name);
        if (change !== null) {
            changeCell.textContent = `${change.toFixed(2)}%`;
            changeCell.className = change >= 0 ? 'change-up' : 'change-down';
        }

        // Update timestamp
        existingRow.cells[5].textContent = priceData.timestamp.toLocaleTimeString();

        // Update view chart button
        const viewChartCell = existingRow.cells[6];
        viewChartCell.innerHTML = `<button class="btn-view-chart" onclick="viewDetailedChart('${priceData.name}')">View</button>`;
    } else {
        const row = table.insertRow(-1);
        row.className = 'table-row fade-in';
        
        row.insertCell(0).textContent = priceData.name;
        row.insertCell(1).textContent = priceData.pair;
        
        // Price with animation
        const priceCell = row.insertCell(2);
        priceCell.textContent = typeof priceData.price === 'number' ? 
            `$${priceData.price.toFixed(2)}` : priceData.price;
        priceCell.className = 'price-cell';
        
        // Chart
        const chartCell = row.insertCell(3);
        chartCell.className = 'chart-cell';
        const canvas = document.createElement('canvas');
        chartCell.appendChild(canvas);
        if (typeof priceData.price === 'number') {
            createChart(priceData.name, canvas);
        }
        
        // Change percentage
        const changeCell = row.insertCell(4);
        const change = calculateChange(priceData.name);
        if (change !== null) {
            changeCell.textContent = `${change.toFixed(2)}%`;
            changeCell.className = change >= 0 ? 'change-up' : 'change-down';
        }
        
        // Timestamp
        row.insertCell(5).textContent = priceData.timestamp.toLocaleTimeString();

        // Add view chart button
        const viewChartCell = row.insertCell(6);
        viewChartCell.innerHTML = `<button class="btn-view-chart" onclick="viewDetailedChart('${priceData.name}')">View</button>`;
    }

    if (typeof priceData.price === 'number') {
        previousPrices.set(priceData.name, priceData.price);
    }
}

async function updateAllPrices() {
    for (const exchange of exchanges) {
        const priceData = await fetchPrice(exchange);
        updateTable(priceData);
    }
}

// Toggle dark mode function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// อัพเดทราคาครั้งแรกและตั้งเวลาอัพเดททุก 1 วินาที
updateAllPrices();
setInterval(updateAllPrices, 1000);

// แก้ไขฟังก์ชัน openCalculator
function openCalculator() {
    // เปิดไฟล์ calculator.html จาก folder calculator แทนการสร้าง window ใหม่
    window.open('./calculator/calculator.html', 'Calculator', 'width=400,height=600');
}
