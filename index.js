/* 入口函数 */
$(function () {

    /* ********************************************************************************************************* */
    /* 实时天气模块 代码 */
    (function () {
        //本地测试数据
        var data = {
            "time": "2019-01-09 22:00 Wednesday",
            "temperature": "19",
            "humidity": "79",
            "windSpeed": "8",
            "windDescription": "东北偏北",
            "temperatureMin": "15",
            "weatherStatus": "12"
        };
        // 数据渲染
        renderLiveWeather(data);

        //function：解析后台传入的实时天气数据 渲染页面---参数：后台传入JSON数据
        function renderLiveWeather(data) {
            // 截取时间字符串取值
            var year = data.time.substr(0, 4);
            var month = data.time.substr(5, 2);
            var day = data.time.substr(8, 2);
            var time = data.time.substr(11, 2);
            var weekday = data.time.substr(17);
            // console.log(year,month,day,time,weekday);

            var weatherDesc = getWeatherDesc(data.weatherStatus); //函数调用getWeatherDesc()
            changeBgImg(weatherDesc); //函数调用：changeBgImg();
            changeWeatherIcon(weatherDesc); //函数调用：changeWeatherIcon();
            var hour = getTime(time); //函数调用getTime()

            $("#time_now").html(`${year}年${month}月${day}日\t${weekday}`);
            $("#hour").html(hour);
            $("#temperature").html(data.temperature);
            $("#temperatureMin").html(data.temperatureMin);
            $("#weather_status").html(weatherDesc);
            $("#wind").html(data.windSpeed + "km/hr\t" + data.windDescription);
            $("#humidity").html(data.humidity + "%");
        }

        //function：根据传入天气code获取对应的天气描述值
        function getWeatherDesc(weatherStatus) {
            var str;
            switch (weatherStatus) {
                case "01":
                    str = "天晴";
                    break;
                case "a1":
                    str = "天晴";
                    break;
                case "02":
                    str = "間晴";
                    break;
                case "a2":
                    str = "間晴";
                    break;
                case "03":
                    str = "多雲";
                    break;
                case "04":
                    str = "密雲";
                    break;
                case "05":
                    str = "浮塵";
                    break;
                case "06":
                    str = "霧";
                    break;
                case "07":
                    str = "煙霞";
                    break;
                case "08":
                    str = "薄霧";
                    break;
                case "09":
                    str = "煙幕";
                    break;
                case "10":
                    str = "毛毛雨";
                    break;
                case "11":
                    str = "冰雹";
                    break;
                case "12":
                    str = "雨";
                    break;
                case "13":
                    str = "大雨";
                    break;
                case "14":
                    str = "雪";
                    break;
                case "15":
                    str = "大雪";
                    break;
                case "16":
                    str = "驟雨";
                    break;
                case "17":
                    str = "大驟雨";
                    break;
                case "18":
                    str = "雷雨";
                    break;
                case "19":
                    str = "塵暴";
                    break;
                case "20":
                    str = "大塵暴";
                    break;
                case "21":
                    str = "乾燥";
                    break;
                case "22":
                    str = "沙暴";
                    break;
                case "23":
                    str = "大沙暴";
                    break;
                case "24":
                    str = "狂風雷暴";
                    break;
                case "25":
                    str = "雷暴";
                    break;
                case "26":
                    str = "潮濕";
                    break;
                case "27":
                    str = "大風";
                    break;
                case "28":
                    str = "雨";
                    break;
                case "c8":
                    str = "雨";
                    break;
                case "29":
                    str = "驟雨";
                    break;
                case "c9":
                    str = "驟雨";
                    break;
                case "30":
                    str = "水龍捲";
                    break;
                default: //没有此Code及对应值
                    str = "Null";
                    break;
            }
            return str;
        }
        //function：控制实时天气区域good、bad预定类背景切换
        function changeBgImg(weatherDesc) {
            if(weatherDesc!="Null"){
                if (weatherDesc.includes("晴") || weatherDesc == "多雲" || weatherDesc == "多云") {
                    $(".weather_info").removeClass("bad").addClass("good");
                } else {
                    $(".weather_info").removeClass("good").addClass("bad");
                }
            }

        }
        //function：根据天气描述值显示对应的天气动画或icon---待拓展（是否每一个都显示对应的ICON或动画）
        function changeWeatherIcon(weatherDesc) {
            if (weatherDesc == "天晴" || weatherDesc.includes("晴")) {
                $(".sunny").addClass("active").siblings(".icon").removeClass("active");
            } else if (weatherDesc == "多雲" || weatherDesc == "多云") {
                $(".cloudy").addClass("active").siblings(".icon").removeClass("active");
            } else if (weatherDesc == "雨" || weatherDesc.includes("雨")) {
                $(".rainy").addClass("active").siblings(".icon").removeClass("active");
            } else if (weatherDesc == "雪" || weatherDesc.includes("雪")) {
                $(".snow").addClass("active").siblings(".icon").removeClass("active");
            } else if (weatherDesc == "雷雨") {
                $(".ray").addClass("active").siblings(".icon").removeClass("active");
            } else if (weatherDesc == "密雲" || weatherDesc == "密云") {
                $(".overcastDay").addClass("active").siblings(".icon").removeClass("active");
            } else {
                $(".weather_info .common").addClass(".active").siblings(".icon").removeClass("active");
                $(".weather_info .common").find("i").html("&#xe694;");//待拓展--对应不同icon 使用switch语句
            }

        }
        //function：根据传入的时间判断上午、下午、晚上
        function getTime(time) {
            if (time < 12) {
                return "MORNING";
            } else if (time < 17) {
                return "AFTERNOON";
            } else if (time < 21) {
                return "EVENING";
            } else if (time < 24) {
                return "NIGHT";
            }
        }


    }());

    /* ********************************************************************************************************* */
    /* 恶劣天气模块 代码 */
    (function(){
        //本地数据
        var data = {
            "stormsurge": "現時沒有風暴潮警告。",
            "rainstorm": "現時沒有暴雨警告。",
            "thunderstorm": "現時没有雷暴警告。",
            "cyclone": "現時並無熱帶氣旋信號。",
            "monsoon": "現時沒有季候風黑球警告。",
        };
        renderBadWeather(data);
        // function：根据恶劣天气数据渲染页面
        function renderBadWeather(data){
            $("#warning_stormsurge").html(data.stormsurge);
            $("#warning_rainstorm").html(data.rainstorm);
            $("#warning_thunderstorm").html(data.thunderstorm);
            $("#warning_cyclone").html(data.cyclone);
            $("#warning_monsoon").html(data.monsoon);

        }

    }());

    /* ********************************************************************************************************* */
    /* 电话排队统计模块 代码 */
    (function () {

        // 基于准备好的dom，初始化echarts实例
        var myPhoneChart = echarts.init(document.getElementById('statisticsPhone'), 'vintage');
        //配置项
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
        
        /* 后台调用封装代码 */
        // // function--使用配置项及接收到的数据显示图标
        // function renderPhoneChart(data){
        //     option.series[0].data[0].value=data;
        //     myPhoneChart.setOption(option,true);
        // }

    }());


    /* ********************************************************************************************************* */
    /* 案件接报统计模块 代码 */
    (function () {
        //案件接报统计模块 echarts初始化
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

        /* 后台调用封装代码 */
        // // function--使用配置项及接收到的数据显示图标
        // function renderReportChart(data){
        //     option.series[0].data[0].value = data.sj;
        //     option.series[0].data[1].value = data.wx;
        //     option.series[1].data[0].value = data.dcl;
        //     option.series[1].data[1].value = data.clz;
        //     option.series[1].data[2].value = data.yjs;

        //     myReportChart.setOption(option,true);
        // }

    }());

});
