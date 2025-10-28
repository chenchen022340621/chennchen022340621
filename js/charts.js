// 全局图表实例
let currentChart = null;
let currentChartType = 'line';

// 图表数据存储
const chartData = {
    line: {
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
    bar: {
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
    pie: {
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
    doughnut: {
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
    radar: {
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
    }
};

// 图表描述信息
const chartDescriptions = {
    line: "折线图用于显示数据随时间或有序类别的变化趋势。它通过将一系列数据点连接起来形成线条，直观地展示数据的上升或下降趋势。",
    bar: "柱形图使用垂直柱子来比较不同类别的数据值。柱子高度表示数值大小，适用于比较离散的数据。",
    pie: "饼图显示各部分占整体的比例关系。每个扇区的大小表示其在整体中的百分比，适用于展示构成关系。",
    doughnut: "环形图是饼图的变体，中间有一个圆形切口，同样用于显示各部分占整体的比例关系。",
    radar: "雷达图显示多变量数据，每个变量在从同一点开始的轴上进行表示。适用于比较多个项目的多个特性。"
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

// 显示图表函数
function showChart(chartType) {
    currentChartType = chartType;
    
    // 更新按钮激活状态
    document.querySelectorAll('.btn-viz').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 更新图表信息
    document.getElementById('currentChartName').textContent = 
        chartType === 'line' ? '折线图' : 
        chartType === 'bar' ? '柱形图' : 
        chartType === 'pie' ? '饼图' : 
        chartType === 'doughnut' ? '环形图' : '雷达图';
    document.getElementById('currentChartDescription').textContent = chartDescriptions[chartType];

    // 销毁现有图表
    if (currentChart) {
        currentChart.destroy();
    }

    // 创建新图表
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    currentChart = createChart(ctx, chartType);
    
    // 更新数据输入界面
    updateDataInputs(chartType);
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

    const data = chartData[chartType];

    switch(chartType) {
        case 'line':
            return new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    ...commonOptions,
                    scales: {
                        x: { 
                            ticks: { color: 'white' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        },
                        y: { 
                            ticks: { color: 'white' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        }
                    }
                }
            });

        case 'bar':
            return new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    ...commonOptions,
                    scales: {
                        x: { 
                            ticks: { color: 'white' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        },
                        y: { 
                            ticks: { color: 'white' }, 
                            grid: { color: 'rgba(255,255,255,0.1)' } 
                        }
                    }
                }
            });

        case 'pie':
            return new Chart(ctx, {
                type: 'pie',
                data: data,
                options: commonOptions
            });

        case 'doughnut':
            return new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: commonOptions
            });

        case 'radar':
            return new Chart(ctx, {
                type: 'radar',
                data: data,
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

// 更新数据输入界面
function updateDataInputs(chartType) {
    const container = document.getElementById('dataInputs');
    container.innerHTML = '';

    const data = chartData[chartType];
    
    if (chartType === 'line' || chartType === 'radar') {
        // 多数据集图表
        data.datasets.forEach((dataset, index) => {
            const datasetDiv = document.createElement('div');
            datasetDiv.className = 'control-group';
            datasetDiv.innerHTML = `
                <label>${dataset.label} 数据 (逗号分隔):</label>
                <input type="text" id="${chartType}Data${index}" value="${dataset.data.join(',')}">
            `;
            container.appendChild(datasetDiv);
        });
        
        const labelsDiv = document.createElement('div');
        labelsDiv.className = 'control-group';
        labelsDiv.innerHTML = `
            <label>标签 (逗号分隔):</label>
            <input type="text" id="${chartType}Labels" value="${data.labels.join(',')}">
        `;
        container.appendChild(labelsDiv);
        
    } else {
        // 单数据集图表
        const dataDiv = document.createElement('div');
        dataDiv.className = 'control-group';
        dataDiv.innerHTML = `
            <label>数据值 (逗号分隔):</label>
            <input type="text" id="${chartType}Data" value="${data.datasets[0].data.join(',')}">
        `;
        container.appendChild(dataDiv);
        
        const labelsDiv = document.createElement('div');
        labelsDiv.className = 'control-group';
        labelsDiv.innerHTML = `
            <label>标签 (逗号分隔):</label>
            <input type="text" id="${chartType}Labels" value="${data.labels.join(',')}">
        `;
        container.appendChild(labelsDiv);
    }
}

// 使用自定义数据更新图表
function updateChartWithCustomData() {
    const chartType = currentChartType;
    const data = chartData[chartType];
    
    try {
        if (chartType === 'line' || chartType === 'radar') {
            // 更新多数据集图表
            data.labels = document.getElementById(`${chartType}Labels`).value.split(',').map(label => label.trim());
            
            data.datasets.forEach((dataset, index) => {
                const inputData = document.getElementById(`${chartType}Data${index}`).value;
                dataset.data = inputData.split(',').map(val => parseFloat(val.trim()));
            });
        } else {
            // 更新单数据集图表
            data.labels = document.getElementById(`${chartType}Labels`).value.split(',').map(label => label.trim());
            const inputData = document.getElementById(`${chartType}Data`).value;
            data.datasets[0].data = inputData.split(',').map(val => parseFloat(val.trim()));
        }
        
        // 重新创建图表
        const ctx = document.getElementById('chartCanvas').getContext('2d');
        if (currentChart) {
            currentChart.destroy();
        }
        currentChart = createChart(ctx, chartType);
        
    } catch (error) {
        alert('数据格式错误！请确保输入的是用逗号分隔的数字。');
        console.error(error);
    }
}

// 生成随机数据 - 针对当前显示的图表
function generateRandomData() {
    const chartType = currentChartType;
    const data = chartData[chartType];
    
    if (chartType === 'line' || chartType === 'radar') {
        data.labels = Array.from({length: 6}, (_, i) => `数据${i+1}`);
        data.datasets.forEach(dataset => {
            dataset.data = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
        });
    } else {
        data.labels = Array.from({length: 5}, (_, i) => `类别${i+1}`);
        data.datasets[0].data = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
    }
    
    // 重新创建图表并更新输入框
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (currentChart) {
        currentChart.destroy();
    }
    currentChart = createChart(ctx, chartType);
    updateDataInputs(chartType);
}

// 生成所有随机数据 - 保留原有功能
function generateAllRandomData() {
    generateRandomData();
    alert('随机数据生成完成！');
}

// 重置所有数据
function resetAllData() {
    // 重新初始化数据
    chartData.line = {
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
    };
    
    chartData.bar = {
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
    };
    
    chartData.pie = {
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
    };
    
    chartData.doughnut = {
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
    };
    
    chartData.radar = {
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
    };
    
    // 重新创建图表
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (currentChart) {
        currentChart.destroy();
    }
    currentChart = createChart(ctx, currentChartType);
    updateDataInputs(currentChartType);
    
    alert('所有数据重置完成！');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initChartShowcase();
});
