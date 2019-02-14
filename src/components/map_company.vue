<template>
  <!--地图容器-->
  <div id="testBMap" class="testBMap"></div>
</template>
<script>
  import testBMapC from './testBMap.vue'
  export default {
    name:'',
    props:{
      company:String,
      county:String
    },
    data () {
    return {
      colors:{
        '灌木林地': "#a93800",
        '有林地':"#a80000",
        '旱地':"#a87001",
        '城镇用地':"#9ebcd8",
        '采矿场':"#9c9c9c",
        '交通用地':"#d7b19e",
      },
      map: null,
      server:this.GLOBAL.serverSrc
    }
  },
  mounted() {
    var areaName;
    var centerPoint;
    switch(this.county){
      case '吕梁市文水县': areaName = '文水县';centerPoint = [111.93801848803886, 37.455207363885176];break;
      case '吕梁市柳林县': areaName = '柳林县';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市汾阳市': areaName = '汾阳市';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市交口县': areaName = '交口县';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市交城县': areaName = '交城县';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市临县': areaName = '临县';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市兴县': areaName = '兴县';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市孝义市': areaName = '孝义市';centerPoint = [111.93801848803886, 37.432807363885176];break;
      case '吕梁市中阳县': areaName = '中阳县';centerPoint = [111.93801848803886, 37.432807363885176];break;
    }
    var map = new BMap.Map('testBMap',{mapType: BMAP_HYBRID_MAP});
    this.map = map;
    var point = new BMap.Point( centerPoint[0], centerPoint[1] );
    map.centerAndZoom(point, 13);
    map.enableScrollWheelZoom(true);
    var pStart = new BMap.Point(116.392214,39.918985);
    var pEnd = new BMap.Point(116.41478,39.911901);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    this.$ajax.post('http://'+this.server +':8084/file/getGeoJson?shpPath=def').then(res => {
    for(var i = 0; i < res.data.features.length; i ++){
      console.log(i)
      var color;
      for(var index in this.colors){
        if(res.data.features[i].properties.类型 == index){
          color = this.colors[index]
        }
      }
      var points = [];
      for(var j = 0; j < res.data.features[i].geometry.coordinates.length; j ++){
        for(var z = 0; z < res.data.features[i].geometry.coordinates[j].length; z ++){
          points.push(new BMap.Point( res.data.features[i].geometry.coordinates[j][z][0],res.data.features[i].geometry.coordinates[j][z][1]));
        }
      }
      var polygon = new BMap.Polygon(points, {strokeColor:"transparent", strokeWeight:2, strokeOpacity:1,fillColor: color});
      this.map.addOverlay(polygon);
//      map.setCenter(point)
    }


  }).catch(err => {

  })
  var bdary = new BMap.Boundary();
  bdary.get(areaName, function(rs){       //获取行政区域
//      map.clearOverlays();        //清除地图覆盖物
    var count = rs.boundaries.length; //行政区域的点有多少个
    for(var i = 0; i < count; i++) {
      var ply = new BMap.Polygon(rs.boundaries[i],
        {
          strokeWeight: 4, //设置多边形边线线粗
          strokeOpacity: 1, //设置多边形边线透明度0-1
          StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
          strokeColor: "red", //设置多边形边线颜色
          fillColor: "#00ffff", //设置多边形填充颜色
          fillOpacity: 0.01 //设置多边形填充颜色透明度0-1  注：标红的地放你们可以去掉看一下效果，自己体验一下
        }); //建立多边形覆盖物
      map.addOverlay(ply);  //添加覆盖物
//        map.setViewport(ply.getPath());    //调整视野
    }})
  // 定义一个控件类,即function
  function ZoomControl(){
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(10, 600);
  }

  // 通过JavaScript的prototype属性继承于BMap.Control
  ZoomControl.prototype = new BMap.Control();

  // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
  // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
  ZoomControl.prototype.initialize = function(map){
    // 创建一个DOM元素
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #d7b19e; display: inline-block;'></div>").appendTo(div1);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>交通用地</span>").appendTo(div1);
    var div2 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #9c9c9c; display: inline-block;'></div>").appendTo(div2);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>采矿场</span>").appendTo(div2);
    var div3 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #9ebcd8; display: inline-block;'></div>").appendTo(div3);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>城镇用地</span>").appendTo(div3);
    var div4 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #a87001; display: inline-block;'></div>").appendTo(div4);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>旱地</span>").appendTo(div4);
    var div5 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #a80000; display: inline-block;'></div>").appendTo(div5);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>有林地</span>").appendTo(div5);
    var div6 = document.createElement("div");
    $("<div style='width: 50px;height: 20px;background: #a93800; display: inline-block;'></div>").appendTo(div6);
    $("<span style='margin-left: 10px;line-height: 20px;display: inline-block;'>灌木林地</span>").appendTo(div6);
    // 添加文字说明
    div.appendChild(document.createTextNode("山西金地煤焦有限公司文水石灰岩料场"));
    div.appendChild(div1)
    div.appendChild(div2)
    div.appendChild(div3)
    div.appendChild(div4)
    div.appendChild(div5)
    div.appendChild(div6)
    // 设置样式
    div.style.cursor = "pointer";
    div.style.border = "1px solid gray";
    div.style.backgroundColor = "white";
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    // 将DOM元素返回
    return div;
  }
  // 创建控件
  var myZoomCtrl = new ZoomControl();
  // 添加到地图当中
  map.addControl(myZoomCtrl);


  },
  methods:{
    getColor:function(){
      var r=Math.floor(Math.random()*256);
      var g=Math.floor(Math.random()*256);
      var b=Math.floor(Math.random()*256);
      return "rgb("+r+','+g+','+b+")";
    },
    getCenterPoint:function(path) {

      var x = 0.0;
      var y = 0.0;
      for(var i=0;i<path.length;i++){
        x=x+ parseFloat(path[i].lng);
        y=y+ parseFloat(path[i].lat);
      }
      x=x/path.length;
      y=y/path.length;
      return new BMap.Point(x,y);

    }

  }
  }
</script>
<style scoped>
  html,body,.testBMap{
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
