<template>
  <div class="con">
    <div class="echarts left">
      <div :style="{height:'800px',width:'100%'}" ref="myEchart"></div>
    </div>
    <div class="right">
      <div class="echarts">
        <div id="chart1" ref="chart1"></div>
        <div id="chart2" ref="chart2"></div>
        <div id="chart3" ref="chart3"></div>
        <div id="chart4" ref="chart4"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from "echarts";
  export default {
    data:function(){
      return {
        chart1:null,
        county:null,
        meiMes:null,
        feiMes:null,
        coutMes:{
          shaftArea : 0,
          cout : 0,
          designProducePower : 0,
          realProducePower : 0,
          reserves : 0
        },
        server:this.GLOBAL.serverSrc
      }
    },
    mounted() {
    this.initChart();
    var self = this;
    this.$ajax.post('http://'+this.server +':8084/file/selectBasicInfo?county=' + this.county + '&region=煤矿').then(res =>{
      this.meiMes = res.data.list;
      for(var i = 0; i < res.data.list.length; i ++){
        this.coutMes.shaftArea += parseFloat(res.data.list[i].shaftArea);
        this.coutMes.cout ++;
        this.coutMes.designProducePower += parseFloat(res.data.list[i].realProducePower);
        this.coutMes.realProducePower += parseFloat(res.data.list[i].designProducePower);
        this.coutMes.reserves += parseFloat(res.data.list[i].reserves);
      }
      console.log(this.coutMes)
    }).catch(error => {
      console.log(error)
    })
    this.$ajax.post('http://'+this.server +':8084/file/selectBasicInfo?county=' + this.county + '&region=非煤矿山').then(res =>{
      this.feiMes = res.data.list;
    }).catch(error => {
      console.log(error)
    })
    var myChart = echarts.init(this.$refs.myEchart);
    echarts.registerMap("liulin",{"type":"FeatureCollection", "features": [{"type":"Feature","properties":{"name":"柳林县","id":"141125"},"geometry":{"type":"MultiPolygon","coordinates":[[[[110.948631621094,37.6151308417969],[110.96170046875,37.5981996894531],[110.983167753906,37.5894130683594],[110.981033964844,37.5749745917969],[111.008365507813,37.5395644355469],[111.03298953125,37.5294863105469],[111.04170046875,37.5181996894531],[111.05298953125,37.5094863105469],[111.06170046875,37.4981996894532],[111.097345,37.483843],[111.092078886719,37.4627407050781],[111.050240507813,37.4392324042969],[111.081302519531,37.3997414375001],[111.061339140625,37.3698488593751],[111.050689726563,37.3404994941407],[111.016922636719,37.328247296875],[111.003062773438,37.3074025703125],[110.965618925781,37.3168361640625],[110.95982546875,37.293843],[110.96486453125,37.273843],[110.960970488281,37.2583876777344],[110.975831328125,37.2361354804688],[110.938023710938,37.2109950996094],[110.946776152344,37.1762587714844],[110.902345,37.165063703125],[110.881827421875,37.1702333808594],[110.852030058594,37.1467971015626],[110.843350859375,37.159848859375],[110.837345,37.163843],[110.816478300781,37.1782497382813],[110.803260527344,37.2297585273438],[110.787613554688,37.2537856269532],[110.762791777344,37.2376222968751],[110.748992949219,37.2407155585938],[110.731673613281,37.2156301093751],[110.705936308594,37.2214003730469],[110.693016386719,37.2401137519531],[110.681571074219,37.2375490546875],[110.671654082031,37.2640529609375],[110.647345,37.253843],[110.647345,37.273843],[110.683167753906,37.2882717109376],[110.679173613281,37.315298078125],[110.697899199219,37.3463405585938],[110.62298953125,37.3621474433594],[110.63482546875,37.4264601875],[110.657345,37.443843],[110.734454375,37.4494167304688],[110.753150664063,37.4703395820313],[110.752034941406,37.4890444160157],[110.766002226563,37.5279677558594],[110.785496855469,37.5638430000001],[110.772064238281,37.5885622382813],[110.767345,37.6038430000001],[110.792508574219,37.5983547187501],[110.81197390625,37.6092153144532],[110.8527746875,37.6184841132813],[110.851773710938,37.6309560371094],[110.937345,37.623843],[110.948631621094,37.6151308417969]]]]}}]}
    );
    var option = {
      title:{
        text:'柳林县地图',
        left:'center'
      },
      tooltip:{
        trigger:'item',
        formatter:function(){
          var res = '柳林县';
          var info = '';
          switch(res){
            case '兴县' : info = '兴县，隶属于山西省吕梁市，位于山西省西北部，吕梁市北端，东邻岚县、岢岚，南连临县、方山，北倚保德，西隔黄河与陕西省神木县相望，是山西省版图最大的县。兴县面积 3168 平方公里，下7个镇10个乡。兴县属温带气候，四季分明，气温偏低，年均气温8度。已探明的矿种有煤炭、铝土矿、铁矿、硅、煤层气、石墨等23种。兴县早在5000多年前就有人群生息、繁衍，但直到北齐始置蔚汾县，县城在滨临黄河的碧村，后数易县名，至明洪武二年（公元1369年）始称兴县。兴县名人有刘昂、刘海、孙嘉淦、康基田、张旺等。'; break;
            case '岚县' : info = '岚县，隶属山西省吕梁市，位于山西省境中部西侧，吕梁北，忻州南，邻太原，东邻静乐，南连娄烦、方山，西靠兴县，北倚岢岚。岚县海拔较高，地势平坦，号称“天上云间”。岚县属温带大陆性季风气候，气候冷凉。全县最高海拔2275 米，最低海拔1154 米。岚县共探明具有开采价值的矿产资源有煤、铁、锰、大理石、花岗岩等20余种，尤以煤、铁为最。'; break;
            case '临县' : info = '临县，位于黄河中游晋西黄土高原吕梁山西侧，隶属于山西省吕梁市，东屏吕梁山连接方山，西临黄河与陕西佳县、吴堡县隔河相望，北靠兴县，南接离石、柳林。县域面积2979平方公里（2013年），全县总人口65万（2015年），辖23乡镇，是吕梁地区人口最多的县。临县红枣种植面积和产量均居全国之首，2012年被国家林业局命名为“中国红枣之乡”、“中国红枣产业龙头县”。被国家林业局命名为“中国经济林产业示范县”等。'; break;
            case '方山县' : info = '方山县，隶属于山西省吕梁市，位于山西省西部，吕梁山中段西侧。东屏关帝山与娄烦、交城接壤，西依汉高山与临县毗邻，北与兴县、岚县交界，南与离石县相连。方山县历史悠久，早在新石器时代，就有人类繁衍生息。方山县整体地势由北向南倾斜，北川河纵贯南北，最高海拔2831米，最低海拔987米，属黄土丘陵沟壑区。年平均降雨量400-600mm，无霜期90-150天，属温带大陆性气候。'; break;
            case '柳林县' : info = '柳林县位于山西省西部，吕梁山西麓，隶属于山西省吕梁市。东邻离石，西滨黄河，北接临县，南邻中阳、石楼，是黄河沿岸城市之一。柳林县总面积1287.29平方千米（2011年），辖15个乡（镇），257个行政村，人口32.76万人（2011年）。属暖温带大陆性气候，年平均气温10.5℃，年降水量472.3毫米，无霜期平均为199天。柳林县城所在地柳林镇始兴于明，鼎盛于清，因商贾云集、物贸繁盛而享有“小北京”的美誉。'; break;
            case '离石区' : info = '吕梁市离石区地处山西省西部，吕梁山脉中段西侧，地理坐标北纬37°21′——37°42′，东经110°55′——111°35′，自北部顺时针方向分别与方山县、交城县、文水县、汾阳市、中阳县、柳林县、临县等七县市相邻，处于整个吕梁市的地理中心，是吕梁市政府驻地，吕梁市政治、文化和交通中心，同时离石区扼秦晋交通要冲，是华北通向西部的重要中枢。离石区属于温带大陆性气候区，冬寒夏暑，四季分明。全区下辖7个街道、2个镇和3个乡，行政区域总面积1324平方公里，总人口32.49万人（2012年）。'; break;
            case '交城县' : info = '交城县是山西省吕梁市的下辖县，位于吕梁山东麓，山西省中部，晋中盆地西缘，北枕吕梁，南带汾河，东据太原，西临方山、离石。距省城太原51公里，属城郊型通衢热线，是吕梁的东大门，省城太原的近郊县。中国公路主干线307国道绕城而过，大运高速、夏汾高速公路交汇于此，太中银铁路穿境而过。交城县历史悠久，文化灿烂，交城鼓书、交城莲花落具有浓郁的地方特色。2016年12月7日，交城县被列为第三批国家新型城镇化综合试点地区。 [2]  2018年9月26日，交城县荣获2018年“中国天然氧吧”创建地区称号。'; break;
            case '石楼县' : info = '石楼县隶属于山西省吕梁市，位于吕梁山西麓，黄河东岸。东以黄云山、石楼山为界与交口县相邻，南与隰县、永和县接壤；北与中阳县、柳林县毗连；西隔黄河与陕西省清涧县相望。县人民政府驻灵泉镇。2012年下辖4镇5乡134个行政村，总人口11.3万人（2014年），总面积1808平方千米。石楼，因县东有通天山石叠如楼而得名。石楼县矿藏资源较丰富，主要有煤炭、铁矿、铝矾土、天然气等。2012年，全县地区生产总值实现7.19亿元。石楼县著名景点有兴东垣东岳庙、郝氏大院等。石楼县有“红枣之乡"、“文物大县”等之称。'; break;
            case '中阳县' : info = '中阳县隶属于山西省西部，吕梁山脉中段西麓，黄河支流三川河上游的南川河流域。东与汾阳、孝义两市交界，西与柳林、石楼两县接壤，南与交口县相连，北与离石市毗邻。东西45公里，南北47公里，国土总面积1432.9平方公里。总人口15.3万（2013年）。城镇化率60%，居全省第五位，是山西省五个城镇化率超60%的县域城市之一（介休市62.1%，孝义市62%，侯马市61.8%，霍州市60.2%，中阳县60%）。中阳县气候属暖温带亚干旱区大陆性季风气候，平均气温8℃，多年平均降水量518.6毫米，全年日照时数2708.4小时，无霜期平均为143天。中阳县有煤、铁、铝钒土、石英等。中阳县药材类有甘草、茯苓、党参、松籽、山楂、菌类等。2013年，中阳县完成退耕还林47.6万亩，其中退耕地造林14.5万亩。'; break;
            case '交口县' : info = '交口县，隶属于山西省吕梁市，位于山西省西部的吕梁山脉中段，地处吕梁市最南端。交口县是太原盆地沟通晋西南地区的重要通道。交口县介于北纬36°43至37°12和东经111°03至111°34之间，东与孝义、灵石接壤，南与汾西县、隰县相连，西与石楼县相靠，北与中阳县为邻。东西最长距离46公里，南北最长距离53公里。截至2013年，交口县辖4镇3乡，1258平方公里，拥有云梦山胜地、温泉无根碑及大麦郊红军东征纪念馆等县级文物保护单位。'; break;
            case '孝义市' : info = "孝义位于山西省腹地偏西，吕梁山脉中段东麓，太原盆地西南隅。地理坐标东经111°21′ -111°56′，北纬36°56′-37°18′。北与汾阳市毗邻，西北与中阳县相依，西与交口县接壤，南与灵石县相连，东南与介休市隔汾河相望。孝义市属于温带季风气候区，冬寒夏暑，四季分明。全市下辖5个街道、7个镇和5个乡，市境总面积945.8平方千米，总人口49.02万（2014年）。城镇化率62.0%，居山西省各县市第二位。孝义市处于太原经济圈节点，与汾阳、介休共同构成太原经济圈次中心。孝义是山西省县域经济的排头兵，是中国百强县（市）、国家园林城市、国家卫生城市、全国文化先进市、全国生态文明先进市、全国绿化模范市、山西省文明和谐城市、山西省环保模范城市、山西省历史文化名城、山西省宜居城市、山西省22个扩权强县试点县（市）之一。2012年2月24日，以山西孝义城市名命名的“孝义舰”列装南海舰队。"; break;
            case '汾阳市' : info = "汾阳市位于山西省腹地偏西，太原盆地西缘，吕梁山东麓，地理坐标东经111°26'——112°00'22、北纬37°08'——37°29'，东、北部与文水县相邻，东南与平遥县、介休市相交，西南为孝义市，西与中阳县、离石区相连。汾阳市属于温带季风气候区，冬寒夏暑，四季分明。全市下辖5个街道、9个镇和2个乡，市境总面积1179平方公里，总人口43.47万（2017年）。汾阳市素有“秦晋旱码头”之称，市境交通便利，处于太原经济圈节点，与孝义、介休共同构成太原经济圈次中心。汾阳是著名的酒都，是中国最大的清香型白酒生产基地，闻名遐迩的汾酒、竹叶青产地、中华名酒第一村——杏花村就在汾阳。汾阳还是中国县域经济主体功能重点开发区，是中国民间文化艺术之乡、全国文化先进市、全国平原绿化先进市、全国质量兴市先进市、全国食品工业强市、山西省卫生城市、山西省园林城市、山西省文明城市、山西省历史文化名城、山西省体育先进市、山西省城乡清洁示范市、第八届和第十一届中国中部百强县（市）、2013第七届世界核桃大会、2019第二十届比利时布鲁塞尔国际烈性酒大奖赛举办地、山西（汾阳·杏花村）世界酒文化博览会举办地。"; break;
            case '文水县' : info = '文水县隶属于山西省吕梁市，西依吕梁山，东临汾河水，位于汾河谷地中部。文水县东隔汾河与祁县、平遥县相望，南与汾阳市接壤，西与吕梁市离石区交界，北与交城县、清徐县相邻。文水县总面积1064.4平方公里，耕地60万亩，山地平原各半，是山西省的农业县。至2012年，文水县下辖7个镇、5个乡，199个行政村，总人口426285人。'; break;
          }
          var mes = '';
          for(var i = 0, s; s = info[i++];) {
            mes += s;
            if(!(i % 30)) mes += '<br>';
          }
          return res + ':<br>' + mes;

        }
      },
      series : [
        {
          name:'liulin',
          map : "liulin",
          type : "map",
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          }
        }]}
    myChart.setOption(option);
    this.chart1 = echarts.init(this.$refs.chart1)
    var chart1Option = {
      title : {
        text: '柳林县煤矿数量统计',
        x:'center'
      },
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['煤矿', '非煤矿'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'矿场数量',
          type:'bar',
          barWidth: '40%',
          data:[30, 4]
        }
      ]
    }
    this.chart1.setOption(chart1Option);
    this.chart2 = echarts.init(this.$refs.chart2)
    var chart2Option = {
      title : {
        text: '柳林县煤矿面积统计',
        subtext:"单位km2",
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['煤矿','非煤矿']
      },
      series : [
        {
          name: '矿场总面积(km2)',
          type: 'pie',
          radius : '55%',
          center: ['50%', '65%'],
          data:[
            {value:390.3342, name:'煤矿'},
            {value:5.3713, name:'非煤矿'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    this.chart2.setOption(chart2Option);
    this.chart3 = echarts.init(this.$refs.chart3)
    var labelOption = {
      normal: {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      }
    };
    var chart3Option = {
      title : {
        text: '柳林县矿种生产力统计',
        subtext:"单位(万t/a)",
        x:'left'
      },
      color: ['#003366', '#006699', '#4cabce', '#e5323e'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['实际生产力', '设计生产力'],
        orient: 'vertical',
        x:'right'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: ['煤', '非煤矿']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '实际生产力',
          type: 'bar',
          label: labelOption,
          data: [2998.4, 450]
        },
        {
          name: '设计生产力',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          data: [2999.9,450]
        }
      ]
    }
    this.chart3.setOption(chart3Option);
    this.chart4 = echarts.init(this.$refs.chart4)
    var chart4Option = {
      title : {
        text: '柳林县矿种储量统计',
        subtext:"单位万吨",
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        data: ['煤矿','非煤矿']
      },
      series : [
        {
          name: '矿种储量总面积(万吨)',
          type: 'pie',
          radius : '55%',
          center: ['50%', '65%'],
          data:[
            {value:1075031, name:'煤矿'},
            {value:9394.25, name:'非煤矿'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    this.chart4.setOption(chart4Option);
  },
  methods:{
    initChart:function(){
      var meiMes = {
        shaftArea : 0,
        cout : 0,
        designProducePower : 0,
        realProducePower : 0,
        reserves : 0
      };
      var feiMes = {
        shaftArea : 0,
        cout : 0,
        designProducePower : 0,
        realProducePower : 0,
        reserves : 0
      };
      var labelOption = {
        normal: {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      };
      var self = this;
      this.chart1 = echarts.init(this.$refs.chart1)
      this.chart2 = echarts.init(this.$refs.chart2)
      this.chart3 = echarts.init(this.$refs.chart3)
      this.chart4 = echarts.init(this.$refs.chart4)
      this.$ajax.post('http://'+this.server +':8084/file/selectBasicInfo?county=' + this.county + '&region=煤矿').then(res =>{
        this.meiMes = res.data.list;
        console.log(res)
        for(var i = 0; i < res.data.list.length; i ++){
          meiMes.shaftArea += parseFloat(res.data.list[i].shaftArea);
          meiMes.cout ++;
          meiMes.designProducePower += parseFloat(res.data.list[i].realProducePower);
          meiMes.realProducePower += parseFloat(res.data.list[i].designProducePower);
          meiMes.reserves += parseFloat(res.data.list[i].reserves);
        }
        this.chart1.setOption({
          title : {
            text: this.county + '煤矿非煤矿数量统计',
            x:'center'
          },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['煤矿', '非煤矿'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'矿场数量',
              type:'bar',
              barWidth: '40%',
              data:[meiMes.cout, 22]
            }
          ]
        });

        this.chart2.setOption({
          title : {
            text: this.county + '煤矿非煤矿面积统计',
            subtext:"单位km2",
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['煤矿','非煤矿']
          },
          series : [
            {
              name: '矿场总面积(km2)',
              type: 'pie',
              radius : '55%',
              center: ['50%', '65%'],
              data:[
                {value:meiMes.shaftArea, name:'煤矿'},
                {value:35, name:'非煤矿'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });

        this.chart3.setOption({
          title : {
            text: this.county + '煤矿非煤矿生产力统计',
            subtext:"单位(万t/a)",
            x:'left'
          },
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['实际生产力', '设计生产力'],
            orient: 'vertical',
            x:'right'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['煤', '非煤矿']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '实际生产力',
              type: 'bar',
              label: labelOption,
              data: [meiMes.realProducePower, 550]
            },
            {
              name: '设计生产力',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: [meiMes.designProducePower, 550]
            }
          ]
        });

        this.chart4.setOption({
          title : {
            text: this.county + '煤矿非煤矿储量统计',
            subtext:"单位万吨",
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['煤矿','非煤矿']
          },
          series : [
            {
              name: '矿种储量总面积(万吨)',
              type: 'pie',
              radius : '55%',
              center: ['50%', '65%'],
              data:[
                {value:meiMes.reserves, name:'煤矿'},
                {value:8000, name:'非煤矿'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });

      }).catch(error => {
        console.log(error)
      })

    },
  }

  }
</script>
<style scoped>
  .con{
    position: relative;
  }
  .left{
    position: absolute;
    width: 50%;
  }
  .right{
    position: absolute;
    left: 50%;
    width: 49%;
  }
  #chart1{
    position: absolute;
    width: 48%;
    height: 200px;
  }
  #chart2{
    left: 48%;
    position: absolute;
    width: 48%;
    height: 200px;
  }
  #chart3{
    position: absolute;
    width: 48%;
    height: 300px;
    top: 250px;
  }
  #chart4{
    left: 48%;
    top: 250px;
    position: absolute;
    width: 48%;
    height: 200px;
  }
</style>

