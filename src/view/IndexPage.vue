<template>
  <div class="backguard-image" :style="{'background-image':`url(${backgroundImage})`}">
    <LayoutHeader></LayoutHeader>
    <LayoutBody></LayoutBody>
    <LayoutBack></LayoutBack>
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<script>
import LayoutHeader from "@/components/layout/LayoutHeader";
import LayoutBody from "@/components/layout/LayoutBody";
import LayoutBack from "@/components/layout/LayoutBack";
import {imageUrlApi, metaDataApi} from "@/api/api";
import LayoutFooter from "@/components/layout/LayoutFooter";
import {loadingClose, loadingCreate} from "@/util/loading";

export default {
  name: "IndexPage",
  data() {
    return {
      backgroundImage: "",
    }
  },
  created() {
    this.loadPage();
    this.getBackground();
    this.getSetting();
  },
  mounted() {

  },
  components: {
    LayoutFooter,
    LayoutBack,
    LayoutBody,
    LayoutHeader
  },
  methods: {
    loadPage() {
      loadingCreate()
      setTimeout(loadingClose, 3000);
    },
    getBackground() {
      imageUrlApi()
          .then((result) => {
            this.backgroundImage = result.data;
          })
    },
    getSetting() {
      metaDataApi("setting", "value")
          .then((result) => {
            this.$store.commit('updateSeting', result.data);
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