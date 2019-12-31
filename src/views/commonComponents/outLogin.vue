<template>
    <!-- 废弃 -->
    <div>
        <!-- <span @click="getOpenIdAjax()" style="width:30px;height:20px;float:right">11</span>  -->
        <img @click="outLogin()" class="outLogin" :src="logout" alt="">
    </div>
</template>
<script>
import logout from '@/common/images/logout.png'
import {cookie} from '@/common/js/common.js'
import {getWXOpenId} from '@/common/js/resource.js'
export default {
    data(){
        return{
            logout: logout
        }
    },
    methods:{
        getOpenIdAjax(){
             if(this.GetURLParameter("code") != null && this.$store.state.isGetCode){
                var params = {
                    body: {
                        code: this.GetURLParameter("code"),
                    },
                    header: {
                        token: this.$store.state.token,
                        time_stamp: new Date().getTime()
                    }
                }
                getWXOpenId(params).then(res => {
                    console.log(res);
                    this.$store.commit("isGetCode",false);
                    cookie.setCookie('isGetCode',false,1);
                });
            }
        },
        GetURLParameter(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return decodeURI(r[2]);
            return null;
        },
        outLogin(){
            this.$store.commit("isLogin",false);
            this.$store.commit("isGetCode",'');
            this.$store.commit("token",'');
            this.$store.commit("account",'');
            this.$store.commit("accountMy",'');
            this.$store.commit("userName",'');
            this.$store.commit("userNameMy",'');
            this.$store.commit("userType", '');
            this.$store.commit("userTypeMy", '');
            this.$store.commit("isSettlement", '');
            this.$store.commit("isSettlementMy", '');

            cookie.setCookie('isLogin',false,-1);
            cookie.setCookie('isGetCode',false,-1);
            cookie.setCookie('token', '',-1);
            cookie.setCookie('account', '',-1);
            cookie.setCookie('accountMy', '',-1);
            cookie.setCookie('userName', '',-1);
            cookie.setCookie('userNameMy', '',-1);
            cookie.setCookie('userType', '',-1);
            cookie.setCookie('userTypeMy', '',-1);
            cookie.setCookie('isSettlement', '',-1);
            cookie.setCookie('isSettlementMy', '',-1);
            this.$router.push('/login');
        }
    },
    mounted(){
        this.getOpenIdAjax();
    }
}
</script>
<style scoped>
    .outLogin{
        position: fixed;
        bottom: 0.67rem;
        right: 0.2rem;
        z-index: 10;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 100%;
    }
</style>
