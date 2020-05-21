import Vue from "vue";
import VueRouter from "vue-router";
import {ifLogin} from "../../../api";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../views/Login/index")
    },
    {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/Admin/index"),
        beforeEnter(to, from, next) {
            ifLogin()
                .then((res) => {
                    if (res.data.code === 0) {
                        //已登录
                        next()
                    } else {
                        //未登录
                        next("/")
                    }
                })
                .catch();
        },
        children: [
            {
                path: "",
                name: "ArticleIndex",
                meta: {cnName: "首页"},
                component: () => import("../views/Admin/AdminIndex/AdminIndex")
            },
            {
                path: "ArticleAdd",
                name: "ArticleAdd",
                meta: {cnName: "发表文章"},
                component: () => import("../views/Admin/Article/ArticleAdd")
            },
            {
                path: "ArticleManage",
                name: "ArticleManage",
                meta: {cnName: "文章管理"},
                component: () => import("../views/Admin/Article/ArticleManage")
            },
            {
                path: "UserAdmin",
                name: "UserAdmin",
                meta: {cnName: "用户管理"},
                component: () => import("../views/Admin/User/UserAdmin")
            },
            {
                path: "MessageDelete",
                name: "MessageDelete",
                meta: {cnName: "留言删除"},
                component: () => import("../views/Admin/Message/MessageDelete")
            },
            {
                path: "DiaryAdd",
                name: "DiaryAdd",
                meta: {cnName: "添加日记"},
                component: () => import("../views/Admin/Diary/DiaryAdd")
            }, {
                path: "DiaryManage",
                name: "DiaryManage",
                meta: {cnName: "日记管理"},
                component: () => import("../views/Admin/Diary/DiaryManage")
            }, {
                path: "LinkAdd",
                name: "LinkAdd",
                meta: {cnName: "添加友链"},
                component: () => import("../views/Admin/Links/LinkAdd")
            }, {
                path: "LinkDelete",
                name: "LinkDelete",
                meta: {cnName: "删除友链"},
                component: () => import("../views/Admin/Links/LinkDelete")
            },
        ],
    },
];
let router = new VueRouter({
    model: "hash",
    routes,
});

export default router;
