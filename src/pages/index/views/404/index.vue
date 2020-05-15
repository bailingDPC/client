<template>
    <div class="notFind">
        <Nav></Nav>
        <img src="../../../../assets/img/404.gif" alt="">
    </div>
</template>

<script>
    import Nav from "../../../../components/Nav";

    export default {
        name: "404",
        components: {Nav}
    }

</script>

<style scoped lang="less">
    .notFind{
        margin-top: 60px;
        background-color: #fff;
    }
    img {
        display: block;
        margin: 0 auto;
    }
</style>
