<template>
  <router-view></router-view>
</template>

<script>
import {rsaPublicKeyApi} from "@/api/api";
import {loadingCreate} from "@/util/loading";
import {getRsaKey} from "@/util/encrypt";

export default {
  name: 'App',
  mounted() {
    getRsaKey();
  },
  methods: {}
}
</script>

<style scoped>
@import "assets/css/base.css";
</style>
