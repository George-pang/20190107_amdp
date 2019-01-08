/* *********************************************** */
//实时天气模块数据渲染
($(function(){
    /*定义函数：解析后台传入的实时天气数据 渲染页面
         参数：实时天气数据  格式：object
     */
    //本地测试数据
    var data = {
        "temperature": "19",
        "humidity": "79",
        "windSpeed": "8",
        "windDirection": "东北偏北"
    };
    renderLiveWeather(data);
    function renderLiveWeather(data) {
        $("#temperature").html(data.temperature);
        $("#wind").html(data.windSpeed+"km/hr\t"+data.windDirection);
        $("#humidity").html(data.humidity+"%");
    }

}));




/* *********************************************** */
//echarts初始化
//电话排队
($(function () {
    // 基于准备好的dom，初始化echarts实例
    var myPhoneChart = echarts.init(document.getElementById('statisticsPhone'), 'vintage');
    var option = {
        title: {
            show: true,
            text: '当前电话排队统计'
        },
        tooltip: {
            formatter: "{a} <br/>{b} : {c}"
        },
        series: [{
            name: '电话排队',
            type: 'gauge',
            // min:0,
            // max:1000,    //仪表盘最大刻度
            //仪表盘详情，用于显示数据。
            detail: {
                formatter: '{value}'
            },
            data: [{
                value: 50,
                name: '当前电话排队数'
            }],
            //仪表盘轴线相关配置
            axisLine: {
                show: true,
                lineStyle: {
                    width: 30,
                    shadowBlur: 0,
                    // opacity:.8,
                    //仪表盘的轴线可以被分成不同颜色的多段。每段的结束位置和颜色可以通过一个数组来表示。
                    // color: [
                    //     [0.3, '#67e0e3'],
                    //     [0.7, '#37a2da'],
                    //     [1, '#fd666d']
                    // ]
                }
            },
            //分隔线样式
            splitLine: {
                length: 30,
            },
            pointer: {
                length: '70%',
            }
            //刻度样式
            // axisTick:{
            //     show:false,
            // },
            //刻度标签--刻度值
            // axisLabel:{
            //     show:false
            // },
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myPhoneChart.setOption(option);
    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(0) - 0;
        myPhoneChart.setOption(option, true);
    }, 2000);
}));

//接报统计
($(function () {
    var myReportChart = echarts.init(document.getElementById('statisticsReport'), 'vintage');
    option = {
        title: {
            text: "案件接报统计"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['已结束案件', '待处理案件', '处理中案件']
        },
        series: [{
                name: '接报统计',
                type: 'pie',
                // selectedMode: 'single',
                radius: [0, '50%'],
                label: {
                    normal: {
                        position: 'inside',
                        formatter: '{b}：{c}\n\n{d}%',
                        // rich: {
                        //     b: {
                        //         color:'#fff',
                        //         // fontSize: 16,
                        //         // lineHeight: 32,
                        //     },
                        //     c: {
                        //         color:'#fff',
                        //         fontSize: 14,
                        //     }
                        // }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 800,
                        name: '实际接报',
                        // selected: true
                    },
                    {
                        value: 400,
                        name: '无效接报'
                    },
                ]
            },
            {
                name: '实际接报统计',
                type: 'pie',
                radius: ['55%', '70%'],
                label: {
                    normal: {
                        padding: 5,
                        position: 'outside',
                        align: 'right',
                        formatter: '{b|{b}：}\n{c}  {per|{d}%}',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        // position: ['50%', '50%'],
                        rich: {
                            b: {
                                fontSize: 16,
                                lineHeight: 32,
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                //标签的视觉引导线样式，在 label position 设置为'outside'的时候会显示视觉引导线。
                labelLine: {
                    show: true,
                    length: 20,
                    length2: 10,
                    // smooth:true,//平滑曲线
                },
                data: [{
                        value: 310,
                        name: '待处理案件'
                    },
                    {
                        value: 234,
                        name: '处理中案件'
                    },
                    {
                        value: 335,
                        name: '已结束案件'
                    },
                ]
            }
        ]
    };
    myReportChart.setOption(option);
    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 1000).toFixed(0) - 0;
        option.series[0].data[1].value = (Math.random() * 1000).toFixed(0) - 0;
        option.series[1].data[0].value = (Math.random() * 1000).toFixed(0) - 0;
        option.series[1].data[1].value = (Math.random() * 1000).toFixed(0) - 0;
        option.series[1].data[2].value = (Math.random() * 1000).toFixed(0) - 0;

        myReportChart.setOption(option, true);
    }, 2000);
}));
