<!-- 头部 -->
<template>
    <div class="header">
        <header class="container">
            <router-link to="/">
                <img
                    src="..\..\assets\img\logo.png"
                    alt="常熟历史文化"
                    class="logo"
            /></router-link>
            <!-- 搜索框 -->
            <div class="input">
                <input v-model="search" placeholder="搜索" class="input1" />
                <button
                    type="submit"
                    class="search"
                    @click="gosearch(this.search)"
                ></button>
                <el-icon
                    style="vertical-align: middle"
                    @click="gosearch(this.search)"
                >
                    <search class="icon1" />
                </el-icon>
            </div>

            <div class="tools">
                <ul>
                    <router-link to="/"><li class="home">首页</li></router-link>
                    <div id="liu" @mouseover="liu1" @mouseout="liu2">
                        <router-link :to="{ path: '/message' }"
                            ><li class="liuyan" id="liuy1">
                                <el-icon :size="20">
                                    <edit class="icon2" />
                                </el-icon>
                                <el-icon>
                                    <caret-bottom class="icon3" />
                                </el-icon></li
                        ></router-link>

                        <router-link :to="{ path: '/message' }"
                            ><li class="mes" id="liuy2">留言板</li></router-link
                        >
                    </div>
                </ul>
            </div>
        </header>
    </div>
</template>

<style scoped>
.header {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background: #b3a994;
    z-index: 10;
}
.container {
    position: absolute;
    /* display: flex; */
    left: 18.2%;
    right: 14%;
    width: 70%;
    height: 70px;
}
.logo {
    position: absolute;
    left: 0;
    right: 87%;
    display: inline-block;
    width: 170px;
    height: 70px;
    cursor: pointer;
}
.input {
    position: absolute;
    left: 27%;
    right: 48.2%;
    top: 17px;
    width: 320px;
    height: 30px;
    background: #efefef;
}
.input1 {
    position: absolute;
    top: 5px;
    left: 20px;
    width: 300px;
    height: 20px;
    outline: none;
    border: none;
    font-size: 15px;
    line-height: 20px;
    color: #555555;
    background: #efefef;
}
.search {
    position: absolute;
    left: 90.2%;
    right: 0%;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 0;
    outline: none;
    cursor: pointer;
}
.icon1 {
    position: absolute;
    left: 296px;
    font-weight: bold;
    font-size: 18px;
    color: #dcc18b;
    cursor: pointer;
}
.tools {
    position: absolute;
    left: 71.9%;
    height: 100%;
    width: 300px;
}
li {
    list-style: none;
    height: 25px;
    width: 22%;
}
.home {
    position: absolute;
    color: #ffffff;
    top: 21px;
    border-right: 1px solid #ffffff;
}
.home:hover {
    color: #af8453;
}
.liuyan {
    position: absolute;
    top: 21px;
    left: 30%;
    border-right: 1px solid #ffffff;
    color: #ffffff;
}
.icon2 {
    position: absolute;
    left: -5px;
    top: -3px;
    font-size: 30px;
}
.icon3 {
    position: absolute;
    left: 10px;
}
.mes {
    position: absolute;
    display: none;
    left: 23%;
    top: 80%;
    width: 88px;
    height: 30px;
    padding-left: 7px;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 3px;
}
.mes:hover {
    color: #977343;
}
#liu {
    margin-left: 67px;
    width: 88px;
    height: 87px;
}
#liu:hover {
    color: #af8453;
    z-index: 9999;
}
</style>


<script>
import { Search, Edit, CaretBottom } from "@element-plus/icons-vue";
export default {
    name: "Header",
    components: {
        Search,
        Edit,
        CaretBottom,
    },
    data() {
        return {
            search: "",
        };
    },
    methods: {
        // 搜索
        gosearch(search) {
            this.$router.push({
                name: "Search",
                query: {
                    search: search,
                },
            });
        },

        // 鼠标移到范围显示留言板
        liu1() {
            const liuy2 = document.getElementById("liuy2");
            const liuy1 = document.getElementById("liuy1");
            liuy2.style.display = "block";
            liuy1.style.color = "#af8453";
        },
        // 鼠标移出范围隐藏留言板
        liu2() {
            const liuy2 = document.getElementById("liuy2");
            const liuy1 = document.getElementById("liuy1");
            liuy2.style.display = "none";
            liuy1.style.color = "#ffffff";
        },
    },
    computed: {},
};
</script>