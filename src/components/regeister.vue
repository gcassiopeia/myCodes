<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
<!--<div>-->
  <!--<label for="username">账号：</label><input type="text" id="username" placeholder="请输入账号" ref="username"/><br/>-->
  <!--<label for="password">密码：</label><input type="password" id="password" placeholder="请输入密码" ref="password"/><br/>-->
  <!--<label for="phone">电话：</label><input type="text" placeholder="请输入电话号码" id="phone" ref="phone" v-on:input="testPhone"/><br/>-->
  <!--<span v-show="wrong" style="color: red;">手机号码不正确，请重新输入</span><br/>-->
  <!--<select ref="gender">-->
    <!--   <option value="" disabled selected>性别</option>-->
    <!--   <option value="男">男</option>-->
    <!--   <option value="女">女</option>-->
  <!--</select>-->
  <!--<select ref="admin">-->
    <!--   <option value="" disabled selected>管理员类别</option>-->
    <!--   <option value="shiji">市级管理员</option>-->
    <!--   <option value="xianji">县级管理员</option>-->
  <!--</select>-->
  <!--<button @click="register" style="cursor: not-allowed;" v-bind:style="(!wrong) ? allowed : ''">注册</button>-->

<!--</div>-->
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputEmail3" class="col-sm-4 control-label">账号</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputEmail3" placeholder="请输入您的账号" ref="username">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword3" class="col-sm-4 control-label">密码</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="inputPassword3" placeholder="请输入您的密码" ref="password">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPassword4" class="col-sm-4 control-label">确认密码</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="inputPassword4" placeholder="请再次输入您的密码" ref="repassword">
      </div>
    </div>
    <div class="form-group">
      <label for="inputPhone" class="col-sm-4 control-label">电话</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputPhone" placeholder="请输入您的电话" ref="phone">
      </div>
    </div>
    <div class="form-group">
      <label for="inputGender" class="col-sm-4 control-label">性别</label>
      <div class="col-sm-4">
        <select class="form-control" id="inputGender" ref="gender">
          <option>男</option>
          <option>女</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="inputAdmin" class="col-sm-4 control-label">管理员类型</label>
      <div class="col-sm-4">
        <select class="form-control" id="inputAdmin" ref="admin">
          <option>县级管理员</option>
          <option>市级管理员</option>
        </select>
      </div>
    </div>
    <div class="form-group" style="margin-left: -80px">
      <div class="col-sm-offset-2 col-sm-8">
        <button @click="register" class="btn btn-default">注册</button>
      </div>
    </div>
  </form>
</template>
<script>
    export default{
      data: function () {
        return {
          wrong:false,
          allowed:{cursor:'pointer'},
          server:this.GLOBAL.serverSrc
        }
      },
      methods:{
        register: function () {
          console.log(this.$refs.username.value,this.$refs.password.value,this.$refs.gender.value,this.$refs.phone.value,this.$refs.admin.value);
          this.$ajax.post('http://' + this.server +':8088/user/register',{
            userName:this.$refs.username.value,
            userPassword:this.$refs.password.value,
            userSex:this.$refs.gender.value,
            userPhone:this.$refs.phone.value,
            userType:this.$refs.admin.value
          }).then(res =>{
//            console.log(res.data.msg);
            if(res.data.msg == '成功'){
              alert("注册成功!请您登录！");
              this.$router.push('/login');
            }else{
              alert("注册失败！请重新注册！");
            }
          }).catch(error => {
            console.log(error)
          })
        },
        testPhone: function () {
          var reg1 = /^[1][3,4,5,7,8][0-9]{9}/;
          if(reg1.test(this.$refs.phone.value)){
            this.wrong = false;
          }else{
            this.wrong = true;
          }
        }
      }
    }
</script>
<style scoped>

</style>
