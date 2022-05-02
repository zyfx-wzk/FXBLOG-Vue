<template>
  <router-view></router-view>
</template>

<script>
import {rsaPublicKeyApi} from "@/api/api";
import {loadingCreate} from "@/util/loading";

export default {
  name: 'App',
  methods: {
  }
}
</script>

<style scoped>
@import "assets/css/base.css";
</style>
