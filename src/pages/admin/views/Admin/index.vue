<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <h1>白灵空间</h1>
                <Menu></Menu>
            </el-aside>
            <el-main>
                <MainNav></MainNav>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Menu from "../../../../components/Admin/Menu";
    import MainNav from "../../../../components/Admin/MainNav";
    export default {
        name: "Admin",
        components:{
            MainNav,
            Menu
        }
    }
</script>


<style scoped lang="less">
    .el-aside {
        position: relative;
        overflow: hidden;
        height: 100vh;
        background-color: #545064;
    }

    .el-main {
        position: relative;
        height: 100vh;
        background: linen;
        padding-top: 60px;
    }
</style>
