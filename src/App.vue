<template>
  <router-view></router-view>
</template>

<script>
import {rsaPublicKeyApi} from "@/api/api";

export default {
  name: 'App',
  created() {
    this.getRsaKey();
  },
  methods: {
    //获取RSA加密公钥
    getRsaKey: () => {
      rsaPublicKeyApi()
          .then(result => {
            localStorage.setItem("rsa_public_key", result.data);
            console.log(localStorage.getItem("rsa_public_key"));
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
@import "assets/css/base.css";
</style>
