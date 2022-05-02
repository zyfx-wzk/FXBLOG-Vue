<template>
  <div class="back-to-top cd-top faa-float animated cd-is-visible" style="top: -900px;"></div>
</template>

<script>
export default {
  name: "LayoutBack",
  created() {
  },
  mounted() {
    this.backTop();
  },
  methods: {
    backTop() {
      //scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
      $(window).scroll(() => {
        //滚动的高度
        const scrollHeight = $(window).scrollTop();
        const top = scrollHeight > 500 ? '-200' : '-999';
        $('.back-to-top').css('top', top + 'px');
      })
      /*点击返回顶部*/
      $('.back-to-top').click(() => {
        $('body,html').animate({
          scrollTop: 0
        }, 0);
      })
    }
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/zyfx-wzk/Static/static/css/szgotop.css');
</style>