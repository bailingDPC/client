module.exports={
    pages: {
        index: {
            entry: "src/pages/index.js",
            filename: "index.html",
            template: "public/index.html",
            title: "白灵博客",
        },
        admin: {
            entry: "src/pages/admin/admin.js",
            filename: "admin.html",
            template: "public/index.html",
            title: "后台管理"

        }
    }
};
