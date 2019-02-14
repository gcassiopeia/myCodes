<template>
  <div>
    <div class="container">
      <div class="up">
        <div id="chart1" ref="chart1"></div>
        <div id="chart2" ref="chart2"></div>
      </div>
      <div class="down">
      <table class="table table-striped">
        <tbody>
        <tr>
          <td colspan="5">企业大气环境质量调查</td>
        </tr>
        <tr>
          <td v-for="o in tableMes1">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo1">
          <td>{{item.num ? item.num : ''}}</td>
          <td>{{item.monitorTarget ? item.monitorTarget : ''}}</td>
          <td>{{item.yearAverage ? item.yearAverage : ''}}</td>
          <td>{{item.yearPotency ? item.yearPotency : ''}}</td>
          <td>{{item.pollution ? item.pollution : ''}}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="8">企业土壤环境质量调查</td>
        </tr>
        <tr>
          <td v-for="o in tableMes2">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo2">
          <td>{{item.num ? item.num : ''}}</td>
          <td>{{item.checkItem ? item.checkItem : ''}}</td>
          <td>{{item.investItem ? item.investItem : ''}}</td>
          <td>{{item.potency ? item.potency : ''}}</td>
          <td>{{item.average ? item.average : ''}}</td>
          <td>{{item.pollutionLevel ? item.pollutionLevel : ''}}</td>
          <td>{{item.pollutionRatio != null ? item.pollutionRatio : ''}}</td>
          <td>{{item.overStandard != null ? item.overStandard : ''}}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="8">企业地下水环境质量调查</td>
        </tr>
        <tr>
          <td v-for="o in tableMes3">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo3">
          <td>{{item.num ? item.num : ''}}</td>
          <td>{{item.loggingName ? item.loggingName : ''}}</td>
          <td>{{item.coordinate ? item.coordinate : ''}}</td>
          <td>{{item.loggingDepth ? item.loggingDepth : ''}}</td>
          <td>{{item.loggingLevel ? item.loggingLevel : ''}}</td>
          <td>{{item.aquifer ? item.aquifer : ''}}</td>
          <td>{{item.waterYield != null ? item.waterYield : ''}}</td>
          <td>{{item.waterQualityIndex != null ? item.waterQualityIndex : ''}}</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td colspan="8">企业地表水环境质量调查</td>
        </tr>
        <tr>
          <td v-for="o in tableMes4">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo4">
          <td>{{item.num != null ? item.num : ''}}</td>
          <td>{{item.riverName != null ? item.riverName : ''}}</td>
          <td>{{item.area != null ? item.area : ''}}</td>
          <td>{{item.riverWidth != null ? item.riverWidth : ''}}</td>
          <td>{{item.riverFlow != null ? item.riverFlow : ''}}</td>
          <td>{{item.riverFunction != null ? item.riverFunction : ''}}</td>
          <td>{{item.riverType != null ? item.riverType : ''}}</td>
        </tr>
        </tbody>
      </table>
      </div>
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
        content1:'大气环境质量调查',
        content2:'土壤环境质量调查',
        content3:'地下水环境质量调查',
        content4:'地表水环境质量调查',
        tableMes1:null,
        tableInfo1:null,
        tableMes2:null,
        tableInfo2:null,
        tableMes3:null,
        tableInfo3:null,
        tableMes4:null,
        tableInfo4:null,
        chartOption1:null,
        chartOption2:null,
        server:this.GLOBAL.serverSrc
      }
    },
    mounted:function(){
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
        this.chartOption1 =  {
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
        this.chart1 = echarts.init(this.$refs.chart1);
        this.chart1.setOption(this.chartOption1);
      }).catch(error => {
        console.log(error)
      })

      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:this.content2
      }).then(res =>{
        this.tableMes2 = res.data.data;
        for(var key in this.tableMes2){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes2[key];}
        }
        this.tableInfo2 = res.data.list
      }).catch(error => {
        console.log(error)
      })

      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:this.content3
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
          console.log(this.tableInfo3[i].loggingName)
          loggingName.push(this.tableInfo3[i].loggingName);
          loggingDepth.push(this.tableInfo3[i].loggingDepth);
          loggingLevel.push(this.tableInfo3[i].loggingLevel);
        }
        this.chartOption2 = {
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
        this.chart2 = echarts.init(this.$refs.chart2);
        this.chart2.setOption(this.chartOption2);
      }).catch(error => {
        console.log(error)
      })

      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:this.content4
      }).then(res =>{
        this.tableMes4 = res.data.data;
        for(var key in this.tableMes4){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes4[key];}
        }
        this.tableInfo4 = res.data.list
      }).catch(error => {
        console.log(error)
      })

    },
    methods:{
      test: function (mes) {
        var temp = [];
        for(var i = 0; i < mes.length; i ++){
          if(mes[i]){
            temp.push(mes[i])
            console.log(mes[i])
          }
          console.log(111)
        }
        return temp;
      },
      search: function () {
        this.$ajax.post('http://192.168.137.2:8084/date/select?areaName=' + this.$refs.name + '&contentName=' + this.$refs.type,{}).then(res =>{
          this.tableMes = res.data.data;
          for(var key in this.tableMes){
            if(key == 'title' || key == 'remark'){
              delete this.tableMes[key];}
          }
          this.tabaleTitle = res.data.data.title;
          this.tableRemark = res.data.data.remark;
          this.tableInfo = res.data.list
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created: function () {
      this.county = this.$route.query.county;
      this.region = this.$route.query.region;
      this.mineType = this.$route.query.mineType;
      this.company = this.$route.query.company;
    },
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
    max-height: 400px;
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
  #chart2 {
    position: absolute;
    width: 48%;
    height: 400px;
    left: 50%;
  }
</style>
