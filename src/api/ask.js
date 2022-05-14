import axios from "axios"
import router from "@/router/router";
import message from "@/util/message";
import {loadingClose, loadingCreate} from "@/util/loading";
import {encrypt} from "@/util/encrypt";
// axios的初始配置
const ask = axios.create({
    baseURL: 'https://www.zhuiyifanxing.top',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
//需要登录的接口
let needToken = ["/test"]
//需要RSA加密的接口
let needRSA = ["/login"]
//不造成页面迟滞或者特殊加载方式的接口
let noLoad = ["/get/rsa"]

//请求拦截
ask.interceptors.request.use(config => {
    //序列化处理POST请求携带的数据
    if (config.method === 'post') {
        console.log(config)
        config.data = JSON.stringify(config.data);
        if (needRSA.includes(config.url)) {
            config.data = encrypt(config.data);
        }
    }
    //对特殊接口的处理
    const token = localStorage.getItem("token");
    if (needToken.includes(config.url)) {
        config.headers.token = token;
    }
    if (!noLoad.includes(config.url)) {
        loadingCreate();
    }
    return config;
})

//响应拦截
ask.interceptors.response.use(result => {
    loadingClose()
    switch (result.data.status) {
        //正常响应
        case 200:
            return result.data;
        //未登录,缺少对应权限
        case 401:
            message.centerMessage(result.data.message, 'error');
            break;
        default:
            message.centerMessage(result.data.message, 'warn');
    }
}, (error => {
    loadingClose()
    message.centerMessage("远程资源请求失败,请检查网络后重试", 'error')
    console.log(error);
}))

export default ask;