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
    mounted() {
    var myChart = echarts.init(this.$refs.myEchart);
    echarts.registerMap("xingxian",{"type":"FeatureCollection", "features": [{"type":"Feature","properties":{"name":"兴县","id":"141123"},"geometry":{"type":"MultiPolygon","coordinates":[[[[111.225291777344,38.6804457832032],[111.243470488281,38.6478627753906],[111.241917753906,38.6285195136719],[111.25271609375,38.6192153144532],[111.262691679688,38.5968617988281],[111.330079375,38.6022768378906],[111.349705839844,38.5794960761719],[111.417345,38.573843],[111.412899199219,38.5682900214844],[111.371214628906,38.559271466797],[111.383011503906,38.5392031074219],[111.380096464844,38.5157582832031],[111.394483671875,38.4524147773438],[111.378053007813,38.4096718574219],[111.450477324219,38.3828981757813],[111.465479765625,38.330356671875],[111.443057890625,38.3124025703125],[111.430679960938,38.2830275703126],[111.359559355469,38.1941005683594],[111.367345,38.1738430000001],[111.355504179688,38.1678530097657],[111.36478640625,38.148843],[111.354295683594,38.127358625],[111.332476835938,38.1163210273438],[111.297345,38.1337844062501],[111.261846953125,38.1161391425782],[111.257345,38.093843],[111.24095828125,38.1074550605469],[111.209444609375,38.1453920722656],[111.21318484375,38.1820803046875],[111.2330090625,38.1985475898438],[111.227728300781,38.2183803535156],[111.192667265625,38.1983010078125],[111.172345,38.2003713203125],[111.147345,38.1978237128906],[111.132345,38.1993520332032],[111.112345,38.1973146796875],[111.083118925781,38.2002931953126],[111.030916777344,38.2378639960938],[111.034427519531,38.2034194160157],[111.001883574219,38.1893056464844],[110.982806425781,38.1783803535156],[110.94095828125,38.1602309394532],[110.902806425781,38.1383803535157],[110.853509550781,38.1274489570313],[110.825113554688,38.1437123847657],[110.772022734375,38.1383010078125],[110.71547,38.1706899238282],[110.692345,38.1683339667969],[110.682345,38.1693520332031],[110.652345,38.1662953925782],[110.601470976563,38.1714809394532],[110.562691679688,38.1993886542969],[110.551910429688,38.1982888007813],[110.547345,38.2138430000001],[110.562569609375,38.2260353828125],[110.573089628906,38.2983071113281],[110.659539824219,38.3091200996094],[110.691790800781,38.3493959785156],[110.74295046875,38.3709535957032],[110.777843046875,38.4537563300781],[110.837345,38.4463552070313],[110.873953886719,38.4509084296875],[110.866932402344,38.507348859375],[110.901519804688,38.5219228339844],[110.913865996094,38.5789882636719],[110.891790800781,38.5882900214844],[110.878709746094,38.6046254707031],[110.884830351563,38.6538210273438],[110.902899199219,38.6682900214844],[110.911790800781,38.6993959785157],[110.917345,38.7138430000001],[110.937345,38.7138430000001],[110.937345,38.723843],[110.944154082031,38.7183901191407],[110.940863066406,38.6919362617188],[110.951890898438,38.6781642890626],[110.979827910156,38.6816396308594],[111.014949980469,38.6559828925782],[111.071790800781,38.6893959785156],[111.102899199219,38.6982900214844],[111.151527128906,38.7268752265625],[111.178968535156,38.7302883125],[111.207345,38.723843],[111.225291777344,38.6804457832032]]]]}}]}
    );
    var option = {
      title:{
        text:'兴县地图',
        left:'center'
      },
      tooltip:{
        trigger:'item',
        formatter:function(){
          var res = '兴县';
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
          name:'xingxian',
          map : "xingxian",
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

