<template>
  <div class="container">
    <div class="up">
      <div id="chart1" ref="chart1"></div>
      <div id="chart2" ref="chart2"></div>
      <div id="chart3" ref="chart3"></div>
      <div id="chart4" ref="chart4"></div>
    </div>
    <div class="down">
    <span>煤矿企业基本信息表格</span>
    <table class="table table-striped table-hover">
      <tbody>
      <tr>
        <td>{{this.tableMes.data.data.mineName}}</td>
        <td>{{this.tableMes.data.list[0].mineName}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.location}}</td>
        <td>{{this.tableMes.data.list[0].location}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.legalPerson}}</td>
        <td>{{this.tableMes.data.list[0].legalPerson}}</td>
      </tr><tr>
        <td>{{this.tableMes.data.data.mineLicense}}</td>
        <td>{{this.tableMes.data.list[0].mineLicense}}</td>
      </tr><tr>
        <td>{{this.tableMes.data.data.linkMan}}</td>
        <td>{{this.tableMes.data.list[0].linkMan}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.linkManPhone}}</td>
        <td>{{this.tableMes.data.list[0].linkManPhone}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.shaftArea}}</td>
        <td>{{this.tableMes.data.list[0].shaftArea}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.physiognomyType}}</td>
        <td>{{this.tableMes.data.list[0].physiognomyType}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.riverType}}</td>
        <td>{{this.tableMes.data.list[0].riverType}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.designServerYear}}</td>
        <td>{{this.tableMes.data.list[0].designServerYear}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.alreadyServerYear}}</td>
        <td>{{this.tableMes.data.list[0].alreadyServerYear}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.designProducePower}}</td>
        <td>{{this.tableMes.data.list[0].designProducePower}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.realProducePower}}</td>
        <td>{{this.tableMes.data.list[0].realProducePower}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.mineKind}}</td>
        <td>{{this.tableMes.data.list[0].mineKind}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.designCoalSeam}}</td>
        <td>{{this.tableMes.data.list[0].coalType}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.exploitMethod}}</td>
        <td>{{this.tableMes.data.list[0].exploitMethod}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.exploitTechnology}}</td>
        <td>{{this.tableMes.data.list[0].exploitTechnology}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.buildMineTime}}</td>
        <td>{{this.tableMes.data.list[0].buildMineTime}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.buildRate}}</td>
        <td>{{this.tableMes.data.list[0].buildRate * 100}}%</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.produceState}}</td>
        <td>{{this.tableMes.data.list[0].produceState}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.reserves}}</td>
        <td>{{this.tableMes.data.list[0].reserves}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.developmentLevel}}</td>
        <td>{{this.tableMes.data.list[0].developmentLevel}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.depth}}</td>
        <td>{{this.tableMes.data.list[0].depth}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.depth}}</td>
        <td>{{this.tableMes.data.list[0].depth}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.oreBodyState}}</td>
        <td>{{this.tableMes.data.list[0].oreBodyState}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.miningEmptyArea}}</td>
        <td>{{this.tableMes.data.list[0].miningEmptyArea}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.alreadyCoalSeam}}</td>
        <td>{{this.tableMes.data.list[0].designCoalSeam}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.emptyCoalMine}}</td>
        <td>{{this.tableMes.data.list[0].emptyCoalMine}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.autoignition}}</td>
        <td>{{this.tableMes.data.list[0].autoignitionFirst}}{{this.tableMes.data.list[0].autoignitionSecond}}</td>
      </tr>
      <tr>
        <td>{{this.tableMes.data.data.mineClass}}</td>
        <td>{{this.tableMes.data.list[0].mineClass}}</td>
      </tr>
      </tbody>
    </table>
    </div>

    </div>
</template>
<script>
  import echarts from 'echarts'
  export default{
    data:function(){
      return {
        county:null,
        region:null,
        mineType:null,
        company:null,
        tableMes:null,
        produce:null,
        realProduce:null,
        designServerYear:null,
        alreadyServerYear:null,
        server:this.GLOBAL.serverSrc
      }
    },
    mounted:function(){
      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:'矿山基本信息调查'
      }).then(res =>{
        console.log(res)
        this.tableMes = res;
        this.tableInfo = res.data.list;
        this.produce = this.tableMes.data.list[0].designProducePower;
        this.realProduce = this.tableMes.data.list[0].realProducePower;
        this.designServerYear = this.tableMes.data.list[0].designServerYear;
        this.alreadyServerYear = this.tableMes.data.list[0].alreadyServerYear.replace(/[^0-9]/ig, "");


      }).catch(error => {
        console.log(error)
      })


    },
    methods:{
    },
  created: function () {
    this.county = this.$route.query.county;
    this.region = this.$route.query.region;
    this.mineType = this.$route.query.mineType;
    this.company = this.$route.query.company;
    this.content = this.$route.query.content;
  },
    updated(){
    self = this;
    this.chart1 = echarts.init(this.$refs.chart1)
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
    var chart1Option = {
      title : {
        text: this.company + '矿种生产力统计',
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
          data: ['煤矿']
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
          data: [self.realProduce]
        },
        {
          name: '设计生产力',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [self.produce]
        }
      ]
    }
    console.log(self.designServerYear,self.alreadyServerYear)
    this.chart1.setOption(chart1Option);
    this.chart2 = echarts.init(this.$refs.chart2)
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
    var chart2Option = {
      title : {
        text: this.company + '服务年限统计',
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
        data: ['已服务年限', '设计服务年限'],
        orient: 'vertical',
        x:'right'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: [self.company]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '已服务年限',
          type: 'bar',
          label: labelOption,
          data: [self.alreadyServerYear]
        },
        {
          name: '设计服务年限',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [self.designServerYear]
        }
      ]
    }
    console.log(self.designServerYear,self.alreadyServerYear)
    this.chart2.setOption(chart2Option);

  }
  }
</script>
<style scoped>
td{
  text-align: left;
}
  .container{
    margin-left: 0;
  }
.down{
  margin-left: 0px;
  max-height: 500px;
  overflow: hidden;
  overflow-y:auto
}
.up{
  width: 100%;
  position: relative;
  height: 400px;
}
#chart1 {
  position: absolute;
  width: 48%;
  height: 400px;
}
#chart2{
  position: absolute;
  left: 48%;
  width: 48%;
  height: 400px;
}
</style>
