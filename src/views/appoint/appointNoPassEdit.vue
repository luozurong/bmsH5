<template>
    <div>
        <headBread :headBread="settlementOrderDetailMsg"></headBread>
        <div class="appointNoPassEdit">
            <div class="appointNoPassEdit-msg" v-for="(item,index) in suggestion" :key="index">
                <div>
                    <span>审批操作：</span>
                    <span v-if="item.handleType == 0">审核不通过，待互联网医院出纳复核</span>
                    <span v-if="item.handleType == 1">审核通过</span>
                    <span v-if="item.handleType == 2">复核不通过，请根据备注信息修改</span>
                    <span v-if="item.handleType == 3">复核通过，待互联网医院财务审核</span>
                </div>
                <div>
                    <span>审批时间：</span>
                    <span v-text="item.createTime"></span>
                </div>
                <div>
                    <span>备注信息：</span>
                    <span v-text="item.remark"></span>
                </div>
            </div>
        </div>
        <appointPayType v-if="balance != {}" :balance="balance" :rechargeTypeRouter="rechargeType"></appointPayType>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import appointPayType from '@/views/appoint/appointPayType.vue'

import {blanceBodyRechargeRecordServlet} from '@/common/js/resource.js'

export default {
    name: 'appointNoPassEdit',
    data(){
        return{
            settlementOrderDetailMsg: '审批意见',
            rechargeType:  sessionStorage.rechargeType,// this.$route.params.rechargeType,
            rechargeRecordId: sessionStorage.rechargeRecordId == 0 ? '' : sessionStorage.rechargeRecordId,//this.$route.params.rechargeRecordId,
            balance: {},
            suggestion: []
        }
    },
    components:{
      appointPayType,
      headBread
    },
    methods:{
        blanceBodyRechargeRecordServletAjax(){
            var params = {
                body: {
                    rechargeRecordId: this.rechargeRecordId,
                    balanceAccount: this.$store.state.account, 
                    balanceName: this.$store.state.userName,
                    balanceType: this.$store.state.userType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            blanceBodyRechargeRecordServlet(params).then(res => {
                console.log(res);
                if(res.result == 0){
                    this.balance = res.data.balanceDetail,
                    this.suggestion = res.data.suggestion;

                }
            });
        }
    },
    mounted(){
        this.blanceBodyRechargeRecordServletAjax();
    }
}
</script>
<style>
    .appointNoPassEdit{
        background: #fff;
    }
    .appointNoPassEdit-msg{
        padding: 0.13rem 0.15rem 0.13rem 0;
        background: #fff;
        margin-left: 0.15rem;
        border-bottom: 1px solid #ebebeb;
    }
    .appointNoPassEdit-msg:last-child{
        border-bottom: none;
    }
    .appointNoPassEdit-msg div{
        margin-bottom: 0.01rem;
    }
    .appointNoPassEdit-msg div span{
        color: #333;
    }
</style>

