<template>
  <div style="margin-top: 82px"></div>
  <div style="width: 60%; height: 600px">
    <v-md-editor v-model="text" height="100%"></v-md-editor>
  </div>
</template>

<script>
export default {
  name: "AticlePage",
  data() {
    return {
      text: "",
    }
  }
}
</script>

<style scoped>
</style>