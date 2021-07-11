<template>
  <div id="app">
    <headerNav></headerNav>
    <router-view></router-view>
    <footerNav></footerNav>
  </div>
</template>

<script>
import headerNav from './components/header-nav.vue'
import footerNav from './components/footer-nav.vue'
export default {
  name: 'App',
  components: {
    headerNav,
    footerNav
  }
}
</script>

<style>

</style>
