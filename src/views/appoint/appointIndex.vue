<template>
    <!-- 预付账户管理 -->
    <div v-wechat-title="$route.meta.title">  
        <headBread :headBread="appointIndexMsg"></headBread>
        <div class="appoint-msg">
            <div>
                <span>结算主体名称：</span>
                <span v-text="balance.balanceName"></span>
            </div>
            <div>
                <span>保证金金额：</span>
                <span>{{balance.bailMoney | bailMoneyFilters}}</span>
                <span></span>
            </div>
            <div>
                <span>支付模式：</span>
                <!-- <span v-if="balance.payModelType == 1">后付费</span>
                <span v-if="balance.payModelType == 2">预付费</span>
                <span v-if="balance.payModelType == 3">免费</span> -->
                <span v-if="balance.calModelType == 1">预付费-按单</span>
                <span v-if="balance.calModelType == 3">预付费-包月</span>
                <span v-if="balance.calModelType == 2">预付费-包年</span>
                
            </div>
            <div v-if="balance.payModelType == 2 && (balance.calModelType == 2 || balance.calModelType == 3)">
                <span>剩余可开处方次数：</span>
                <span v-text="balance.totalUseNum"></span>
            </div>
             <div v-if="balance.payModelType == 2 && (balance.calModelType == 2 || balance.calModelType == 3)">
                <span>当前可开处方有效期：</span>
                <span v-text="balance.period"></span>
            </div>
        </div>
        <headBread :headBread="appointIndexMingMsg"></headBread>
        <div class="appoint-wrap">
            <div class="appoint-wrap-item" @click="jumpDepositCash(item.status,item.rechargeRecordId,item.rechargeType)" v-for="(item,index) in dataDetail" :key="index">
                <div class="appoint-wrap-left">
                    <div>
                        <span>充值类型：</span>
                        <span v-if="item.rechargeType == 1">保证金充值</span>
                        <span v-if="item.rechargeType == 2">预付充值</span>
                    </div>
                    <div>
                        <span>充值金额：</span>
                        <span v-text="item.money"></span>
                    </div>
                    <div  v-if="item.rechargeType == 2">
                        <span>可开处方次数：</span>
                        <span v-text="item.currentUseNum"></span>
                    </div>
                    <div>
                        <span>付款状态：</span>
                        <span v-if="item.status == 1" class="appoint-outTime">待付款</span>
                        <span v-if="item.status == 2" class="appoint-waitOutTime">待复核</span>
                        <span v-if="item.status == 3" class="appoint-noPass">复核不通过</span>
                        <span v-if="item.status == 4" class="appoint-waitPass">待审核</span>
                        <span v-if="item.status == 5">已结算</span>
                        <span v-if="item.status == 6">已取消</span>
                        <span v-if="item.status == 7">系统审核中</span>
                    </div>
                    <div>
                        <span>提交时间：</span>
                        <span v-text="item.createTime"></span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
        </div>
        <empty v-if="dataDetail.length == 0"/>
        <moreData v-if="dataDetail.length > 0"  :moreDataText='moreDataText' v-on:clickStatusFunc="clickStatusFunc"></moreData>
        <div v-if="isShowAppoint" class="checkStatements">
            <span @click="jumpSettlementIndex()">预付充值</span>
        </div>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import moreData from '@/views/commonComponents/moreData.vue'
