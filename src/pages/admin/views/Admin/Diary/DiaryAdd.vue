<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="日记图片">
                <Upload @uploadSuccess="uploadSuccess"></Upload>
            </el-form-item>
            <el-form-item label="日记内容">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.txt">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button @click="handleSubmit">发表</el-button>
    </div>
</template>

<script>
    import Upload from "../../../../../components/Upload";
    import {postDiary} from '../../../../../api/index'

    export default {
        name: "DiaryAdd",
        components: {Upload},
        data() {
            return {
                form: {
                    txt: "",
                    img: ""
                }
            }
        },
        methods: {
            uploadSuccess(url) {
                this.form.img = url;
            },
            handleSubmit() {
                //这里发送ajax到后端
                let txt = this.form.txt,
                    img = this.form.img;

                //数据错误
                if (!txt && !img) {
                    this.$message({
                        message: "请输入日记内容",
                        type: "error",
                        duration: 2000
                    });
                    return;
                }
                //数据正确
                postDiary(this.form.txt, this.form.img)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                message: "上传成功",
                                type: "success",
                                duration: 2000
                            });
                            // setTimeout(() => {
                            //     window.location.reload();
                            // }, 1000)
                        } else {
                            this.$message({
                                message: "发表失败，请稍后再试",
                                type: "error",
                                duration: 2000
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            message: "发表失败，请稍后再试",
                            type: "error",
                            duration: 2000
                        });
                    })
            }
        }
    }
</script>

<style scoped>

</style>
