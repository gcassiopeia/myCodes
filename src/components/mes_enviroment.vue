<template>
  <div class="container">
    <span>{{tabaleTitle ? tabaleTitle : '暂无数据'}}</span>
    <table class="table table-striped">
      <tbody>
      <tr>
        <td v-for="o in tableMes">{{o ? o : 1}}</td>
      </tr>
      <tr v-for="item in tableInfo">
        <td>{{item.num ? item.num : ''}}</td>
        <td>{{item.riverName ? item.riverName : ''}}</td>
        <td>{{item.area ? item.area : ''}}</td>
        <td>{{item.riverWidth ? item.riverWidth : ''}}</td>
        <td>{{item.riverFlow ? item.riverFlow : ''}}</td>
        <td>{{item.velocityFlow ? item.velocityFlow : ''}}</td>
        <td>{{item.riverFunction ? item.riverFunction : ''}}</td>
        <td>{{item.riverType ? item.riverType : ''}}</td>
      </tr>
      </tbody>
    </table>
    <span>{{tableRemark ? tableRemark : '备注：暂无数据'}}</span>
  </div>
</template>
<script>
  export default{
    data:function(){
      return {
        tableMes:null,
        server:this.GLOBAL.serverSrc
      }
    },
    mounted:function(){
      this.$ajax.post('http://'+this.server +':8084/file/selectExcel ',{
        county:'吕梁市文水县',
        region:'煤矿',
        mineType:'煤矿',
        company:'山西金地煤焦有限公司赤峪煤矿',
        content:'矿山基本信息调查表格'
      }).then(res =>{
        console.log(res)
        this.tableMes = res;

        this.tableInfo = res.data.list;
      }).catch(error => {
        console.log(error)
      })
    },
    methods:{
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
</style>
