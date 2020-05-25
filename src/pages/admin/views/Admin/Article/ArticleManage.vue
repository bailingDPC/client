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
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.date | getDate }}</span>
                </template>
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
            <el-table-column label="封面" width="180">
                <template slot-scope="scope">
                    <img v-if="scope.row.surface" :src="scope.row.surface" height="50" alt="">
                </template>
            </el-table-column>
            <el-table-column
                    label="阅览量"
                    width="180"
                    prop="pv"
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
    import {
        getArticleINFO,
        getArticleList,
        deleteArticle,
        updateArticle,
        getArticle_Admin,
    } from "../../../../../api/index";
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
        filters: {
            getDate(val) {
                let date = new Date(val);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
        },
        methods: {
            handleEdit(index, row) {
                let _this = this;
                getArticle_Admin(row._id)
                    .then(res => {
                        if (res.data.code === 0) {
                            _this.defaultData = res.data.data;
                            _this.defaultData.markdown = _this.defaultData.content;
                            _this.dialogVisible = true;
                        } else {
                            this.$message({
                                message: res.data.msg,
                                type: "error",
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
                this.$confirm("此操作将永久删除该篇文章的所有信息，是否继续", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
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
                    })
                    .catch(() => {

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
