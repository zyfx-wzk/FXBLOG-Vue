<template>
  <SelfFlag></SelfFlag>
  <div class="content">
    <BlogList></BlogList>
  </div>
</template>

<script>
import {imageUrlApi} from "@/api/api";
import SelfFlag from "@/components/SelfFlag"
import BlogList from "@/components/BlogList";

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
  components: {BlogList, SelfFlag}
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  justify-content: center;
  Text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>