import empty from '@/views/commonComponents/empty.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import {blanceBodyListServlet} from '@/common/js/resource.js'
export default {
    name: 'appointIndex',
    data(){
        return{
           appointIndexMsg: '预付账户信息',
           appointIndexMingMsg: '预付充值明细',
           moreDataText: '点击查看更多',
           arrow_icon: arrow_icon,
           pageNum: 1,
           balance: {},
           dataDetail: [],
           isShowAppoint: false
        }
    },
    components:{
      headBread,
      moreData,
      empty
    },
    filters:{
        bailMoneyFilters(value){
            if(value != 'null'){
                 return value;
            }
            return 0;
        }
    },
    methods:{
        jumpDepositCash(status,rechargeRecordId,rechargeType){
            if(status == 6){
                lxjTip.msg("已取消");
                return false;
            }
            if(status == 1){
                sessionStorage.setItem("calModelType",this.balance.calModelType);
                sessionStorage.setItem("rechargeRecordId",rechargeRecordId);
                sessionStorage.setItem("rechargeType",rechargeType);
                this.$router.push('appointEdit');
            }
            if(status == 2 || status == 4 || status == 5){
                this.$router.push({
                    name:"appointCheck",
                    params:{
                        'rechargeRecordId':rechargeRecordId
                    }
                });
            }
            if(status == 3){
                sessionStorage.setItem("rechargeRecordId",rechargeRecordId);
                sessionStorage.setItem("rechargeType",rechargeType);
                this.$router.push("appointNoPassEdit");
                // this.$router.push({
                //     name:"appointNoPassEdit",
                //     params:{
                //         'rechargeRecordId':rechargeRecordId,
                //         'rechargeType':rechargeType
                //     }
                // });
            }
        },
        isShowAppointFunc(){  //判断预付充值入口显示
            if(this.balance.isOutTime == 5){
                this.isShowAppoint  = false;
            }else if(this.balance.isOutTime == 6){
                this.isShowAppoint  = false;
            }else{
                this.isShowAppoint = true;
            }
        },
        blanceBodyListServletAjax(pageSize){
            var params = {
                body: {
                    balanceAccount: this.$store.state.account, //this.$store.state.account //
                    pageSize: pageSize,
                    pageNum: this.pageNum
                },
                header:{
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            
            blanceBodyListServlet(params).then(res => {
                if(res.result == 0){
                    this.balance = res.balance;
                    var forDateFlag = res.data.data
                    for(var i = 0; i < forDateFlag.length; i++){
                        this.dataDetail.push(forDateFlag[i]);
                    }
                  
                    if(res.data.data.length < pageSize){
                        this.moreDataText = '没有更多数据了';
                    }else{
                        this.pageNum ++;
                    }
                    this.isShowAppointFunc();
                } 
            })
        },
        clickStatusFunc(){
             if(this.moreDataText == '点击查看更多'){
                this.blanceBodyListServletAjax(10);
            }
        },
        jumpSettlementIndex(){
            sessionStorage.setItem("rechargeRecordId",0);
            sessionStorage.setItem("rechargeType",2);
            this.$router.push('appointEdit');
        }
    },
    mounted(){  
        this.blanceBodyListServletAjax(10);
         this.wxConfig();
    }
}
</script>
<style scoped>
    .appoint-msg{
        padding: 0.13rem 0.15rem;
        background: #fff;
    }
    .appoint-msg div{
        margin-bottom: 0.01rem;
    }
    .appoint-wrap{
        background: #fff;
    }
    .appoint-wrap{
        background: #fff;
    }
    .appoint-wrap-item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        padding: 0.13rem 0.15rem 0.13rem 0;
        margin-left: 0.15rem;
        border-bottom: 1px solid #ebebeb;
    }
    .appoint-wrap-item:last-child{
        border-bottom: none;
    }
    .appoint-wrap-left{
        flex-grow: 2;
        -webkit-flex-grow: 2
    }
    .appoint-wrap-item img{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .appoint-wrap-border{
        border-bottom: 1px solid #ebebeb;
        margin-left: 0.15rem;
    }
    .appoint-wrap-border:last-child{
        border-bottom: none;
    }
    .appoint-wrap-item span{
        color: #333;
    }
    .appoint-wrap-item .appoint-outTime{
        color: #ff5858;
    }
    .appoint-wrap-item .appoint-waitOutTime{
        color: #ff9b24;
    }
    .appoint-wrap-item .appoint-noPass{
        color: #ff5858;
    }
    .appoint-wrap-item .appoint-waitPass{
        color: #3081f2;
    }
    .checkStatements{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        background: #fff;
        height: 0.48rem;
    }
    .checkStatements span{
        display: block;
        margin: 0 0.15rem;
        color: #fff;
        background: #3081f2;
        line-height: 0.36rem;
        text-align: center;
        border-radius: 0.08rem;
        margin-top: 0.06rem;
    }
</style>