<template>
  <MyBanner></MyBanner>
  <div style="height: 2000px;background-color: rgba(255, 255, 255,0.1);"></div>
</template>

<script>

import {imageUrlApi} from "@/api/api";
import MyBanner from "@/components/MyBanner";

export default {
  name: "HomePage",
  data() {
    return {
      backgroundImage: "",
      url: []
    }
  },
  mounted() {
    imageUrlApi()
        .then((result) => {
          this.backgroundImage = result.data;
        })
  },
  methods: {},
  components: {MyBanner}
}
</script>

<style scoped lang="less">
</style>