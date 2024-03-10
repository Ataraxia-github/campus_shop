<template>
  <div id="app">
    <HeaderTop v-show="$route.meta.showHeaderTop"></HeaderTop>
    <HeaderSearch v-show="$route.meta.showHeaderSearch"></HeaderSearch>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <HeaderFoot v-show="$route.meta.showHeaderFoot"></HeaderFoot>
  </div>
</template>

<script>
// 全局组件
import HeaderTop from './components/HeaderTop'
import HeaderSearch from './components/HeaderSearch'
import HeaderFoot from './components/HeaderFoot'

export default {
  name: 'App',
  components: {
    HeaderTop,
    HeaderSearch,
    HeaderFoot
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: relative;
  list-style: none;
}
</style>
