<template>
<div class="contain">
  <div class="leftmenu">
    <p @click="show1=!show1;show2=false;show3=false;show5=false;show6=false;toHome()">吕梁市矿山信息管理</p>
    <ul v-show="show1" class="mesManger">
      <li @click="show2 = !show2;toWenshui()" >文水县煤矿信息管理</li>
      <ul v-show="show2">
    <li @click="show5=!show5;show6=false;show7=false">煤矿</li>
        <ul v-show="show5">
          <li @click="toMes('mes5')">基本信息</li>
          <li @click="toMes('mes1')">环境质量</li>
          <li @click="toMes('mes')">污染源</li>
          <!--<li @click="toMes('mes3')">生态环境</li>-->
          <li @click="toEcharts">煤矿面积/矸石场面积</li>
        </ul>
        <li  @click="show6=!show6;show5=false;show7=false"">非煤矿</li>
        <ul v-show="show6">
          <li @click="toMes('mes5')">基本信息</li>
          <li @click="toMes('mes1')">环境质量</li>
          <li @click="toMes('mes')">污染源</li>
          <li @click="toMes('mes1')">生态环境</li>
          <li @click="toEcharts">煤矿面积/矸石场面积</li>
        </ul>
        <li   @click="show7=!show7;show5=false;show6=false"">县域</li>
        <ul v-show="show7">
          <li @click="toMes('mes5')">基本信息</li>
          <li @click="toMes('mes1')">环境质量</li>
          <li @click="toMes('mes')">污染源</li>
          <li @click="toEcharts">生态环境</li>
          <!--<li>关键数据展示</li>-->
          <!--<li @click="toMes('mes9')">县域大气环境</li>-->
          <!--<li @click="toMes('mes10')">县域地下水资源质量</li>-->
          <!--<li @click="toMes('mes11')">县域地表水资源质量</li>-->
          <li @click="toMes('img3')">县域矢量城成果实例</li>
          <li @click="toMes('img4')">县域井田分布图</li>
        </ul>
        <!--&lt;!&ndash;<li @click="show8=!show8">关键数据展示</li>&ndash;&gt;-->
        <!--&lt;!&ndash;<ul v-show="show8">&ndash;&gt;-->
          <!--&lt;!&ndash;<li>煤矿/非煤矿信息</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>植被覆盖率</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>土地利用类型</li>&ndash;&gt;-->
          <!--&lt;!&ndash;<li>土壤侵蚀信息</li>&ndash;&gt;-->
        <!--</ul>-->
      </ul>
      <li @click="show3=!show3">关键数据展示</li>
      <ul v-show="show3">
        <li @click="toMes('img')">煤矿/非煤矿信息</li>
        <li @click="toMes('img1')">植被覆盖率</li>
        <li>土地利用类型</li>
        <li @click="toMes('img2')">土壤侵蚀信息</li>
        <li @click="toMes('mes')">大气质量查询</li>
        <li @click="toMes('mes1')">地表水环境</li>
        <li @click="toMes('mes2')">大气环境污染源调查</li>
        <!--<li @click="toMes('mes3')">生态过敏</li>-->
        <!--<li @click="toMes('mes4')">边坡调查</li>-->
        <li @click="toMes('mes5')">煤矿信息</li>
        <li @click="toMes('mes6')">工程情况</li>
        <!--<li @click="toMes('mes7')">地表水资源污染</li>-->
        <!--<li @click="toMes('mes8')">土壤环境质量</li>-->
        <!--<li @click="toMes('mes12')">废弃场地调查</li>-->
        <!--<li @click="toMes('mes13')">占地情况</li>-->
        <!--<li @click="toMes('mes14')">地面下陷</li>-->
      </ul>
    </ul>
    <p @click="show4=!show4">系统管理</p>
    <ul v-show="show4" class="sysManger">
      <li>系统管理子选项</li>
    </ul>
    <!--<vue-ztree :list.sync='areaListData' :func='nodeClick' :is-open='true'>-->
    <!--</vue-ztree>-->
  </div>
  <div class="right">
    <router-view></router-view>
  </div>
</div>
</template>
<script>
  import vueZtree from '../components/vue-ztree.vue'
  export default {
    data:function(){
    return{
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      show5:false,
      show6:false,
      show7:false,
      show8:false,
      server:this.GLOBAL.serverSrc,
      areaListData:[{name: "父节点1", children: [
        {name: "子节点1"},
        {name: "子节点2"}
      ]}]
    }

  },
    components: {
      vueZtree
    },
  methods:{
     //点击展开折叠菜单事件
  toWenshui:function(){
    this.$router.push('/home/map_wenshui');
  },
    toMes: function () {
      this.$router.push('/home/mes');
    },
    toHome:function(){
      this.$router.push('/home/map');
    },
    toMes: function (str) {
      this.$router.push('/home/' + str);
    },
    toEcharts: function () {
      this.$router.push('/home/echarts');
    },
    nodeClick: function () {

    }

  },
    mounted:function(){
//      this.$ajax.post(this.server + ':8084/file/excel/getExcelPath',{}).then(res => {
//        console.log(res)
//      })
    }
  }

</script>
<style scoped>
.contain{
  position: relative;
  height: 800px;
}
.leftmenu{
  position: absolute;
  left: 0;
  width: 300px;
  height: 500px;
  font-size: 18px;
  background-color: blanchedalmond;
}
.leftmenu > span{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: black;
}
.leftmenu > p{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  background: #8fbfef;
  border-bottom: 1px solid #669cd9;
  cursor: pointer;
}
.mesManger >li{
  cursor: pointer;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  background: lightblue;
  border-bottom: 1px solid #669cd9;
  cursor: pointer;
}
.mesManger > li + ul > li{
  cursor: pointer;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #ffffff;
  background: lightgray;
  border-bottom: 1px solid #669cd9;
  cursor: pointer;
}
.mesManger > ul > ul > li{
  cursor: pointer;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: black;
  background: whitesmoke;
  border-bottom: 1px solid #669cd9;
  cursor: pointer;
}
.sysManger > li{
  cursor: pointer;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #ffffff;
  background: lightblue;
  border-bottom: 1px solid #669cd9;
  cursor: pointer;
}
.right{
  position: absolute;
  left: 305px;
  width: 1200px;
  height: 800px;
}
/*.asideBox {*/
  /*height: 100%;*/
  /*width: 300px;*/
/*}*/
/*.asideBox aside {*/
  /*background: #f1f1f1;*/
  /*height: 100%;*/
/*}*/
/*.asideBox aside .asideMenu .oneMenu {*/
  /*height: 50px;*/
  /*line-height: 50px;*/
  /*font-size: 18px;*/
  /*font-weight: normal;*/
  /*color: #ffffff;*/
  /*background: #8fbfef  no-repeat 280px center;*/
  /*border-bottom: 1px solid #669cd9;*/
  /*cursor: pointer;*/
/*}*/
/*.asideBox aside .asideMenu .oneMenu img {*/
  /*width: 20px;*/
  /*height: 20px;*/
  /*margin: 15px 16px 15px 20px;*/
  /*vertical-align: top;*/
/*}*/
/*.asideBox aside .asideMenu .oneMenuChild {*/
  /*padding: 0 20px 0 60px;*/
  /*height: 40px;*/
  /*line-height: 40px;*/
  /*background: #f1f1f1;*/
  /*border-bottom: 1px solid #ffffff;*/
  /*color: #454343;*/
  /*font-size: 18px;*/
/*}*/

</style>
