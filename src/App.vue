
<template>
  <div id="app">
    <Header1></Header1>
    <router-view/>
  </div>
</template>

<script>
  import store from './store.js'
  import HeaderC from './components/header.vue'
  import FooterC from './components/footer.vue'
  import Header1C from './components/header1.vue'
export default {
  name: 'App',
  components:{
    Header : HeaderC,
    Footer : FooterC,
    Header1 : Header1C
  },
  created:function(){
       this.$store.commit('$_removeStorage')

}}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
  .anchorBL{
    display:none;
  }
</style>
