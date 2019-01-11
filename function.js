 /* 此部分function供VS项目后台调用 */
 $(function () {
     // 窗口大小改变触发页面重载
     $(window).resize(function () {
         location.reload();
     });
     //实时更新即时时间 
     getInstantTime();
     setInterval(getInstantTime, 1000);
     // function:获取即时时间
     function getInstantTime() {
         var time = new Date();
         $("#hour").html(time.toLocaleTimeString());
         //获取年月日
         // var year = time.getFullYear();
         // var month = time.getMonth();
         // var day = time.getDate();
         //获取时分秒
         // var h = time.getHours();
         // var m = time.getMinutes();
         // var s = time.getSeconds();
         // //检查是否小于10
         // h = check(h);
         // m = check(m);
         // s = check(s);
         // $("#hour").html(h+":"+m+":"+s);
     }
     // function：检查获取的时分秒是否小于10
     //  function check(i) {
     //      //方法一，用三元运算符
     //      var num;
     //      i < 10 ? num = "0" + i : num = i;
     //      return num;
     //  }
 });


 /* ************************************************************************************************** */
 /* function部分 */
 /* 实时天气模块 代码 */
 //function：解析后台传入的实时天气数据 渲染页面---参数：后台传入JSON字符串格式数据
 function renderLiveWeather(data) {
     // JSON字符串转JSON对象
     var data = JSON.parse(data);
     // 截取时间字符串取值
     var year = data.time.substr(0, 4);
     var month = data.time.substr(5, 2);
     var day = data.time.substr(8, 2);
     //  var time = data.time.substr(11, 2);
     var weekday = getWeekDayZh(data.time.substr(17));
     var weatherDesc = getWeatherDesc(data.weatherStatus); //函数调用getWeatherDesc()
     changeBgImg(weatherDesc); //函数调用：changeBgImg();
     changeWeatherIcon(weatherDesc); //函数调用：changeWeatherIcon();
     //  var hour = getTime(time); //函数调用getTime()
     // $("#time_now").html(`${year}年${month}月${day}日\t${weekday}`);
     $("#time_now").html(year + "年" + month + "月" + day + "日\t" + weekday);
     //  $("#hour").html(hour);
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
     if (weatherDesc != "Null") {
         if (weatherDesc.indexOf("晴") != -1 || weatherDesc == "多雲" || weatherDesc == "多云") {
             $(".weather_info").removeClass("bad").addClass("good");
         } else {
             $(".weather_info").removeClass("good").addClass("bad");
         }
     }

 }
 //function：根据天气描述值显示对应的天气动画或icon---待拓展（是否每一个都显示对应的ICON或动画）
 function changeWeatherIcon(weatherDesc) {
    if (weatherDesc == "天晴" || weatherDesc.indexOf("晴") != -1) {
        $(".sunny").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "多雲" || weatherDesc == "多云") {
        $(".cloudy").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "雨") {
        $(".rainy").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "雷雨") {
        $(".thundershowers").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "大雨" || weatherDesc.indexOf("雨") != -1) {
        $(".heavy_rain").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "雪") {
        $(".snow").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "大雪") {
        $(".heavy_snow").addClass("active").siblings(".icon").removeClass("active");
    } else if (weatherDesc == "密雲" || weatherDesc == "密云") {
        $(".overcastDay").addClass("active").siblings(".icon").removeClass("active");
    } else {
        $(".weather_info .common").addClass(".active").siblings(".icon").removeClass("active");
        $(".weather_info .common").find("i").html("&#xe694;"); //待拓展--对应不同icon 使用switch语句
    }
}
 //function：星期日对应英文转中文繁体
 function getWeekDayZh(weekday) {
     var str;
     switch (weekday) {
         case "Monday":
             str = "星期一";
             break;
         case "Tuesday":
             str = "星期二";
             break;
         case "Wednesday":
             str = "星期三";
             break;
         case "Thursday":
             str = "星期四";
             break;
         case "Friday":
             str = "星期五";
             break;
         case "Saturday":
             str = "星期六";
             break;
         default:
             str = "星期日";
             break;
     }
     return str;
 }

 //  //function：根据传入的时间判断上午、下午、晚上
 //  function getTime(time) {
 //      if (time < 12) {
 //          return "MORNING";
 //      } else if (time < 17) {
 //          return "AFTERNOON";
 //      } else if (time < 21) {
 //          return "EVENING";
 //      } else if (time < 24) {
 //          return "NIGHT";
 //      }
 //  }

 /* ************************************************************************************************ */
 /* 恶劣天气模块 代码 */
 //  function--渲染恶劣天气模块数据
 function renderBadWeather(data) {
     var data = JSON.parse(data); //格式转换
     $("#warning_stormsurge").html(data.stormSurge);
     $("#warning_rainstorm").html(data.rainStorm);
     $("#warning_thunderstorm").html(data.thunderStorm);
     $("#warning_cyclone").html(data.tropicalCyclone);
     $("#warning_monsoon").html(data.monsoon);

 }

 /* ************************************************************************************************ */
 /* 电话排队、接报统计模块 代码 */
 // function--使用配置项及接收到的数据显示echarts图表
 function renderChart(data) {
     var data = JSON.parse(data);

     // 基于准备好的dom，初始化echarts实例
     var myPhoneChart = echarts.init(document.getElementById('phoneChart'), 'vintage');
     //配置项
     var phoneChartOption = {
         // title: {
         //     show: true,
         //     text: '當前電話排隊統計'
         // },
         backgroundColor: "rgba(91,92,110,1)",
         tooltip: {
             formatter: "{a} <br/>{b} : {c}"
         },
         series: [{
             name: '電話排隊',
             type: 'gauge',
             // min:0,
             max: 20, //仪表盘最大刻度
             //仪表盘详情，用于显示数据。
             detail: {
                 formatter: '{value}'
             },
             data: [{
                 value: 10,
                 name: '當前電話排隊數',
                 textStyle: {
                     fontSize: 12,
                 },
             }],
             //仪表盘轴线相关配置
             axisLine: {
                 show: true,
                 lineStyle: {
                     width: 20,
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
                 length: 20,
             },
             pointer: {
                 length: '60%',
             },
             title: { // 仪表盘标题。
                 show: true, // 是否显示标题,默认 true。
                 offsetCenter: [0, "80%"], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                 fontSize: 16, // 文字的字体大小,默认 15。
                 color: "#fff", //仪表盘标题字体颜色
             },
         }]
     };
     var myReportChart = echarts.init(document.getElementById('reportChart'), 'vintage');
     var reportChartOption = {
         // title: {
         //     text: "案件接報統計"
         // },
         backgroundColor: "rgba(41,52,65,1)",
         tooltip: {
             trigger: 'item',
             formatter: "{a} <br/>{b}: {c} ({d}%)",
         },
         legend: {
             orient: 'vertical',
             x: 'right',
             data: ['已結束案件', '待處理案件', '處理中案件'],
             textStyle: {
                 color: "#fff",
             }
         },
         series: [{
                 name: '接報統計',
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
                         name: '實際接報',
                         // selected: true
                     },
                     {
                         value: 400,
                         name: '無效接報'
                     },
                 ]
             },
             {
                 name: '實際接報統計',
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
                         name: '待處理案件'
                     },
                     {
                         value: 234,
                         name: '處理中案件'
                     },
                     {
                         value: 335,
                         name: '已結束案件'
                     },
                 ]
             }
         ]
     };

     // 接收数据，渲染电话排队图表
     phoneChartOption.series[0].data[0].value = data.telQueue;
     myPhoneChart.setOption(phoneChartOption, true);
     // 接收数据，渲染接报统计图表
     reportChartOption.series[0].data[0].value = data.actualEvent;
     reportChartOption.series[0].data[1].value = data.totalEvent - data.actualEvent;
     reportChartOption.series[1].data[0].value = data.standEvent;
     reportChartOption.series[1].data[1].value = data.sentEvent;
     reportChartOption.series[1].data[2].value = data.endEvent;

     myReportChart.setOption(reportChartOption, true);
 }
