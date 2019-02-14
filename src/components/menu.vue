<template>
  <div class="contain">
    <div class="left">
      <div id="areaTree">
        <div class="tree-box">
          <div class="zTreeDemoBackground">
            <ul id="treeDemo" class="ztree"></ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  export default {
    name: "zTree",
    data:function(){
      return{
        server:this.GLOBAL.serverSrc,
        setting:{
          view: {
            dblClickExpand: false, //双击的时候是否切换展开状态。true为切换，false不切换
          },
          data:{
            simpleData:{
              enable: true,
              idKey: "id",
              pIdKey: "pId",
              rootPId: 0
            }
          },
          callback: {
            beforeClick: this.beforeClick,
            onClick: this.zTreeOnClick,
            onCheck: this.zTreeOnCheck,
            onExpand: this.onExpand,
            onCollapse: this.onCollapse
          }

        },
        zNodes:[
          {id:1,  pId:  0,    name: "吕梁市矿山信息管理", myUrl:'/home/map', open:true, hightlight : true},
          {id:2,  pId:  1,    name: "文水县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市文水县'},
            {id:201, pId: 2,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市文水县', region:'煤矿'},
            {id:202, pId: 2,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市文水县', region:'非煤矿山'},
            {id:203, pId: 2, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市文水县', isParent:true},
//            {id:20301, pId: 203, name:'环境质量', myUrl:'/home/test', county:'吕梁市文水县', content:''},
//            {id:20302, pId: 203, name:'污染源', myUrl:'/home/test', county:'吕梁市文水县', content:''},
            {id:20303, pId: 203, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030301, pId:20303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030302, pId:20303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030303, pId:20303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030304, pId:20303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030305, pId:20303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030306, pId:20303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030307, pId:20303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:2030308, pId:20303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市文水县', content:''},
            {id:3,  pId:  1,    name: "柳林县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
            {id:301, pId: 3,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市柳林县', region:'煤矿'},
            {id:302, pId: 3,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市柳林县', region:'非煤矿山'},
            {id:303, pId: 3, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市柳林县', isParent:true},
//            {id:30301, pId: 303, name:'环境质量', myUrl:'/home/test', county:'吕梁市柳林县', content:''},
//            {id:30302, pId: 303, name:'污染源', myUrl:'/home/test', county:'吕梁市柳林县', content:''},
            {id:30303, pId: 303, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030301, pId:30303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030302, pId:30303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030303, pId:30303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030304, pId:30303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030305, pId:30303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030306, pId:30303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030307, pId:30303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
            {id:3030308, pId:30303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市柳林县', content:''},
          {id:4,  pId:  1,    name: "汾阳市矿山信息管理", myUrl:'/home/map_county', county:'吕梁市汾阳市'},
            {id:401, pId: 4,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市汾阳市', region:'煤矿'},
            {id:402, pId: 4,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市汾阳市', region:'非煤矿山'},
            {id:403, pId: 4, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', isParent:true},
//            {id:40301, pId: 403, name:'环境质量', myUrl:'/home/test', county:'吕梁市汾阳市', content:''},
//            {id:40302, pId: 403, name:'污染源', myUrl:'/home/test', county:'吕梁市汾阳市', content:''},
            {id:40303, pId: 403, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030301, pId:40303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030302, pId:40303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030303, pId:40303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030304, pId:40303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030305, pId:40303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030306, pId:40303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030307, pId:40303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
            {id:4030308, pId:40303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市汾阳市', content:''},
          {id:5,  pId:  1,      name: "交口县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市交口县'},
            {id:501, pId: 5,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市交口县', region:'煤矿'},
            {id:502, pId: 5,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市交口县', region:'非煤矿山'},
            {id:503, pId: 5, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市交口县', isParent:true},
//            {id:50301, pId: 503, name:'环境质量', myUrl:'/home/test', county:'吕梁市交口县', content:''},
//            {id:50302, pId: 503, name:'污染源', myUrl:'/home/test', county:'吕梁市交口县', content:''},
            {id:50303, pId: 503, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030301, pId:50303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030302, pId:50303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030303, pId:50303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030304, pId:50303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030305, pId:50303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030306, pId:50303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030307, pId:50303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
            {id:5030308, pId:50303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市交口县', content:''},
          {id:6,  pId:  1,      name: "交城县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市交城县'},
            {id:601, pId: 6,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市交城县', region:'煤矿'},
            {id:602, pId: 6,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市交城县', region:'非煤矿山'},
            {id:603, pId: 6, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市交城县', isParent:true},
//            {id:60301, pId: 603, name:'环境质量', myUrl:'/home/test', county:'吕梁市交城县', content:''},
//            {id:60302, pId: 603, name:'污染源', myUrl:'/home/test', county:'吕梁市交城县', content:''},
            {id:60303, pId: 603, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030301, pId:60303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030302, pId:60303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030303, pId:60303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030304, pId:60303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030305, pId:60303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030306, pId:60303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030307, pId:60303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
            {id:6030308, pId:60303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市交城县', content:''},
          {id:7,  pId:  1,      name: "临县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市临县'},
            {id:701, pId: 7,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市临县', region:'煤矿'},
            {id:702, pId: 7,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市临县', region:'非煤矿山'},
            {id:703, pId: 7, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市临县', isParent:true},
//            {id:70301, pId: 703, name:'环境质量', myUrl:'/home/test', county:'吕梁市临县', content:''},
//            {id:70302, pId: 703, name:'污染源', myUrl:'/home/test', county:'吕梁市临县', content:''},
            {id:70303, pId: 703, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030301, pId:70303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030302, pId:70303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030303, pId:70303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030304, pId:70303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030305, pId:70303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030306, pId:70303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030307, pId:70303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
            {id:7030308, pId:70303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市临县', content:''},
          {id:8,  pId:  1,      name: "兴县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市兴县'},
            {id:801, pId: 8,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市兴县', region:'煤矿'},
            {id:802, pId: 8,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市兴县', region:'非煤矿山'},
            {id:803, pId: 8, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市兴县', isParent:true},
//            {id:80301, pId: 803, name:'环境质量', myUrl:'/home/test', county:'吕梁市兴县', content:''},
//            {id:80302, pId: 803, name:'污染源', myUrl:'/home/test', county:'吕梁市兴县', content:''},
            {id:80303, pId: 803, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030301, pId:80303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030302, pId:80303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030303, pId:80303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030304, pId:80303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030305, pId:80303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030306, pId:80303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030307, pId:80303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
            {id:8030308, pId:80303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市兴县', content:''},
          {id:9,  pId:  1,      name: "孝义市矿山信息管理", myUrl:'/home/map_county', county:'吕梁市孝义市'},
            {id:901, pId: 9,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市孝义市', region:'煤矿'},
            {id:902, pId: 9,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市孝义市', region:'非煤矿山'},
            {id:903, pId: 9, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市孝义市', isParent:true},
//            {id:90301, pId: 903, name:'环境质量', myUrl:'/home/test', county:'吕梁市孝义市', content:''},
//            {id:90302, pId: 903, name:'污染源', myUrl:'/home/test', county:'吕梁市孝义市', content:''},
            {id:90303, pId: 903, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030301, pId:90303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030302, pId:90303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030303, pId:90303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030304, pId:90303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030305, pId:90303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030306, pId:90303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030307, pId:90303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
            {id:9030308, pId:90303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市孝义市', content:''},
          {id:10, pId:  1,      name: "中阳县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市中阳县'},
            {id:1001, pId: 10,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市中阳县', region:'煤矿'},
            {id:1002, pId: 10,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市中阳县', region:'非煤矿山'},
            {id:1003, pId: 10, name:"县域", myUrl:'/home/mes_xianyu', county:'吕梁市中阳县', isParent:true},
//            {id:100301, pId: 1003, name:'环境质量', myUrl:'/home/test', county:'吕梁市中阳县', content:''},
//            {id:100302, pId: 1003, name:'污染源', myUrl:'/home/test', county:'吕梁市中阳县', content:''},
            {id:100303, pId: 1003, name:'遥感图', myUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030301, pId:100303, name:'生态系统类型数据', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030302, pId:100303, name:'植被覆盖度', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030303, pId:100303, name:'矿山企业井田分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030304, pId:100303, name:'水土流失强度分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030305, pId:100303, name:'生态破坏区域分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030306, pId:100303, name:'矿山企业矸石山分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030307, pId:100303, name:'矿山企业历年采空区分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
            {id:10030308, pId:100303, name:'矿山沉陷区空间分布', muUrl:'/home/mes_xianyu', county:'吕梁市中阳县', content:''},
//          {id:11, pId:  1,      name: "矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
//            {id:1101, pId: 11,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市中阳县', region:'煤矿'},
//            {id:1102, pId: 11,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市中阳县', region:'非煤矿山'},
//          {id:12, pId:  1,      name: "柳林县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
//            {id:1201, pId: 12,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市中阳县', region:'煤矿'},
//            {id:1202, pId: 12,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市中阳县', region:'非煤矿山'},
//          {id:13, pId:  1,      name: "柳林县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
//            {id:1301, pId: 13,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市中阳县', region:'煤矿'},
//            {id:1302, pId: 13,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市中阳县', region:'非煤矿山'},
//          {id:14, pId:  1,      name: "柳林县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
//            {id:1401, pId: 14,  name:"煤矿",  myUrl:'/home/mes_meikuang',  county:'吕梁市中阳县', region:'煤矿'},
//            {id:1402, pId: 14,  name:"非煤矿",myUrl:'/home/mes_feimei',    county:'吕梁市中阳县', region:'非煤矿山'},
//          {id:15, pId:1, name:"文件上传", myUrl:'/home/upload'},
        ]


//        zNodes:[
//          {id:1,      pId:  0,    name: "吕梁市矿山信息管理", myUrl:'/home/map', open:true},
//          {id:2,      pId:  1,    name: "文水县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市文水县'},
//          {id:201,    pId:  2,    name:"煤矿", myUrl:'/home/mes_meikuang', county:'吕梁市文水县', region:'煤矿'},
//          {id:20101,  pId:  201,  name:"山西金地煤焦有限公司赤峪煤矿", myUrl:'/home/mes_company', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:2010101,  pId:  20101,  name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:2010102,  pId:  20101,  name:"环境质量", myUrl:'/home/mes1', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', company:'山西金地煤焦有限公司赤峪煤矿'},
//          //大气环境质量调查，土壤环境质量调查，地下水环境质量调查，地表水环境质量调查
//          {id:2010103,  pId:  20101,  name:"污染源", myUrl:'/home/mes2', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', company:'山西金地煤焦有限公司赤峪煤矿'},
//          //大气环境污染，地表水环境污染，固体废物污染
//          {id:2010104,  pId:  20101,  name:"生态环境", myUrl:'/home/mes_eclo', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', company:'山西金地煤焦有限公司赤峪煤矿'},
//          //生态保护措施，生态过敏
//          {id:20102, pId: 201, name:"山西潞安集团王家庄煤业有限责任公司"},
//          {id:2010201, pId:  20102, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西潞安集团王家庄煤业有限责任公司'},
//          {id:2010201, pId:  20102, name:"环境质量", myUrl:'/home/mes1'},
//          {id:2010201, pId:  20102, name:"污染源", myUrl:'/home/mes2'},
//          {id:2010201, pId:  20102, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:202, pId:2, name:"非煤矿",myUrl:'/home/mes_feimei', county:'吕梁市文水县', region:'非煤矿山'},
//          {id:20201,  pId:  202,  name:"山西金地煤焦有限公司文水砂岩料场", myUrl:'/home/mes_company', county:'吕梁市文水县', region:'非煤矿山', mineType:'砂岩矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司文水砂岩料场'},
//          {id:2020101,  pId:  20201,  name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'非煤矿山', mineType:'砂岩矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司文水砂岩料场'},
//          {id:2020102,  pId:  20201,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020103,  pId:  20201,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020104,  pId:  20201,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20202,  pId:  202,  name:"山西吉港水泥有限公司石灰岩料场一厂", myUrl:'/home/echart_jindi'},
//          {id:2020201,  pId:  20202,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020202,  pId:  20202,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020203,  pId:  20202,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020204,  pId:  20202,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20203,  pId:  202,  name:"山西金地煤焦有限公司文水石灰岩料场", myUrl:'/home/echart_jindi'},
//          {id:2020301,  pId:  20203,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020302,  pId:  20203,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020303,  pId:  20203,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020304,  pId:  20203,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20204,  pId:  202,  name:"文水县传铜石料厂", myUrl:'/home/echart_jindi'},
//          {id:2020401,  pId:  20204,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020402,  pId:  20204,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020403,  pId:  20204,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020404,  pId:  20204,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20205,  pId:  202,  name:"文水县东恒石料厂", myUrl:'/home/echart_jindi'},
//          {id:2020501,  pId:  20205,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020502,  pId:  20205,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020503,  pId:  20205,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020504,  pId:  20205,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20206,  pId:  202,  name:"文水县海刚石料厂", myUrl:'/home/echart_jindi'},
//          {id:2020601,  pId:  20206,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020602,  pId:  20206,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020603,  pId:  20206,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020604,  pId:  20206,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20207,  pId:  202,  name:"文水县海钢石料厂", myUrl:'/home/echart_jindi'},
//          {id:2020701,  pId:  20207,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020702,  pId:  20207,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020703,  pId:  20207,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020704,  pId:  20207,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20208,  pId:  202,  name:"文水县海威石料厂", myUrl:'/home/echart_jindi'},
//          {id:2020801,  pId:  20208,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020802,  pId:  20208,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020803,  pId:  20208,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020804,  pId:  20208,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20209,  pId:  202,  name:"文水县鸿隆石料加工有限公司", myUrl:'/home/echart_jindi'},
//          {id:2020901,  pId:  20209,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2020902,  pId:  20209,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2020903,  pId:  20209,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2020904,  pId:  20209,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20210,  pId:  202,  name:"文水县磊鑫石料厂", myUrl:'/home/echart_jindi'},
//          {id:2021001,  pId:  20210,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021002,  pId:  20210,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021003,  pId:  20210,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021004,  pId:  20210,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20211,  pId:  202,  name:"文水县联营石料建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2021101,  pId:  20211,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021102,  pId:  20211,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021103,  pId:  20211,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021104,  pId:  20211,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20212,  pId:  202,  name:"文水县盛达建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2021201,  pId:  20212,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021202,  pId:  20212,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021203,  pId:  20212,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021204,  pId:  20212,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20213,  pId:  202,  name:"文水县腾锦石料有限公司二厂", myUrl:'/home/echart_jindi'},
//          {id:2021301,  pId:  20213,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021302,  pId:  20213,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021303,  pId:  20213,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021304,  pId:  20213,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20214,  pId:  202,  name:"文水县腾锦石料有限公司一厂", myUrl:'/home/echart_jindi'},
//          {id:2021401,  pId:  20214,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021402,  pId:  20214,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021403,  pId:  20214,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021404,  pId:  20214,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20215,  pId:  202,  name:"文水县田鑫建筑材料有限公司", myUrl:'/home/echart_jindi'},
//          {id:2021501,  pId:  20215,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021502,  pId:  20215,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021503,  pId:  20215,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021504,  pId:  20215,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20216,  pId:  202,  name:"文水县万隆石料厂", myUrl:'/home/echart_jindi'},
//          {id:2021601,  pId:  20216,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021602,  pId:  20216,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021603,  pId:  20216,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021604,  pId:  20216,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20217,  pId:  202,  name:"文水县文宇石料厂", myUrl:'/home/echart_jindi'},
//          {id:2021701,  pId:  20217,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021702,  pId:  20217,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021703,  pId:  20217,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021704,  pId:  20217,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20218,  pId:  202,  name:"文水县鑫利达建筑材料有限公司", myUrl:'/home/echart_jindi'},
//          {id:2021801,  pId:  20218,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021802,  pId:  20218,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021803,  pId:  20218,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021804,  pId:  20218,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20219,  pId:  202,  name:"文水县兴泰建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2021901,  pId:  20219,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2021902,  pId:  20219,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2021903,  pId:  20219,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2021904,  pId:  20219,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20220,  pId:  202,  name:"文水县裕丰石料厂", myUrl:'/home/echart_jindi'},
//          {id:2022001,  pId:  20220,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022002,  pId:  20220,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022003,  pId:  20220,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022004,  pId:  20220,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20221,  pId:  202,  name:"文水县众心石料厂", myUrl:'/home/echart_jindi'},
//          {id:2022101,  pId:  20221,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022102,  pId:  20221,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022103,  pId:  20221,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022104,  pId:  20221,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20222,  pId:  202,  name:"文水县庄头太平石料厂", myUrl:'/home/echart_jindi'},
//          {id:2022201,  pId:  20222,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022202,  pId:  20222,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022203,  pId:  20222,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022204,  pId:  20222,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20223,  pId:  202,  name:"卧虎山石料厂", myUrl:'/home/echart_jindi'},
//          {id:2022301,  pId:  20223,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022302,  pId:  20223,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022303,  pId:  20223,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022304,  pId:  20223,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20224,  pId:  202,  name:"山西省文水县鑫利达建筑材料有限公司石英砂分公司石英岩矿", myUrl:'/home/echart_jindi'},
//          {id:2022401,  pId:  20224,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022402,  pId:  20224,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022403,  pId:  20224,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022404,  pId:  20224,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20225,  pId:  202,  name:"穆家寨新兴砖厂", myUrl:'/home/echart_jindi'},
//          {id:2022501,  pId:  20225,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022502,  pId:  20225,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022503,  pId:  20225,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022504,  pId:  20225,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20226,  pId:  202,  name:"文水县诚源建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2022601,  pId:  20226,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022602,  pId:  20226,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022603,  pId:  20226,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022604,  pId:  20226,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20227,  pId:  202,  name:"文水县恒安兄弟建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2022701,  pId:  20227,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022702,  pId:  20227,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022703,  pId:  20227,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022704,  pId:  20227,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20228,  pId:  202,  name:"文水县嘉威建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2022801,  pId:  20228,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022802,  pId:  20228,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022803,  pId:  20228,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022804,  pId:  20228,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20229,  pId:  202,  name:"文水县金星建材有限公司", myUrl:'/home/echart_jindi'},
//          {id:2022901,  pId:  20229,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2022902,  pId:  20229,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2022903,  pId:  20229,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2022904,  pId:  20229,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:20230,  pId:  202,  name:"文水玉玺平安建筑材料有限公司", myUrl:'/home/echart_jindi'},
//          {id:2023001,  pId:  20230,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:2023002,  pId:  20230,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:2023003,  pId:  20230,  name:"污染源", myUrl:'/home/mes2'},
//          {id:2023004,  pId:  20230,  name:"生态环境", myUrl:'/home/mes_eclo'},
//
//          {id:3, pId:1, name: "柳林县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市柳林县'},
//          {id:301,    pId:  3,    name:"煤矿", myUrl:'/home/mes_meikuang', county:'吕梁市柳林县', region:'煤矿'},
//          {id:30101,  pId:  301,  name:"华晋焦煤有限责任公司（沙曲二矿）", myUrl:'/home/echart_jindi'},
//          {id:3010101,  pId:  30101,  name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010102,  pId:  30101,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010103,  pId:  30101,  name:"污染源", myUrl:'/home/mes2'},
//          {id:3010104,  pId:  30101,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30102, pId: 301, name:"华晋焦煤有限责任公司（沙曲一矿）"},
//          {id:3010201, pId:  30102, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010201, pId:  30102, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010201, pId:  30102, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010201, pId:  30102, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30103, pId: 301, name:"山西东辉集团邓家庄煤业有限公司"},
//          {id:3010301, pId:  30103, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010301, pId:  30103, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010301, pId:  30103, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010301, pId:  30103, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30104, pId: 301, name:"山西东辉集团西坡煤业有限公司"},
//          {id:3010401, pId:  30104, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010401, pId:  30104, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010401, pId:  30104, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010401, pId:  30104, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30105, pId: 301, name:"山西汾西矿业（集团）有限责任公司（贺西煤矿）1"},
//          {id:3010501, pId:  30105, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010501, pId:  30105, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010501, pId:  30105, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010501, pId:  30105, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30106, pId: 301, name:"山西汾西矿业（集团）有限责任公司（双柳煤矿）1"},
//          {id:3010601, pId:  30106, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010601, pId:  30106, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010601, pId:  30106, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010601, pId:  30106, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30107, pId: 301, name:"山西宏盛安泰煤业有限公司"},
//          {id:3010701, pId:  30107, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010701, pId:  30107, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010701, pId:  30107, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010701, pId:  30107, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30108, pId: 301, name:"山西汇丰兴业同德焦煤有限公司"},
//          {id:3010801, pId:  30108, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010801, pId:  30108, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010801, pId:  30108, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010801, pId:  30108, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30109, pId: 301, name:"山西柳林大庄煤矿有限责任公司"},
//          {id:3010901, pId:  30109, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:3010901, pId:  30109, name:"环境质量", myUrl:'/home/mes1'},
//          {id:3010901, pId:  30109, name:"污染源", myUrl:'/home/mes2'},
//          {id:3010901, pId:  30109, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301010, pId: 301, name:"山西柳林宏盛聚德煤业有限公司"},
//          {id:30101001, pId:  301010, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101001, pId:  301010, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101001, pId:  301010, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101001, pId:  301010, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301011, pId: 301, name:"山西柳林汇丰兴业曹家山煤业有限公司"},
//          {id:30101101, pId:  301011, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101101, pId:  301011, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101101, pId:  301011, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101101, pId:  301011, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301012, pId: 301, name:"山西柳林金家庄煤业有限公司"},
//          {id:30101201, pId:  301012, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101201, pId:  301012, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101201, pId:  301012, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101201, pId:  301012, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301013, pId: 301, name:"山西柳林联盛陈家湾煤业有限公司1"},
//          {id:30101301, pId:  301013, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101301, pId:  301013, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101301, pId:  301013, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101301, pId:  301013, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301014, pId: 301, name:"山西柳林联盛郭家山煤业有限公司"},
//          {id:30101401, pId:  301014, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101401, pId:  301014, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101401, pId:  301014, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101401, pId:  301014, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301015, pId: 301, name:"山西柳林联盛龙门塔煤业有限公司"},
//          {id:30101501, pId:  301015, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101501, pId:  301015, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101501, pId:  301015, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101501, pId:  301015, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301016, pId: 301, name:"山西柳林联盛哪哈沟煤业有限公司"},
//          {id:30101601, pId:  301016, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101601, pId:  301016, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101601, pId:  301016, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101601, pId:  301016, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301017, pId: 301, name:"山西柳林凌志成家庄煤业有限公司"},
//          {id:30101701, pId:  301017, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101701, pId:  301017, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101701, pId:  301017, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101701, pId:  301017, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301018, pId: 301, name:"山西柳林凌志柳家庄煤业有限公司"},
//          {id:30101801, pId:  301018, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101801, pId:  301018, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101801, pId:  301018, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101801, pId:  301018, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301019, pId: 301, name:"山西柳林凌志王家焉煤业有限公司"},
//          {id:30101901, pId:  301019, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30101901, pId:  301019, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30101901, pId:  301019, name:"污染源", myUrl:'/home/mes2'},
//          {id:30101901, pId:  301019, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301020, pId: 301, name:"山西柳林凌志兴家沟煤业有限公司"},
//          {id:30102001, pId:  301020, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102001, pId:  301020, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102001, pId:  301020, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102001, pId:  301020, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301021, pId: 301, name:"山西柳林煤矿有限公司"},
//          {id:30102101, pId:  301021, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102101, pId:  301021, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102101, pId:  301021, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102101, pId:  301021, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301022, pId: 301, name:"山西柳林碾焉煤矿有限责任公司"},
//          {id:30102201, pId:  301022, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102201, pId:  301022, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102201, pId:  301022, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102201, pId:  301022, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301023, pId: 301, name:"山西柳林王家沟煤业有限公司"},
//          {id:30102301, pId:  301023, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102301, pId:  301023, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102301, pId:  301023, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102301, pId:  301023, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301024, pId: 301, name:"山西柳林鑫飞贺昌煤业有限公司"},
//          {id:30102401, pId:  301024, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102401, pId:  301024, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102401, pId:  301024, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102401, pId:  301024, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301025, pId: 301, name:"山西柳林鑫飞毛家庄煤业有限公司"},
//          {id:30102501, pId:  301025, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102501, pId:  301025, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102501, pId:  301025, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102501, pId:  301025, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301026, pId: 301, name:"山西柳林鑫飞下山峁煤业有限公司"},
//          {id:30102601, pId:  301026, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102601, pId:  301026, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102601, pId:  301026, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102601, pId:  301026, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301027, pId: 301, name:"山西柳林兴无煤矿有限责任公司"},
//          {id:30102701, pId:  301027, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102701, pId:  301027, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102701, pId:  301027, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102701, pId:  301027, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301028, pId: 301, name:"山西柳林寨崖底煤业有限公司"},
//          {id:30102801, pId:  301028, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102801, pId:  301028, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102801, pId:  301028, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102801, pId:  301028, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301029, pId: 301, name:"山西柳林庄上煤矿有限公司"},
//          {id:30102901, pId:  301029, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30102901, pId:  301029, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30102901, pId:  301029, name:"污染源", myUrl:'/home/mes2'},
//          {id:30102901, pId:  301029, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:301030, pId: 301, name:"山西楼俊集团赵家庄煤业有限公司"},
//          {id:30103001, pId:  301030, name:"基本信息", myUrl:'/home/mes_jindi', county:'吕梁市文水县', region:'煤矿', mineType:'煤矿', content:'矿山基本信息调查表格', company:'山西金地煤焦有限公司赤峪煤矿'},
//          {id:30103001, pId:  301030, name:"环境质量", myUrl:'/home/mes1'},
//          {id:30103001, pId:  301030, name:"污染源", myUrl:'/home/mes2'},
//          {id:30103001, pId:  301030, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:302, pId:3, name:"非煤矿",myUrl:'/home/mes_feimei', county:'吕梁市柳林县', region:'非煤矿山'},
//          {id:30201,  pId:  302,  name:"华润水泥采石场基础信息表", myUrl:'/home/echart_jindi'},
//          {id:3020101,  pId:  30201,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:3020102,  pId:  30201,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:3020103,  pId:  30201,  name:"污染源", myUrl:'/home/mes2'},
//          {id:3020104,  pId:  30201,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30202,  pId:  302,  name:"柳林县森泽昌盛铝业有限公司", myUrl:'/home/echart_jindi'},
//          {id:3020201,  pId:  30202,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:3020202,  pId:  30202,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:3020203,  pId:  30202,  name:"污染源", myUrl:'/home/mes2'},
//          {id:3020204,  pId:  30202,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30203,  pId:  302,  name:"柳林县森泽腾飞铝业有限公司", myUrl:'/home/echart_jindi'},
//          {id:3020301,  pId:  30203,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:3020302,  pId:  30203,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:3020303,  pId:  30203,  name:"污染源", myUrl:'/home/mes2'},
//          {id:3020304,  pId:  30203,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:30204,  pId:  302,  name:"山西晨光铝业有限公司", myUrl:'/home/echart_jindi'},
//          {id:3020401,  pId:  30204,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:3020402,  pId:  30204,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:3020403,  pId:  30204,  name:"污染源", myUrl:'/home/mes2'},
//          {id:3020404,  pId:  30204,  name:"生态环境", myUrl:'/home/mes_eclo'},
//
//          {id:4, pId:1, name: "汾阳市矿山信息管理", myUrl:'/home/map_county', county:'吕梁市汾阳市'},
//          {id:401,    pId:  4,    name:"煤矿", myUrl:'/home/mes_meikuang', county:'吕梁市汾阳市', region:'煤矿'},
//          {id:40101,  pId:  401,  name:"山西汾西正宏煤业有限公司", myUrl:'/home/echart_jindi'},
//          {id:4010101,  pId:  40101,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4010102,  pId:  40101,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4010103,  pId:  40101,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4010104,  pId:  40101,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40102, pId: 401, name:"山西汾西正升煤业有限责任公司"},
//          {id:4010201, pId:  40102, name:"基本信息", myUrl:'/home/mes5',myUrl:'/home/mes_basicelse'},
//          {id:4010201, pId:  40102, name:"环境质量", myUrl:'/home/mes1'},
//          {id:4010201, pId:  40102, name:"污染源", myUrl:'/home/mes2'},
//          {id:4010201, pId:  40102, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40103, pId: 401, name:"山西煤炭运销集团龙峰煤业有限公司"},
//          {id:4010301, pId:  40103, name:"基本信息", myUrl:'/home/mes5',myUrl:'/home/mes_basicelse'},
//          {id:4010301, pId:  40103, name:"环境质量", myUrl:'/home/mes1'},
//          {id:4010301, pId:  40103, name:"污染源", myUrl:'/home/mes2'},
//          {id:4010301, pId:  40103, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40104, pId: 401, name:"山西煤炭运销集团龙山煤业有限公司"},
//          {id:4010401, pId:  40104, name:"基本信息", myUrl:'/home/mes5',myUrl:'/home/mes_basicelse'},
//          {id:4010401, pId:  40104, name:"环境质量", myUrl:'/home/mes1'},
//          {id:4010401, pId:  40104, name:"污染源", myUrl:'/home/mes2'},
//          {id:4010401, pId:  40104, name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:402, pId:4, name:"非煤矿", county:'吕梁市汾阳市', region:'非煤矿', myUrl:'/home/mes_feimei'},
//          {id:40201,  pId:  402,  name:"汾阳市恒基石料厂", myUrl:'/home/echart_jindi'},
//          {id:4020101,  pId:  40201,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020102,  pId:  40201,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020103,  pId:  40201,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020104,  pId:  40201,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40202,  pId:  402,  name:"汾阳市全喜石英石料厂", myUrl:'/home/echart_jindi'},
//          {id:4020201,  pId:  40202,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020202,  pId:  40202,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020203,  pId:  40202,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020204,  pId:  40202,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40203,  pId:  402,  name:"汾阳市水泥有限公司", myUrl:'/home/echart_jindi'},
//          {id:4020301,  pId:  40203,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020302,  pId:  40203,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020303,  pId:  40203,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020304,  pId:  40203,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40204,  pId:  402,  name:"汾阳市向阳俊林白云石矿", myUrl:'/home/echart_jindi'},
//          {id:4020401,  pId:  40204,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020402,  pId:  40204,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020403,  pId:  40204,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020404,  pId:  40204,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40205,  pId:  402,  name:"汾阳市新生石料场", myUrl:'/home/echart_jindi'},
//          {id:4020501,  pId:  40205,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020502,  pId:  40205,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020503,  pId:  40205,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020504,  pId:  40205,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40206,  pId:  402,  name:"汾阳市远峰高钙石灰工业有限公司（蚂蚁河分公司）", myUrl:'/home/echart_jindi'},
//          {id:4020601,  pId:  40206,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020602,  pId:  40206,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020603,  pId:  40206,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020604,  pId:  40206,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40207,  pId:  402,  name:"汾阳市远峰高钙石灰工业有限公司（田家梁分公司", myUrl:'/home/echart_jindi'},
//          {id:4020701,  pId:  40207,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020702,  pId:  40207,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020703,  pId:  40207,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020704,  pId:  40207,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40208,  pId:  402,  name:"山西日晟矿业有限公司", myUrl:'/home/echart_jindi'},
//          {id:4020801,  pId:  40208,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020802,  pId:  40208,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020803,  pId:  40208,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020804,  pId:  40208,  name:"生态环境", myUrl:'/home/mes_eclo'},
//          {id:40209,  pId:  402,  name:"中国铝业股份有限公司山西分公司汾阳武堡铝矿", myUrl:'/home/echart_jindi'},
//          {id:4020901,  pId:  40209,  name:"基本信息", myUrl:'/home/mes_jindi'},
//          {id:4020902,  pId:  40209,  name:"环境质量", myUrl:'/home/mes1'},
//          {id:4020903,  pId:  40209,  name:"污染源", myUrl:'/home/mes2'},
//          {id:4020904,  pId:  40209,  name:"生态环境", myUrl:'/home/mes_eclo'},
//
//          {id:5, pId:1, name: "兴县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市兴县'},
//          {id:501,    pId:  5,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:502, pId:5, name:"非煤矿"},
//
//          {id:6, pId:1, name: "岚县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市岚县'},
//          {id:601,    pId:  6,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:602, pId:6, name:"非煤矿"},
//
//          {id:7, pId:1, name: "临县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市临县'},
//          {id:701,    pId:  7,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:702, pId:7, name:"非煤矿"},
//
//          {id:8, pId:1, name: "方山县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市方山县'},
//          {id:801,    pId:  8,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:802, pId:8, name:"非煤矿"},
//
//          {id:9, pId:1, name: "离石区矿山信息管理", myUrl:'/home/map_county', county:'吕梁市离石区'},
//          {id:901,    pId:  9,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:902, pId:9, name:"非煤矿"},
//
//          {id:10, pId:1, name: "交城县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市交城县'},
//          {id:1001,    pId:  10,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:1002, pId:10, name:"非煤矿"},
//
//          {id:11, pId:1, name: "石楼县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市石楼县'},
//          {id:1101,    pId:  11,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:1102, pId:11, name:"非煤矿"},
//
//          {id:12, pId:1, name: "中阳县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市中阳县'},
//          {id:1201,    pId:  12,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:1202, pId:12, name:"非煤矿"},
//
//          {id:13, pId:1, name: "孝义市矿山信息管理", myUrl:'/home/map_county', county:'吕梁市孝义市'},
//          {id:1301,    pId:  13,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:1302, pId:13, name:"非煤矿"},
//
//          {id:14, pId:1, name: "交口县矿山信息管理", myUrl:'/home/map_county', county:'吕梁市交口县'},
//          {id:1401,    pId:  14,    name:"煤矿", myUrl:'/home/mes_meikuang'},
//          {id:1402, pId:14, name:"非煤矿"},
//
//          {id:15, pId:1, name:"文件上传", myUrl:'/home/upload'},
//
//
//        ]
      }
    },
    methods:{
      onExpand:function(event, treeId, treeNode) {
        var z_tree = [];
        if(Cookies.get('z_tree')){
          z_tree = JSON.parse(Cookies.get('z_tree'));
        }
        z_tree.push(treeNode.id);
        Cookies.set('z_tree',z_tree);
      },
      onCollapse :function(event, treeId, treeNode) {
        var z_tree = [];
        z_tree = JSON.parse(Cookies.get('z_tree'));
        z_tree.splice(z_tree.indexOf(treeNode.id),1);
        Cookies.set('z_tree',z_tree);
      },
      toMes:function(str){
        this.$router.push(str);
      },
      zTreeOnClick:function(event, treeId, treeNode) {
        treeNode.open = !treeNode.open;
//        alert(treeNode.tId + ", " + treeNode.name + "," + treeNode.myUrl);
        this.$router.push({
          path:treeNode.myUrl,
          query:{
            county:treeNode.county,
            region:treeNode.region,
            mineType:treeNode.mineType,
            company:treeNode.company,
            content:treeNode.content
        }}
        )
  }
    },
    mounted(){
    this.$ajax.post('http://'+this.server +':8084/file/getMineInfoAll').then(res =>{
      var oneId;
      var twoId;
      var fId;
      var sId;
      var county;
      for(var i = 0; i < res.data.length; i ++){
        switch(i){
          case 0: oneId = 201;twoId = 202;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市文水县';break;
          case 1: oneId = 301;twoId = 302;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市柳林县';break;
          case 2: oneId = 401;twoId = 402;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市汾阳市';break;
          case 3: oneId = 501;twoId = 502;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市交口县';break;
          case 4: oneId = 601;twoId = 602;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市交城县';break;
          case 5: oneId = 701;twoId = 702;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市临县';break;
          case 6: oneId = 801;twoId = 802;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '兴县';break;
          case 7: oneId = 901;twoId = 902;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市孝义市';break;
          case 8: oneId = 1001;twoId = 1002;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '中阳县';break;
          case 9: oneId = 1101;twoId = 1102;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市文水县';break;
          case 10: oneId = 1201;twoId = 1202;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市文水县';break;
          case 11: oneId = 1301;twoId = 1302;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市文水县';break;
          case 12: oneId = 1401;twoId = 1402;fId = oneId * 100 + 1;sId = twoId * 100 + 1;county = '吕梁市文水县';break;
        }
        for(var j = 0; j < res.data[i].listOne.length; j ++){
          var company = {
            id : fId,
            pId : oneId,
            name : res.data[i].listOne[j].mineName ? res.data[i].listOne[j].mineName : '',
            myUrl : '/home/mes_company',
            county : county,
            region : '煤矿',
            mineType : '煤矿',
            content : '矿山基本信息调查表格',
            company : res.data[i].listOne[j].mineName ? res.data[i].listOne[j].mineName : '',
          }
          this.zNodes.push(company);
          for(var q = 0; q < 4; q ++){//q<5
            var names;
            var myUrl;
            switch(q){
              case 0: names = '基本信息'; myUrl = '/home/mes_jindi'; break;
              case 1: names = '环境质量'; myUrl = '/home/mes1'; break;
              case 2: names = '污染源'; myUrl = '/home/mes2';   break;
              case 3: names = '生态环境'; myUrl = '/home/mes_eclo'; break;
//              case 4: names = '遥感图'; myUrl = '/home/mes_yaogan'; break;
            }
            var temp = {
              id : fId * 100 + q,
              pId : fId,
              name : names,
              myUrl : myUrl,
              county: county,
              region: '煤矿',
              mineType : '煤矿',
              company : res.data[i].listOne[j].mineName ? res.data[i].listOne[j].mineName : '',
            }
            this.zNodes.push(temp);
//            if(q == 4){
//            for(var a = 0; a < 5; a ++){
//              var names;
//              switch(a){
//                case 0: names = '子主题1'; break;
//                case 1: names = '子主题2'; break;
//                case 2: names = '子主题3'; break;
//                case 3: names = '子主题4'; break;
//                case 4: names = '子主题5'; break;
//              }
//              var temp1 = {
//                id : (fId * 100 + 4) * 100 + a,
//                pId : fId * 100 + 4,
//                name : names,
//                myUrl : '/home/test',
//                county: county,
//                region: '煤矿',
//                mineType : '煤矿',
//                company : res.data[i].listOne[j].mineName ? res.data[i].listOne[j].mineName : '',
//              }
//              this.zNodes.push(temp1);
//            }}
          }
          fId ++;
        }
        for(var z = 0; z < res.data[i].listTwo.length; z ++){
          var company = {
            id:'',
            pId:'',
            name:'',
            myUrl:'/home/mes_company',
            county:'',
            region:'',
            mineType:'',
            content:'矿山基本信息调查表格',
            company:''
          }
          company.id = sId;
          company.pId = twoId;
          company.name = res.data[i].listTwo[z].mineName ? res.data[i].listTwo[z].mineName : '';
          company.county = county;
          company.region = '非煤矿山';
          company.mineType = res.data[i].listTwo[z].mineType ? res.data[i].listTwo[z].mineType : '';;
          company.company = res.data[i].listTwo[z].mineName ? res.data[i].listTwo[z].mineName : '';
          this.zNodes.push(company);
          for(var q = 0; q < 4; q ++){//q<5
            var names;
            var myUrl;
            switch(q){
              case 0: names = '基本信息'; myUrl = '/home/mes_jindi'; break;
              case 1: names = '环境质量'; myUrl = '/home/mes1'; break;
              case 2: names = '污染源'; myUrl = '/home/mes2';   break;
              case 3: names = '生态环境'; myUrl = '/home/mes_eclo'; break;
//              case 4: names = '遥感图'; myUrl = '/home/mes_yaogan'; break;
            }
            var temp = {
              id : sId * 100 + q,
              pId : sId,
              name : names,
              myUrl : myUrl,
              county: county,
              region: '非煤矿山',
              mineType : res.data[i].listTwo[z].mineType ? res.data[i].listTwo[z].mineType : '',
              company : res.data[i].listTwo[z].mineName ? res.data[i].listTwo[z].mineName : ''
            }
            this.zNodes.push(temp);
//            if(q == 4){
//              for(var a = 0; a < 5; a ++){
//                var names;
//                switch(a){
//                  case 0: names = '子主题1'; break;
//                  case 1: names = '子主题2'; break;
//                  case 2: names = '子主题3'; break;
//                  case 3: names = '子主题4'; break;
//                  case 4: names = '子主题5'; break;
//                }
//                var temp1 = {
//                  id : (sId * 100 + 4) * 100 + a,
//                  pId : sId * 100 + 4,
//                  name : names,
//                  myUrl : '/home/test',
//                  county: county,
//                  region: '非煤矿山',
//                  mineType : res.data[i].listTwo[z].mineType ? res.data[i].listTwo[z].mineType : '',
//                  company : res.data[i].listTwo[z].mineName ? res.data[i].listTwo[z].mineName : '',
//                }
//                this.zNodes.push(temp1);
//              }}
          }
          sId ++;
        }
      }
      var z_tree = [];
      if(Cookies.get('z_tree')){
        z_tree = JSON.parse(Cookies.get('z_tree'));
        for(var i = 0; i < z_tree.length; i ++){
          for(var j = 0; j < this.zNodes.length; j ++){
            if(this.zNodes[j].id == z_tree[i]){
              this.zNodes[j].open = true;
            }
          }
        }
      }
      $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
    }).catch(error => {
      console.log(error)
    })

  },
  watch: {
    // 利用watch方法检测路由变化：
    '$route': function (to, from) {
      let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
      this.$router.push(NewPage);
      this.$router.go(-1);
    }
  }
  }
</script>

<style>
  @import '../assets/zTreeStyle.css';
  #areaTree{
    border:0px solid #e5e5e5;    margin-bottom: 2px;border-radius: 4px;overflow: hidden;
  }
  .box-title{
    border-radius: 3px 3px 0 0;background-color: #f5f5f5;
  }
  .box-title a{
    color: #2fa4e7;
    text-decoration: none;font-size:14px;    display: block;
    padding: 8px 15px;cursor: pointer;
  }
  .box-title .fa{
    float:right;line-height: 20px;
  }
  .contain{
    display: flex;
  }
  .left{
    width: 15%;
    height: 800px;
    border-right: 1px dotted gray;
  }
  .right{
    width: 85%;
  }


</style>
