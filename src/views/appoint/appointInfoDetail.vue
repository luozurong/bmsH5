<template>
    <div>
        <headBread :headBread="orderInfo"></headBread>
        <div class="settlementOrderDetai-wrap">
            <div>
                <span>充值类型：</span>
                <span v-if="balance.rechargeType == 1">保证金充值</span>
                <span v-if="balance.rechargeType == 2">预付充值</span>
            </div>
            <div>
                <span>金额：</span>
                <span v-text="balance.money"></span>
            </div>
            <div>
                <span>可开处方数：</span>
                <span v-text="balance.currentUseNum"></span>
            </div>
            <div>
                <span>支付方式：</span>
                <span v-if="balance.payType == 1">微信</span>
                <span v-if="balance.payType == 2">上传凭证</span>
                <span v-if="balance.payType == 3">网银支付</span>
            </div>
            <div>
                <span>付款人：</span>
                <span v-text="balance.payer"></span>
            </div>
            <div v-if="balance.payType == 3">
                <span>付款人开户行：</span>
                <span v-text="balance.payerKhyh"></span>
            </div>
            <div v-if="balance.payType == 3">
                <span>开户行账号：</span>
                <span v-text="balance.payerKhyhzh"></span>
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
            <img  :src="balance.payUrl" alt="">
        </div>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'

import {blanceBodyRechargeRecordServlet} from '@/common/js/resource.js'

export default {
    name: 'appointInfoDetail',
    props:['balance'],
    data(){
        return{
            settlementOrderDetailMsg: '审批意见',
            orderInfo: '付款信息',
            rechargeRecordId: this.$route.params.rechargeRecordId,
            payEvidence: '',
            suggestion: []
        }
    },
    components:{
        headBread
    }
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