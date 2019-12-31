<template>
    <!-- 结算主体列表 -->
    <div  v-wechat-title="$route.meta.title">
        <headBread :headBread="headBreadMsg"></headBread>
        <div class="settlementList-wrap">
            <div class="settlementList-wrap-item" v-for="(item,index) in settlementAttr" :key="index" @click="jumpSettlementList(item.account)">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算主体：</span>
                        <span v-text="item.name">2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算周期：</span>
                        <span>{{item.balanceCycle | balanceFilter}}</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span class="settlementList-outTime" v-if="item.status == 1">结算异常</span>
                        <span v-if="item.status == 0">结算正常</span>
                    </div>
                    <div>
                        <span class="settlementList-letter">责任人</span>
                        <span>：</span>
                        <span v-text="item.businessOwner"></span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
        </div>
        <moreData :moreDataText='moreDataText' v-on:clickStatusFunc="clickStatusFunc"></moreData>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import moreData from '@/views/commonComponents/moreData.vue'

import {settlementResourceServlet} from '@/common/js/resource.js'
export default {
    name: 'settlementIndex',
    data(){
        return{
            headBreadMsg: '结算主体列表',
            settlementList: '结算单',
            moreDataText: '点击查看更多',
            arrow_icon: arrow_icon,
            settlementAttr: [],
            pageNum: 1,
        }
    },
    components:{
        headBread,
        moreData
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
        }
    },
    methods:{
        clickStatusFunc(i){
           if(this.moreDataText == '点击查看更多'){
               this.settlementResourceServletAjax(10,this.pageNum);
           }
        },
        jumpSettlementList(account){
            this.$router.push({name:"settlementList",params:{account:account}})
        },
        settlementResourceServletAjax(pageSize,pageNum){
            var params = {
                body: {
                    pageSize: pageSize,
                    pageNum: pageNum,
                    account: this.$store.state.account,
                    userType: this.$store.state.userType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            settlementResourceServlet(params).then(res => {
                if(res.result == 0){
                    for(var i = 0; i < res.data.data.length; i++){
                         this.settlementAttr.push(res.data.data[i]);
                    }
                    if(res.data.data.length < pageSize){
                        this.moreDataText = '没有更多数据了'
                    }else{
                        this.pageNum ++;
                    }
                    
                }
            })
        }
    },
    mounted() {
        this.settlementResourceServletAjax(10,this.pageNum);
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
        border-bottom: 1px solid #ebedeb;
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
    .settlementList-letter{
        letter-spacing: 0.047rem;
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