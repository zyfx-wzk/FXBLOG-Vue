import ask from "@/api/ask";

/*内部接口*/
export function loginApi(userData) {
    return ask.post('/login', userData)
}

//获取RSA加密公钥
export function rsaPublicKeyApi() {
    return ask.get('/get/rsa')
}

//获取随机图片URL
export function imageUrlApi() {
    return ask.get('/get/image')
}

//获取歌曲信息
export function musicListApi() {
    return ask.get('/get/music')
}

//获取页面元数据
export function metaDataApi(key, type) {
    return ask.get('/get/meta' + '?key=' + key + "&type=" + type)
}

//获取博客列表
export function blogListApi(page, size) {
    return ask.get('/get/blog' + '?page=' + page + '&size=' + size)
}

//获取博客文章
export function markdownApi(uuid) {
    return ask.get('/get/markdown' + '?uuid=' + uuid)
}