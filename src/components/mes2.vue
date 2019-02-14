<template>
  <div>
    <div class="container">
      <div class="up"></div>
      <div class="down">
      <table class="table table-striped">
        <tbody>
        <tr>
          <td colspan="9" class="center">企业大气环境大气环境污染</td>
        </tr>
        <tr>
          <td v-for="o in tableMes1">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo1">
          <td>{{item.num != null ? item.num : ''}}</td>
          <td>{{item.polluteSource != null ? item.polluteSource : ''}}</td>
          <td>{{item.suveryIndex != null ? item.suveryIndex : ''}}</td>
          <td>{{item.gasPotency != null ? item.gasPotency : ''}}</td>
          <td>{{item.smokeVolume != null ? item.smokeVolume : ''}}</td>
          <td>{{item.yearDischarge != null ? item.yearDischarge : ''}}</td>
          <td>{{item.coalQuality != null ? item.coalQuality : ''}}</td>
          <td>{{item.dischargeYear != null ? item.dischargeYear : ''}}</td>
          <td>{{item.fixedParam != null ? item.fixedParam : ''}}</td>
        </tr>
        </tbody>
      </table>
      <table class="table table-striped">
        <tbody>
        <tr>
          <td colspan="7" class="center">企业地表水环境污染</td>
        </tr>
      <tr>
        <td v-for="o in tableMes2">{{o ? o : 1}}</td>
      </tr>
      <tr v-for="item in tableInfo2">
        <td>{{item.num != null ? item.num : ''}}</td>
        <td>{{item.polluteSource != null ? item.polluteSource : ''}}</td>
        <td>{{item.investIndex != null ? item.investIndex : ''}}</td>
        <td>{{item.importPotency != null ? item.importPotency : ''}}</td>
        <td>{{item.exportPotency != null ? item.exportPotency : ''}}</td>
        <td>{{item.removalRate != null ? item.removalRate : ''}}</td>
        <td>{{item.dischargeYear != null ? item.dischargeYear : ''}}</td>
      </tr>
      </tbody>
      </table>
      <table class="table table-striped">
        <tbody>
        <tr>
          <td colspan="8" class="center">企业固体废物污染</td>
        </tr>
        <tr>
          <td v-for="o in tableMes3">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo3">
          <td>{{item.num != null ? item.num : ''}}</td>
          <td>{{item.polluteSource != null ? item.polluteSource : ''}}</td>
          <td>{{item.produceNum != null ? item.produceNum : ''}}</td>
          <td>{{item.handleNum != null ? item.handleNum : ''}}</td>
          <td>{{item.dischargeNum != null ? item.dischargeNum : ''}}</td>
          <td>{{item.handleWay != null ? item.handleWay : ''}}</td>
          <td>{{item.dischargeWay != null ? item.dischargeWay : ''}}</td>
        </tr>
        </tbody>
      </table>
        </div>
    </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return {
        county:null,
        region:null,
        mineType:null,
        company:null,
        content1:'大气环境污染',
        content2:'地表水环境污染',
        content3:'固体废物污染',
        tableMes1:null,
        tableInfo1:null,
        tableMes2:null,
        tableInfo2:null,
        tableMes3:null,
        tableInfo3:null,
        server:this.GLOBAL.serverSrc
      }
    },
    mounted:function(){

      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:this.county,
        region:this.region,
        mineType:this.mineType,
        company:this.company,
        content:this.content1
      }).then(res =>{
        this.tableMes1 = res.data.data;
        for(var key in this.tableMes1){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes1[key];}
        }
        this.tableInfo1 = res.data.list;
        console.log(1,this.tableMes1,this.tableInfo1)
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
        this.tableInfo2 = res.data.list;
        console.log(2,this.tableMes2,this.tableInfo2)
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
        this.tableInfo3 = res.data.list;
        console.log(3,this.tableMes3,this.tableInfo3)
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
    /*max-height: 400px;*/
    overflow: hidden;
    overflow-y:auto
  }
  .up{

  }
  .center{
    text-align: center;
  }
</style>
