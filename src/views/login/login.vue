<template>
    <div class="login" v-wechat-title="$route.meta.title">
        <form action="">
            <div class="login-logo">
            <img :src="logo" alt=""/>
            </div>
            <div class="login-item">
                <img :src="user_icon" alt="">
                <input type="text" @blur="inputOnblur()"  v-model="account" placeholder="请输入登录账号">
            </div>
            <div  class="login-item">
                <img :src="password_icon" alt="">
                <input type="password" @blur="inputOnblur()" v-model="password" placeholder="请输入登录密码">
            </div>
            <div @click="jumpPrescriptionList()" class="login-submit">登录</div>
        </form>
    </div>
</template>
<script>
import logo from '@/common/images/logo.png'
import user_icon from '@/common/images/user_icon.png'
import password_icon from '@/common/images/password_icon.png'

import {userLogin,getWXOpenId,getWXRequestUrl} from '@/common/js/resource.js'
import {cookie} from '@/common/js/common.js'
import { setTimeout } from 'timers';

export default {
    name: 'login',
    data(){
        return{
            logo: logo,
            user_icon: user_icon,
            password_icon: password_icon,
            account: '',
            password: '',
            userType: '',

        }
    },
    methods:{
        inputOnblur(){

        },
        jumpPrescriptionList(){
            if(this.account.trim() == ""){
                lxjTip.msg("请输入用户名")
                return false;
            }
            if(this.password.trim() == ""){
                 lxjTip.msg("请输入密码")
                 return false;
            }
            var params = {
                body: {
                    account: this.account,
                    password: this.password
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            userLogin(params).then(res => {
                if(res.code == 0){
                    this.$store.commit("isLogin",true);
                    this.$store.commit("token",res.token);
                    this.$store.commit("userName",res.userName);
                    this.$store.commit("userNameMy",res.userName);
                    if(res.userType == 55){
                        this.$store.commit("account",res.userAccount);
                        this.$store.commit("accountMy",res.userAccount);
                    }else{
                        this.$store.commit("account",res.account);
                        this.$store.commit("accountMy",res.account);
                    }
                   
                    this.$store.commit("userType",res.userType);
                    this.$store.commit("userTypeMy",res.userType);
                    this.$store.commit("isSettlement",res.isSettlement);
                    this.$store.commit("isSettlementMy",res.isSettlement);
                    this.$store.commit("isPay",res.isPay);
                    
                    cookie.setCookie('isLogin',true,1);
                    cookie.setCookie('token',res.token,1);
                    cookie.setCookie('userName',res.userName,1);
                    cookie.setCookie('userNameMy',res.userName,1);
                    if(res.userType == 55){
                        cookie.setCookie('account',res.userAccount,1);
                        cookie.setCookie('accountMy',res.userAccount,1);
                    }else{
                        cookie.setCookie('account',res.account,1);
                        cookie.setCookie('accountMy',res.account,1);
                    }
                    cookie.setCookie('userType',res.userType,1);
                    cookie.setCookie('userTypeMy',res.userType,1);
                    cookie.setCookie('isSettlement',res.isSettlement,1);
                    cookie.setCookie('isSettlementMy',res.isSettlement,1);
                    cookie.setCookie('isPay',res.isPay,1);
                   
                    sessionStorage.setItem('tabIndex',1); 

                    this.userType = res.userType;
                   // 微信消息推送
                    if(this.isWechat()){
                        this.getWXRequestUrlAjax(res.token);
                        return false;
                    }else{
                        //this.jumpUrl(res.userType)
                         this.$router.push("/");
                    }  
                    //this.jumpUrl(res.userType);
                   
                }else{
                    lxjTip.msg(res.reason);
                } 
            })
        },
        jumpUrl(userType){      //登录后页面跳转(废弃)
            if(userType == 52){ //药店
                this.$router.push("drugStoreClerkIndex");
            }
            if(userType == 22){ //药企
                this.$router.push("drugCompanyManagerIndex");
            }
            if(userType == 19){ //药店管理员
                this.$router.push("druggistIndex");
            }
            if(userType == 49){ //业员管理员
                this.$router.push("businessManagerIndex");
            }
            if(userType == 50){ //业务组织管理员
                this.$router.push("businessOrganizationManagerIndex");
            }
            if(userType == 51){ //业务员
                this.$router.push("businessIndex");
            }  
            if(userType == 53 || userType == 2){  //财务管理员
                this.$router.push("settlementIndex");
            }
            if(userType == 54){ //出纳管理员
                this.$router.push("drugStoreClerkIndex");
            }
            if(userType == 55){ //出纳管理员
                this.$router.push("businessManagerIndex");
            }
        },
        WXRequestUrlAjax(token){  //微信授权登录后跳转(废弃)
            var wxUlr = '';
            if(window.location.host.indexOf('ywgl.kinglian.cn') != -1){
                wxUlr = 'http://ywgl.kinglian.cn/bmsH5/'; //正式平台 
            }else{
                wxUlr = 'http://yun-test.kinglian.net/bmsH5/'; //测试平台
            }

            var param = {
                body:{
                    url: wxUlr,
                    endUrl: ''
                },
                header:{
                    token: token,
                    time_stamp:new Date().getTime()
                }
            }
            getWXRequestUrl(param).then(res => {
                window.location.href = res.codeUrl;
            })
        },
        getWXRequestUrlAjax(token){  //微信授权登录后跳转
            var wxUlr = '';
            if(window.location.host.indexOf('ywgl.kinglian.cn') != -1){
                wxUlr = 'http://ywgl.kinglian.cn/bmsH5/'; //正式平台 
            }else{
                wxUlr = 'http://yun-test.kinglian.net/bmsH5/'; //测试平台
            }
            var param = {
                body:{
                    url: wxUlr,
                    endUrl: ''
                },
                header:{
                    token: token,
                    time_stamp:new Date().getTime()
                }
            }
            getWXRequestUrl(param).then(res => {
                window.location.href = res.codeUrl;
            })
        },
        isWechat(){  //判断是否是在微信浏览器打开
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;  
            }
            return false;   
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
    .login{
        height: 100%;
        background: #fff;
    }
    .login-logo img{
        width: 1.73rem;
        display: block;
        padding-top: 1.2rem;
        margin: 0 auto 0.48rem;;
    }
    .login-item{
        height: 0.44rem;
        display: flex;
        display: -webkit-flex;
        border-bottom: 1px solid #eee;
        align-items: center;
        margin: 0 0.3rem 0.1rem;
    }
    .login-item img{
        width: 0.15rem;
        margin-right: 0.12rem;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
    }
    .login-item input{
        flex-grow: 2;
        -webkit-flex-grow: 2;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #222;
        outline: none;
        border: none;
    }
    .login-item input::placeholder{
        color: #999;
    }
    .login-submit{
        margin: 0.4rem 0.3rem 0;
        line-height: 0.36rem;
        background: #3081f2;
        border-radius: 0.08rem;
        font-size: 0.16rem;
        text-align: center;
        color: #fff;
    }
</style>