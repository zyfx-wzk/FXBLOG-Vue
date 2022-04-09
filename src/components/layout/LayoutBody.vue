<template>
  <div style="height: 83px"><span/></div>
  <div id="layout-body">
    <router-view></router-view>
  </div>
  <div style="height: 2000px"></div>
</template>

<script>
export default {
  name: "LayoutBody"
}
</script>

<style scoped>
#layout-body {
  padding: 0 80px;
}
</style>