<template>
    <div>
         <appointInfoDetail :balance="balance"/>
    </div>
</template>
<script>
import appointInfoDetail from '@/views/appoint/appointInfoDetail.vue'

import {blanceBodyRechargeRecordServlet} from '@/common/js/resource.js'


export default {
    data(){
        return{
            settlementOrderDetailMsg: '审批意见',
            orderInfo: '付款信息',
            rechargeRecordId: this.$route.params.rechargeRecordId,
            balance: {},
            payEvidence: '',
            suggestion: []
        }
    },
    components:{
        appointInfoDetail
    },
    methods:{
        blanceBodyRechargeRecordServletAjax(){
            var params = {
                body: {
                    rechargeRecordId: this.rechargeRecordId,
                    balanceAccount: this.$store.state.account,
                    balanceName: this.$store.userName,
                    balanceType: this.$store.userType
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
    mounted() {
        this.blanceBodyRechargeRecordServletAjax();
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