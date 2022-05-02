import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    //主页面
    {
        path: '/',
        redirect: '/index'
    },
    //主页面
    {
        name: 'index',
        path: '/index',
        redirect: '/home',
        component: () => import('../view/IndexPage'),
        children: [
            //主页
            {
                name: 'home',
                path: '/home',
                component: () => import('../view/views/HomePage')
            },
            //文章
            {
                name: 'article',
                path: '/article',
                component: () => import('../view/views/ArticlePage')
            }
        ]
    },
    //登录页面
    {
        name: 'login',
        path: '/login',
        component: () => import('../view/LoginPage')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router