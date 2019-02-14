import Vue from 'vue'
import Router from 'vue-router'
import Body from '../components/body.vue'
import Home from '../components/home.vue'
import Login from  '../components/login.vue'
import Tables from '../components/tables.vue'
import Charts from '../components/charts.vue'
import Register from '../components/regeister.vue'
import Mes from '../components/mes.vue'
import P404 from '../components/p404.vue'
import Map_wenshui from '../components/map_wenshui.vue'
import Mes1 from '../components/mes1.vue'
import Mes2 from '../components/mes2.vue'
import Mes3 from '../components/mes3.vue'
import Mes4 from '../components/mes4.vue'
import Mes5 from '../components/mes5.vue'
import Mes6 from '../components/mes6.vue'
import Mes7 from '../components/mes7.vue'
import Mes8 from '../components/mes8.vue'
import Mes9 from '../components/mes9.vue'
import Mes10 from '../components/mes10.vue'
import Mes11 from '../components/mes11.vue'
import Mes12 from '../components/mes12.vue'
import Mes13 from '../components/mes13.vue'
import Mes14 from '../components/mes14.vue'
import Img from '../components/img.vue'
import Img1 from '../components/img1.vue'
import Img2 from '../components/img2.vue'
import Img3 from '../components/img3.vue'
import Img4 from '../components/img4.vue'
import Map from '../components/map.vue'
import Excel from '../components/excel.vue'
import Menu from '../components/menu.vue'
import Map_xingxian from '../components/map_xingxian.vue'
import Map_jiaocheng from '../components/map_jiaocheng.vue'
import Map_fangshan from '../components/map_fangshan.vue'
import Map_fenyang from '../components/map_fenyang.vue'
import Map_jiaokou from '../components/map_jiaokou.vue'
import Map_lishi from '../components/map_lishi.vue'
import Map_linxian from '../components/map_linxian.vue'
import Map_liulin from '../components/map_liulin.vue'
import Map_shilou from '../components/map_shilou.vue'
import Map_xiaoyi from '../components/map_xiaoyi.vue'
import Map_zhongyang from '../components/map_zhongyang.vue'
import Map_lanxian from '../components/map_lanxian.vue'
import Map_county from '../components/map_county.vue'
import Mes_meikuang from '../components/mes_meikuang.vue'
import Mes_feimei from '../components/mes_feimei.vue'
import Mes_jindi from '../components/mes_jindi.vue'
import Mes_company from '../components/mes_company.vue'
import Echart_jindi from '../components/echart_jindi.vue'
import Mes_jibenfeimeikuang from '../components/mes_jibenfeimeikuang.vue'
import Mes_eclo from '../components/mes_eclo.vue'
import Upload from '../components/upload.vue'
import Fileupload from '../components/fileupload.vue'
import Loading from '../components/loading.vue'
import testBMap from '../components/testBMap.vue'
import Mes_xianyu from '../components/mes_xianyu.vue'
import Map_con from '../components/map_con.vue'
import Mes_con from '../components/mes_con.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/home',component:Menu,meta:{requireAuth:true},redirect:'/home/map',children:[
      {path:'map',component:Mes_con, name:'home/map'},
      {path:'tables',component:Tables,meta:{requireAuth:true}},
      {path:'map1',component:Map},
      {path:'map_county',component:Map_county},
      {path:'map_wenshui',component:Map_wenshui},
      {path:'map_xingxian', component:Map_xingxian},
      {path:'map_jiaocheng', component:Map_jiaocheng},
      {path:'map_fangshan', component:Map_fangshan},
      {path:'map_fenyang', component:Map_fenyang},
      {path:'map_jiaokou', component:Map_jiaokou},
      {path:'map_lishi', component:Map_lishi},
      {path:'map_linxian', component:Map_linxian},
      {path:'map_liulin', component:Map_liulin},
      {path:'map_shilou', component:Map_shilou},
      {path:'map_xiaoyi', component:Map_xiaoyi},
      {path:'map_zhongyang', component:Map_zhongyang},
      {path:'map_lanxian', component:Map_lanxian},
      {path:'charts',component:Charts,meta:{requireAuth:true}},
      {path:'echart_jindi', component:Echart_jindi},
      {path:'test', component:testBMap},
      {path:'mes_xianyu', component:Mes_xianyu},
      {path:'upload', component:Upload},
      {path:'load', component:Loading},
      {path:'mes',component:Mes},
      {path:'mes1',component:Mes1},
      {path:'mes2',component:Mes2},
      {path:'mes3',component:Mes3},
      {path:'mes4',component:Mes4},
      {path:'mes5',component:Mes5},
      {path:'mes6',component:Mes6},
      {path:'mes7',component:Mes7},
      {path:'mes8',component:Mes8},
      {path:'mes9',component:Mes9},
      {path:'mes10',component:Mes10},
      {path:'mes11',component:Mes11},
      {path:'mes12',component:Mes12},
      {path:'mes13',component:Mes13},
      {path:'mes14',component:Mes14},
      {path:'mes_eclo', component:Mes_eclo},
      {path:'mes_meikuang',component:Mes_meikuang},
      {path:'mes_feimei',component:Mes_feimei},
      {path:'mes_company', component:Mes_company},
      {path:'mes_jindi',component:Mes_jindi},
      {path:'mes_basicelse',component:Mes_jibenfeimeikuang},
      {path:'img',component:Img},
      {path:'img1',component:Img1},
      {path:'img2',component:Img2},
      {path:'img3',component:Img3},
      {path:'img4',component:Img4},
      {path:'echarts', component:Charts},
      {path:'maps',component:Map},
      {path:'excel',component:Excel},
      {path:'map_con', component: Mes_con}
    ]}
  ]
})
