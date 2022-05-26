<template>
    <div id="login">
        <div class="box">
            <el-form :label-position="labelPosition" label-width="50px">
                <h3>常熟历史文化管理系统</h3>
                <el-form-item label="用户">
                    <el-input
                        v-model="name"
                        clearable
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        placeholder="请输入密码"
                        v-model="password"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 30px">
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" size="medium" @click="login"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
    name: "Login",
    data() {
        return {
            labelPosition: "right",
            name: "",
            password: "",
            user: [],
        };
    },
    methods: {
        reset() {
            this.name = "";
            this.password = "";
        },

        login() {
            let name = this.name;
            let password = this.password;
            if (!name) {
                ElMessage({
                    message: "请输入用户名!",
                    type: "warning",
                });
            } else if (!password) {
                ElMessage({
                    message: "请输入密码!",
                    type: "warning",
                });
            } else {
                axios
                    .post("http://127.0.0.1:8003/api/login", {
                        name,
                        password,
                    })
                    .then((resp) => {
                        if (resp.data.status === 1) {
                            ElMessage.error("用户名或密码不正确");
                        } else {
                            this.$router.push({ path: "/home" });
                            localStorage.setItem(
                                "user",
                                JSON.stringify(resp.data.data)
                            );
                            ElMessage({
                                message: "登录成功!",
                                type: "success",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
};
</script>

<style>
#login {
    width: 100%;
    height: 100%;
    background: url("../assets/img/bg_admin.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: #fff;
}
.box {
    width: 500px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    border-radius: 4px;
    box-shadow: 0 0 8px 8px #ccc;
}
h3 {
    margin-bottom: 40px;
    font-size: 36px;
    letter-spacing: 2px;
    color: #888;
    text-align: center;
}
</style>
