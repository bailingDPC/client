<template>
    <div>
        <ArticleEdit
        @handleSubmit="handleSubmit"
        v-loading.fullscreen.lock="fullscreenLoading"
        :defaultData="defaultData">
        </ArticleEdit>
    </div>
</template>

<script>

    import ArticleEdit from "../../../../../components/Admin/ArticleEdit";
    import { postArticle } from "../../../../../api/index";

    export default {
        name: "ArticleAdd",
        data() {
            return {
                fullscreenLoading: false,
                defaultData: {},
            }
        },
        methods: {
            handleSubmit(data){
                postArticle(data).then(()=>{
                    this.$message({
                        message: "上传成功",
                        type: 'success',
                        duration : 2000
                    });
                    setTimeout(()=>{
                        this.fullscreenLoading = false;
                        window.location.reload();
                    },1000)
                }).catch(()=>{
                    this.$message({
                        message: "上传失败",
                        type: 'error',
                        duration : 2000
                    });
                })
            }
        },
        components: {
            ArticleEdit,
        },


        beforeRouteLeave(to, from,next){
            this.$confirm("确定要离开吗?, 输入的内容不会保存哦!!!, 是否继续?", "提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            }).then(()=>{
                next();
            }).catch(()=>{

            });
        }
    }
</script>

<style scoped lang="less">

</style>
