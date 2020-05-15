import Vue from 'vue'
import App from './App.vue'
import router from "./index/router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    nprogress.start();
    next();
});

router.afterEach(()=>{
  nprogress.done();
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
