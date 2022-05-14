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

export function loadingCreate(count = 1) {
    if (loadingNum <= 0) {
        loading = ElLoading.service(loadingOption);
        loadingNum = 0;
    }
    loadingNum += count;
}

export function loadingClose() {
    loadingNum--;
    if (loadingNum <= 0 && loading != null) {
        loading.close();
        loadingNum = 0;
    }
}