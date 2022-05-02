import {ElLoading} from "element-plus";

const loadingOption = {
    body: true,
    //铺满全屏
    fullscreen: true,
    //锁定屏幕
    lock: true,
    text: "正在加载资源",
}

//目前加载的数量
let loadingNum = 0;

//加载页面实例
let loading;

let isLoading = false;

export function loadingCreate(count = 1) {
    if (!isLoading) {
        isLoading = true;
        loading = ElLoading.service(loadingOption);
    }
    console.log(loadingNum)
    loadingNum += count;
}

export function loadingClose() {
    loadingNum--;
    console.log(loadingNum)
    if (loadingNum <= 0) {
        loading.close();
        loadingNum = 0;
        isLoading = false;
    }
}