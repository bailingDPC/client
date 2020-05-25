<template>
    <div
            id="toTop"
            v-show="true"
            :style="`right:${defaultRight}px;`">
        <i
                class="icon iconfont icon-huojian"
                @click="goTop()"></i>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showIcon: false,
                scrollTop: 0,
                defaultType: 0,
                defaultTop: 400,
                defaultRight: -80,
                defaultBottom: 30,
                defaultSize: 24,
                defaultColor: '#666',
                defaultDuration: 400
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handelScroll, false)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handelScroll, false)
        },
        methods: {
            handelScroll() {
                this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                this.scrollTop > this.defaultTop ? this.defaultRight = 60 : this.defaultRight = -80
            },
            goTop() {
                window.requestAnimationFrame = (function () {
                    return window.requestAnimationFrame || function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
                })();
                var step = this.scrollTop / (this.defaultDuration / (1000 / 60)) >> 0;
                var self = this;

                function fn() {
                    if (self.scrollTop >= 0) {
                        self.scrollTop -= step;
                        document.documentElement.scrollTop = document.body.scrollTop = self.scrollTop;
                        fn.rafTimer = requestAnimationFrame(fn);
                    } else {
                        document.body.scrollTop = 0;
                        cancelAnimationFrame(fn.rafTimer);
                    }
                }
                fn.rafTimer = requestAnimationFrame(fn)
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/icon/iconfont.css";

    #toTop {
        position: fixed;
        /*right: 80px;*/
        bottom: 60px;
        z-index: 999;
        width: 42px;
        height: 42px;
        border: 3px solid #fff;
        border-radius: 50%;
        background-color: #115d82;
        overflow: hidden;
        text-align: center;
        transition: all .8s;
        cursor: pointer;

        i {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 42px;
            height: 42px;
            display: inline-block;
            color: #fff;
            font-size: 42px;
        }
    }
</style>
