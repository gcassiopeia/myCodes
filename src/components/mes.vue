<template>
<div>
  <div>
  <span>{{tabaleTitle ? tabaleTitle : '暂无数据'}}</span>
  <table class="table table-striped">
    <tbody>
    <tr>
      <td v-for="o in tableMes">{{o ? o : 1}}</td>
    </tr>
    <tr v-for="item in tableInfo">
      <td>{{item.num ? item.num : ''}}</td>
      <td>{{item.monitorTarget ? item.monitorTarget : ''}}</td>
      <td>{{item.yearAverage ? item.yearAverage : ''}}</td>
      <td>{{item.yearPotency ? item.yearPotency : ''}}</td>
      <td>{{item.pollution ? item.pollution : ''}}</td>
    </tr>
    </tbody>
  </table>
  <span>备注：{{tableRemark ? tableRemark : '暂无数据'}}</span>
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
        var str = '吕梁市文水县生态环境现状调查\\非煤矿\\石灰岩矿\\文水县磊鑫石料厂\\生态保护措施调查\\表格';
        console.log(str.split('//'))
        console.log(str)
        console.log(str.substring(0,str.indexOf("市")+1))
        console.log(str.indexOf("县" || "区")+1)
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
          content:'大气环境质量调查'
        }).then(res =>{
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
</style>
