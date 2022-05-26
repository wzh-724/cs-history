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
                    @clear="getarticle"
                >
                </el-input>
                <el-button type="primary" class="but" @click="getarticle">
                    <el-icon><search /></el-icon>
                    搜索</el-button
                >
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" size="small" @click="addArticle"
                    >创建</el-button
                >
            </el-col>
        </div>
        <!-- 表格 -->
        <div class="user-table">
            <el-table border :data="articleData">
                <el-table-column
                    label="资源Id"
                    align="center"
                    width="100"
                    prop="id"
                ></el-table-column>
                <el-table-column
                    label="标题"
                    align="center"
                    width="240"
                    show-overflow-tooltip
                    prop="title"
                ></el-table-column>
                <el-table-column
                    label="简介"
                    align="center"
                    width="240"
                    show-overflow-tooltip
                    prop="introduction"
                ></el-table-column>

                <el-table-column
                    label="分类标签"
                    align="center"
                    width="100"
                    prop="cate_name"
                ></el-table-column>
                <el-table-column
                    label="发布者"
                    align="center"
                    width="200"
                    prop="name"
                ></el-table-column>
                <el-table-column
                    label="发布时间"
                    align="center"
                    show-overflow-tooltip
                    prop="pub_data"
                ></el-table-column>
                <el-table-column align="center" width="200" label="操作">
                    <template #default="scope">
                        <el-button
                            size="mini"
                            @click="EditArticle(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteArticle(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
    </div>
</template>

<script>
// import axios from "axios";
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import axios from "axios";
// import { ElMessageBox, ElMessage } from "element-plus";
export default {
    components: {
        Search,
    },
    data() {
        return {
            articleData: [],
            queryInfo: {
                query: "",
                page: 1, //当前页
                pagesize: 8, //每页条数
            },
            total: 0,
        };
    },
    created() {
        this.getarticle();
    },
    methods: {
        // 获取表格数据
        getarticle() {
            axios
                .get("http://127.0.0.1:8003/my/article/getarticle", {
                    params: this.queryInfo,
                })
                .then((resp) => {
                    this.articleData = resp.data.tables;
                    this.total = resp.data.total;
                });
        },
        // 创建文章
        addArticle() {
            this.$router.push({ name: "WriteArticle" });
        },
        // 编辑文章
        EditArticle(index, row) {
            this.$router.push({
                name: "WriteArticle",
                params: row,
            });
        },
        // 删除文章
        deleteArticle(index, row) {
            ElMessageBox.confirm(
                "此操作将永久删除该条文章, 是否继续？",
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
                            "http://127.0.0.1:8003/my/article/deleteidarticle",
                            {
                                id: row.id,
                            }
                        )
                        .then((resp) => {
                            console.log(resp);
                            this.getarticle();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    ElMessage({
                        type: "success",
                        message: "删除文章成功！",
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "取消注销",
                    });
                });
        },
        // 改变当前页数
        currentChange(newPage) {
            this.queryInfo.page = newPage;
            this.getarticle();
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
</style>