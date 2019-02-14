<template>
<div>
<ul v-for="item in res">
  <li @click="search(item)">{{item}}</li>
</ul>
</div>
</template>
<script>
    export default{
      data: function () {
        return {
          res:null
        }
      },
      methods:{
        getParams: function () {
          this.res = this.$router.history.current.query.res.data;
        },
        search: function (mes) {
          console.log(mes)
//          var reg = /.+?(省|市|自治区|自治州|县|区)/g;
          var reg1 = /.+?(市)/g;
          var reg2 = /.+?(县)/g;
          var reg3 = /.+?(区)/g;
          console.log(mes.match(reg1))
          console.log(mes.match(reg2))
          console.log(mes.match(reg3))
        }
      },
      created: function () {
        var self = this;
        self.getParams();
        for(var i = 0; i < self.res.length;i ++){
            var arr = self.res[i].split('\\');
          self.res[i]=arr[3] + arr[4] + arr[5] + arr[6] + arr[arr.length - 1];

        }
      }
    }
</script>
<style scoped>
li{
  text-decoration: none;
  list-style: none;
}
</style>
