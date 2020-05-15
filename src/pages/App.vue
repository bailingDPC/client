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
        background: url("../assets/img/bg.jpg") center top/cover fixed;
    }
</style>
