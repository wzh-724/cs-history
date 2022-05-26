<template>
    <div>
        <div class="wa1">
            <div class="wa-one">
                <el-input v-model="article.title" placeholder="资源标题" />
            </div>
            <div class="wa-one">
                <el-date-picker
                    v-model="article.pub_data"
                    type="date"
                    placeholder="选择日期"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                />
            </div>
            <div class="wa-one">
                <el-select
                    v-model="article.cate_name"
                    class="m-2"
                    placeholder="选择分类标签"
                    size="large"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.cate_id"
                        :label="item.cate_name"
                        :value="item.cate_name"
                    />
                </el-select>
            </div>
        </div>
        <div class="wa2">
            <div class="wa-two">
                <el-input
                    v-model="article.introduction"
                    placeholder="资源简介"
                />
            </div>
        </div>
        <div class="wa3">
            <div class="wa3-o">封面：</div>
            <div class="wa3-t">
                <el-form :model="article" label-width="">
                    <el-form-item label="" class="item" label-width="">
                        <img
                            :src="article.cover_img"
                            ref="previewImg"
                            alt
                            style="width: 280px; height: 150px"
                        />
                    </el-form-item>
                </el-form>
                <div style="position: relative; height: 64px" class="wa3-t">
                    <el-button
                        size="small"
                        type="primary"
                        style="cursor: pointer"
                        >点击上传</el-button
                    >
                    <input
                        type="file"
                        id="file"
                        name="file"
                        ref="uploadImg"
                        accept="image/png, image/jpeg, image/gif, image/jpg,image/webp"
                        style="
                            position: absolute;
                            left: 0;
                            top: 0;
                            opacity: 0;
                            height: 32px;
                            width: 80px;
                            cursor: pointer;
                        "
                        @change="changeImg"
                    />
                </div>
            </div>
            <div class="wa3-r">
                <el-button type="primary" @click="release">发布</el-button>
            </div>
        </div>
        <!-- 编辑器 -->
        <div ref="editor" style="text-align: left"></div>
    </div>
</template>

<script>
import E from "wangeditor";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
    name: "WriteArticle",
    components: {},

    data() {
        return {
            editor: null,
            server: "http://127.0.0.1:8003",
            options: [],
            value: "",
            id: "",
            article: {
                title: "",
                introduction: "",
                cate_name: "",
                pub_data: "",
                name: JSON.parse(localStorage.getItem("user")).name,
                cover_img: "",
                content: "",
            },
        };
    },
    computed: {},
    created() {
        this.getcate();
    },
    methods: {
        // 编辑或新建文章
        getcate() {
            axios.get("http://127.0.0.1:8003/my/article/cates").then((resp) => {
                this.options = resp.data.data;
            });
            if (this.$route.params) {
                axios
                    .get("http://127.0.0.1:8003/my/article/getidarticle", {
                        params: {
                            id: this.$route.params.id,
                        },
                    })
                    .then((resp) => {
                        if (resp.data.status === 0) {
                            this.article.title = resp.data.data.title;
                            this.article.introduction =
                                resp.data.data.introduction;
                            this.article.cate_name = resp.data.data.cate_name;
                            this.article.pub_data = resp.data.data.pub_data;
                            this.article.cover_img = resp.data.data.cover_img;
                            this.article.content = resp.data.data.content;
                            this.id = this.$route.params.id;
                            this.editor.txt.html(this.article.content);
                        }
                    });
            }
        },
        // 选择文章封面
        changeImg() {
            let srcs = document.getElementById("file").files[0].name;
            this.article.cover_img = this.server + "/images/cover_img/" + srcs;
            // document.getElementById("imgs").src = s;
            // console.log(document.getElementById("imgs").src);
            // console.log(srcs);
        },

        // 发布文章
        release() {
            this.article.content = this.editor.txt.html();
            if (
                !this.article.title ||
                !this.article.introduction ||
                !this.article.cover_img ||
                !this.article.cate_name ||
                !this.article.pub_data ||
                !this.article.content
            ) {
                ElMessage.warning("请填写完整所有信息");
            } else {
                if (this.id) {
                    axios
                        .post(
                            "http://127.0.0.1:8003/my/article/updateidarticle",
                            {
                                article: this.article,
                                id: this.id,
                            }
                        )
                        .then((resp) => {
                            if (resp.data.status === 0) {
                                ElMessage.success("修改文章成功!");
                                this.$router.push({
                                    path: "/home/article_manage",
                                });
                            } else {
                                ElMessage.error("修改文章失败!");
                            }
                        });
                } else {
                    axios
                        .post("http://127.0.0.1:8003/my/article/addarticle", {
                            article: this.article,
                        })
                        .then((resp) => {
                            if (resp.data.status === 0) {
                                ElMessage.success("发布文章成功!");
                                this.$router.push({
                                    path: "/home/article_manage",
                                });
                            } else {
                                ElMessage.error("发布文章失败!");
                            }
                        });
                }
            }
        },
    },
    mounted() {
        this.editor = new E(this.$refs.editor);
        this.editor.config.height = 375;
        this.editor.config.menus = [
            "head", // 标题
            "bold", // 粗体
            "fontSize", // 字号
            "fontName", // 字体
            "italic", // 斜体
            "underline", // 下划线
            "strikeThrough", // 删除线
            "foreColor", // 文字颜色
            "backColor", // 背景颜色
            "link", // 插入链接
            "list", // 列表
            "justify", // 对齐方式
            "quote", // 引用
            "emoticon", // 表情
            "image", // 插入图片
            "video",
            "table", // 表格
            "code", // 插入代码
            "undo", // 撤销
            "redo", // 重复
            "indent", //分割线
            "lineHeight", //行高
            "splitLine", //全屏
        ];

        this.editor.create();
    },
};
</script>



<style scoped>
.wa1 {
    display: flex;
    justify-content: center;
}
.wa-one {
    flex: 1 1;
    margin-left: 120px;
}
.wa2 {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.wa-two {
    flex: 0 0 83%;
}
.wa3 {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}
.wa3-o {
    display: flex;
    align-items: center;
}
.wa3-t {
    display: flex;
    align-items: center;
    margin-left: 25px;
}
.wa3-r {
    display: flex;
    align-items: center;
    margin-left: 250px;
}
</style>