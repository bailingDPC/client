<template>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="5"
            :total="total"
            @current-change="currentChange"
    >

    </el-pagination>
</template>

<script>
    export default {
        name: "Pagination",
        props: ["pageSize", "pageCount", "total"],
        data() {
            return {
            }
        },
        methods: {

            handleDelete() {

            },
            currentChange(pageIndex) {
                this.$emit("currentChange",pageIndex, this.pageSize);
            },
        },
        created() {

        }
    }
</script>


<style scoped>

</style>
