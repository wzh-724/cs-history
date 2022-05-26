<!-- 文章界面 -->
<template>
    <div>
        <!-- 面包屑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                    >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item
                    ><a @click="goclassify(this.article.cate_name)">{{
                        this.article.cate_name
                    }}</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>正文</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 正文 -->
        <div class="text">
            <!-- 标题 -->
            <h1 class="title">{{ this.article.title }}</h1>
            <div class="fon">
                <span>发布者：{{ this.article.name }}</span>
                <span class="spn1">时间：{{ this.article.pub_data }}</span>
                <span class="spn2">阅读量：{{ this.article.reading + 1 }}</span>
                <span class="spn3"
                    >字体大小： <button @click="reduce">A-</button
                    ><button @click="defa">默认</button
                    ><button @click="increase">A+</button></span
                >
            </div>
            <!-- 正文 -->
            <div id="content" v-html="this.article.content"></div>
            <!-- 点赞功能 -->
            <div class="dian">
                <button class="dianzan" @click="postlike">
                    <el-icon> <place /> </el-icon>点赞({{ this.article.agree }})
                </button>
            </div>

            <div>
                <div class="dis">
                    <span>上一篇 ></span
                    ><span class="art" @click="goarticle(farticle)">
                        {{ this.farticle.title }}</span
                    >
                </div>
                <div class="dis">
                    <span>下一篇 ></span
                    ><span class="art" @click="goarticle(barticle)">
                        {{ this.barticle.title }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Place } from "@element-plus/icons-vue";

export default {
    components: {
        Place,
    },
    data() {
        return {
            size: 16,
            id: "",
            article: {},
            farticle: {},
            barticle: {},
            reading: "",
        };
    },
    created() {
        this.getarticle();
        this.updateread();
    },

    watch: {
        $route(to, from) {
            if (to.fullPath !== from.fullPath) {
                this.getarticle();
                this.updateread();
                // document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
    },
    methods: {
        // 获取文章数据
        getarticle() {
            this.farticle = {};
            this.barticle = {};
            this.id = this.$route.query.id;
            axios
                .get("http://127.0.0.1:8003/my/article/getidarticlefr", {
                    params: {
                        id: this.id,
                    },
                })
                .then((resp) => {
                    switch (resp.data.length) {
                        case 1:
                            this.article = resp.data.data[0];
                            break;
                        case 2:
                            if (this.id == resp.data.data[0].id) {
                                // 本文
                                this.article = resp.data.data[0];
                                // 后一篇
                                this.barticle = resp.data.data[1];
                            } else {
                                // 本文
                                this.article = resp.data.data[1];
                                // 前一篇
                                this.farticle = resp.data.data[0];
                            }
                            break;
                        case 3: // 本文
                            this.article = resp.data.data[1];
                            // 前一篇
                            this.farticle = resp.data.data[0];
                            // 后一篇
                            this.barticle = resp.data.data[2];
                            break;
                    }
                });
        },
        //访问量加一
        updateread() {
            this.id = this.$route.query.id;
            this.reading = parseInt(this.$route.query.reading) + 1;
            axios
                .post("http://127.0.0.1:8003/my/article/updateread", {
                    id: this.id,
                    reading: this.reading,
                })
                .then(() => {});
        },
        // 跳转分类
        goclassify(name) {
            if (name === "最新资讯") {
                this.$router.push({ name: "LatestNews" });
            } else if (name === "人物事迹") {
                this.$router.push({ name: "CharacterDeeds" });
            } else if (name === "历史遗迹") {
                this.$router.push({ name: "HistoricSites" });
            } else if (name === "历史故事") {
                this.$router.push({ name: "HistoricalStory" });
            } else if (name === "历史文学") {
                this.$router.push({ name: "HistoricalLiterature" });
            } else if (name === "精品文物") {
                this.$router.push({ name: "CulturalRelics" });
            }
        },
        //改变字体大小
        reduce() {
            let content = document.getElementById("content");
            this.size = this.size - 2;
            content.style.fontSize = this.size + "px";
        },
        defa() {
            let content = document.getElementById("content");
            content.style.fontSize = 16 + "px";
        },
        increase() {
            let content = document.getElementById("content");
            this.size = this.size + 2;
            content.style.fontSize = this.size + "px";
        },
        // 点赞
        postlike() {
            axios
                .post("http://127.0.0.1:8003/my/article/postlike", {
                    id: this.article.id,
                    agree: this.article.agree,
                })
                .then(() => {
                    this.getarticle();
                });
        },
        goarticle(item) {
            this.$router.push({
                // name: "Articles",
                query: {
                    id: item.id,
                    title: item.title,
                    reading: item.reading,
                },
            });
        },
    },
};
</script>

<style scoped>
.text {
    position: relative;
    padding: 15px 115px;
    width: 100%;
    /* height: 500px; */
    background: #eadfc9;
}
.bread {
    padding: 20px 15px 15px 15px;
}
.title {
    padding-top: 10px;
    color: #000000;
}
.fon {
    font-size: 14px;
    color: #ae999f;
}
.spn1 {
    padding-left: 15px;
}
.spn2 {
    padding-left: 15px;
}
.spn3 {
    float: right;
}

button {
    width: 40px;
    background: #f2eddf;
    color: #696193;
    border: 0;
    margin-left: 10px;
}
button:hover {
    background: #dcc18b;
    color: #f9f4ec;
}
#content {
    margin-top: 50px;
}
.dian {
    text-align: center;
    margin: 60px 0;
}
.dianzan {
    width: 120px;
    height: 40px;
    background: #007bff;
    color: #ffffff;
    border-radius: 5px;
}
.dis {
    margin-top: 25px;
}
.art:hover {
    border-bottom: 1px solid #7b6686;
    cursor: pointer;
}
</style>