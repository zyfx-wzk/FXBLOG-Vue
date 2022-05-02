<template>
  <div class="backguard" v-show="this.hidden"
       :style="{'background-image':`url(${backgroundImage})`}">
    <LayoutHeader></LayoutHeader>
    <LayoutBody></LayoutBody>
    <LayoutBack></LayoutBack>
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<script>
import LayoutFooter from "@/components/layout/LayoutFooter";
import LayoutHeader from "@/components/layout/LayoutHeader";
import LayoutBody from "@/components/layout/LayoutBody";
import {imageUrlApi, metaDataApi} from "@/api/api";
import {loadingClose, loadingCreate} from "@/util/loading";
import LayoutBack from "@/components/layout/LayoutBack";

export default {
  name: "IndexPage",
  data() {
    return {
      hidden: false,
      backgroundImage: "",
    }
  },
  created() {
    this.loadPage();
    this.getBackground();
    this.getSetting();
  },
  components: {
    LayoutBack,
    LayoutFooter,
    LayoutBody,
    LayoutHeader
  },
  methods: {
    loadPage() {
      loadingCreate(2);
      setTimeout(() => {
        this.hidden = true;
      }, 300)
    },
    getBackground() {
      imageUrlApi()
          .then((result) => {
            let image = new Image();
            image.src = result.data;
            image.onload = () => {
              this.backgroundImage = result.data;
              loadingClose();
            }
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
.backguard {
  min-height: calc(100vh);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: 0 100%;
}
</style>