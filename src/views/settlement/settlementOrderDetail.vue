<template>
    <!-- 待复核/待审核/已结算-查看  结算单详情-->
    <div>
        <headBread :headBread="settlementOrderDetailMsg"></headBread>
        <div class="examineStatement">
            <div class="examineStatement-msg" v-for="(item,index) in suggestion" :key="index">
                <div>
                    <span>审批操作：</span>
                    <!-- <span v-if="item.handleType == 0">复核不通过</span>
                    <span v-if="item.handleType == 1">审核通过</span>
                    <span v-if="item.handleType == 2">复核不通过</span>
                    <span v-if="item.handleType == 3">复核通过</span> -->
                    <span v-if="item.handleType == 0">审核不通过，待互联网医院出纳复核</span>
                    <span v-if="item.handleType == 1">审核通过</span>
                    <span v-if="item.handleType == 2">复核不通过，请根据备注信息修改</span>
                    <span v-if="item.handleType == 3">复核通过</span>
                </div>
                <!-- <div>
                    <span>审批角色：</span>
                    <span v-if="item.handlerType == 49">业务管理员</span>
                    <span v-if="item.handlerType == 54">出纳管理员</span>
                    <span v-if="item.handlerType == 53">财务管理员</span>
                </div> -->
                <div>
                    <span>审批时间：</span>
                    <span v-text="item.createTime">2019.2.27</span>
                </div>
                <div>
                    <span>备注信息：</span>
                    <span v-text="item.remark"></span>
                </div>
            </div>
        </div>
        <headBread :headBread="orderInfo"></headBread>
        <div class="settlementOrderDetai-wrap" v-if="balance != null">
            <div>
                <span>结算周期：</span>
                <span v-text="balance.timeStr"></span>
            </div>
            <div>
                <span>金额：</span>
                <span v-text="balance.balanceMoney"></span>
            </div>
            <div>
                <span>付款人全称：</span>
                <span v-text="balance.payer"></span>
            </div>
            <div>
                <span>付款人开户行：</span>
                <span v-text="balance.khyh"></span>
            </div>
            <div>
                <span>开户行账号：</span>
                <span v-text="balance.khyhAccount"></span>
            </div>
            <div>
                <span>付款日期：</span>
                <span v-text="balance.payTime"></span>
            </div>
            <div>
                <span>备注：</span>
                <span v-text="balance.remark"></span>
            </div>
        </div>
        <div class="settlementOrderDetai-pin">
            <div>付款凭证：</div>
            <img  :src="payEvidence" alt="">
        </div>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'

import {blanceBodyDetailServlet} from '@/common/js/resource.js'

export default {
    data(){
        return{
            settlementOrderDetailMsg: '审批意见',
            orderInfo: '付款信息',
            balance: null,
            payEvidence: '',
            suggestion: null
        }
    },
    components:{
        headBread
    },
    methods:{
         blanceBodyDetailServletAjax(){
            var params = {
                 body: {
                   id: this.$route.params.id
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            blanceBodyDetailServlet(params).then(res => {
                console.log(res);
                if(res.result == 0){
                    this.balance = res.data.balance;
                    this.payEvidence = res.data.balance.payEvidence;
                    this.suggestion = res.data.suggestion;
                }
            })
        }
    },
    mounted() {
        this.blanceBodyDetailServletAjax();
    },
}
</script>
<style scoped>
    .settlementOrderDetai-wrap{
        padding: 0.18rem 0.15rem 0;
        background: #fff;
        line-height: 0.23rem;
    }
    .settlementOrderDetai-wrap span{
        color: #333;
    }
    .settlementOrderDetai-pin{
        background: #fff;
        padding: 0 0.15rem 0.2rem;
        line-height: 0.22rem;
    }
    .settlementOrderDetai-pin img{
        display: block;
        width: 2.4rem;
        margin: 0.16rem auto 0;
    }
    .examineStatement{
        background: #fff;
    }
    .examineStatement-msg{
        padding: 0.13rem 0.15rem 0.13rem 0;
        background: #fff;
        margin-left: 0.15rem;
        border-bottom: 1px solid #ebebeb;
    }
    .examineStatement-msg:last-child{
        border-bottom: none;
    }
    .examineStatement-msg div{
        margin-bottom: 0.01rem;
    }
    .examineStatement-msg div span{
        color: #333;
    }
</style>