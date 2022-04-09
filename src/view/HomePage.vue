<template>
  <MyBanner></MyBanner>
</template>

<script>

import {getImageUrl} from "@/api/api";
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
    getImageUrl()
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