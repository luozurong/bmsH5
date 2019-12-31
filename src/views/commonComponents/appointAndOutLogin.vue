<template>
    <!-- 退出登录与账户入口 -->
    <div class="appointAndOutLogin">
        <div v-if="userTypeMy != 55">
            <!-- <img @click="jumpInvoiceList()" v-if="isPay == 1 && menuFlag" :src="invoice_btn" alt=""> -->
            <img @click="jumpAppoint()" v-if="isPay == 1 && menuFlag" :src="account_btn" alt="">
            <img @click="outLogin()" v-if="isPay == 0 && !menuFlag" :src="logout" alt="">
            <img @click="outLogin()" v-if="isPay == 1 && menuFlag" :src="logout" alt="">
            <img @click="meuOpen()" v-if="isPay == 1 && menuFlag" :src="menu_open" alt="">
            <img @click="menuClose()" v-if="isPay == 1 && !menuFlag" :src="menu_close" alt="">
        </div>
        <!-- 业务审批管理员(处理新增需求)-->
        <div v-if="userTypeMy == 55">
            <img @click="outLogin()" :src="logout" alt="">
        </div>
    </div>
</template>
<script>
import menu_close from '@/common/images/menu_close.png'
import account_btn from '@/common/images/account_btn.png'
import menu_open from '@/common/images/menu_open.png'
import logout from '@/common/images/logout.png'
import invoice_btn from '@/common/images/invioce_btn.png'

import {cookie} from '@/common/js/common.js'

export default {
    data(){
        return{
           invoice_btn:invoice_btn,
           account_btn: account_btn,
           menu_close: menu_close,
           menu_open: menu_open,
           logout: logout,
           isSettlementMy: this.$store.state.isSettlementMy,
           isPay: this.$store.state.isPay,
           userTypeMy: this.$store.state.userTypeMy,
           menuFlag: false
        }
    },
    methods:{
       menuClose(){
           this.menuFlag = true;
       },
       jumpAppoint(){
           this.$router.push("appointIndex");
           this.$store.commit("payType",1);
           sessionStorage.setItem('payType',1);
       },
       meuOpen(){
           this.menuFlag = false;
       },
       jumpInvoiceList(){
           this.$router.push("invoiceList")
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
            this.$store.commit("isPay", '');

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
            cookie.setCookie('isPay', '',-1);
            this.$router.push('login');
        }
    },
    mounted(){
     
    }
}
</script>
<style>
    .appointAndOutLogin{
        position: fixed;
        bottom: 0.67rem;
        right: 0.2rem;
        z-index: 10;
    }
    .appointAndOutLogin img{
        display: block;
        width: 0.5rem;
        margin-top: 0.05rem;
    }
</style>

