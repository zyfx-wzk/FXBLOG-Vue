import axios from "axios"
import router from "@/router/router";
import message from "@/util/message";
import encrypt from "@/util/rsa";
import {loadingClose, loadingCreate} from "@/util/loading";
// axios的初始配置
const http = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

//请求拦截
http.interceptors.request.use(config => {
    loadingCreate();
    //序列化处理POST请求携带的数据
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data);
    }
    let token = localStorage.getItem("token");
    //需要登录的接口
    let needToken = ["/test"]
    if (needToken.includes(config.url)) {
        config.headers.token = token
    }
    //需要RSA加密的接口
    let needRSA = ["/login"]
    if (needRSA.includes(config.url)) {
        let publicKey = localStorage.getItem("rsa_public_key");
        alert(config.data);
        config.data = encrypt(publicKey, config.data);
    }
    return config;
})

//响应拦截
http.interceptors.response.use(result => {
    loadingClose()
    switch (result.data.status) {
        //正常响应
        case 200:
            return result.data;
        //未登录,缺少对应权限
        case 401:
            message.centerMessage(result.data.message, 'error');
            router.push("/login");
            break;
        //账号或密码错误
        case 402:
            message.centerMessage(result.data.message, 'error');
            break;
    }
}, (error => {
    loadingClose()
    message.centerMessage("远程资源请求失败,请检查网络后重试", 'error')
    console.log(error);
}))

export default http;