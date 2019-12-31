<template>
    <div class="prescriptionList">
        <div class="prescriptionList-wrap">
            <div class="prescriptionList-item" v-for="(item,index) in prescriptionOrderList" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                <div class="prescriptionList-main">
                    <div class="prescriptionList-normal">
                        <span>处方时间：</span>
                        <span v-text="item.blTime"></span>
                    </div>
                    <div class="prescriptionList-normal">
                        <span>药企名称：</span>
                        <span v-text="item.drugCompName"></span>
                    </div>
                    <div class="prescriptionList-normal">
                        <span>药店名称：</span>
                        <span v-text="item.drugStoreName"></span>
                    </div>
                    <div class="prescriptionList-normal">
                        <span>店员名称：</span>
                        <span v-text="item.clerkName"></span>
                    </div>
                    <div class="prescriptionList-normal">
                        <span  style="letter-spacing: 0.046rem;">就诊人：</span>
                        <span  style="margin-left: -0.046rem;" v-text="item.userName"></span>
                    </div>
                    <div class="prescriptionList-drug">
                        <span>药品信息：</span>
                        <div>
                            <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                <span v-text="list.drugName">阿莫西林胶囊</span>
                                <span class="prescriptionList-num">{{list.count}}{{list.count_unit}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="prescriptionList-arrow" :src="arrow_icon" alt="">
            </div>
        </div>
        <moreData v-if="prescriptionOrderList.length > 0" v-on:clickStatusFunc="clickStatusFunc" :clickStatus="1" :moreDataText="moreDataText"></moreData>
        <empty v-if="prescriptionOrderList.length == 0"></empty>
       
    </div>
</template>
<script>
import arrow_icon from '@/common/images/arrow_icon.png'
import moreData from '@/views/commonComponents/moreData.vue'
import empty from '@/views/commonComponents/empty.vue'
import {getPrescriptionOrderList} from '@/common/js/resource.js'
export default {
    name: 'prescriptionList',
    data(){
        return{
           arrow_icon: arrow_icon,
           moreDataText: '点击查看更多',
           blTime: this.$route.params.blTime,
           clerkAccount:this.$route.params.clerkAccount,
           drugStoreAccount:this.$route.params.drugStoreAccount,
           userName: this.$route.params.userName,
           prescriptionOrderList: [],
           prescriptionOrderPage: 1,
           clickStatus: true
        }
    },
    components:{
        moreData,
        empty
    },
    methods:{
        clickStatusFunc(i){
            if(this.clickStatus && this.moreDataText == '点击查看更多'){
                this.clickStatus = false;
                this.getPrescriptionOrderListAjax(this.prescriptionOrderPage,10);
            }
        },
        getPrescriptionOrderListAjax(prescriptionOrderPage,pageSize){
            var params = {
                body:{
                    pageNum: prescriptionOrderPage,
                    pageSize: pageSize,
                    account: this.$store.state.account,
                    blTime: this.blTime == 0 ? '' : this.blTime,
                    drugStoreAccount: '',
                    clerkAccount: '',
                    userName: this.$route.params.userName == 0 ? '' : this.$route.params.userName,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
               
            }
            var userType = this.$store.state.userType
            if(userType == 52){
                params.body.clerkAccount = this.clerkAccount;
            }

            if(userType == 22 || userType == 49 || userType == 50 || userType == 51 ){
                params.body.drugStoreAccount = this.drugStoreAccount;
            }

            if(this.blTime == 0 && this.clerkAccount == 0 && this.drugStoreAccount == 0){
                params.body.blTime = '';
                params.body.drugStoreAccount = '';
                params.body.clerkAccount = '';
            }
            getPrescriptionOrderList(params).then(res => {
                this.clickStatus = true;
                
                if(res.result == 0){
                    for(var i = 0; i < res.list.length; i++){
                        this.prescriptionOrderList.push(res.list[i]);
                    }
                    if(res.list.length < pageSize){
                        this.moreDataText = '没有更多数据了'
                    }else{
                        this.prescriptionOrderPage ++ ;
                        console.log(this.prescriptionOrderPage)
                    }
                } 
            });
        },
        jumpPrescriptionDetail(orderNo){
            this.$router.push({name:'prescriptionDetail',params:{orderNo:orderNo}});
        }
    },
    mounted() {
        this.getPrescriptionOrderListAjax(1,10);
    },
}
</script>
<style>
    .prescriptionList-wrap{
       background: #fff;
    }
    .prescriptionList-item{
        padding: 0.1rem 0.15rem 0.12rem 0;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-left: 0.15rem;
        color: #333;
        border-bottom: 1px solid #ededed;
    }
    .prescriptionList-item:last-child{
        border:none;
    }
    .prescriptionList-main{
        flex-grow: 2;
        -webkit-flex-grow: 2;
    }
    .prescriptionList-item .prescriptionList-arrow{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .prescriptionList-normal{
        line-height: 0.22rem;
    }
    .prescriptionList-normal span:first-child{
        margin-right: 0.06rem;
    }
    .prescriptionList-normal span:last-child{
        /* font-weight: 600; */
    }
    .prescriptionList-drug{
        display: flex;
        display: -webkit-flex;
    }
    .prescriptionList-drug>span{
         flex-shrink: 0;
        -webkit-flex-shrink: 0;
    }
    .prescriptionList-drug>div{
        flex-grow: 2;
        -webkit-flex-grow: 2;
        /* font-weight: 600; */
        margin-left: 0.06rem;
    }
    .prescriptionList-num{
        margin-left: 0.21rem;
    }
    .prescriptionList-line{
        margin-left: 0.15rem;
        border-bottom: 1px solid #ededed;
    }
    .prescriptionList-line:last-child{
        border: none;
    }
    .data-more{
        text-align: center;
    }
    .data-more span{
        line-height:0.42rem;
        color: #999999;
    }
    .data-more div{
        height:0rem;
    }
</style>

