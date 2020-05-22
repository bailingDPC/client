<template>
    <div id="root">
        <router-view/>
    </div>
</template>

<script>
</script>

<style lang="less">
    @import "../assets/css/font.css";
    @import "../assets/css/reset.css";
    ::-webkit-scrollbar{
        /*display:none;*/
    }
    #root{
        width: 100%;
        min-height: 100vh;
        background: url("../assets/img/bg_1.jpeg") center top/cover fixed;
    }
</style>
