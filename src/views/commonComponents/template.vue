<template>
    <!-- 药店店员 -->
    <div>
        <headData 
            :orderNmuMonth='orderNmuMonth'
            :orderNmuSum='orderNmuSum'
            :userNmuMonth='userNmuMonth'
            :userNmuSum='userNmuSum'
            :performanceNmuMonth='performanceNmuMonth'
            :performanceNmuSum='performanceNmuSum'
            :clerkNmuMonth='clerkNmuMonth'
            :clerkNmuSum='clerkNmuSum'
            :drugStoreNmuMonth='drugStoreNmuMonth'
            :drugStoreNmuSum='drugStoreNmuSum'
            :drugCompanyNmuMonth='drugCompanyNmuMonth'
            :drugCompanyNmuSum='drugCompanyNmuSum'
            :countermanNmuMonth='countermanNmuMonth'
            :countermanNmuSum='countermanNmuSum'
            :countermanOrgAdminNmuMonth='countermanOrgAdminNmuMonth'
            :countermanOrgAdminNmuSum='countermanOrgAdminNmuSum'
            v-on:tabIndexValue="tabIndexValue"></headData>
        <div v-if="tabIndex == 1"> 
            <currentTime  v-if="realTimeAjax.length > 0" :realTimeAjax="realTimeAjax"></currentTime>
            <moreData  v-if="realTimeAjax.length > 0" v-on:clickStatusFunc="clickStatusFunc" :clickStatus="1" :moreDataText="moreDataTextRealTime"></moreData>
            <empty v-if="realTimeAjax.length == 0"></empty>
        </div>
        <div v-if="tabIndex == 2">
            <historyData v-if="historyDataAjax.length > 0" :historyDataAjax="historyDataAjax"></historyData>
            <moreData v-if="historyDataAjax.length > 0" v-on:clickStatusFunc="clickStatusFunc" :clickStatus="2" :moreDataText="moreDataTextHistory"></moreData>
            <empty v-if="historyDataAjax.length == 0"></empty>
        </div>
        <div v-if="tabIndex == 3">
             <userData v-if="userDataAjax.length > 0" :userDataAjax="userDataAjax"></userData>
             <moreData v-if="userDataAjax.length > 0" v-on:clickStatusFunc="clickStatusFunc" :clickStatus="3" :moreDataText="moreDataTextUser"></moreData>
            <empty v-if="userDataAjax.length == 0"></empty>
        </div>
        <checkStatements v-if="isSettlement == 1" :jumpSettlement="jumpSettlement"></checkStatements>
        <appointAndOutLogin></appointAndOutLogin>
    </div>
</template>
<script>
import headData from '@/views/commonComponents/headData.vue'
import currentTime from '@/views/commonComponents/currentTime.vue'
import historyData from '@/views/commonComponents/historyData.vue'
import userData from '@/views/commonComponents/userData.vue'
import moreData from '@/views/commonComponents/moreData.vue'
import checkStatements from '@/views/commonComponents/checkStatements.vue'
import outLogin from '@/views/commonComponents/outLogin.vue'
import appointAndOutLogin from '@/views/commonComponents/appointAndOutLogin.vue'
import empty from '@/views/commonComponents/empty.vue'

import {getCurMonthSumCount,getCurMonthSumUserCount,getRealTimeData,getHistoryData,getUsersData,getWXOpenId,settlementResourceServlet} from '@/common/js/resource.js'
import {cookie} from '@/common/js/common.js'

