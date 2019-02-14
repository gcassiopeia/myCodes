<template>
<div class="container">
  <div class="up">
    <table class="table table-striped">
    <thead>
    <tr>
      <td>{{tableMes.mineName}}</td>
      <td>{{tableMes.legalPerson}}</td>
      <td>{{tableMes.location}}</td>
      <td>{{tableMes.mineLicense}}</td>
      <td>{{tableMes.linkMan}}</td>
      <td>{{tableMes.linkManPhone}}</td>
      <td>{{tableMes.shaftArea}}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in tableInfo">
      <td>{{item.mineName}}</td>
      <td>{{item.legalPerson != 0 ? item.legalPerson : '暂无'}}</td>
      <td>{{item.location}}</td>
      <td>{{item.mineLicense}}</td>
      <td>{{item.linkMan != 0 ? item.linkMan : '暂无'}}</td>
      <td>{{item.linkManPhone != 0 ? item.linkManPhone : '暂无'}}</td>
      <td>{{item.shaftArea}}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{this.county}}煤矿数量总计:{{this.coutMes.cout}}</td>
    </tr>
    </tbody>
  </table>
  </div>
  <div class="down">
      <div id="chart2" ref="chart2"></div>
      <div id="chart3" ref="chart3"></div>
      <div id="chart4" ref="chart4"></div>
  </div>
</div>
</template>
<script>
  import echarts from 'echarts'
  export default{
    data:function(){
      return {
        chart1:null,
        tableMes:null,
        tableInfo:null,
        county:null,
        region:null,
        coutMes:{
          shaftArea : 0,
          cout : 0,
          designProducePower : 0,
          realProducePower : 0,
          reserves : 0
        },
        server:this.GLOBAL.serverSrc
      }
    },
    mounted() {
      this.$ajax.post('http://'+this.server +':8084/file/selectBasicInfo?county=' + this.county + '&region=' + this.region).then(res =>{
        console.log(res)
        this.tableMes = res.data.data;
        this.tableInfo = res.data.list;
        this.tableInfo = res.data.list;
      for(var i = 0; i < res.data.list.length; i ++){
        this.coutMes.shaftArea += parseFloat(res.data.list[i].shaftArea);
        this.coutMes.cout ++;
        this.coutMes.designProducePower += parseFloat(res.data.list[i].realProducePower);
        this.coutMes.realProducePower += parseFloat(res.data.list[i].designProducePower);
        this.coutMes.reserves += parseFloat(res.data.list[i].reserves);
      }
      }).catch(error => {
        console.log(error)
      })


    },
    created: function () {
      this.county = this.$route.query.county;
      this.region = this.$route.query.region;
    },
    methods:{

    },
  updated(){
    this.chart2 = echarts.init(this.$refs.chart2)
    var chart2Option = {
      title : {
        text: this.county + '煤矿面积统计',
        subtext:"单位km2",
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['煤矿','砂岩矿','石灰岩矿','石英岩矿','砖瓦用粘土矿']
      },
      series : [
        {
          name: '矿场总面积(km2)',
          type: 'pie',
          radius : '55%',
          center: ['50%', '65%'],
          data:[
            {value:38.61, name:'煤矿'},
            {value:0.63, name:'砂岩矿'},
            {value:8.76, name:'石灰岩矿'},
            {value:0.05, name:'石英岩矿'},
            {value:0.68, name:'砖瓦用粘土矿'}
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
    }
    this.chart2.setOption(chart2Option);
    this.chart3 = echarts.init(this.$refs.chart3)
    var labelOption = {
      normal: {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }
    };
    var chart3Option = {
      title : {
        text: this.county + '矿种生产力统计',
        subtext:"单位(万t/a)",
        x:'left'
      },
      color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['实际生产力', '设计生产力'],
        orient: 'vertical',
        x:'right'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: ['煤', '砂岩', '石灰岩', '石英岩', '粘土']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '实际生产力',
          type: 'bar',
          label: labelOption,
          data: [300.21, 30, 474.375, 0.77, 6.55]
        },
        {
          name: '设计生产力',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [420, 30, 499.28, 1, 13.45]
        }
      ]
    }
    this.chart3.setOption(chart3Option);
    this.chart4 = echarts.init(this.$refs.chart4)
    var chart4Option = {
      title : {
        text: this.county + '矿种储量统计',
        subtext:"单位万吨",
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['煤矿','砂岩矿','石灰岩矿','石英岩矿','砖瓦用粘土矿']
      },
      series : [
        {
          name: '矿种储量总面积(万吨)',
          type: 'pie',
          radius : '55%',
          center: ['50%', '65%'],
          data:[
            {value:24531, name:'煤矿'},
            {value:1134.35, name:'砂岩矿'},
            {value:61300.53, name:'石灰岩矿'},
            {value:68.1, name:'石英岩矿'},
            {value:139.96, name:'砖瓦用粘土矿'}
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
    }
    this.chart4.setOption(chart4Option);
    console.log(this.coutMes)
  }
  }
</script>
<style scoped>
td{
  text-align: left;
}
  .up{
    margin-left: 0px;
    max-height: 300px;
    overflow: hidden;
    overflow-y:auto
  }
.container{
  position: relative;
}
.down{
  position: relative;
}
#chart2{
  left: 48%;
  position: absolute;
  width: 48%;
  height: 200px;
}
#chart3{
  position: absolute;
  width: 48%;
  height: 300px;
  top: 250px;
}
#chart4{
  left: 48%;
  top: 250px;
  position: absolute;
  width: 48%;
  height: 200px;
}
  .cout{
    text-align: left;
    font-size: 20px;
  }
  .container{
    /*margin-left: 0;*/
  }
</style>
