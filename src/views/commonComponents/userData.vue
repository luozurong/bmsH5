<template>
    <div class="historyData">
        <!-- 药店店员 -->
        <div>
            <div class="historyData-item" v-for="(item,index) in userDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)">
                <div class="historyData-main">
                    <div class="historyData-normal">
                        <span>用户名称：</span>
                        <span v-text="item.userName">2019-3-19 11:38</span>
                    </div>
                    <div class="historyData-drug">
                        <span>处方数量统计：{{item.orderNum}}</span>
                        <!-- <span v-text="item.orderNum">20</span> -->
                    </div>
                </div>
                <img class="historyData-arrow" :src="arrow_icon" alt="">
            </div>
        </div> 
    </div>
</template>
<script>
import arrow_icon from '@/common/images/arrow_icon.png'
export default {
    props: ['userDataAjax'],
    data(){
        return{
           arrow_icon: arrow_icon,
           userType: this.$store.state.userType
        }
    },
    methods:{
        jumpPrescriptionDetail(blTime,drugStoreAccount,clerkAccount,userName){
            this.$router.push({name:'prescriptionList',params:{
                blTime: 0,
                drugStoreAccount: 0,
                clerkAccount: 0,
                userName: userName
            }})
        }
    },
    mounted() {
      
    },
}
</script>
<style>
    .historyData{
        background: #fff;
    }
    .historyData-item{
        padding: 0.1rem 0.15rem 0.12rem 0;
        margin-left: 0.15rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #ededed;
    }
    .historyData-item:last-child{
        border-bottom: none;
    }
    .historyData-main{
        flex-grow: 2;
        -webkit-flex-grow: 2;
    }
    .historyData-item .historyData-arrow{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .historyData-normal{
        line-height: 0.22rem;
    }
    .historyData-drug{
        display: flex;
        display: -webkit-flex;
    }
    .historyData-drug>span{
         flex-shrink: 0;
        -webkit-flex-shrink: 0;
    }
    .historyData-line{
        margin-left: 0.15rem;
        border-bottom: 1px solid #ededed;
    }
    .historyData-line:last-child{
        border: none;
    }
</style>