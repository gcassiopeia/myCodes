<template>
  <div>
    <div>
      <span>{{tabaleTitle ? tabaleTitle : '暂无数据'}}</span>
      <table id="table-3">
        <tr>
          <td v-for="o in tableMes">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo">
          <td>{{item.num ? item.num : ''}}</td>
          <td>{{item.polluteSource ? item.polluteSource : ''}}</td>
          <td>{{item.investIndex ? item.investIndex : ''}}</td>
          <td>{{item.importPotency ? item.importPotency : ''}}</td>
          <td>{{item.exportPotency ? item.exportPotency : ''}}</td>
          <td>{{item.removalRate ? item.removalRate : ''}}</td>
          <td>{{item.dischargeYear ? item.dischargeYear : ''}}</td>
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
      this.$ajax.post(this.server +':8084/date/select?areaName=文水县&contentName=地表水资源污染',{}).then(res =>{
        this.tabaleTitle = res.data.data.title;
//        this.tableRemark = res.data.data.remark;
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
        return temp;a
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
