<template>
    <div class="Diary">
        <Nav></Nav>
        <div class="diary-main">
            <el-timeline>
                <el-timeline-item
                        v-for="(item, index) in diaryList"
                        :timestamp="item.date | getD"
                        placement="top"
                        :reverse="false"
                        :key="index"
                >
                    <el-card>
                        <p>{{item.txt}}</p>
                        <img :src="item.img"
                             width="100%"
                             alt="">
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import Nav from "../../../../components/Nav";
    export default {
        name: "Diary",
        components : {Nav},
        data(){
            return {
                diaryList : [
                    {txt: "这是第一篇", img: "http://localhost:3000/images/defaultSurface.jpg", date: "2020/3/10"},
                    {txt: "这是第二篇", img: "", date: "2020/3/4"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},
                    {txt: "这是第三篇", img: "", date: "2029/3/5"},

                ]
            }
        },
        filters:{
            getD(val){
                let date = new Date(val);
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        },

        created() {
            // getDiary()
            //     .then(res=>{
            //         this.diaryList = res.data.data;
            //     })
        }
    }
</script>

<style scoped lang="less">
    .Diary{
        box-sizing: border-box;
        max-width: 1360px;
        width: 100%;
        padding: 80px 50px;
        margin: 0 auto;
        .diary-main{
            box-sizing: border-box;
            width: 100%;
            padding: 30px 8% 30px 20%;
            background-color: #fff;
            .el-timeline{
                /deep/ .el-timeline-item__timestamp{
                    position: absolute;
                    top: -8px;
                    left: -134px;
                    font-size: 20px;
                    font-weight: bolder;
                    color: #6bc30d;
                }
                .el-timeline-item{
                    .el-card{
                        p{
                            font-size: 14px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>
