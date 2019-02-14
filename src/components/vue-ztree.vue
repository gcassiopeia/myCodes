<template>
  <div style="display:flex;flex:2">
    <div style="flex:1">
      <div style="width: 280px;" v-if="ztreeDataSource.length>0">
        <vue-ztree :list.sync="ztreeDataSource" :func="null" :expand="null" :is-open="false"></vue-ztree>
      </div>
    </div>
    <div style="flex:1">
      <div style="width: 280px;" v-if="ztreeDataSourceSync.length>0">
        <vue-ztree :list.sync="ztreeDataSourceSync" :func='nodeClick' :expand="expandClick" :is-open="false"></vue-ztree>
      </div>
    </div>
  </div>
</template>
<script>
  import vueZtree from '../components/vue-ztree.vue'

    export default{
      data:function(){
        return {
          ztreeDataSource:[],
          ztreeDataSourceSync:[{}]
        }
      },
      methods:{
        //点击节点
        nodeClick:function(m){
          console.log(JSON.parse(JSON.stringify(m)));
        },
        //点击展开收起
        expandClick: function (m) {

        }
      }
    }
</script>
<style scoped>

</style>
