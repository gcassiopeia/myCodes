<template>
  <div class="contain">
    <form class="navbar-form navbar-left" role="search">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  <div class="mes">当前时间：<span>{{date | filterDate}}</span><span>{{$store.getters.getStorage}}</span> 用户级别：<span>管理员（待修改）</span></div>
  <div class="bar">
    <!--<input type="text" placeholder="搜索" ref="inputvalue"/>-->
    <!--<a type="button" @click="search" class="btn">查询</a>-->
    <div class="search bar1">
      <form>
        <input type="text" placeholder="请输入您要搜索的内容...">
        <button type="submit">搜索</button>
      </form>
    </div>
  </div>
  </div>
</template>
<script>
  var myData = {
    date:new Date()
  }
  var padDate = function (value) {
    return value < 10 ? '0' + value:value;
  }
    export default{
      data: function () {
        return {
          date:myData,
          user:null,
          server:this.GLOBAL.serverSrc
        };
      },
      filters:{
        filterDate:function(value){
          var date = new Date(value);
          var year = date.getFullYear();
          var month = padDate(date.getMonth() + 1);
          var day = padDate(date.getDate());
          var amPm = date.getHours() < 12 ? "上午" : "下午";
          var hours = padDate(date.getHours() < 12 ? date.getHours() : (date.getHours() -1));
          var minutes = padDate(date.getMinutes());
          var seconds = padDate(date.getSeconds());
          return year + "年" + month + "月" + day + "日  " + amPm + " " + hours + ":" + minutes + ":" + seconds;
        }
      },
      created:function(){

      },
      mounted: function () {
        var _this = this;
        _this.date = new Date();
        this.timer = setInterval(function () {
          _this.date = new Date();
        },1000)
      },
      beforeDestory: function () {
        if(this.timer){
          clearInterval(this.timer);
        }
      },
      methods:{
        search: function () {
          this.$ajax.post('http://'+this.server + ':8084/file/excel/pathMatch?matchStr=' + this.$refs.inputvalue.value,{}).then(res =>{
            this.$router.push({
              path:'/home/excel',//跳转路由
              query:{//参数对象
                res:res
              }
            });
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

  form {
    position: relative;
    width: 300px;
    margin: 0 auto;
  }

  input, button {
    border: none;
    outline: none;
  }

  input {
    width: 100%;
    height: 42px;
    padding-left: 13px;
  }

  button {
    height: 42px;
    width: 42px;
    cursor: pointer;
    position: absolute;
  }

  /*搜索框1*/
  .bar1 input {
    border: 2px solid #7BA7AB;
    border-radius: 5px;
    background: #F9F0DA;
    color: #9E9C9C;
  }
  .bar1 button {
    top: 0;
    right: 0;
    background: #7BA7AB;
    border-radius: 0 5px 5px 0;
  }
  .bar1 button:before {
    font-family: FontAwesome;
    font-size: 16px;
    color: #F9F0DA;
  }
.contain{
  padding: 10px;
  position: relative;
  height: 60px;
  background:lightgrey;
}
.mes{
  position: absolute;
  left: 20px;
  cursor: default;
}
.mes > span{
  color: #fff;
}
.bar{
  width: 400px;
  position: absolute;
  right: 20px;
}
.bar > p{
  color: #fff;
  cursor: pointer;
  border-right: 1px solid black;
  border-right-width: 2px;
  padding-right: 15px;
}
.logo{
  width: 100%;
  height: 50px;
  position: absolute;
  top: 50px;
  background: dodgerblue;
}
  .btn{
    text-decoration:none;
    background:#2f435e;
    color:#f2f2f2;

    padding: 10px 30px 10px 30px;
    font-size:16px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight:bold;
    border-radius:3px;

    -webkit-transition:all linear 0.30s;
    -moz-transition:all linear 0.30s;
    transition:all linear 0.30s;



}
</style>
