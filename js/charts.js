// 全局图表实例
let trendChart, expenseChart, userChart, currentChart = null;

// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    initTrendChart();
    initExpenseChart();
    initUserChart();
    updateDataPreview();
    initChartShowcase(); // 初始化新的图表展示
});

// 数值趋势图表
function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const data = getTrendData();
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: '数值趋势',
                data: data.values,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '动态数值趋势分析',
                    font: { size: 16, weight: 'bold' },
                    color: 'white'
                },
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: 'white' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'white' }
                }
            }
        }
    });
}

// 获取趋势数据
function getTrendData() {
    const dataInput = document.getElementById('trendData').value;
    const values = dataInput.split(',').map(val => parseFloat(val.trim())).filter(val => !isNaN(val));
    const labels = values.map((_, index) => `点${index + 1}`);
    return { values, labels };
}

// 更新趋势图表
function updateTrendChart() {
    const data = getTrendData();
    trendChart.data.labels = data.labels;
    trendChart.data.datasets[0].data = data.values;
    trendChart.update();
}

// 重置趋势数据
function resetTrendData() {
    document.getElementById('trendData').value = "1.00,0.75,0.90,0.25,0.00,-0.25,-0.50,-0.75,-1.00";
    updateTrendChart();
}

// 消费分布图表
function initExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const data = getExpenseData();
    
    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ],
                borderColor: '#fff',
                borderWidth: 3,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '消费类别分布',
                    font: { size: 16, weight: 'bold' },
                    color: 'white'
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: 'white'
                    }
                }
            }
        }
    });
}

// 获取消费数据
function getExpenseData() {
    const shopping = parseFloat(document.getElementById('shopping').value) || 0;
    const food = parseFloat(document.getElementById('food').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    
    const otherCategories = [3.3, 6.7, 4.7, 8.7, 6.7];
    
    const labels = ['购物', '餐饮美食', '交通出行', '人前往未', '追随物流', '生活日用', '休闲娱乐', '其他'];
    const values = [shopping, food, transport, ...otherCategories];
    
    return { labels, values };
}

// 更新消费图表
function updateExpenseChart() {
    const data = getExpenseData();
    expenseChart.data.labels = data.labels;
    expenseChart.data.datasets[0].data = data.values;
    expenseChart.update();
}

// 重置消费数据
function resetExpenseData() {
    document.getElementById('shopping').value = 26.7;
    document.getElementById('food').value = 33.3;
    document.getElementById('transport').value = 10.0;
    updateExpenseChart();
}

// 用户数据图表
function initUserChart() {
    const ctx = document.getElementById('userChart').getContext('2d');
    
    userChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['男性', '女性'],
            datasets: [{
                label: '用户数量',
                data: [25, 75],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)'
                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '用户性别分布',
                    font: { size: 16, weight: 'bold' },
                    color: 'white'
                },
                legend: {
                    labels: { color: 'white' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '用户数量',
                        color: 'white'
                    },
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    title: {
                        display: true,
                        text: '性别',
                        color: 'white'
                    },
                    ticks: { color: 'white' }
                }
            }
        }
    });
}

// 更新用户图表
function updateUserChart() {
    const analysisType = document.getElementById('analysisType').value;
    const malePercent = parseFloat(document.getElementById('malePercent').value) || 0;
    const femalePercent = parseFloat(document.getElementById('femalePercent').value) || 0;
    
    if (analysisType === 'gender') {
        userChart.data.labels = ['男性', '女性'];
        userChart.data.datasets[0].data = [malePercent, femalePercent];
        userChart.data.datasets[0].label = '用户比例 (%)';
        userChart.options.scales.y.title.text = '百分比';
    } else {
        userChart.data.labels = ['0-18岁', '19-30岁', '31-45岁', '46-60岁', '60岁以上'];
        userChart.data.datasets[0].data = [15, 35, 25, 15, 10];
        userChart.data.datasets[0].label = '用户数量';
        userChart.options.scales.y.title.text = '用户数量';
    }
    
    userChart.update();
    updateDataPreview();
}

