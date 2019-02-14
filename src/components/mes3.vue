<template>
  <div>
    <div>
      <span>{{tabaleTitle ? tabaleTitle : '暂无数据'}}</span>
      <table id="table-3">
        <tr>
          <td v-for="o in tableMes">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo">
          <td>{{item.companyName ? item.companyName : ''}}</td>
          <td>{{item.sensitiveName ? item.sensitiveName : ''}}</td>
          <td>{{item.ecologyEFirst ? item.ecologyEFirst : ''}}</td>
          <td>{{item.ecologyESecond ? item.ecologyESecond : ''}}</td>
          <td>{{item.ecologyEThird ? item.ecologyEThird : ''}}</td>
          <td>{{item.ecologyEFourth ? item.ecologyEFourth : ''}}</td>
          <td>{{item.ecologyFFirst ? item.ecologyFFirst : ''}}</td>
          <td>{{item.ecologyFSecond ? item.ecologyFSecond : ''}}</td>
          <td>{{item.ecologyFThird ? item.ecologyFThird : ''}}</td>
          <td>{{item.ecologyFFourth ? item.ecologyFFourth : ''}}</td>
          <td>{{item.coincideArea ? item.coincideArea : ''}}</td>
          <td>{{item.ecologyFirst ? item.ecologyFirst : ''}}</td>
          <td>{{item.ecologySecond ? item.ecologySecond : ''}}</td>
          <td>{{item.ecologyThird ? item.ecologyThird : ''}}</td>
          <td>{{item.protectGrade ? item.protectGrade : ''}}</td>
          <td>{{item.protectType ? item.protectType : ''}}</td>
          <td>{{item.protectObject ? item.protectObject : ''}}</td>
          <td>{{item.keyProtectPlant ? item.keyProtectPlant : ''}}</td>
          <td>{{item.keyProtectAnimal ? item.keyProtectAnimal : ''}}</td>
          <td>{{item.ecologyEffect ? item.ecologyEffect : ''}}</td>
          <td>{{item.protectState ? item.protectState : ''}}</td>
          <td>{{item.protectDemand ? item.protectDemand : ''}}</td>
          <td>{{item.photoFirst ? item.photoFirst : ''}}</td>
          <td>{{item.photoSecond ? item.photoSecond : ''}}</td>
          <td>{{item.photoThird ? item.photoThird : ''}}</td>
          <td>{{item.photoFourth ? item.photoFourth : ''}}</td>
          <td>{{item.photoFifth ? item.photoFifth : ''}}</td>
          <td>{{item.photoSixty ? item.photoSixty : ''}}</td>
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
//        content:'地表水环境质量调查'
      }).then(res =>{
        console.log(res);
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
  #table-3 thead, #table-3 tr {
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgb(235, 242, 224);
  }
  #table-3 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgb(235, 242, 224);
  }

  /* Padding and font style */
  #table-3 td, #table-3 th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana;
    color: rgb(149, 170, 109);
  }

  /* Alternating background colors */
  #table-3 tr:nth-child(even) {
    background: rgb(230, 238, 214)
  }
  #table-3 tr:nth-child(odd) {
    background: #FFF
  }
</style>
