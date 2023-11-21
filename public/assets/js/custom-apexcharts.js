/*=====================
    Custom Apex Chart js
==========================*/
var options = {
    series: [{
        name: 'series1',
        data: [53, 53.6, 53.4, 53, 53.5, 53.1, 55]
    }],
    chart: {
        height: 200,
        type: 'area',
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'date'
        },
    },
    colors: ["#FF9C42"],
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


// ====================================== Chart 2 ======================================
var options = {
    series: [{
        name: 'series1',
        data: [53, 53.6, 53.4, 53, 53.5, 53.1, 55]
    }],
    chart: {
        height: 200,
        type: 'area',
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'date'
        },
    },
    colors: ["#1EA6EC"],
    fill: {
        gradient: {
            enabled: true,
            opacityFrom: 1,
            opacityTo: 0
        }
    },
};

var chart = new ApexCharts(document.querySelector("#chart-2"), options);
chart.render();