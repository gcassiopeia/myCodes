<template>
<!--<div class="contain">-->
  <!--<label for="username">账号:</label><input type="text" id="username" placeholder="请输入账号" ref="username"/><br/>-->
  <!--<label for="password">密码:</label><input type="password" id="password" placeholder="请输入密码" ref="password"/><br/>-->
  <!--<button @click="doLogin">登录</button>-->
  <!--<button @click="doRegister">注册</button>-->
<!--</div>-->

  <form class="form-horizontal">
    <div class="login">
    <div class="title"><div style="height: 50px;"></div>
    吕梁市矿山调查展示系统
      <div style="height: 50px"></div>
    </div>

    <div class="form-group" style="margin-left: 25px">
      <label for="inputEmail3" class="col-sm-4 control-label">账号</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputEmail3" placeholder="请输入您的账号" ref="username">
      </div>
    </div>
    <div class="form-group" style="margin-left: 25px">
      <label for="inputPassword3" class="col-sm-4 control-label">密码</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="inputPassword3" placeholder="请输入您的密码" ref="password">
      </div>
    </div>

    <!--<div class="form-group">-->
      <!--<div class="col-sm-offset-2 col-sm-8">-->
        <!--<div class="checkbox">-->
          <!--<label>-->
            <!--<input type="checkbox"> 记住密码-->
          <!--</label>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-8">
        <button @click="doLogin" class="btn btn-default" style="width: 100px;"> 登录</button>
      </div>

    </div>
      <div style="height: 15px;"></div>
    </div>
  </form>
</template>
<script>
  import store from '../store.js'
    export default{
      data:function(){
        return {
          server:this.GLOBAL.serverSrc
        }
      },
      methods:{
        doLogin:function(){
          this.$ajax.get('http://'+this.server +':8088/user/login',
//            this.$ajax.get('/api/user/login',
            {params:{
            userName:this.$refs.username.value,
            userPassword:this.$refs.password.value}}).then(res => {
            console.log(res.data.data.userName,res.data.data.userType)
            if(res.data.status == 200){
              alert('登陆成功！正在跳转至主页...');
              this.$store.commit('$_setStorage',{name:res.data.data.userName,type:res.data.data.userType})
              this.$router.push('/home');
            }else if(res.data.status == 400){
              alert('账号或密码错误，请重新输入！');
              this.$router.push('/')
            }
          }).catch(error => {
            console.log(error)
          })


        },
        doRegister:function(){
          this.$router.push('/register');
        }
      }
    }
</script>
<style scoped>
  .form-horizontal{

  }
  .form-group{
    margin-bottom: 50px;
  }
  .title{
    font-size: 35px;
    color: black;
  }
  .login{
    margin-top: 50px;
    text-align: center;
    width: 100%;
    background: #cafbca;
  }
</style>
