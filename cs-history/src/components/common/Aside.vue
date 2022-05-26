<template>
    <div class="sidebar">
        <!-- <el-menu
            class="sidebar-el-menu"
            background-color="#f2eddf"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router:true
        >
            <router-link to="/latestnews">
                <el-menu-item index="1" class="heigh1">
                    <span class="color1"> 最新资讯</span>
                </el-menu-item></router-link
            >
            <router-link to="/characterdeeds"
                ><el-menu-item index="2" class="heigh1">
                    <span class="color1"> 人物事迹</span>
                </el-menu-item></router-link
            >
            <router-link to="/historicsites"
                ><el-menu-item index="3" class="heigh1">
                    <span class="color1"> 历史遗迹</span>
                </el-menu-item></router-link
            >
            <router-link to="/historicalstory"
                ><el-menu-item index="4" class="heigh1">
                    <span class="color1"> 历史故事</span>
                </el-menu-item></router-link
            >
            <router-link to="/historicalliterature"
                ><el-menu-item index="5" class="heigh1">
                    <span class="color1"> 历史文学</span>
                </el-menu-item></router-link
            >
            <router-link to="/culturalrelics"
                ><el-menu-item index="6" class="heigh1">
                    <span class="color1"> 精品文物</span>
                </el-menu-item></router-link
            >
        </el-menu> -->
        <el-menu
            :default-active="menu"
            class="sidebar-el-menu"
            background-color="#f2eddf"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
        >
            <el-menu-item
                index="/latestnews"
                class="heigh1"
                @click="handleMenuItemClick('/latestnews')"
            >
                <span class="color1"> 最新资讯</span>
            </el-menu-item>
            <el-menu-item
                index="/characterdeeds"
                class="heigh1"
                @click="handleMenuItemClick('/characterdeeds')"
            >
                <span class="color1"> 人物事迹</span>
            </el-menu-item>
            <el-menu-item
                index="/historicsites"
                class="heigh1"
                @click="handleMenuItemClick('/historicsites')"
            >
                <span class="color1"> 历史遗迹</span>
            </el-menu-item>
            <el-menu-item
                index="/historicalstory"
                class="heigh1"
                @click="handleMenuItemClick('/historicalstory')"
            >
                <span class="color1"> 历史影像</span>
            </el-menu-item>
            <el-menu-item
                index="/historicalliterature"
                class="heigh1"
                @click="handleMenuItemClick('/historicalliterature')"
            >
                <span class="color1"> 历史技艺</span>
            </el-menu-item>
            <el-menu-item
                index="/culturalrelics"
                class="heigh1"
                @click="handleMenuItemClick('/culturalrelics')"
            >
                <span class="color1"> 精品文物</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
    left: 18.2%;
    height: 500px;
    overflow-y: scroll;
    top: 100px;
    width: 8%;
    border-right: 0px;
    z-index: 10;
    /* position: sticky; */
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 150px;
}
.sidebar > ul {
    height: 100%;
}
.color1 {
    display: block;
    font-weight: 700;
    font-size: 18px;
    color: #555555;
}
.color1:hover {
    color: #fff;
}
.heigh1 {
    height: 70px;
    line-height: 70px;
    text-align: center;
}
.heigh1:hover {
    background: #dcc18b !important;
}
.el-menu-item.is-active {
    /* background-color: #dcc18b !important; */
    color: #fff;
}
</style>

<script>
export default {
    data() {
        return {
            menu: "/latestnews",
        };
    },
    methods: {
        handleMenuItemClick(path) {
            this.$router.push(path);
            this.menu = path;
        },
    },
};
</script>