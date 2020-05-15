<template>
    <div>
        <textarea id="richText" style="display: none;"></textarea>
        <button type="button" class="layui-btn" @click="handleClick">提交留言</button>
    </div>
</template>

<script>
    export default {
        name: "RichText",
        data() {
            return {
                layedit: null,
                index: 0,
            }
        },
        methods: {
            handleClick() {
                this.$emit("sub", this.layedit.getContent(this.index));
            }
        },
        mounted() {
            // eslint-disable-next-line no-undef
            layui.use("layedit", ()=>{
                // eslint-disable-next-line no-undef
                this.layedit = layui.layedit;
                this.index = this.layedit.build("richText", {
                    tool: ['face']
                });//建立编辑器
            });
        }
    }
</script>

<style scoped>

</style>
