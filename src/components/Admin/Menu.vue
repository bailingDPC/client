<template>
    <el-menu
            :unique-opened="true"
            :router="true"
            @open="handleOpen"
            class="el-menu-vertical-demo"
            background-color="#545064"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-submenu index="Article">
            <template slot="title">
                <i class="el-icon-document-copy"></i>
                <span>文章管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/ArticleAdd">发表文章</el-menu-item>
                <el-menu-item index="/admin/ArticleManage">管理文章</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="User">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/UserAdmin">权限管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="Message">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span>留言管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/MessageDelete">删除留言</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="Diary">
            <template slot="title">
                <i class="el-icon-chat-dot-round"></i>
                <span>日记管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/DiaryAdd">发表日记</el-menu-item>
                <el-menu-item index="/admin/DiaryManage">管理日记</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="Link">
            <template slot="title">
                <i class="el-icon-link"></i>
                <span>友链管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/LinkAdd">添加友链</el-menu-item>
                <el-menu-item index="/admin/LinkDelete">删除友链</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Menu",
        methods:{
            handleOpen(index){
                console.log(index);
            }
        }
    }
</script>

<style scoped lang="less">
    .el-menu{
        width: 100%;
    }
</style>
