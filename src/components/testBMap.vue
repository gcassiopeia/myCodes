<template>
  <!--地图容器-->
  <div id="testBMap" class="testBMap"></div>
</template>
<script>
  import testBMapC from './testBMap.vue'
  export default {
    name:'',
    props:{
      county:String
    },
    data () {
    return {
      map: null,
      server:this.GLOBAL.serverSrc
    }
  },
  mounted() {
    console.log(this.county)
    var areaName;
    var centerPoint;
    var rank;
    switch(this.county){
      case '吕梁市文水县': areaName = '文水县';centerPoint = [111.93801848803886, 37.432807363885176];rank = 12;break;
      case '吕梁市柳林县': areaName = '柳林县';centerPoint = [110.893668,37.438242];rank = 11;break;
      case '吕梁市汾阳市': areaName = '汾阳市';centerPoint = [111.751447,37.329101];rank = 12;break;
      case '吕梁市交口县': areaName = '交口县';centerPoint = [111.270505,36.992025];rank = 11;break;
      case '吕梁市交城县': areaName = '交城县';centerPoint = [111.857866,37.667383];rank = 11;break;
      case '吕梁市临县': areaName = '临县';centerPoint = [110.90301,37.907665];rank = 11;break;
      case '吕梁市兴县': areaName = '兴县';centerPoint = [111.092096,38.437446];rank = 11;break;
      case '吕梁市孝义市': areaName = '孝义市';centerPoint = [111.62273,37.135525];rank = 12;break;
      case '吕梁市中阳县': areaName = '中阳县';centerPoint = [111.182752,37.303789];rank = 11;break;

    }
   var map = new BMap.Map('testBMap',{mapType: BMAP_HYBRID_MAP});
    this.map = map;
    var point = new BMap.Point( centerPoint[0], centerPoint[1] );
    map.centerAndZoom(point, rank);
    map.enableScrollWheelZoom(true);
    var pStart = new BMap.Point(116.392214,39.918985);
    var pEnd = new BMap.Point(116.41478,39.911901);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    this.$ajax.post('http://'+this.server +':8084/file/getGeoJson?shpPath=def').then(res => {
      console.log(res.data)
    var color = this.getColor();
      for(var i = 0; i < res.data.features.length; i ++){
        var points = [];
          for(var j = 0; j < res.data.features[i].geometry.coordinates.length; j ++){
            for(var z = 0; z < res.data.features[i].geometry.coordinates[j].length; z ++){
              points.push(new BMap.Point( res.data.features[i].geometry.coordinates[j][z][0],res.data.features[i].geometry.coordinates[j][z][1]));
            }
          }
        var polygon = new BMap.Polygon(points, {strokeColor:"transparent", strokeWeight:2, strokeOpacity:1,fillColor: color});
        this.map.addOverlay(polygon);
        var point = this.getCenterPoint(polygon.getPath());
        var label = new BMap.Label(res.data.features[0].properties.矿山名称,{offset:new BMap.Size(-40,-25), position:point});
        label.setStyle(  {color : "#000", fontSize : "14px", backgroundColor :"0.05",border :"0", fontWeight :"bold" });
        polygon.addEventListener('mouseover',function(){map.addOverlay(label)});
        polygon.addEventListener('mouseout',function(){map.removeOverlay(label)})
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
