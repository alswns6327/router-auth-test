<template>
    <div>
        <h2>Home</h2>
        <p>인증되지 않아도 접근 가능한 페이지</p>
        <div v-if="data.userInfo.authenticated">
            <p>사용자 : {{ data.userInfo.userid }}</p>
            <p>사용자의 역할 : {{ data.userInfo.roles.join(", ") }}</p>
            <button @click="logout">로그아웃</button>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo, logoutProcess } from '../utils/AuthUtil';

    export default {
        name : "Home",
        setup(){
            const router = useRouter();
            const data = reactive({userInfo : getUserInfo()});
            const logout = () => {
                logoutProcess(() => {
                    data.userInfo = {};
                    router.push({name : "home"});
                });
            }
            return {data, logout}
        }
    }
</script>

<style scoped>

</style>