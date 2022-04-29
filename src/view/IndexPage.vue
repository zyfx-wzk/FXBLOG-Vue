<template>
  <div class="backguard-image" :class="{'hover':this.isHover}" :style="{'background-image':`url(${backgroundImage})`}">
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
      isHover: true,
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
      loadingCreate(2);
      setTimeout(() => {
        this.isHover = false
      }, 500)
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
.hover {
  display: none;
}

.backguard-image {
  min-height: calc(100vh - 82px);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: 0 100%;
}
</style>