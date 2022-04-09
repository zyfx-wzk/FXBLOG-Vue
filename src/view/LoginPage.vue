<template>
  <div class="body">
    <div class="loginBox">
      <h2>LOGIN</h2>
      <div class="item">
        <input type="text" v-model="loginInfo.username" required>
        <label>账号</label>
      </div>
      <div class="item">
        <input type="password" v-model="loginInfo.password" required>
        <label>密码</label>
      </div>
      <button class="btn" id="left" @click="back" style="left: 10%">
        return<span/><span/><span/><span/>
      </button>
      <button class="btn" id="right" @click="login" style="left: 25%;">
        submit<span/><span/><span/><span/>
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import {login} from "@/api/api";

export default {
  name: 'LoginBox',
  data() {
    return {
      loginInfo: {
        username: '',
        password: '',
        remember: true
      }
    }
  },
  methods: {
    login() {
      let data = this.loginInfo;
      login(data)
          .then((result) => {
            //成功登录则保存token并跳转到主页面
            localStorage.setItem("token", result.data);
            router.push("/index");
          })
          .catch(() => {
          })
    },
    back() {
      router.push("/index");
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

input, button {
  background: transparent;
  border: 0;
  outline: none;
}

.body {
  height: 100vh;
  background: linear-gradient(#141e30, #243b55);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #03e9f4;
}

.loginBox {
  width: 400px;
  height: 364px;
  background-color: #0c1622;
  margin: 100px auto;
  border-radius: 10px;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
  padding: 40px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  color: aliceblue;
  margin-bottom: 30px;
  font-size: x-large;
  font-family: 'Courier New', Courier, monospace;
}

.item {
  height: 45px;
  border-bottom: 1px solid #fff;
  margin-bottom: 40px;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    color: #fff;
    padding-top: 20px;
    box-sizing: border-box;

    &:focus + label, &:valid + label {
      top: 0;
      font-size: 2px;
    }
  }

  label {
    position: absolute;
    left: 0;
    top: 12px;
    transition: all 0.25s linear;
    font-size: 16px;
    font-family: 宋体, serif;
  }
}

.btn {
  padding: 10px 20px;
  margin-top: 15px;
  color: #03e9f4;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    border-radius: 5px;
    color: #fff;
    background: #03e9f4;
    box-shadow: 0 0 5px 0 #03e9f4,
    0 0 25px 0 #03e9f4,
    0 0 50px 0 #03e9f4,
    0 0 100px 0 #03e9f4;
    transition: all 1s linear;
  }

  & > span {
    position: absolute;

    &:nth-child(1) {
      width: 100%;
      height: 1px;
      background: -webkit-linear-gradient(left, transparent, #03e9f4);
      left: -100%;
      top: 0;
      animation: line1 1s linear infinite;
    }

    &:nth-child(2) {
      width: 1px;
      height: 100%;
      background: -webkit-linear-gradient(top, transparent, #03e9f4);
      right: 0;
      top: -100%;
      animation: line2 1s 0.25s linear infinite;
    }

    &:nth-child(3) {
      width: 100%;
      height: 1px;
      background: -webkit-linear-gradient(left, #03e9f4, transparent);
      left: 100%;
      bottom: 0;
      animation: line3 1s 0.75s linear infinite;
    }

    &:nth-child(4) {
      width: 1px;
      height: 100%;
      background: -webkit-linear-gradient(top, transparent, #03e9f4);
      left: 0;
      top: 100%;
      animation: line4 1s 1s linear infinite;
    }

  }
}


@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}

@keyframes line2 {
  50%,
  100% {
    top: 100%;
  }
}

@keyframes line3 {
  50%,
  100% {
    left: -100%;
  }
}

@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
</style>
