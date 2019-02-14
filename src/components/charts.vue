<template>
  <div id="main" ref="main"></div>
</template>
<script>
  import echarts from 'echarts'
//let echarts = require('echarts/lib/echarts')
  export default{
    data: function () {
      return {
        chart : null
      }
    },
    mounted:function(){
      this.initChart();
    },
    methods:{
      initChart: function () {
        this.chart = echarts.init(this.$refs.main)
        var option = {
          title:{
            text:"煤矿/矸石场比例图",
            subtext:"单位[km^2]"
          },
          tooltip:{
            trigger:'item',
            formatter:"{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type:'scroll',
            orient:'vertical',
            right:10,
            top:20,
            bottom:20,
            data:["煤矿","矸石场"],
            selected:[1,2]
          },
          series:[
            {
              name:"矿场类型",
              type:'pie',
              radius:'55%',
              center:['40%','50%'],
              data:[{name:'煤矿',value:50},{name:'矸石场',value:60}],
              itemStyle:{
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.chart.setOption(option)
      }

    }
  }
</script>
<style scoped>
  #main{
    width: 600px;
    height: 400px;
  }
</style>
