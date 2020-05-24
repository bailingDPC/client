<template>
    <div class="mask" v-if="visible">
        <div class="box">
            <span class="close" @click="hiddenBox">✖</span>
            <div class="cropper-content">
                <div class="cropper">
                    <VueCropper ref="cropper" :centerBox="true" :img="option.img" :outputSize="option.size"
                                :outputType="option.outputType" :info="true" :full="option.full"
                                :canMove="option.canMove"
                                :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop"
                                :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
                                :fixedBox="option.fixedBox" @realTime="realTime" @imgLoad="imgLoad"></VueCropper>
                </div>
                <div class="show-preview"
                     :style="{'width': previews.w + 'px', 'height': previews.h + 'px', 'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </div>
            <div class="footer-btn">
                <div class="scope-btn">
                    <label for="uploads" class="label-success">选择图片</label>
                    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                           accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                    <el-button style="margin-left: 100px;" type="primary" @click="rotateLeft">
                        <span style="font-weight: 600;">↺</span>
                    </el-button>
                    <el-button type="primary" @click="rotateRight">
                        <span style="font-weight: 600;">↻</span>
                    </el-button>
                </div>
                <div class="upload-btn">
                    <el-button :loading="isLoading" type="success" :style="'margin-left: 4px'"
                               @click="send('blob')">上传头像
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {VueCropper} from "vue-cropper";
    import {postAvatarSurface} from "../api";

    export default {
        name: "ImgUpload",
        props: [
            "visible"
        ],
        data() {
            return {
                crap: false,
                previews: {},
                option: {
                    img: "",
                    size: 1,
                    full: false,
                    outputType: 'png',
                    canMove: true,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    autoCropWidth: 200,
                    autoCropHeight: 200,
                    fixedBox: true
                },
                downImg: '#',
                fileName: 'avatar.png',
                isLoading: false
            }
        },
        components: {VueCropper},
        methods: {
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            finish(type) {
                // 输出
                // var test = window.open('about:blank')
                // test.document.body.innerHTML = '图片生成中..'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob(data => {
                        var img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                    })
                } else {
                    this.$refs.cropper.getCropData(data => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            // 实时预览函数
            realTime(data) {
                this.previews = data
            },
            convertBase64UrlToBlob(urlData) {
                let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
                //处理异常,将ascii码小于0的转换为大于0
                let ab = new ArrayBuffer(bytes.length);
                let ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], {type: 'image/jpeg'});
            },
            send(type) {
                console.log("上传");
                // eslint-disable-next-line no-unused-vars
                let _this = this;
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        let formData = new FormData();
                        formData.append('avatar', data, _this.fileName);
                        postAvatarSurface(formData)
                            .then(res => {
                                this.$message({
                                    message: res.data.msg,
                                    type: "success",
                                    duration: 2000
                                });
                                setTimeout(() => {
                                    _this.$emit("success", "success");
                                }, 3000);
                            })
                            .catch();
                    })
                }
            },
            down(type) {
                // event.preventDefault()
                if (!this.option.img) {
                    this.$notify({
                        title: "提示",
                        message: `你没有选择图片！`,
                        type: "error"
                    });
                    return;
                }
                this.isLoading = true;

                console.log('下载图片');
                var aLink = document.createElement('a');
                aLink.download = 'author-img';
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = window.URL.createObjectURL(data);
                        aLink.href = window.URL.createObjectURL(data);
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data;
                        aLink.href = data;
                        aLink.click()
                    })
                }
            },
            uploadImg(e, num) {
                //上传图片
                // this.option.img
                var file = e.target.files[0];
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$notify({
                        title: "提示",
                        message: `请选择正确的图片格式！`,
                        type: "error"
                    });
                    return false
                }
                var reader = new FileReader();
                reader.onload = e => {
                    let data;
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if (num === 1) {
                        this.option.img = data
                    } else if (num === 2) {
                        this.example2.img = data
                    }
                };
                // 转化为base64
                reader.readAsDataURL(file)
                // 转化为blob
                // reader.readAsArrayBuffer(file)
            },
            imgLoad(msg) {
                console.log(msg)
            },
            hiddenBox() {
                this.$emit("hidden", "close");
            }
        }
    }
</script>

<style lang="less">
    .mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 908;
        background-color: rgba(0, 0, 0, .8);

        .box {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            margin: auto;
            padding-left: 5px;
            padding-top: 25px;
            bottom: 0;
            width: 650px;
            height: 400px;
            background-color: #DDDCDC;
            z-index: 900;
            border: 2px solid #a6a9ad;
            border-radius: 4px;
            user-select: none;
            .close {
                position: absolute;
                display: inline-block;
                right: 0;
                top: 0;
                color: red;
                font-size: 30px;
                cursor: pointer;
            }

            .cropper-content {
                display: flex;
                justify-content: flex-end;

                .cropper {
                    width: 350px;
                    height: 300px;
                }

                .show-preview {
                    flex: 1;
                    display: flex;
                    justify-content: center;

                    .preview {
                        overflow: hidden;
                        border-radius: 50%;
                        border: 1px solid #cccccc;
                        background: #cccccc;
                        margin-left: 34px;
                    }
                }
            }

            .footer-btn {
                margin-top: 30px;
                display: flex;

                justify-content: flex-end;

                .scope-btn {
                    width: 350px;
                    display: flex;
                    justify-content: space-between;

                }

                .upload-btn {
                    flex: 1;

                    display: flex;

                    justify-content: center;

                }
            }

            .label-success {
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                -webkit-appearance: none;
                text-align: center;
                box-sizing: border-box;
                outline: 0;
                margin: 0;
                transition: 0.1s;
                font-weight: 500;
                user-select: none;
                padding: 12px 20px;
                font-size: 14px;
                border-radius: 4px;
                color: #fff;
                background-color: rgb(103, 194, 58) !important;
                border-color: rgb(103, 194, 58) !important;
            }

            .label-success:hover {
                background-color: rgb(133, 206, 97) !important;
                border-color: rgb(133, 206, 97) !important;
            }

        }
    }

</style>
