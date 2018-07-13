$(function(){

    //插入图表
     // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(document.querySelector('.echart_l'));

     // 指定图表的配置项和数据
     var option1 = {
         title: {
             text: '2007注册人数'
         },
         tooltip: {},
         legend: {
             data:['人数']
         },
         xAxis: {
             data: ["1月","2月","3月","4月","5月","6月"]
         },
         yAxis: {},
         series: [{
             name: '人数',
             type: 'bar',
             data: [500, 2000, 3600, 1000, 1000, 2000]
         }]
     };

     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option1);
     //饼状图
     var myChart1 = echarts.init(document.querySelector('.echart_r'));
     option2 = {
        title : {
            text: '热门产品销量',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪达斯','李宁','361度','贵人鸟']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪达斯'},
                    {value:234, name:'李宁'},
                    {value:135, name:'361度'},
                    {value:200, name:'贵人鸟'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart1.setOption(option2);
})