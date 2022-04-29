import http from "@/api/http";

export function loginApi(data) {
    return http.post('/login', data)
}

export function rsaPublicKeyApi() {
    return http.get('/get/rsa')
}

//获取页面元数据
export function metaDataApi(key, type) {
    return http.get('/get/meta' + '?key=' + key + "&type=" + type)
}

//获取博客列表
export function blogListApi(page, size) {
    return http.get('/get/blog' + '?page=' + page + '&size=' + size)
}

//获取博客文章
export function markdownApi(uuid) {
    return http.get('/get/markdown' + '?uuid=' + uuid)
}

//获取随机图片URL
export function imageUrlApi() {
    return http.get('/get/image')
}
