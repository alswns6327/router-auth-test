<template>
    <div>
        <h2>Admins</h2>
        <p>admins 역할이 있어야만 접근할 수 있는 페이지</p>
        <p>사용자 : {{ userInfo.userid }}</p>
        <p>사용자의 역할 : {{ userInfo.roles.join(", ") }}</p>
        <button @click="logout">로그아웃</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getUserInfo, logoutProcess } from '../utils/AuthUtil';

    export default {
        name : "Admins",
        setup(){
            const router = useRouter();
            const userInfo = getUserInfo();
            const logout = () => {
                logoutProcess(() => {
                    userInfo = {};
                    router.push({name : "home"});
                });
            }
            return {userInfo, logout}
        }
    }
</script>

<style scoped>

</style>