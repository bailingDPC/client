<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="type">
                <el-select v-model="form.type" placeholder="请选择分类">
                    <el-option label="原创" value="原创"></el-option>
                    <el-option label="转载" value="转载"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-select v-model="form.tag" placeholder="请选择标签">
                    <el-option label="HTML&CSS" value="HTML&Css"></el-option>
                    <el-option label="JavaScript" value="JavaScript"></el-option>
                    <el-option label="Node" value="Node"></el-option>
                    <el-option label="Vue&React" value="Vue&React"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="surface">
                <Upload @uploadSuccess="uploadSuccess"></Upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <MarkdownEditor :options="editorOptions" ref="editorMd" :id="'edit'"></MarkdownEditor>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        @click="onSubmit('form')"
                >
                    发表文章
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import MarkdownEditor from "../MarkdownEditor";
    import Upload from "../Upload";

    export default {
        name: "ArticleEdit",
        props: [
            "defaultData"
        ],
        data() {
            return {
                form: {
                    title: this.defaultData.title || "",
                    tag: this.defaultData.tag || "",
                    type: this.defaultData.type || "",
                    surface: this.defaultData.surface || "",
                    content: this.defaultData.content || "",
                },
                rules: {
                    type: [{required: true, message: "请选择分类"}],
                    title: [{required: true, message: "请输入标题"}],
                    tag: [{required: true, message: "请选择标签"}],
                    surface: [{required: true, message: "请选择封面"}],
                    content: {
                        validator: (rule, value, cb) => {
                            if (this.$refs.editorMd.editor.getHTML()) {
                                cb();
                            } else {
                                cb(new Error("请输入文章内容"));
                            }
                        },
                        required: true
                    },
                },
                //editor编辑器默认配置对象
                editorOptions: {
                    markdown: "",
                }
            }
        },
        watch:{
            defaultData(){
                this.form = {
                    title : this.defaultData.title,
                    type : this.defaultData.type,
                    tag : this.defaultData.tag,
                    content : this.defaultData.content,
                    surface : this.defaultData.surface,
                    contentHTML: this.defaultData.contentHTML
                };
            },
        },
        methods: {
            uploadSuccess(url) {
                this.form.surface = url;
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit("handleSubmit",{
                            type: this.form.type,
                            title: this.form.title,
                            tag: this.form.tag,
                            surface: this.form.surface,
                            content: this.$refs.editorMd.editor.getMarkdown(),
                            contentHTML: this.$refs.editorMd.editor.getHTML()
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
        components: {
            MarkdownEditor,
            Upload
        },
        created() {
            this.editorOptions = this.defaultData;
        },
        destroyed() {

        }
    }
</script>

<style scoped lang="less">

</style>
