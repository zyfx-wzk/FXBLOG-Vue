<template>
  <LayoutHeader></LayoutHeader>
  <div class="backguard-image" :style="{'background-image':`url(${backgroundImage})`}">
    <LayoutBody></LayoutBody>
    <LayoutBack></LayoutBack>
  </div>
</template>

<script>
import LayoutHeader from "@/components/layout/LayoutHeader";
import LayoutBody from "@/components/layout/LayoutBody";
import LayoutBack from "@/components/layout/LayoutBack";
import {getImageUrl} from "@/api/api";

export default {
  name: "IndexPage",
  data() {
    return {
      backgroundImage: "",
    }
  },
  created() {
    this.getBackground();
  },
  components: {
    LayoutBack,
    LayoutBody,
    LayoutHeader
  },
  methods: {
    getBackground() {
      getImageUrl()
          .then((result) => {
            this.backgroundImage = result.data;
          })
    }
  }
}
</script>

<style scoped>
.backguard-image {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: 0 100%;
}
</style>