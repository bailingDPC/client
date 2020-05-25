import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home/index")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About/index")
    },
    {
        path: "/blog/:id",
        name: "Blog",
        component: () => import("../views/Blog/index")
    },
    {
        path: "/diary",
        name: "Diary",
        component: () => import("../views/Diary/index")
    },
    {
        path: "/message",
        name: "Message",
        component: () => import("../views/Message/index")
    },
    {
        path: "/links",
        name: "Links",
        component: () => import("../views/Links/index")
    },
    {
        path: "/Article/:id",
        name: "Article",
        component: () => import("../views/Article/index")
    },
    {
        path: "*",
        name: "404",
        component: () => import("../views/404/index")
    },
];
const router = new VueRouter({
    mode: "hash",
    routes
});

export default router;
