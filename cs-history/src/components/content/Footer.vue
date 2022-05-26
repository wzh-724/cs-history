<!-- 底部 -->
<template>
    <div class="foo">
        <div class="fluid">
            <div class="footer-left">
                <img src="../../assets/img/logo.png" alt="" class="imgs" />
            </div>
            <div class="footer-archival">
                <a class="as">友情链接</a>
                <a class="as">联系我们</a>
                <a class="as">版权声明</a>
                <div class="em">联系电邮: wuzhihan724@163.com</div>
            </div>
            <div class="footer-right"></div>
        </div>
    </div>
</template>

<style scoped>
.foo {
    bottom: 0;
    width: 100%;
    height: 160px;
    padding: 40px 0;
    background: #b3a994;
    z-index: 10;
}
.fluid {
    margin: 0 auto;
    width: 1245px;
    padding: 0 15px;
    height: 100%;
}
.footer-left {
    float: left;
    height: 100%;
    width: 170px;
}
.footer-archival {
    float: left;
    padding-left: 150px;
}
.footer-right {
    float: right;
}
.imgs {
    width: 100%;
    height: 100%;
}
.as {
    padding: 0 50px;
    color: #101010;
    font-size: 18px;
}
.em {
    color: #101010;
    padding-top: 20px;
    padding-left: 50px;
}
</style>