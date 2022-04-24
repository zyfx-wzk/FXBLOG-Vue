<template>
  <SelfFlag></SelfFlag>
  <div style="height: 2000px;background-color: rgba(255, 255, 255,0.1);"></div>
</template>

<script>
import {imageUrlApi} from "@/api/api";
import SelfFlag from "@/components/SelfFlag"

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
  components: {SelfFlag}
}
</script>

<style scoped lang="less">
</style>