<template>
  <!--地图容器-->
  <div class="con">
  <Map_con class="testBMap"></Map_con>
    <div class="contain">
      <table class="table table-striped">
        <tbody>
        <tr>
          <td><b>现存问题</b></td>
          <td><b>面积（km2）</b></td>
        </tr>
        <tr>
          <td>废弃场地</td>
          <td>5.3523</td>
        </tr>
        <tr>
          <td>边坡</td>
          <td>11.701</td>
        </tr>
        <tr>
          <td>采空区</td>
          <td>176.896</td>
        </tr>
        <tr>
          <td>沉陷区</td>
          <td>69.564</td>
        </tr>
        <tr>
          <td>地裂缝</td>
          <td>2.632</td>
        </tr>
        <tr>
          <td>矸石场</td>
          <td>47.659124</td>
        </tr>
        <tr>
          <td>工业场地</td>
          <td>14.903</td>
        </tr>
        <tr>
          <td>采石场</td>
          <td>1.232</td>
        </tr>
        <tr>
          <td>堆煤场</td>
          <td>0.147</td>
        </tr>
        <tr>
          <td>排土场</td>
          <td>15.056</td>
        </tr>
        <tr>
          <td>取土场</td>
          <td>0.239</td>
        </tr>
        <tr>
          <td>露天采场</td>
          <td>26.934</td>
        </tr>
        </tbody>
      </table>
    </div>
  <div id="chart1" ref="chart1">

  </div>
  </div>
</template>
<script>
  import map_conC from './map_con.vue'
  import testBMapC from './testBMap.vue'
  import echarts from 'echarts'
  export default {
    name:'',
    data () {
    return {
      map: null,
      server:this.GLOBAL.serverSrc,
      chart1:null,
    }
  },
  components:{
    Map_con : map_conC
  },
  mounted() {
    var areaName;
    var centerPoint;
    var rank;
    var areaName = '吕梁市';
    var centerPoint = [111.128602,37.521751];
    var rank = 9;
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
  this.chart1 = echarts.init(this.$refs.chart1)
  this.chart1Option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'category',
      data: ['废弃场地', '边坡', '采空区', '沉陷区', '地裂缝', '矸石场', '工业场地','采石场','堆煤场','排土场','取土场','露天采场']
    },
    yAxis: {
      type: 'value',
      name: '面积',
      min: 0,
      max: 180,
      interval: 45,
      axisLabel: {
        formatter: '{value} km2'
      }
    },
    series: [{
      data: [5.3523, 11.701, 176.896, 69.564, 2.632, 47.659124, 14.903, 1.232, 0.147, 15.056, 0.239, 26.934],
      type: 'bar'
    }]
  };

  this.chart1.setOption(this.chart1Option);
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
  html,body,.con,.testBMap{
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    margin: 0;
    font-family: "微软雅黑";
  }
  #chart1 {
    position: absolute;
    width: 60%;
    top: 900px;
    height: 600px;
    left: 40%;
  }
  .contain{
    position: absolute;
    width: 25%;
    top: 900px;
    height: 600px;
  }
</style>
