<template>
  <div class="article-box">
    <div style="width: 70%; max-width: 900px;">
      <ArticleDisplay></ArticleDisplay>
    </div>
  </div>
</template>

<script>
import ArticleDisplay from "@/components/external/ArticleDisplay";

export default {
  name: "AticlePage",
  components: {ArticleDisplay},
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.article-box {
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255,0.1);
}
</style>