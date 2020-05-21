<template>
    <div>
        <el-table
                :data="linkList"
                style="width: 100%"
        >
            <el-table-column
                    label="名称"
                    width="180"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="链接"
                    width="300"
            >
                <template slot-scope="scope">
                    <span v-html="scope.row.href"></span>
                </template>
            </el-table-column>

            <el-table-column label="图标">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" height="50" alt="">
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    <span v-html="scope.row.des"></span>
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
    import {deleteLink, getLinkList} from "../../../../../api";

    export default {
        name: "LinkDelete",
        data() {
            return {
                linkList: []
            }
        },
        methods: {
            handleDelete(index, row){
                deleteLink(row._id)
                    .then((res)=>{
                        if(res.data.code === 0){
                            this.$message({
                                message: res.data.msg,
                                type: 'success',
                                duration: 2000
                            });
                            setTimeout(()=>{
                                this.getList();
                            }, 2000)
                        }else{
                            this.$message({
                                message: res.data.msg,
                                type: 'error',
                                duration: 2000
                            });
                        }
                    })
                    .catch(()=>{
                    });
            },
            getList(){
                getLinkList()
                    .then(res => {
                        this.linkList = res.data.data;
                    })
                    .catch();
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>

