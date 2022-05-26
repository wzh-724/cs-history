<template>
    <div>
        <!-- 面包屑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                    >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>留言板</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <h2 class="title">
                <span class="tit-span"
                    ><img src="../../assets/img/public-icon3.png" alt=""
                /></span>
                <span>我要留言</span>

                <span class="tit-span"
                    ><img src="../../assets/img/public-icon4.png" alt=""
                /></span>
            </h2>
            <div style="padding: 10px; margin-left: 120px">
                <div style="text-align: center; color: black; font-size: 14px">
                    欢迎广大朋友对工作提出宝贵的意见和建议
                </div>
            </div>
            <div class="form">
                <el-form :model="form" label-width="120px">
                    <el-form-item>
                        <el-input
                            v-model="form.content"
                            type="textarea"
                            :rows="10"
                            placeholder="留言内容"
                            class="content"
                        />
                    </el-form-item>
                    <el-form-item
                        prop="email"
                        :rules="[
                            {
                                required: true,
                                message: '请输入电子邮件地址',
                                trigger: 'blur',
                            },
                            {
                                type: 'email',
                                message: '请输入正确的电子邮件地址',
                                trigger: ['blur', 'change'],
                            },
                        ]"
                    >
                        <el-input
                            v-model="form.email"
                            placeholder="邮箱"
                            class="email"
                        />
                    </el-form-item>

                    <el-form-item>
                        <el-input
                            v-model="code"
                            placeholder="验证码"
                            class="code"
                        />
                        <span
                            @click="refreshCode"
                            style="cursor: pointer"
                            class="vercode"
                        >
                            <s-vercode :identifyCode="identifyCode"></s-vercode>
                        </span>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit(form)">提交留言</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="xian"></div>
        <div class="question">
            <div class="xuan">
                <span class="now">留言选登</span>
            </div>
            <div class="box">
                <div class="box1" v-for="item in message" :key="item">
                    <div class="clearfix">
                        <div class="nnm">网友留言:</div>
                        <div class="nnc">
                            {{ item.content }}
                        </div>
                        <div class="date">{{ item.time }}</div>
                    </div>
                    <div class="clearfix">
                        <div class="nnm">留言回复:</div>
                        <div class="nnc nnc2">
                            {{ item.reply }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bread {
    height: 50px;
    padding-top: 20px;
}
.title {
    height: 70px;
    line-height: 80px;
    text-align: center;
    font-size: 26px;
    font-weight: normal;
    margin-left: 120px;
}
.tit-span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
    line-height: 1;
}
.tit-span img {
    height: 32px;
    width: 22px;
    max-width: 100px;
}
.form {
    margin: o auto;
    text-align: center;
}

.content {
    width: 660px;
    padding: 10px 0;
}
.email {
    width: 660px;
}
.el-form-item :deep(.el-form-item__error) {
    left: 140px;
}
.code {
    /* margin-right: 260px; */
    width: 540px;
}
.vercode {
    position: relative;
    top: 15px;
    display: inline-block;
}
.xian {
    background: url(../../assets/img/line1.png) center center no-repeat;
    height: 6px;
    padding: 30px 0;
    margin-left: 120px;
}
.question {
    margin-left: 120px;
}
.xuan {
    text-align: center;
    font-size: 20px;
}
.now {
    background: url(../../assets/img/list_dragon4.png) left -7px no-repeat;
    background-position: left -45px;
    display: inline-block;
    height: 100%;
    width: 150px;
}
.box1 {
    padding: 20px 0;
    border-bottom: 1px solid #dddddd;
}
.clearfix {
    margin-top: 5px;
}
.clearfix:after {
    content: "";
    display: block;
    clear: both;
}
.nnm {
    font-weight: bold;
    float: left;
    width: 82px;
    /* text-align: right; */
}
.nnc {
    float: left;
    width: 700px;
}
.nnc2 {
    /* text-align: justify; */
    font-size: 14px;
}
.date {
    float: right;
}
</style>

<script>
import { ElMessage } from "element-plus";
import SVercode from "@/components/content/VerificationCode.vue";
import axios from "axios";
export default {
    components: {
        SVercode,
    },
    data() {
        return {
            form: {
                content: "",
                email: "",
                time: "",
            },
            message: {},
            code: "",
            // 图片验证码
            identifyCode: "",
            // 验证码规则
            identifyCodes: "123456789ABCDEFGHGKMNPQRSTUVWXY",
        };
    },
    created() {
        this.getmessage();
        this.makeCode(this.identifyCodes, 4);
        this.getDate();
    },
    methods: {
        // 留言选登
        getmessage() {
            axios
                .get("http://127.0.0.1:8003/my/message/getmessage")
                .then((resp) => {
                    this.message = resp.data.data;
                });
        },
        // 切换验证码
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        // 生成随机验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode +=
                    this.identifyCodes[
                        Math.floor(
                            Math.random() * (this.identifyCodes.length - 0) + 0
                        )
                    ];
            }
        },
        // 提交
        submit() {
            if (this.code === this.identifyCode) {
                axios
                    .post("http://127.0.0.1:8003/my/message/newmessage", {
                        form: this.form,
                    })
                    .then((resp) => {
                        if (resp.data.status === 0) {
                            ElMessage({
                                message: resp.data.message,
                                type: "success",
                            });
                        }
                    });
                this.getmessage();
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
                this.form.content = "";
                this.form.email = "";
                this.code = "";
            } else {
                ElMessage.error("验证码错误");
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            }
        },
        //获取当前日期的方法
        getDate() {
            var nowDate = new Date();
            var y = nowDate.getFullYear(); //年
            var m = (nowDate.getMonth() + 1).toString().padStart(2, "0"); //月
            var d = nowDate.getDate().toString().padStart(2, "0"); //日
            this.form.time = `${y}-${m}-${d}`;
        },
    },
};
</script>