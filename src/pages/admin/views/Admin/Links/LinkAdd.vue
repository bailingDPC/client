<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
                <el-input
                        type="text"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.name">
                </el-input>
            </el-form-item>
            <el-form-item label="链接地址">
                <el-input
                        type="text"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.href">
                </el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-input
                        type="text"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.icon">
                </el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input
                        type="text"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.des">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button @click="handleSubmit">添加</el-button>
    </div>
</template>

<script>
    import {postlinks} from '../../../../../api/index'

    export default {
        name: "LinkAdd",
        data() {
            return {
                form: {
                    name: "",
                    href: "",
                    icon: "",
                    des: ""
                }
            }
        },
        methods: {
            uploadSuccess(url) {
                this.form.img = url;
            },
            handleSubmit() {
                postlinks(this.form)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                message: "添加成功",
                                type: "success",
                                duration: 2000
                            });
                            // setTimeout(() => {
                            //     window.location.reload();
                            // }, 1000)
                        } else {
                            this.$message({
                                message: res.data.msg,
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
