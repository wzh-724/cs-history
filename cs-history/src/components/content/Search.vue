<template>
    <div class="la">
        <div class="box1">
            <div class="la_content">
                <div class="renew">查找 "{{ this.$route.query.search }}"</div>
                <div>
                    <article
                        v-for="item of articles"
                        :key="item.id"
                        class="content"
                    >
                        <!-- 文章 -->
                        <div class="media">
                            <!-- 文章封面 -->
                            <div class="media-left">
                                <img
                                    :src="item.cover_img"
                                    alt="文章封面"
                                    class="imgs"
                                    @click="goarticles(item)"
                                />
                            </div>
                            <!-- 文章介绍 -->
                            <div class="media-body">
                                <h3 class="tit" @click="goarticles(item)">
                                    {{ item.title }}
                                </h3>
                                <div class="intro">
                                    {{ item.introduction }}
                                </div>
                                <div class="tag">
                                    <span
                                        class="tag-1"
                                        @click="goclassify(item.cate_name)"
                                        >{{ item.cate_name }}</span
                                    >
                                    <span class="tag-2">
                                        <el-icon class="icon"
                                            ><clock
                                        /></el-icon>
                                        {{ item.pub_data }}</span
                                    >
                                    <span class="tag-3">
                                        <el-icon> <place /> </el-icon
                                        >{{ item.agree }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <v-hotSpot></v-hotSpot>
    </div>
</template>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.la {
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: space-around; /*间隔*/
}
.box1 {
    display: flex;
    flex: 0 0 65%;
    /* height: 100%; */
    padding: 0 10px;
    /* flex-wrap: wrap; */
    flex-direction: column;
    /* background: #223542; */
}

.renew {
    width: 100%;
    height: 45px;
    line-height: 15px;
    font-size: 1rem;
    padding: 15px 0;
    border-bottom: 1px solid #eadfc9;
}
.content {
    width: 100%;
    /* background: #cfddc0; */
    padding: 20px 0;
    height: 161px;
}

.media {
    height: 121px;
    display: flex;
}
.media-left {
    flex: 0 0 25%;
    padding-right: 16px;
    margin-top: 5px;
}
.imgs {
    cursor: pointer;
    transition: all 0.2s;
}
.imgs:hover {
    transform: scale(1.05);
}
.media-body {
    position: relative;
    flex: 0 0 75%;
    margin-top: 5px;
    color: #444444;
}
img {
    width: 100%;
    height: 100%;
}
.tit {
    margin-bottom: 10px;
}
.tit:hover {
    color: #3f88fe;
}
.intro {
    height: 44px;
    line-height: 22px;
    color: #828a92;
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*溢出显示省略号*/
}
.tag {
    display: block;
    position: absolute;
    bottom: 0;
    color: #aaaaaa;
    font-size: 13px;
}
.tag-1 {
    display: inline-block;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    /* font-weight: 700; */
    text-align: center;
    color: #0084ff;
    background: #d9e2e2;
    margin-right: 3px;
    border-radius: 2px;
}
.tag-1:hover {
    color: #ffffff;
    background: #007bff;
}
.tag-2 {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    margin-top: 2px;
    margin: 0 10px;
}
.tag-3 {
    margin-left: 230px;
}
.icon {
    height: 15px;
    width: 15px;
    vertical-align: text-bottom;
}
</style>

<script>
import { Clock, Place } from "@element-plus/icons-vue";
import vHotSpot from "components/content/HotSpot.vue";
import axios from "axios";
export default {
    components: {
        vHotSpot,
        Clock,
        Place,
    },
    data() {
        return {
            articles: [],
        };
    },
    created() {
        this.getarticles();
    },
    watch: {
        $route(to, from) {
            if (to.fullPath !== from.fullPath) {
                this.getarticles();
                // document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
    },
    methods: {
        // 获取文章数据
        getarticles() {
            axios
                .get("http://127.0.0.1:8003/my/article/getarticlefr", {
                    params: {
                        search: this.$route.query.search,
                    },
                })
                .then((resp) => {
                    this.articles = resp.data.data;
                });
        },
        // 跳转文章页面
        goarticles(item) {
            this.$router.push({
                name: "Articles",
                query: { id: item.id, title: item.title },
            });
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
            }
        },
    },
};
</script>