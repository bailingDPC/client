<template>
    <el-upload
            class=""
            action="http://localhost:3000/admin/upload/articleSurface"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" width="300" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    export default {
        name: "Upload",
        props:[
            "imageUrl"
        ],
        data(){
            return {

            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.$emit("uploadSuccess", res.surface);
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isType = /^(image\/jpeg|image\/jpg|image\/png|image\/gif)$/.test(file.type);

                if (!isType) {
                    this.$message.error('图片只能是 JPG/JPEG/PNG/GIF 格式!');
                }
                return isType;
            },
        },
        mounted(){
            this.imageUr = this.imgUrl || "";
        }
    }
</script>

<style scoped>

</style>
