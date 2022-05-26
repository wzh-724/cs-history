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
                    @clear="getmessage"
                >
                </el-input>
                <el-button type="primary" @click="getmessage" class="but">
                    <el-icon><search /></el-icon>
                    搜索</el-button
                >
            </el-col>
        </div>
        <!-- 表格 -->
        <div class="user-table">
            <el-table border :data="mesData">
                <el-table-column
                    label="留言Id"
                    align="center"
                    width="100"
                    prop="mes_id"
                ></el-table-column>
                <el-table-column
                    label="邮箱"
                    align="center"
                    width="200"
                    show-overflow-tooltip
                    prop="email"
                ></el-table-column>
                <el-table-column
                    label="时间"
                    align="center"
                    width="120"
                    show-overflow-tooltip
                    prop="time"
                ></el-table-column>

                <el-table-column
                    label="留言"
                    align="center"
                    width="300"
                    show-overflow-tooltip
                    prop="content"
                ></el-table-column>

                <el-table-column
                    label="回复"
                    align="center"
                    show-overflow-tooltip
                    prop="reply"
                ></el-table-column>
                <el-table-column align="center" width="200" label="操作">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="EditMessage(scope.$index, scope.row)"
                            >回复</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteMessage(scope.$index, scope.row)"
                            >删除</el-button
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
                layout="pager,jumper"
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
                    :model="mesInfo"
                >
                    <el-form-item label="用户留言" prop="content" class="item">
                        <el-row>
                            <el-col :span="12">
                                <el-input
                                    type="textarea"
                                    v-model="mesInfo.content"
                                    disabled
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>

                    <el-form-item label="回复" class="item">
                        <el-row
                            ><el-col :span="12">
                                <el-input
                                    type="textarea"
                                    v-model="mesInfo.reply"
                                    :autosize="{ minRows: 2, maxRows: 10 }"
                                ></el-input> </el-col
                        ></el-row>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false"
                            >取消</el-button
                        >
                        <el-button type="primary" @click="manageMesInfo"
                            >确定</el-button
                        >
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>


<script>
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import axios from "axios";
export default {
    components: {
        Search,
    },
    data() {
        return {
            mesData: [],
            queryInfo: {
                query: "",
                page: 1, //当前页
                pagesize: 8, //每页条数
            },
            total: 0,
            server: "http://127.0.0.1:8003",
            mesInfo: {
                mes_id: "",
                eamil: "",
                time: "",
                content: "",
                reply: "",
            },
            dialogFormVisible: false,
            dialogTitle: "",
        };
    },
    created() {
        this.getmessage();
    },
    methods: {
        // 获取表格数据
        getmessage() {
            axios
                .get("http://127.0.0.1:8003/my/message/getmessageback", {
                    params: this.queryInfo,
                })
                .then((resp) => {
                    this.mesData = resp.data.tables;
                    this.total = resp.data.total;
                });
        },

        // 编辑用户留言
        EditMessage(index, row) {
            this.dialogTitle = "回复用户留言";
            this.mesInfo = row;
            this.dialogFormVisible = true;
        },

        // 删除用户留言
        deleteMessage(index, row) {
            let mes_id = row.mes_id;
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
                        .post(
                            "http://127.0.0.1:8003/my/message/deletemessage",
                            {
                                mes_id,
                            }
                        )
                        .then((resp) => {
                            console.log(resp);
                            this.getmessage();
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
        },
        //  回复留言
        manageMesInfo() {
            if (!this.mesInfo.reply) {
                ElMessage.error("请完成留言回复");
            } else {
                axios
                    .post("http://127.0.0.1:8003/my/message/updatemessage", {
                        mesInfo: this.mesInfo,
                    })
                    .then((resp) => {
                        if (resp.data.status === 0) {
                            this.dialogFormVisible = false;
                            this.getmessage();
                            ElMessage.success(resp.data.message);
                        } else {
                            ElMessage.error(resp.data.message);
                        }
                    });
            }
        },
        // 改变当前页数
        currentChange(newPage) {
            this.queryInfo.page = newPage;
            this.getmessage();
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