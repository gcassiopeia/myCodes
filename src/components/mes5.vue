<template>
  <div>
    <div>
      <span>{{tabaleTitle ? tabaleTitle : '暂无数据'}}</span>
      <table class="table table-striped">
        <tr>
          <td v-for="o in tableMes">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo">
          <td>{{item.mineName ? item.mineName : ''}}</td>
          <td>{{item.location ? item.location : ''}}</td>
          <td>{{item.legalPerson ? item.legalPerson : ''}}</td>
          <td>{{item.mineLicense ? item.mineLicense : ''}}</td>
          <td>{{item.linkMan ? item.linkMan : ''}}</td>
          <td>{{item.linkManPhone ? item.linkManPhone : ''}}</td>
          <td>{{item.shaftArea ? item.shaftArea : ''}}</td>
          <td>{{item.coordinate ? item.coordinate : ''}}</td>
          <td>{{item.physiognomyType ? item.physiognomyType : ''}}</td>
          <td>{{item.riverType ? item.riverType : ''}}</td>
          <td>{{item.designServerYear ? item.designServerYear : ''}}</td>
          <td>{{item.alreadyServerYear ? item.alreadyServerYear : ''}}</td>
          <td>{{item.designProducePower ? item.designProducePower : ''}}</td>
          <td>{{item.realProducePower ? item.realProducePower : ''}}</td>
          <td>{{item.mineType ? item.mineType : ''}}</td>
          <td>{{item.exploitMethod ? item.exploitMethod : ''}}</td>
          <td>{{item.exploitTechnology ? item.exploitTechnology : ''}}</td>
          <td>{{item.buildMineTime ? item.buildMineTime : ''}}</td>
          <td>{{item.buildRate ? item.buildRate : ''}}</td>
          <td>{{item.produceState ? item.produceState : ''}}</td>
          <td>{{item.reserves ? item.reserves : ''}}</td>
          <td>{{item.developmentLevel ? item.developmentLevel : ''}}</td>
          <td>{{item.depth ? item.depth : ''}}</td>
          <td>{{item.thick ? item.thick : ''}}</td>
          <td>{{item.oreBodyState ? item.oreBodyState : ''}}</td>
          <td>{{item.miningEmptyArea ? item.miningEmptyArea : ''}}</td>
          <td>{{item.miningEmptyPosition ? item.miningEmptyPosition : ''}}</td>
          <td>{{item.miningMergerNum ? item.miningMergerNum : ''}}</td>
          <td>{{item.miningMergerName ? item.miningMergerName : ''}}</td>
          <td>{{item.coalType ? item.coalType : ''}}</td>
          <td>{{item.designCoalSeam ? item.designCoalSeam : ''}}</td>
          <td>{{item.alreadyCoalSeam ? item.alreadyCoalSeam : ''}}</td>
          <td>{{item.emptyCoalMine ? item.emptyCoalMine : ''}}</td>
          <td>{{item.autoignitionFirst ? item.autoignitionFirst : ''}}</td>
          <td>{{item.autoignitionSecond ? item.autoignitionSecond : ''}}</td>
          <td>{{item.mineClass ? item.mineClass : ''}}</td>
          <td>{{item.exploitMineMethod ? item.exploitMineMethod : ''}}</td>
          <td>{{item.dangerousSource ? item.dangerousSource : ''}}</td>
          <td>{{item.mainProduct ? item.mainProduct : ''}}</td>
          <td>{{item.productIndex ? item.productIndex : ''}}</td>
          <td>{{item.byproductFirst ? item.byproductFirst : ''}}</td>
          <td>{{item.byProductSecond ? item.byProductSecond : ''}}</td>
          <td>{{item.byProductThird ? item.byProductThird : ''}}</td>
        </tr>
      </table>
      <span>{{tableRemark ? tableRemark : '备注：暂无数据'}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return {
        tabaleTitle:null,
        tableRemark:null,
        tableMes:null,
        tableInfo:null,
        server:this.GLOBAL.serverSrc
      }
    },
    mounted:function(){
//        this.$ajax({
//          methods:'post',
//          url:'http://192.168.216.1:8084/excel/select',
//          data:{}
//        }).then(res =>{
//          console.log(res,1)
//        }).catch(error => {
//          console.log(error,1)
//        })

      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:'吕梁市文水县',
        region:'非煤矿山',
        mineType:'石灰岩矿',
        company:'文水县海钢石料厂',
        content:'矿山基本信息调查表格'
      }).then(res =>{
        this.tabaleTitle = res.data.data.title;
        this.tableRemark = res.data.data.remark;
        this.tableMes = res.data.data;
        for(var key in this.tableMes){
          if(key == 'title' || key == 'remark'){
            delete this.tableMes[key];}
        }

        this.tableInfo = res.data.list;
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
    }
  }
</script>
<style scoped>

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #494A5F;
    font-weight: 500;
    font-family: "Microsoft YaHei","宋体","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif, FreeSans, Arimo;
  }

  input, button {
    border: none;
    outline: none;
  }

  input {
    height: 42px;
    padding-left: 13px;
  }

  button {
    height: 42px;
    width: 42px;
    cursor: pointer;
    margin-top: 75px;
    margin-left: 20px;
  }

  /*搜索框1*/
  .bar1 input {
    border: 1px solid lightblue;
    border-radius: 5px;
    background: #F9F0DA;
    color: #9E9C9C;
  }
  button {
    background: #7BA7AB;
    border-radius: 5px;
  }
  .bar1 button:before {
    font-family: FontAwesome;
    font-size: 16px;
    color: #F9F0DA;
  }
</style>
