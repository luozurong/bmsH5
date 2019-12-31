<template>
    <!-- 结算单列表 -->
    <div v-wechat-title="$route.meta.title">
        <headBread :headBread="headBreadMsg"></headBread>
        <div class="settlementList-msg">
            <div>
                <span>付款方名称：</span>
                <span v-text="settment.name"></span>
            </div>
            <div>
                <span>开户银行：</span>
                <span v-text="settment.khyh"></span>
            </div>
            <div>
                <span>结算周期：</span>
                <span>{{settment.balanceCycle | balanceFilter}}</span>
            </div>
        </div>
        <headBread class="settlementList-dan" :headBread="settlementList"></headBread>
        <div class="settlementList-wrap">
            <div class="settlementList-wrap-item" v-for="(item,index) in settlementListAttr" :key="index" @click="jumpStatus(item.status,item.id)">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>{{item.timeStr | timeStrFilter}}</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span v-text="item.balanceMoney">1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span v-if="item.status == 1" class="settlementList-waitOutTime">待付款</span>
                        <span v-if="item.status == 2" class="settlementList-outTime">待付款-超时</span>
                        <span v-if="item.status == 3">已结算</span>
                        <span v-if="item.status == 4">待复核</span>
                        <span v-if="item.status == 5" class="settlementList-noPass">复核不通过</span>
                        <span v-if="item.status == 6" class="settlementList-waitPass">待审核</span>
                        <span v-if="item.status == 7" class="settlementList-waitPass">审核不通过</span>
                        <span v-if="item.status == 8" class="settlementList-waitPass">已完成</span>
                        <span v-if="item.status == 9">系统审核中</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
        </div>
        <empty  v-if="settlementListAttr.length == 0"/>
        <moreData v-if="settlementListAttr.length > 0"  :moreDataText='moreDataText' v-on:clickStatusFunc="clickStatusFunc"></moreData>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import moreData from '@/views/commonComponents/moreData.vue'
import empty from '@/views/commonComponents/empty.vue'

import {balanceBodyServlet} from '@/common/js/resource.js'

export default {
    name: 'settlementList',
    data(){
        return{
            headBreadMsg: '结算主体信息',
            settlementList: '结算单',
            moreDataText: '点击查看更多',
            arrow_icon: arrow_icon,
            pageNum: 1,
            settlementListAttr: [],
            settment: {}
        }
    },
    filters:{
        balanceFilter(value){
            if(value == 1){
                return '周结';
            }
            if(value == 2){
                return '双周结';
            }
            if(value == 3){
                return '月结';
            }
            if(value == 4){
                return '双月结';
            }
            if(value == 5){
                return '季度结算';
            }
            if(value == 6){
                return '半年结算';
            }
        },
        timeStrFilter(value){
            return value.substring(0,10) + "~" + value.substring(22,32);
        }
    },
    methods: {
        clickStatusFunc(){
            if(this.moreDataText == '点击查看更多'){
                this.balanceBodyServletAjax(10,this.pageNum);
            }
        },
        jumpStatus(status,id){
            if(status == 2 || status == 1){
                sessionStorage.setItem("id",id)
                 this.$router.push({name: "statementNew",parame:{}});
            }
            if(status == 5){
                sessionStorage.setItem("examineStatementDetailid",id)
                this.$router.push({name:"examineStatementDetail"});
            }
            if(status == 3 || status == 4 || status == 6 || status == 8){
                 this.$router.push({name:"settlementOrderDetail",params:{id:id}});
            }
        },
        balanceBodyServletAjax(pageSize,pageNum){
            var params = {
                 body: {
                    pageSize: pageSize,
                    pageNum: pageNum,
                    account: this.$route.params.account,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            balanceBodyServlet(params).then(res => {
                if(res.result == 0){
                    for(var i = 0; i < res.data.data.length; i++){
                         this.settlementListAttr.push(res.data.data[i]);
                    }
                    if(res.data.data.length < pageSize){
                        this.moreDataText = '没有更多数据了'
                    }else{
                        this.pageNum ++;
                    }
                    this.settment = res.settment
                }
            })
        }
    },
    components:{
        headBread,
        moreData,
        empty
    },
    mounted() {
        this.balanceBodyServletAjax(10,this.pageNum);
    },
}
</script>
<style scoped>
    .settlementList-msg{
        padding: 0.13rem 0.15rem;
        background: #fff;
    }
    .settlementList-msg div{
        margin-bottom: 0.01rem;
    }
    .settlementList-wrap{
        background: #fff;
    }
    .settlementList-wrap-item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        padding: 0.13rem 0.15rem 0.13rem 0;
        margin-left: 0.15rem;
        border-bottom: 1px solid #ebebeb;
    }
    .settlementList-wrap-item:last-child{
        border-bottom: none;
    }
    .settlementList-wrap-left{
        flex-grow: 2;
        -webkit-flex-grow: 2
    }
    .settlementList-wrap-item img{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .settlementList-wrap-border{
        border-bottom: 1px solid #ebebeb;
        margin-left: 0.15rem;
    }
    .settlementList-wrap-border:last-child{
        border-bottom: none;
    }
    .settlementList-wrap-item span{
        color: #333;
    }
    .settlementList-wrap-item .settlementList-outTime{
        color: #ff5858;
    }
    .settlementList-wrap-item .settlementList-waitOutTime{
        color: #ff9b24;
    }
    .settlementList-wrap-item .settlementList-noPass{
        color: #ff5858;
    }
    .settlementList-wrap-item .settlementList-waitPass{
        color: #3081f2;
    }
</style>