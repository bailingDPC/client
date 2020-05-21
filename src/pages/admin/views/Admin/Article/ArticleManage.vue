<template>
    <div>
        <el-table
                :data="articleList"
                style="width: 100%"
        >
            <el-table-column
                    label="标题"
                    width="180"
                    prop="title"
            >
            </el-table-column>
            <el-table-column
                    label="时间"
                    width="180"
                    prop="date"
            >
            </el-table-column>
            <el-table-column
                    label="分类"
                    width="180"
                    prop="type"
            >
            </el-table-column>
            <el-table-column
                    label="标签"
                    width="180"
                    prop="tag"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                    > 编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    > 删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
                :pageSize="5"
                :total="total"
                @currentChange="handlePaginationClick"
        ></Pagination>
        <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
        >
            <ArticleEdit
                    :defaultData="defaultData"
                    @handleSubmit="handleSubmit"></ArticleEdit>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from "../../../../../components/Admin/Pagination";
    import {getArticleINFO, getArticleList, deleteArticle, updateArticle} from "../../../../../api/index";
    import ArticleEdit from "../../../../../components/Admin/ArticleEdit";

    export default {
        name: "ArticleManage",
        data() {
            return {
                articleList: [],
                total: 0,
                defaultData: {},
                dialogVisible: false,
                PaginationIndex: 1,
                PaginationSize: 5,
            }
        },
        methods: {
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.defaultData = row;
            },
            handleSubmit(data) {
                updateArticle(this.defaultData._id, data)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                message: res.data.msg,
                                type: "success",
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.changeArticleList();
                                this.handleClose();
                            }, 2000);
                        } else {
                            this.$message({
                                message: "更新失败",
                                type: "success",
                                duration: 2000
                            })
                        }
                    })
                    .catch((res) => {
                        this.$message({
                            message: res.data.msg,
                            type: "success",
                            duration: 2000
                        })
                    });
            },
            handleClose() {
                this.dialogVisible = false;
            },
            handleDelete(index, row) {
                deleteArticle(row._id)
                    .then((res) => {
                        console.log(res);
                        if (res.data.code === 0) {
                            this.$message({
                                message: "删除成功",
                                type: "success",
                                duration: 2000
                            });
                            this.articleList.splice(index, 1);
                        }
                    }).catch(() => {
                    this.$message({
                        message: "删除失败",
                        type: "error",
                        duration: 2000
                    })

                });
            },
            handlePaginationClick(index, size) {
                this.PaginationIndex = index;
                this.PaginationSize = size;
                this.changeArticleInfoTotal();
                this.changeArticleList();
            },
            changeArticleList() {
                let skip = this.PaginationSize * (this.PaginationIndex - 1);
                getArticleList(skip, this.PaginationSize)
                    .then((res) => {
                        this.articleList = res.data.data;
                    })
                    .catch(() => {

                    })
            },
            changeArticleInfoTotal() {
                //请求文章信息
                getArticleINFO()
                    .then(res => {
                        this.total = res.data.data ? res.data.data.num : 0;
                    });
            }
        },
        mounted() {

            this.changeArticleInfoTotal();
            //请求初始文章
            this.changeArticleList(0, 5);
        },
        components: {
            ArticleEdit,
            Pagination
        }

    }
</script>

<style scoped>

</style>
