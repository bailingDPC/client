<template>
    <div :id="id">
    </div>
</template>
<script>
    import $ from "jquery";

    export default {
        name: "MarkdownEditor",
        data: function () {
            return {
                //最终生成的编辑器
                editor: null,
                //默认选项
                defaultOptions: {
                    width: "100%",
                    height: 540,
                    path: "/lib/editor.md-master/lib/",
                    theme: "dark",
                    previewTheme: "dark",
                    editorTheme: "pastel-on-dark",
                    markdown: "",   //动态设置的markdown文本
                    codeFold: true,
                    // syncScrolling : false,
                    saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
                    searchReplace: true,
                    // watch : true,                // 关闭实时预览
                    htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
                    toolbar: true,             //关闭工具栏
                    previewCodeHighlight: true, // 关闭预览 HTML 的代码块高亮，默认开启
                    emoji: true,
                    taskList: true,
                    tocm: true,         // Using [TOCM]
                    tex: true,                   // 开启科学公式TeX语言支持，默认关闭
                    flowChart: true,             // 开启流程图支持，默认关闭
                    sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
                    dialogLockScreen: false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
                    dialogShowMask: false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
                    dialogDraggable: false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
                    dialogMaskOpacity: 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
                    dialogMaskBgColor: "#ccc", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
                    imageUpload: true,
                    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL: "/admin/article/img",
                    // crossDomainUpload: true,
                    // uploadCallbackURL: "",//图片上传成功后跳转的地址
                    onload: function () {
                        //console.log('onload', this);
                        //this.fullscreen();
                        //this.unwatch();
                        //this.watch().fullscreen();
                        console.log("加载完成");
                        //this.setMarkdown("#PHP");
                        //this.width("100%");
                        //this.height(480);
                        //this.resize("100%", 640);
                    },
                },
                content: "",
            }
        },
        props: {
            /**
             * editormd挂载元素的id
             */
            id: {
                type: String,
                default: 'editor'
            },
            /**
             * editormd的选项对象
             */
            options: {
                type: Object
            }
        },
        updated() {
            console.log("更新了");
            let vm = this;
            //加载editormd
            this.requireEditor(function () {
                // eslint-disable-next-line no-undef
                vm.editor = editormd(vm.id, vm.getOptions());
            });
        },
        mounted() {
            let vm = this;
            //加载editormd
            this.requireEditor(function () {
                // eslint-disable-next-line no-undef
                vm.editor = editormd(vm.id, vm.getOptions());
            });
        },
        methods: {
            /**
             * 异步加载editormd
             * callback 成功后的回调函数
             */
            requireEditor(callback) {
                //设置全局变量，因为editormd依赖jquery
                window.$ = window.jQuery = $;
                //异步加载并执行
                $.getScript("/lib/editor.md-master/editormd.min.js", function () {
                    callback();
                });
                //加载css
                $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/lib/editor.md-master/css/editormd.min.css'));
            },
            /**
             * 得到最终的options，组件属性上获得的选项覆盖此处的默认选项
             */
            getOptions() {
                return Object.assign(this.defaultOptions, this.options);
            },
            handleClick() {
                this.$emit("Sub", this)
            }
        }
    }
</script>
<style scoped lang="less">

</style>
