<template>
    <div id="root">
        <router-view/>
        <ToTop></ToTop>
    </div>
</template>

<script>
    import ToTop from "../components/ToTop";
    export default {
        components: {ToTop}
    }
</script>

<style lang="less">
    @import "../assets/css/font.css";
    @import "../assets/css/reset.css";
    ::-webkit-scrollbar{
        display:none;
    }
    #root{
        width: 100%;
        min-height: 100vh;
        background: url("../assets/img/bg_1.jpeg") center top/cover fixed;
    }
</style>
