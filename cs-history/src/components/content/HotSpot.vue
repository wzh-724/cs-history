<template>
    <div class="hot">
        <div class="visualization" ref="vis"></div>
        <div class="head">
            <div class="head-o">
                <h3 class="h1">热点信息</h3>
                <div>
                    <article
                        class="con"
                        v-for="item of articles"
                        :key="item.id"
                    >
                        <div class="con-left">
                            <span
                                class="con-left-o"
                                @click="goarticles(item)"
                                >{{ item.title }}</span
                            >
                        </div>
                        <div class="con-right">
                            <img
                                :src="item.cover_img"
                                alt="图片"
                                class="imgs"
                            />
                        </div>
                    </article>
                </div>
                <div class="change">
                    <span class="spn" @click="changehot()">换一批</span>
                </div>
            </div>
        </div>
        <div class="bod">
            <h3 class="h2">文物速递</h3>
            <div class="bod-b">
                <el-carousel
                    height="250px"
                    direction="vertical"
                    arrow="hover"
                    v-if="relics.length > 0"
                >
                    <el-carousel-item v-for="item in relics" :key="item">
                        <div @click="goarticles(item)">
                            <img :src="item.cover_img" alt="" class="imgs2" />
                            <h3 class="h3">{{ item.title }}</h3>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 16px;
    opacity: 0.75;
    /* line-height: 200px; */
    margin: 0;
    /* text-align: center; */
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.hot {
    flex: 0 0 35%;
    padding: 0 10px;
}
.visualization {
    padding: 0 0 0 13px;
    height: 340px;
    background: #eadfc9;
    margin-bottom: 15px;
}
.head {
    /* height: 620px; */
    padding: 0 13px;
    background: #eadfc9;
    margin-bottom: 15px;
}
.bod {
    padding: 0 13px;
    background: #eadfc9;
    height: 340px;
}
.h1 {
    color: #334568;
    padding-top: 25px;
}
.con {
    display: flex;
    width: 100%;
    height: 100px;
    padding-top: 20px;
}
.con-left {
    flex: 0 0 65%;
    height: 100%;
    padding-right: 10px;
    line-height: 25px;
}
.con-left-o {
    color: #000000;
}
.con-left-o:hover {
    border-bottom: 1px solid #000000;
}
.con-right {
    flex: 0 0 35%;
    height: 100%;
    background: blanchedalmond;
}
.imgs {
    width: 100%;
    height: 100%;
}
.change {
    margin-top: 20px;
    padding: 15px 0;
    font-size: 18px;
    color: #000000;
    text-align: center;
    border-top: 1px solid #cdc5b7;
}
.spn:hover {
    border-bottom: 1px solid #000;
    background: #d9e2e2;
}
.h2 {
    color: #334568;
    padding: 25px 10px 0 10px;
}
.bod-b {
    padding: 15px 10px 0 10px;
}
.h3 {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
}
.h3:hover {
    text-decoration: underline;
}
.imgs2 {
    width: 100%;
    height: 215px;
}
</style>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
    data() {
        return {
            articles: [],
            relics: [],
            start: 0,
            name: "精品文物",
            datecate: [
                "人物事迹",
                "历史遗迹",
                "历史影像",
                "历史技艺",
                "精品文物",
            ],
            dates: [],
            option: [],
        };
    },
    created() {
        this.gethotspot();
        this.getrelics();
        this.getdate();
    },
    mounted() {
        setTimeout(() => {
            this.initCharts();
        }, 300);
    },

    methods: {
        // 获取文章
        gethotspot() {
            axios
                .get("http://127.0.0.1:8003/my/article/gethotspot", {
                    params: {
                        start: this.start,
                    },
                })
                .then((resp) => {
                    this.articles = resp.data.data;
                });
        },
        // 获取可视化数据
        getdate() {
            for (let i in this.datecate) {
                axios
                    .get("http://127.0.0.1:8003/my/article/catenameread", {
                        params: { cate_name: this.datecate[i] },
                    })
                    .then((resp) => {
                        let sum = 0;
                        for (let j = 0; j < resp.data.length; j++) {
                            sum += resp.data.data[j].reading;
                        }
                        this.option.push(resp.data.data[0].cate_name);
                        this.dates.push(sum);
                    });
            }
        },
        // 轮播图
        getrelics() {
            axios
                .get("http://127.0.0.1:8003/my/article/getrelics", {
                    params: {
                        cate_name: this.name,
                    },
                })
                .then((resp) => {
                    this.relics = resp.data.data;
                });
        },
        // 跳转文章页面
        goarticles(item) {
            this.$router.push({
                name: "Articles",
                query: {
                    id: item.id,
                    title: item.title,
                    reading: item.reading,
                },
            });
        },
        // 换一批
        changehot() {
            this.start += 5;
            axios
                .get("http://127.0.0.1:8003/my/article/gethotspot", {
                    params: {
                        start: this.start,
                    },
                })
                .then((resp) => {
                    this.articles = resp.data.data;
                });
        },
        // 访问量可视化
        initCharts() {
            let myChart = echarts.init(this.$refs.vis);
            //设置参数
            myChart.setOption({
                title: {
                    text: "访问量排名",
                },
                grid: {
                    left: 55,
                },
                legend: {},
                xAxis: {
                    type: "value",
                    // boundaryGap: [0, 0.01],
                },
                yAxis: {
                    type: "category",
                    // data: ["USA", "India", "China", "World"],
                    data: this.option,
                },
                series: [
                    {
                        name: "访问量",
                        type: "bar",
                        label: {
                            show: true,
                        },
                        // data: [6300, 4800, 3200, 1800, 640],
                        data: this.dates,
                    },
                ],
            });
        },
    },
};
</script>