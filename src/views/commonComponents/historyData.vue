<template>
    <div>
        <!-- 药店管理员 -->
        <div class="historyData">
            <div v-if="userType == 19">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)">
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-normal">
                            <span>店员名称：</span>
                            <span v-text="item.clerkName"></span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum"></span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 药店店员 -->
            <div v-if="userType == 52">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)"> 
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum"></span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 药企管理员 -->
            <div v-if="userType == 22">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)"> 
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="historyData-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum">2019-3-19 11:38</span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>


            <!-- 业务员 -->
            <div v-if="userType == 51">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)"> 
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="historyData-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum">2019-3-19 11:38</span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>


            <!-- 业务组织管理员 -->
            <div v-if="userType == 50">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)"> 
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="historyData-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum"></span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 业务组织管理员 -->
            <div v-if="userType == 49 || userType == 55 || userType == 56">
                <div  class="historyData-item" v-for="(item,index) in historyDataAjax" :key="index" @click="jumpPrescriptionDetail(item.blTime,item.drugStoreAccount,item.clerkAccount,item.userName)"> 
                    <div class="historyData-main">
                        <div class="historyData-normal">
                            <span>处方时间：</span>
                            <span>{{item.blTime | timeString}}</span>
                        </div>
                        <div class="historyData-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="historyData-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="historyData-drug">
                            <span>处方数量统计：{{item.orderNum}}</span>
                            <!-- <span v-text="item.orderNum"></span> -->
                        </div>
                    </div>
                    <img class="historyData-arrow" :src="arrow_icon" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import arrow_icon from '@/common/images/arrow_icon.png'

export default {
    props:['historyDataAjax'],
    data(){
        return{
           arrow_icon: arrow_icon,
           userType: this.$store.state.userType
        }
    },
    filters:{
        timeString(value){
            return value.substring(0,11);
        }
    },
    methods:{
        jumpPrescriptionDetail(blTime,drugStoreAccount,clerkAccount,userName){
            this.$router.push({name:'prescriptionList',params:{
                blTime: blTime.substring(0,11),
                drugStoreAccount: drugStoreAccount,
                clerkAccount: clerkAccount,
                userName: 0
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

</style>