<template>
    <div>
        <appointPayType v-if="balance != null " :balance="balance" :rechargeTypeRouter="rechargeType"></appointPayType>
    </div>
</template>
<script>
import appointPayType from '@/views/appoint/appointPayType.vue'
import {blanceBodyRechargeRecordServlet} from '@/common/js/resource.js'
export default {
    name: 'appointEdit',
    data(){
        return{
            balance: null,
            rechargeType: sessionStorage.rechargeType //sessionStorage.rechargeType // 
        }
    },
    components:{
      appointPayType
    },
    methods:{
        blanceBodyRechargeRecordServletAjax(){
            let rechargeRecordId = sessionStorage.rechargeRecordId == 0 ? '' : sessionStorage.rechargeRecordId;
            var params = {
                body: {
                    rechargeRecordId: rechargeRecordId,
                    balanceAccount: this.$store.state.account,//'dsl001',
                    balanceName: this.$store.state.userName,//'1',
                    balanceType: this.$store.state.userType,//'1'
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            }
            blanceBodyRechargeRecordServlet(params).then(res => {
                if(res.result == 0){
                    this.balance = res.data.balanceDetail;
                    console.log(this.balance);
                    if(this.balance.payType == null) this.balance.payType = 1;
                }
            });
        }
    },
    mounted(){
        console.log(this.$route.query.rechargeType);
        this.blanceBodyRechargeRecordServletAjax();
        
    }
}
</script>
