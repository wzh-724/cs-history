<template>
    <div class="home">
        <!-- 页头 -->
        <div class="header">
            <div class="head-bar">
                <div class="left">
                    <i class="icon"
                        ><el-icon class="ic"><home-filled /></el-icon
                    ></i>
                    <span class="title">后台系统</span>
                </div>
                <div class="right">
                    <img :src="user.avatar" alt="" class="images" />

                    <div class="username">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                {{ user.name }}
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item></el-dropdown-item>
                                    <el-dropdown-item @click="logout"
                                        >退出</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="section">
                <!-- 侧边栏 -->
                <div class="nav-bar">
                    <el-menu
                        :default-active="currentMenuIndex"
                        class="el-menu-vertical-demo"
                        active-text-color="#fff"
                        text-color="#3c4043"
                    >
                        <el-menu-item
                            index="/user_manage"
                            @click="handleMenuItemClick('/user_manage')"
                        >
                            <el-icon><user-filled /></el-icon>
                            <span class="sp">用户管理</span>
                        </el-menu-item>
                        <el-menu-item
                            index="/article_manage"
                            @click="handleMenuItemClick('/article_manage')"
                        >
                            <el-icon><document /></el-icon>
                            <span class="sp">资源管理</span>
                        </el-menu-item>
                        <el-menu-item
                            index="/mes_manage"
                            @click="handleMenuItemClick('/mes_manage')"
                        >
                            <el-icon><comment /></el-icon>
                            <span class="sp">留言管理</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                <!-- 内容区 -->
                <router-view class="content"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {
    HomeFilled,
    ArrowDown,
    UserFilled,
    Comment,
    Document,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
    name: "Header",
    components: {
        HomeFilled,
        ArrowDown,
        UserFilled,
        Comment,
        Document,
    },
    data() {
        return {
            server: "http://127.0.0.1:8003",
            currentMenuIndex: this.$route.path.slice(5),
            user: JSON.parse(localStorage.getItem("user")),
        };
    },
    methods: {
        logout() {
            this.$router.push("/login");
            localStorage.removeItem("user");
            ElMessage.success("退出成功！");
        },
        handleMenuItemClick(path) {
            this.$router.push("/home" + path);
            this.currentMenuIndex = path;
        },
    },
};
</script>


<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    font-size: 16px;
}
.el-dropdown-link:hover {
    color: #66b1ff;
}
.el-dropdown-menu:hover {
    color: #66b1ff;
}
.home {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.header {
    width: 100%;
    height: 64px;
    display: flex;
    box-shadow: 0 0 8px 1px #ccc;
    background-color: #fff;
    justify-content: center;
    align-items: center;
}
.head-bar {
    height: 100%;
    flex: 0 0 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: pink; */
}
.left {
    height: 100%;
    display: flex;
    flex: 0 0 10%;
    justify-content: center;
    align-items: center;
    /* background-color: pink; */
}
.right {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 10%;
}
.icon {
    flex: 0 0 40%;
    text-align: center;
}
.ic {
    font-size: 48px;
    color: #93e5d6;
}
.title {
    flex: 0 0 60%;
    font-weight: 700;
    font-size: 18px;
}
.images {
    width: 50px;
    height: 50px;
    border-radius: 50px;
}
.username {
    flex: 0 0 60%;
    /* height: 100%; */
    /* width: px; */
    margin-left: 10px;
    height: 50px;
    display: flex;
    align-items: center;
}
.username:hover {
    color: #66b1ff;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.section {
    display: flex;
    flex: 0 0 80%;
    /* justify-content: center; */
    align-content: flex-start;
    height: 100%;
    box-sizing: border-box;
    margin-top: 30px;
    /* background-color: pink; */
}
.nav-bar {
    flex: 0 0 10%;
    min-width: 200px;
    border-bottom: 1px solid #e9eaeb;
    /* background-color: pink; */
}
.content {
    flex: 0 0 90%;
    min-width: 1000px;
    height: 750px;
    padding-top: 30px;
    background-color: #fff;
    border: 1px solid #e9eaeb;
    border-left: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    /* background-color: #93e5d6; */
}

.el-menu-item.is-active {
    background-color: #409eff !important;
    color: #fff;
}

.el-menu-item .el-icon {
    font-size: 18px;
    color: #3c4043;
    margin-bottom: 3px;
}
.sp {
    font-size: 16px;
    margin-left: 10px;
}
</style>