import http from "@/api/http";

export function login(data) {
    return http.post('/login', data)
}

export function getRsaPublicKey() {
    return http.get('/get/rsa')
}

//获取页面元数据
export function getMetaData(key, type) {
    return http.get('/get/meta' + '?key=' + key + "&type=" + type)
}

//获取随机图片URL
export function getImageUrl() {
    return http.get('/get/image')
}