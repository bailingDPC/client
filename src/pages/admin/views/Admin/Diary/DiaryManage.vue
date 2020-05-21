<template>
    <div>
        <el-table
                :data="diaryList"
                style="width: 100%"
        >
            <el-table-column
                    label="时间"
                    width="180"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.date | getDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="内容"
                    width="300"
            >
                <template slot-scope="scope">
                    <span v-html="scope.row.txt"></span>
                </template>
            </el-table-column>

            <el-table-column label="图片">
                <template slot-scope="scope">
                    <img v-if="scope.row.img" :src="scope.row.img" height="50" alt="">
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
    import {deleteDiary, getDiaryList} from "../../../../../api";

    export default {
        name: "DiaryManage",
        data() {
            return {
                diaryList: []
            }
        },
        methods: {
            handleDelete(index, row){
                deleteDiary(row._id)
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
                getDiaryList()
                    .then(res => {
                        this.diaryList = res.data.data;
                    })
                    .catch();
            }
        },
        filters:{
            getDate(val){
                let date = new Date(val);
                return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            }
        },
        created() {
           this.getList();
        }
    }
</script>

<style scoped>

</style>

