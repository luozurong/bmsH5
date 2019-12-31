<template>
    <div>
        <div class="checkStatements">
            <span @click="jumpSettlementIndex()">查看结算单</span>
        </div>
    </div>
</template>
<script>
export default {
    props:["jumpSettlement"],
    data(){
        return{

        }
    },
    methods:{
       jumpSettlementIndex(){
           if(this.jumpSettlement){
                this.$router.push({name:"settlementList",params:{account:this.$store.state.account}});
           }else{
                 this.$router.push("settlementIndex");
           }
         
           this.$store.commit("payType",1);
           sessionStorage.setItem('payType',1);
       }
    },
    mounted(){

    }
}
</script>
<style>
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

