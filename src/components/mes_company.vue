<template>
  <div class="container">
    <div class="top">
      <map_company :company="company" :county="county"></map_company>
    </div>
    <div id="chart1" ref="chart1"></div>
    <div id="chart2" ref="chart2"></div>
    <div id="chart3" ref="chart3"></div>
    <div id="chart4" ref="chart4"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import map_countyC from './map_company.vue'
  export default{
    data: function () {
      return {
        chart1:null,
        tableMes:null,
        tableInfo:null,
        county:null,
        region:null,
        mineType:null,
        company:null,
        content:null,
        chart1Option:null,
        chart2Option:null,
        server:this.GLOBAL.serverSrc
      }
    },

  components:{
    map_company : map_countyC
  },
    mounted:function() {
      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:'矿山基本信息调查'
      }).then(res =>{
        this.tableMes = res;
        this.tableInfo = res.data.list;
        this.produce = this.tableMes.data.list[0].designProducePower;
        this.realProduce = this.tableMes.data.list[0].realProducePower;
        this.designServerYear = this.tableMes.data.list[0].designServerYear;
        this.alreadyServerYear = this.tableMes.data.list[0].alreadyServerYear.replace(/[^0-9]/ig, "");
        this.chart1Option = {
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
              data: [this.company]
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
              data: [this.realProduce]
            },
            {
              name: '设计生产力',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: [this.produce]
            }
          ]
        }
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
        this.chart1.setOption(this.chart1Option);
        this.chart2Option = {
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
              data: [this.company]
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
              data: [this.alreadyServerYear]
            },
            {
              name: '设计服务年限',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: [this.designServerYear]
            }
          ]
        }
        this.chart2 = echarts.init(this.$refs.chart2)
        this.chart2.setOption(this.chart2Option);
      }).catch(error => {
        console.log(error)
      })
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
      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:'大气环境质量调查'
      }).then(res =>{
        this.tableMes1 = res.data.data;
        for(var key in this.tableMes1){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes1[key];}
        }
        var monitorTarget = [];
        var yearAverage = [];
        var yearPotency = [];
        this.tableInfo1 = res.data.list;
        for(var i = 0; i < this.tableInfo1.length; i ++){
          monitorTarget.push(this.tableInfo1[i].monitorTarget);
          yearAverage.push(this.tableInfo1[i].yearAverage);
          yearPotency.push(this.tableInfo1[i].yearPotency.split('±')[0].replace(/[^0-9]/ig, ""));
        }
        this.chartOption3 =  {
          title: {
            text: this.company + '大气环境质量调查'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['年日平均值','年均浓度范围']
          },
          xAxis: [
            {
              type: 'category',
              data: monitorTarget,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '浓度 μg/m3',
              min: 0,
              max: 440,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '浓度 μg/m3',
              min: 0,
              max: 500,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name:'年日平均值（μg/m3）',
              type:'bar',
              data:yearAverage
            },
            {
              name:'年均浓度范围（μg/m3）',
              type:'line',
              yAxisIndex: 1,
              data:yearPotency
            }
          ]
        }
        this.chart3 = echarts.init(this.$refs.chart3);
        this.chart3.setOption(this.chartOption3);
      }).catch(error => {
        console.log(error)
      })
      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:'地下水环境质量调查'
      }).then(res =>{
        this.tableMes3 = res.data.data;
        for(var key in this.tableMes3){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes3[key];}
        }
        this.tableInfo3 = res.data.list
        var loggingName = [];
        var loggingDepth = [];
        var loggingLevel = [];
        for(var i = 0; i < this.tableInfo3.length; i ++){
          loggingName.push(this.tableInfo3[i].loggingName);
          loggingDepth.push(this.tableInfo3[i].loggingDepth);
          loggingLevel.push(this.tableInfo3[i].loggingLevel);
        }
        this.chartOption4 = {
          title: {
            text: this.company + '地下水环境质量调查'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: 'category',
            data: loggingName
          },
          series: [
            {
              name: '井深(m)',
              type: 'bar',
              data: loggingDepth
            },
            {
              name: '水位(m)',
              type: 'bar',
              data: loggingLevel
            }
          ]
        };
        this.chart4 = echarts.init(this.$refs.chart4);
        this.chart4.setOption(this.chartOption4);
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
  }
  }
</script>
<style scoped>
  .container{
    width: 100%;
    position: relative;
  }
  #chart1 {
    position: absolute;
    width: 45%;
    top: 900px;
    height: 400px;
  }
  #chart2{
    position: absolute;
    left: 48%;
    width: 48%;
    top: 900px;
    height: 400px;
  }
  #chart3{
    position: absolute;
    width: 45%;
    height: 400px;
    top: 1350px;
  }
  #chart4{
    position: absolute;
    left: 48%;
    top: 1350px;
    width: 48%;
    height: 400px;
  }
  .top{
    position: absolute;
    width: 98%;
    height: 800px;
    top: 0;
  }
</style>
