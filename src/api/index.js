import axios from "axios";

//配置默认的参数
axios.defaults.baseURL = "http://localhost:3000"; //默认访问网址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"; //设置post请求格式

//获取文章信息
function getArticleInfo() {
    return axios.post("/article/getArticleInfo")
}

// 获取热门文章
function getArticleHot(limit = 8) {
    return axios.post("/article/getHot", {limit});
}

// 获取文章列表
let getArticleShow = (function () {
    let skip = 0;
    let limit = 5;
    return function (index, ifFresh = false) {
        if (ifFresh) {
            skip = 0;
            limit = 5;
        }

        let tag = ["", "个人日记", "HTML5&&CSS3", "JavaScript", "NodeJs", "Vue & React", "其它"][index];
        let data = {skip, limit, tag};
        skip += limit;
        limit = 2;
        return axios.post("article/getShow", data);
    };
})();

//获取验证码图片
function getRegisterVCode() {
    return axios.post("/register/vcode");
}

//验证码的提交
function getRegisterCheckVcode(svgCode) {
    return axios.post("/register/checkVcode", {svgCode});
}

//注册提交
function postRegister(options) {
    return axios.post("/register", options);
}

//登陆提交
function postLogin(options) {
    return axios.post("/login", options);
}

//退出登陆
function postLogout(){
    return axios.post("/login/logout");
}

//提交判断是否登陆
function postIfLogin() {
    return axios.post("/login/ifLogin");
}

//留言的接口
/**
 *  @param options :: object =>{user:"", content: ""}
 * **/
function commitMessage(options) {
    return axios.post("/message/commit", options);
}

//留言的评论接口
// options => {parentId: "id", user: "id", content: "", $user: ""}
function commitChildMessage(options) {
    return axios.post("/message/childCommit", options);
}

//获取留言列表
let getMessageList = (function () {
    let skip = 0,
        limit=0;
    return function () {
        limit+=5;
        return axios.post("/message/getList", {skip, limit});
    };
})();

//获取单篇文章的信息
function getArticle(_id){
    return axios.post("/article", {_id});
}
//获取延伸阅读
function getArticleExtend(tag){
    return axios.post("/article/extend", {tag})
}

//搜索文章
function getArticleSearch(keywords){
    return axios.post("/article/search", {keywords});
}

//最近访客接口
function getVisitor(){
    return axios.post("/visitor");
}

/*
* 后台管理类的接口
* */

export {
    getArticleHot,
    getArticleInfo,
    getArticleShow,
    getRegisterVCode,
    getRegisterCheckVcode,
    postRegister,
    postLogin,
    postIfLogin,
    commitMessage,
    getMessageList,
    commitChildMessage,
    getArticle,
    getArticleExtend,
    getArticleSearch,
    getVisitor,
    postLogout


}
