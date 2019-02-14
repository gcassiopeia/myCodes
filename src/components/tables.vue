<template>
<div>
  <table border="1px" id="mytable">
    <input type="text" placeholder="请输入县市进行查询"/><button>提交</button>
    <tr v-for="item,index in tablelist">
      <td>{{index}}</td>
      <td>{{item.fName}}</td>
      <!--<td>{{item.fileName}}</td>-->
      <!--<td>{{item.layerId}}</td>-->
      <!--<td>{{item.layerName}}</td>-->
      <!--<td>{{item.recordTime}}</td>-->
      <!--<td>{{item.releaseTime}}</td>-->
    </tr>
  </table>
</div>
</template>
<script>
    export default{
      data: function () {
        return {
          tablelist:[
            {
              "fName": "加上.pdf"
            },
            {
              "fName": "环境统计.xlsx"
            },
            {
              "fName": "葵花宝典.doc"
            },
            {
              "fName": "人事面试题.doc"
            },
            {
              "fName": "人事面试题.doc"
            },
            {
              "fName": "葵花宝典-数据库类.doc"
            },
            {
              "fName": "面试技巧.docx"
            },
            {
              "fName": "葵花宝典.doc"
            }
          ],
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
        this.$ajax.post(this.server +':8084/excel/select',{}).then(res =>{
          this.tablelist = res.data.list;
          console.log(res.data.list);
        }).catch(error => {
        console.log(error)
    })
      }
    }
</script>
<style scoped>
#mytable > tr > td:nth-child(1){
  width: 20px;
}
#mytable > tr > td:nth-child(2){
  width: 80px;
}
#mytable > tr > td:nth-child(3){
  width: 20px;
}
#mytable > tr > td:nth-child(4){
  width: 20px;
}
#mytable > tr > td:nth-child(5){
  width: 80px;
}
#mytable > tr > td:nth-child(6){
  width: 140px;
}
#mytable > tr > td:nth-child(7){
  width: 140px;
}
</style>
