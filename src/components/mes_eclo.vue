<template>
  <div>
    <div class="container">
      <span></span>
      <table class="table table-striped">
        <tbody>
        <tr>
          <td v-for="o in tableMes1">{{o ? o : 1}}</td>
        </tr>
        <tr v-for="item in tableInfo1">
          <td>{{item.companyName ? item.companyName : '暂无数据'}}</td>
          <td>{{item.num ? item.num : ''}}</td>
          <td>{{item.protectArea ? item.protectArea : ''}}</td>
          <td>{{item.protectMeasure ? item.protectMeasure : ''}}</td>
          <td>{{item.quantities ? item.quantities : ''}}</td>
          <td>{{item.photoNum ? item.photoNum : ''}}</td>
        </tr>
        </tbody>
      </table>
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
        content1:'生态保护措施',
        content2:'生态过敏',
        tableMes1:null,
        tableInfo1:null,
        tableMes2:null,
        tableInfo2:null,
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
        console.log(res)
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
</style>
