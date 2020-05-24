<template>
    <div class="md_view">
        <div :id="id">
            <textarea  style="display: none;" v-model="content"></textarea>
        </div>
    </div>
</template>
<script>
    import $ from "jquery";

    export default {
        name: "MdView",
        data: function () {
            return {
                //最终生成的编辑器
                editor: null,
                //默认选项
                defaultOptions: {
                    // style,script,iframe,div
                    htmlDecode: true,  // you can filter tags decode
                    width: "100%",
                    theme: "dark",
                    emoji: true,
                    taskList: true,
                    tex: true,  // 默认不解析
                    flowChart: true,  // 默认不解析
                    sequenceDiagram: true,  // 默认不解析1
                    //
                    gfm                  : true,
                    toc                  : true,
                    tocStartLevel        : 1,
                    tocTitle             : "目录",
                    tocDropdown          : false,
                    tocContainer         : "",
                    markdown             : "",
                    markdownSourceCode   : true,
                    atLink               : true,    // for @link
                    emailLink            : true,    // for mail address auto link
                    previewCodeHighlight : true
                }
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
            },
            content: null
        },
        mounted() {
            let vm = this;
            //加载editormd
            this.requireEditor(function () {
                // eslint-disable-next-line no-undef
                vm.editor = editormd.markdownToHTML(vm.id, vm.getOptions());
            });
        },
        methods: {
            /**
             * 异步加载editormd
             * callback 成功后的回调函数
             */
            requireEditor(callback) {
                //加载css
                $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/lib/editor_theme.css'));

                // eslint-disable-next-line no-unused-vars
                let vm = this;
                //设置全局变量，因为editormd依赖jquery
                window.$ = window.jQuery = $;

                //异步加载并执行
                $.when(
                    $.getScript("/lib/editor.md-master/lib/marked.min.js"),
                    $.getScript("/lib/editor.md-master/lib/prettify.min.js"),
                    $.getScript("/lib/editor.md-master/lib/raphael.min.js"),
                    $.getScript("/lib/editor.md-master/lib/underscore.min.js"),
                    $.getScript("/lib/editor.md-master/lib/sequence-diagram.min.js"),
                    $.getScript("/lib/editor.md-master/lib/flowchart.min.js"),
                    $.getScript("/lib/editor.md-master/lib/jquery.flowchart.min.js"),
                    $.getScript("/lib/editor.md-master/editormd.min.js"),
                ).done(function () {
                    callback();
                })
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
<style scoped lang="css">
    .md_view {
        width: 100%;
        /*overflow: hidden;*/
    }
</style>
