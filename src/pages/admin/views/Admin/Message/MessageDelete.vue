<template>
    <div>
        <el-table
                :data="messageList"
                style="width: 100%"
        >
            <el-table-column
                    label="用户名"
                    width="180"
                    prop="user.user"
            >
            </el-table-column>
            <el-table-column
                    label="留言时间"
                    width="180"
                    prop="date"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.date | getDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="留言内容"
                    width="680"
            >
                <template slot-scope="scope">
                    <span v-html="scope.row.content"></span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    > 删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getMessageList_admin, deleteMessage} from "../../../../../api";

    export default {
        name: "MessageDelete",
        data() {
            return {
                messageList: []
            }
        },
        filters:{
            getDate(val){
                let date = new Date(val);
                let H = date.getHours();
                let M = date.getMinutes();
                H < 10 ? H= "0"+H : H;
                M < 10 ? M= "0"+M : M;
                return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}  ${H}:${M}`;
            }
        },
        methods: {

            handleDelete(index, row) {
                this.$confirm("此操作将永久删除该用户及其留言等信息，是否继续", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        deleteMessage(row._id)
                            .then((res) => {
                                this.messageList.splice(index, 1);
                                this.$message({
                                    message: res.data.msg,
                                    type: "success",
                                    duration: 2000
                                })
                            })
                            .catch(() => {
                                this.$message({
                                    message: "删除失败",
                                    type: "danger",
                                    duration: 2000
                                })
                            })
                    })
                    .catch(() => {

                    });
            },
            getMessageList() {
                getMessageList_admin()
                    .then((res) => {
                        this.messageList = res.data.data;
                    })
            },
            getText(content){
                let div = document.createElement('div');
                div.innerHTML = content;
                return div.innerText;
            }
        },
        mounted() {
            this.getMessageList()
        }
    }
</script>

<style scoped>

</style>