// 更新数据预览表格
function updateDataPreview() {
    const preview = document.getElementById('dataPreview');
    const malePercent = parseFloat(document.getElementById('malePercent').value) || 0;
    const femalePercent = parseFloat(document.getElementById('femalePercent').value) || 0;
    
    const sampleData = [
        { name: '刘小华', gender: '男', age: 28, birthDate: '1995-03-15' },
        { name: '李春兰', gender: '女', age: 32, birthDate: '1991-07-22' },
        { name: '张晓霞', gender: '女', age: 25, birthDate: '1998-11-08' },
        { name: '王大明', gender: '男', age: 45, birthDate: '1978-05-30' },
        { name: '陈小红', gender: '女', age: 29, birthDate: '1994-09-14' }
    ];
    
    preview.innerHTML = sampleData.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.gender}</td>
            <td>${item.age}</td>
            <td>${item.birthDate}</td>
        </tr>
    `).join('');
}

// 随机数据生成
function addRandomData() {
    // 为趋势图添加随机数据
    const randomData = Array.from({length: 10}, () => (Math.random() * 2 - 1).toFixed(2));
    document.getElementById('trendData').value = randomData.join(',');
    updateTrendChart();
    
    // 为消费图添加随机数据
    document.getElementById('shopping').value = (Math.random() * 50).toFixed(1);
    document.getElementById('food').value = (Math.random() * 50).toFixed(1);
    document.getElementById('transport').value = (Math.random() * 30).toFixed(1);
    updateExpenseChart();
    
    // 为用户数据添加随机比例
    const male = Math.random() * 100;
    const female = 100 - male;
    document.getElementById('malePercent').value = male.toFixed(1);
    document.getElementById('femalePercent').value = female.toFixed(1);
    updateUserChart();
}

// ========== 新的图表展示功能 ==========

// 图表描述信息
const chartDescriptions = {
    line: "折线图用于显示数据随时间或有序类别的变化趋势。它通过将一系列数据点连接起来形成线条，直观地展示数据的上升或下降趋势。",
    bar: "柱形图使用垂直柱子来比较不同类别的数据值。柱子高度表示数值大小，适用于比较离散的数据。",
    "horizontal-bar": "条形图是柱形图的水平版本，使用水平条来比较不同类别的数据值。条的长度表示数值大小。",
    pie: "饼图显示各部分占整体的比例关系。每个扇区的大小表示其在整体中的百分比，适用于展示构成关系。",
    doughnut: "环形图是饼图的变体，中间有一个圆形切口，同样用于显示各部分占整体的比例关系。",
    radar: "雷达图显示多变量数据，每个变量在从同一点开始的轴上进行表示。适用于比较多个项目的多个特性。"
};

// 图表名称映射
const chartNames = {
    line: "折线图",
    bar: "柱形图",
    "horizontal-bar": "条形图",
    pie: "饼图",
    doughnut: "环形图",
    radar: "雷达图"
};

// 初始化图表展示
function initChartShowcase() {
    showChart('line');
    
    // 添加按钮交互效果
    const buttons = document.querySelectorAll('.btn-viz');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// 创建图表函数
function createChart(ctx, chartType) {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: 'white' }
            }
        }
    };

    switch(chartType) {
        case 'line':
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                    datasets: [
                        {
                            label: '产品A销售额',
                            data: [65, 59, 80, 81, 56, 55, 40, 75],
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: '产品B销售额',
                            data: [28, 48, 40, 19, 86, 27, 90, 60],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                        y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                    }
                }
            });

        case 'bar':
            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
                    datasets: [{
                        label: '销售量',
                        data: [12, 19, 8, 15, 7],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ]
                    }]
                },
                options: commonOptions
            });

        case 'horizontal-bar':
            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['部门A', '部门B', '部门C', '部门D', '部门E'],
                    datasets: [{
                        label: '绩效得分',
                        data: [85, 92, 78, 65, 88],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)'
                    }]
                },
                options: {
                    ...commonOptions,
                    indexAxis: 'y'
                }
            });

        case 'pie':
            return new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['电子产品', '服装', '食品', '家居', '图书'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ]
                    }]
                },
                options: commonOptions
            });

        case 'doughnut':
            return new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['研发', '市场', '销售', '行政', '财务'],
                    datasets: [{
                        data: [30, 25, 20, 15, 10],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ]
                    }]
                },
                options: commonOptions
            });

        case 'radar':
            return new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['技术能力', '沟通能力', '团队合作', '创新能力', '解决问题', '学习能力'],
                    datasets: [
                        {
                            label: '员工A',
                            data: [85, 90, 70, 95, 80, 75],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)'
                        },
                        {
                            label: '员工B',
                            data: [70, 85, 90, 75, 95, 80],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)'
                        }
                    ]
                },
                options: {
                    ...commonOptions,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255,255,255,0.2)' },
                            grid: { color: 'rgba(255,255,255,0.2)' },
                            pointLabels: { color: 'white' },
                            ticks: { color: 'white', backdropColor: 'transparent' }
                        }
                    }
                }
            });
    }
}

// 显示图表函数
function showChart(chartType) {
    // 更新按钮激活状态
    document.querySelectorAll('.btn-viz').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 更新图表信息
    document.getElementById('currentChartName').textContent = chartNames[chartType];
    document.getElementById('currentChartDescription').textContent = chartDescriptions[chartType];

    // 销毁现有图表
    if (currentChart) {
        currentChart.destroy();
    }

    // 创建新图表
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    currentChart = createChart(ctx, chartType);
}
