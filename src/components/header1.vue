<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <img src="../assets/logo.png" alt=""/>
      </div>

        <ul class="nav navbar-nav navbar-right" v-if="!$store.getters.getName">
          <li><router-link :to="{ path: '/login' }">登录</router-link></li>
          <li><router-link :to="{ path: '/register' }">注册</router-link></li>
        </ul>

        <ul class="nav navbar-nav navbar-right" v-if="$store.getters.getName">
          <li><a>用户名：{{$store.getters.getName}}</a></li>
          <li><a>管理员级别：{{$store.getters.getType}}</a></li>
          <li @click="logout"><router-link :to="{ path: '/login' }">注销</router-link></li>
        </ul>

      <form class="navbar-form navbar-right" v-if="$store.getters.getName">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="请输入查询内容" ref="search">
        </div>
        <button @click="searchBtnYree" class="btn btn-default">查询</button>
        <button @click="reset" class="btn btn-default">重置</button>
      </form>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>
<script>
  import Cookies from 'js-cookie'
    export default{
      data:function(){
        return {
          server:this.GLOBAL.serverSrc
        }
      },
      methods:{
        search: function () {
          this.$ajax.post('http://'+this.server + ':8084/file/excel/pathMatch?matchStr=' + this.$refs.inputvalue.value,{}).then(res =>{
            this.$router.push({
              path:'/home/excel',//跳转路由
              query:{//参数对象
                res:res
              }
            });
          }).catch(error => {
            console.log(error)
          })
        },
        logout: function () {
          this.$store.commit('$_removeStorage');
        },
        searchBtnYree: function () {
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          //经过transformToArray转换后是一个Array数组，数组里的每个元素都是object对象，这个对象里包含了node的21个属性。
          var nodes = zTree.transformToArray(zTree.getNodes()[0].children);
          var key=this.$refs.search.value;
          var z_tree = [];
          //空格回车符 不做查询 直接显示全部
          if(/^\s*$/.test(key)){
            //updateNodes(false);
            zTree.showNodes(nodes);
            alert('请输入搜索条件');
            return;
          }
          //首先隐藏
          zTree.hideNodes(nodes);
          var nodeList=zTree.getNodesByParamFuzzy("name", key); //模糊匹配
          //把得到的节点放到filterNodes临时数组中
          var filterNodes=[];
          for(var i=0;i<nodeList.length;i++){
            nodeList[i].hightlight = true;//设置高亮
            zTree.updateNode(nodeList[i]);
            filterNodes.push(nodeList[i]);
          }
          //显示
          zTree.showNodes(filterNodes);
          //取得每一个节点的父节点，进行展示
          for(var i=0;i<filterNodes.length;i++){
            //展开当前节点
            z_tree.push(filterNodes[i].id);
            zTree.expandNode(filterNodes[i], true, false, true);
            //主要是找不到父节点的问题
            var parentNode = filterNodes[i].getParentNode();
            zTree.showNodes((filterNodes[i]).children);
            //展开当前节点的父节点下的所有节点
            zTree.expandNode(parentNode, true, false, true);
            z_tree.push(parentNode.id);
            //显示所有父节点
            zTree.showNode(parentNode);

            var parentsNode = parentNode.getParentNode();
            zTree.expandNode(parentsNode, true, false, true);
            zTree.showNode(parentsNode);
            z_tree.push(parentsNode.id);
            Cookies.set('z_tree',z_tree);
          }

        },
        reset: function () {
          this.$refs.search.value = '';
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          var nodes = zTree.transformToArray(zTree.getNodes()[0].children);
          for(var i = 1; i < nodes.length; i ++){
            nodes[i].open = false;
          }
          zTree.expandAll(false);
          zTree.expandNode(zTree.getNodes()[0], true, false, true)
          zTree.showNodes(nodes);
          zTree.refresh();
        },
      }
    }
</script>
<style scoped>

</style>
