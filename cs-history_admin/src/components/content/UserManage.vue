<template>
    <div>
        <!-- 搜索 -->
        <div class="top">
            <el-col :span="10" class="col">
                <el-input
                    placeholder="请输入内容"
                    v-model="queryInfo.query"
                    class="input-with-select ipt"
                    clearable
                    style="width: 100%"
                    @clear="gettableDate"
                >
                </el-input>
                <el-button type="primary" @click="gettableDate" class="but">
                    <el-icon><search /></el-icon>
                    搜索</el-button
                >
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" size="small" @click="addUser"
                    >添加用户</el-button
                >
            </el-col>
        </div>
        <!-- 表格 -->
        <div class="user-table">
            <el-table border :data="tableData">
                <el-table-column
                    label="用户 ID"
                    align="center"
                    width="130"
                    prop="user_id"
                ></el-table-column>
                <el-table-column
                    label="用户名"
                    align="center"
                    width="130"
                    show-overflow-tooltip
                    prop="name"
                ></el-table-column>

                <el-table-column
                    label="手机"
                    align="center"
                    width="130"
                    prop="phone"
                ></el-table-column>
                <el-table-column
                    label="邮箱"
                    align="center"
                    width="180"
                    prop="email"
                ></el-table-column>
                <el-table-column
                    label="个人签名"
                    show-overflow-tooltip
                    prop="sign"
                ></el-table-column>
                <el-table-column align="center" width="200" label="操作">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >注销</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                @current-change="currentChange"
                background
                :current-page="queryInfo.page"
                layout="pager"
                :page-size="queryInfo.pagesize"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 用户弹框 -->
        <div>
            <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
                <el-form
                    :label-position="labelPosition"
                    label-width="80px"
                    :model="userInfo"
                    :rules="rules"
                >
                    <el-form-item label="用户名" prop="name" class="item">
                        <el-row
                            ><el-col :span="12">
                                <el-input v-model="userInfo.name"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" class="item">
                        <el-row
                            ><el-col :span="12">
                                <el-input
                                    v-model="userInfo.password"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone" class="item">
                        <el-row
                            ><el-col :span="12">
                                <el-input
                                    v-model="userInfo.phone"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" class="item">
                        <el-row>
                            <el-col :span="12">
                                <el-input
                                    v-model="userInfo.email"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>
                    <el-form-item label="头像" class="item">
                        <el-row
                            ><el-col :span="12">
                                <img
                                    :src="
                                        userInfo.avatar
                                            ? userInfo.avatar
                                            : server +
                                              '/images/avatar/monkey.png'
                                    "
                                    ref="previewImg"
                                    alt
                                    style="width: 80px; height: 80px"
                                />
                                <div style="position: relative; height: 64px">
                                    <el-button
                                        size="small"
                                        type="primary"
                                        style="
                                            position: absolute;
                                            left: 0;
                                            top: 0;
                                            cursor: pointer;
                                        "
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
                                </div> </el-col
                        ></el-row>
                    </el-form-item>
                    <el-form-item label="个人签名" class="item">
                        <el-row
                            ><el-col :span="12">
                                <el-input
                                    type="textarea"
                                    v-model="userInfo.sign"
                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="quxiao()">取消</el-button>
                        <el-button type="primary" @click="manageUserInfo"
                            >确定</el-button
                        >
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
    components: {
        Search,
    },
    data() {
        let checkName = (rule, value, callback) => {
            if (!value) {
                callback(new Error("用户名不能为空！"));
            } else {
                if (/^[a-zA-Z0-9]{5,15}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("用户名格式错误(5-15位字母+数字)"));
                }
            }
        };
        let checkPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入手机号码"));
            } else {
                if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("手机号码格式错误"));
                }
            }
        };
        let checkPassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入密码"));
            } else {
                if (
                    /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(value)
                ) {
                    callback();
                } else {
                    callback(new Error("密码格式错误(6-15位的字母+数字)"));
                }
            }
        };
        return {
            server: "http://127.0.0.1:8003",
            userInfo: {
                name: "",
                password: "",
                phone: "",
                email: "",
                sign: "",
                avatar: "",
            },
            dialogFormVisible: false,
            dialogTitle: "",
            tableData: [], //表格数据
            labelPosition: "right",
            total: 0,
            queryInfo: {
                query: "",
                page: 1,
                pagesize: 8,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    { validator: checkName, trigger: "blur" },
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur",
                    },
                    { validator: checkPhone, trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: checkPassword, trigger: "blur" },
                ],
            },
        };
    },
    created() {
        this.gettableDate();
    },
    methods: {
        // 获取用户内容、分页、模糊查询
        gettableDate() {
            axios
                .get("http://127.0.0.1:8003/my/getcurrentpage", {
                    params: this.queryInfo,
                })
                .then((resp) => {
                    this.tableData = resp.data.tables;
                    this.total = resp.data.total;
                });
        },
        quxiao() {
            this.dialogFormVisible = false;
            this.gettableDate();
        },
        //添加用户
        addUser() {
            if (JSON.parse(localStorage.getItem("user")).user_id === 1) {
                this.dialogTitle = "添加用户";
                this.userInfo = {};
                this.dialogFormVisible = true;
            } else {
                ElMessage({
                    showClose: true,
                    message: "没有权限添加用户!",
                    type: "warning",
                });
            }
        },

        // 编辑用户信息
        handleEdit(index, row) {
            let user_id = row.user_id;
            if (user_id === JSON.parse(localStorage.getItem("user")).user_id) {
                this.dialogTitle = "编辑用户信息";
                this.userInfo = row;
                this.dialogFormVisible = true;
            } else {
                if (JSON.parse(localStorage.getItem("user")).user_id === 1) {
                    this.dialogTitle = "编辑用户信息";
                    this.userInfo = row;
                    this.dialogFormVisible = true;
                } else {
                    ElMessage({
                        showClose: true,
                        message: "没有权限修改用户!",
                        type: "warning",
                    });
                }
            }
        },

        // 注销用户
        handleDelete(index, row) {
            let user_id = row.user_id;
            if (JSON.parse(localStorage.getItem("user")).user_id === 1) {
                // 不能注销根管理员
                if (user_id === 1) {
                    ElMessage({
                        type: "info",
                        message: "根管理员，不能注销",
                    });
                } else {
                    ElMessageBox.confirm(
                        "此操作将永久删除该用户所有信息, 是否继续？",
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }
                    )
                        .then(() => {
                            axios
                                .post("http://127.0.0.1:8003/my/deleteuser", {
                                    user_id,
                                })
                                .then((resp) => {
                                    console.log(resp);
                                    this.gettableDate();
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            ElMessage({
                                type: "success",
                                message: "删除用户成功！",
                            });
                        })
                        .catch(() => {
                            ElMessage({
                                type: "info",
                                message: "取消注销",
                            });
                        });
                }
            } else {
                ElMessage({
                    showClose: true,
                    message: "没有权限注销用户!",
                    type: "warning",
                });
            }
        },
        // 改变头像
        changeImg() {
            let srcs = document.getElementById("file").files[0].name;
            this.userInfo.avatar = this.server + "/images/avatar/" + srcs;
            // document.getElementById("imgs").src = s;
            // console.log(document.getElementById("imgs").src);
            // console.log(this.userInfo.avatar);
        },
        manageUserInfo() {
            if (
                !/^[a-zA-Z0-9]{5,15}$/.test(this.userInfo.name) ||
                !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(
                    this.userInfo.password
                ) ||
                !/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(
                    this.userInfo.phone
                )
            ) {
                ElMessage.error("请完成必填内容");
            } else {
                // 编辑用户
                if (this.dialogTitle === "编辑用户信息") {
                    axios
                        .get("http://127.0.0.1:8003/my/selectusername", {
                            params: {
                                name: this.userInfo.name,
                                user_id: this.userInfo.user_id,
                            },
                        })
                        .then((resp) => {
                            if (resp.data.status === 0) {
                                axios
                                    .post(
                                        "http://127.0.0.1:8003/my/updateuserinfo",
                                        {
                                            userInfo: this.userInfo,
                                        }
                                    )
                                    .then((resp) => {
                                        if (resp.data.status === 0) {
                                            this.dialogFormVisible = false;
                                            ElMessage.success(
                                                resp.data.message
                                            );
                                        } else {
                                            ElMessage.error(resp.data.message);
                                        }
                                    });
                            } else {
                                ElMessage.error(resp.data.message);
                            }
                        });
                } else {
                    // 添加用户
                    axios
                        .get("http://127.0.0.1:8003/my/selectusername", {
                            params: {
                                name: this.userInfo.name,
                                user_id: this.userInfo.user_id,
                            },
                        })
                        .then((resp) => {
                            if (resp.data.status === 0) {
                                axios
                                    .post("http://127.0.0.1:8003/api/reguser", {
                                        userInfo: this.userInfo,
                                    })
                                    .then((resp) => {
                                        if (resp.data.status === 0) {
                                            this.dialogFormVisible = false;
                                            ElMessage.success("添加用户成功!");
                                        } else {
                                            ElMessage.error(resp.data.message);
                                        }
                                    });
                            } else {
                                ElMessage.error(resp.data.message);
                            }
                        });
                }
            }
        },
        // 改变当前页数
        currentChange(newPage) {
            this.queryInfo.page = newPage;
            this.gettableDate();
        },
        // 查询
        search() {
            this.gettableDate();
        },
    },
};
</script>


<style scoped>
.top {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    margin-bottom: 30px;
}
.col {
    display: flex;
    justify-content: center;
    align-items: center;
}
.but {
    height: 40px;
    border: 1px solid #dcdfe6;
    border-left: none;
    background: #f5f7fa;
    color: #aa93b2;
    border-radius: inherit !important;
}
.user-table {
    width: 90%;
    min-width: 900px;
    margin: 0 auto;
    margin-bottom: 30px;
}
.block {
    text-align: center;
}

.item {
    padding-left: 20%;
}
</style>