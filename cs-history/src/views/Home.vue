<template>
    <div class="home">
        <v-header></v-header>
        <v-aside class="adide"></v-aside>
        <div class="content">
            <div class="content-box">
                <router-view></router-view>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from "components/content/Header.vue";
import vAside from "components/common/Aside.vue";
import vFooter from "components/content/Footer.vue";
export default {
    components: {
        vHeader,
        vAside,
        vFooter,
    },
};
</script>

<style scoped>
.home {
    margin-top: 70px;
}

.content {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 55%;
    left: 28%;
    padding-top: 30px;
    background-color: #f2eddf;
}
.content-box {
    flex: 0 0 100%;
    /* display: flex; */
    height: 100%;
}
</style>