export default {
    name: 'drugStoreClerkIndex',
    data(){
        return{
            tabIndex: sessionStorage.tabIndex ? sessionStorage.tabIndex : 1,
            userType: this.$store.state.userType,
            moreDataTextRealTime: '点击查看更多',
            moreDataTextHistory: '点击查看更多',
            moreDataTextUser: '点击查看更多',
            orderNmuMonth:0,
            orderNmuSum:0,
            userNmuMonth:0,
            userNmuSum:0,
            performanceNmuMonth:0,
            performanceNmuSum:0,
            clerkNmuMonth:0,
            clerkNmuSum:0,
            drugStoreNmuMonth:0,
            drugStoreNmuSum:0,
            drugCompanyNmuMonth:0,
            drugCompanyNmuSum: 0,
            countermanNmuMonth:0,
            countermanNmuSum:0,
            countermanOrgAdminNmuMonth:0,
            countermanOrgAdminNmuSum:0,
            realTimeAjax: [],
            historyDataAjax: [],
            userDataAjax: [],
            realTimePage: 1,
            historyPage: 1,
            userPage: 1,
            clickFlag: true,
            jumpSettlement: false,   //判断是否只有一个结算主体时的跳转
            isJump: true, //是否在ios下进行调整 
        }
    },
    components:{
        headData,
        currentTime,
        historyData,
        userData,
        checkStatements,
        outLogin,
        appointAndOutLogin,
        moreData,
        empty
    },
    computed:{  //兼容角色跳转
        isLoad(){
            return this.$store.state.isLoad;
        },
        isSettlement(){
            return this.$store.state.isSettlement;
        }
    },
    watch:{ //兼容角色跳转
        isLoad(newVal){
            if(newVal){
                this.moreDataTextRealTime = '点击查看更多';
                this.moreDataTextHistory ='点击查看更多';
                this.moreDataTextUser ='点击查看更多';
                this.realTimeAjax = [];
                this.historyDataAjax = [];
                this.userDataAjax = [];
                this.realTimePage = 1;
                this.historyPage = 1;
                this.userPage = 1;
                this.clickFlag = true;
                this.jumpSettlement = false;
                this.tabIndex = sessionStorage.tabIndex;
           
                this.getCurMonthSumUserCountAjax();
                this.getCurMonthSumCountAjax();
                this.getRealTimeDataAjax(10,1);
                this.getHistoryDataAjax(10,1);
                this.getUsersDataAjax(10,1);
                if(this.$store.state.isSettlement == 1){
                    this.settlementResourceServletAjax();
                }
                this.$store.commit("isLoad",false);
          
                
            }  
        },
        tabIndex(){
             this.tabIndex = sessionStorage.tabIndex ? sessionStorage.tabIndex : 1;
        }
    },
    methods:{
       tabIndexValue(i){      //实时、历史、用户数据切换
            this.tabIndex = i;
       },
       clickStatusFunc(i){   
            if(i == 1 && this.moreDataTextRealTime == '点击查看更多' && this.clickFlag){
               this.clickFlag = false;
               this.getRealTimeDataAjax(10,this.realTimePage);
            }
            if(i == 2 && this.moreDataTextHistory == '点击查看更多' && this.clickFlag){
               this.clickFlag = false;
               this.getHistoryDataAjax(10,this.historyPage);
            }
            if(i == 3 && this.moreDataTextUser == '点击查看更多' && this.clickFlag){
               this.clickFlag = false;
               this.getUsersDataAjax(10,this.userPage);
            }
       },
       getCurMonthSumCountAjax(){
           var params = {
                body:{
                   account: this.$store.state.account,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
           };
           getCurMonthSumCount(params).then(res =>{
               if(res.result == 0){
                    this.orderNmuMonth = res.orderNmuMonth;
                    this.orderNmuSum = res.orderNmuSum;
                    this.performanceNmuMonth = res.performanceNmuMonth;
                    this.performanceNmuSum = res.performanceNmuSum;
                    this.clerkNmuMonth = res.clerkNmuMonth;
                    this.clerkNmuSum = res.clerkNmuSum;
                    this.drugStoreNmuMonth = res.drugStoreNmuMonth;
                    this.drugStoreNmuSum = res.drugStoreNmuSum;
                    this.drugCompanyNmuMonth = res.drugCompanyNmuMonth;
                    this.drugCompanyNmuSum = res.drugCompanyNmuSum,
                    this.countermanNmuMonth = res.countermanNmuMonth;
                    this.countermanNmuSum = res.countermanNmuSum;
                    this.countermanOrgAdminNmuMonth = res.countermanOrgAdminNmuMonth;
                    this.countermanOrgAdminNmuSum = res.countermanOrgAdminNmuSum;
               }
           });
       },
       getRealTimeDataAjax(pageSize,pageNum){
            var params = {
                body:{
                   account: this.$store.state.account,
                   pageSize: pageSize,
                   pageNum: pageNum,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
           };
           getRealTimeData(params).then(res =>{
                this.clickFlag = true;
                if(res.result == 0){
                    for(var i = 0; i < res.list.length; i++){
                        this.realTimeAjax.push(res.list[i]);
                    }
                    if(res.list.length < pageSize){
                        this.moreDataTextRealTime = '没有更多数据了';
                    }else{
                        this.realTimePage ++;
                    }
                }
           });
       },
       getHistoryDataAjax(pageSize,pageNum){
            var params = {
                body:{
                   account: this.$store.state.account,
                   pageSize: pageSize,
                   pageNum: pageNum,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
           };
           getHistoryData(params).then(res =>{
                this.clickFlag = true;
                if(res.result == 0){
                    for(var i = 0; i < res.list.length; i++){
                        this.historyDataAjax.push(res.list[i]);
                    }
                    if(res.list.length < pageSize){
                        this.moreDataTextHistory = '没有更多数据了'
                    }else{
                        this.historyPage ++;
                    }
                }
           });
       },
       getUsersDataAjax(pageSize,pageNum){
            var params = {
                body:{
                    account: this.$store.state.account,
                    pageSize: pageSize,
                    pageNum: pageNum,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            getUsersData(params).then(res =>{
                this.clickFlag = true;
                if(res.result == 0){
                    for(var i = 0; i < res.list.length; i++){
                        this.userDataAjax.push(res.list[i]);
                    }
                    if(res.list.length < pageSize){
                        this.moreDataTextUser = '没有更多数据了'
                    }else{
                        this.userPage ++;
                    }
                }
            });
        },
        getOpenIdAjax(){
            var url =  window.location.href;
            var code = this.GetURLParameter("code");
               
            if(code != null){
                var params = {
                    body: {
                        code: code,
                    },
                    header: {
                        token: this.$store.state.token,
                        time_stamp: new Date().getTime()
                    }
                }
                getWXOpenId(params).then(res => {
                    this.$store.commit("openId", res.openId);
                    this.$store.commit("appId", res.appId);
                    cookie.setCookie('openId',res.openId,1);
                    cookie.setCookie('appId',res.appid,1);
                    
                    //if(this.isIos()){ //ios下才执行
                        if(url.indexOf("code") != -1) {  
                            this.wxConfig();
                            //window.location.replace(url.split('?')[0]);
                        }
                        if(url.indexOf("code") == -1) {  
                            var jumpLoad = sessionStorage.getItem('jumpLoad');
                            if(this.isEmpty(jumpLoad)){
                                sessionStorage.setItem('jumpLoad',1);
                                //window.location.replace(url.split('?')[0]);
                            }
                        }
                    //}
                });               
            }
        },
        settlementResourceServletAjax(){
            var params = {
                body: {
                    pageSize: 10,
                    pageNum: 1,
                    account: this.$store.state.account,
                    userType: this.$store.state.userType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            settlementResourceServlet(params).then(res => {
                if(res.result == 0 && res.data.data.length == 1 && res.data.data[0].account == this.$store.state.account){    
                    this.jumpSettlement = true;
                }
            })
        },
        getCurMonthSumUserCountAjax(){
            var params = {
                body: {
                    account: this.$store.state.account,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            getCurMonthSumUserCount(params).then(res => {
                if(res.result == 0){
                    this.userNmuMonth = res.userNmuMonth;
                    this.userNmuSum = res.userNmuSum;
                }
            })
        },
        GetURLParameter(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return decodeURI(r[2]);
            return null;
        }
    },
    mounted(){
        this.wxConfig();
        this.getOpenIdAjax();
        this.getCurMonthSumUserCountAjax();
        this.getCurMonthSumCountAjax();
        this.getRealTimeDataAjax(10,1);
        this.getHistoryDataAjax(10,1);
        this.getUsersDataAjax(10,1);
        if(this.$store.state.isSettlement == 1){
            this.settlementResourceServletAjax();
        }
    }
}
</script>


