// js/charts.js
function createChart(ctx, type) {
    switch(type) {
        case 'line':
            return createLineChart(ctx);
        case 'bar':
            return createBarChart(ctx);
        case 'horizontal-bar':
            return createHorizontalBarChart(ctx);
        case 'pie':
            return createPieChart(ctx);
        case 'doughnut':
            return createDoughnutChart(ctx);
        case 'radar':
            return createRadarChart(ctx);
        default:
            return createLineChart(ctx);
    }
}

function createLineChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
            datasets: [{
                label: '销售额',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            }, {
                label: '利润',
                data: [28, 48, 40, 19, 86, 27],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '月度销售趋势',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            },
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
}

function createBarChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['产品A', '产品B', '产品C', '产品D', '产品E'],
            datasets: [{
                label: '销售量',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '产品销售量对比',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            },
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
}

function createHorizontalBarChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['部门A', '部门B', '部门C', '部门D', '部门E'],
            datasets: [{
                label: '绩效得分',
                data: [85, 92, 78, 65, 88],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '部门绩效排名',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            },
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
}

function createPieChart(ctx) {
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
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '销售构成分析',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

function createDoughnutChart(ctx) {
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
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '部门预算分配',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

function createRadarChart(ctx) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['技术能力', '沟通能力', '团队合作', '创新能力', '解决问题', '学习能力'],
            datasets: [{
                label: '员工A',
                data: [85, 90, 70, 95, 80, 75],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)'
            }, {
                label: '员工B',
                data: [70, 85, 90, 75, 95, 80],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: true,
                    text: '员工能力评估',
                    color: 'white',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255,255,255,0.1)'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}
