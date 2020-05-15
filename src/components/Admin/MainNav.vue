<template>
    <div class="MainNav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                    v-for="(item, index) in getRouters"
                    :to="item.path"
                    :key="index">
                {{ item.meta.cnName || item.name }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $route.meta.cnName || $route.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "MainNav",
        computed: {
            getRouters() {
                let arr = [...this.$route.matched];
                arr.pop();
                return arr;
            }
        },
        watch: {
            $route(router) {
                console.log(router);
            }
        }
    }
</script>

<style scoped lang="less">
    .MainNav {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: grey;

        .el-breadcrumb {
            line-height: 50px;
        }
    }
</style>
