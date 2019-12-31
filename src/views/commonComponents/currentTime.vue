<template>
    <div>
        <!-- 药店管理员 -->
        <div  class="currentTime">
            <div v-if="userType == 19">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>店员名称：</span>
                            <span v-text="item.clerkName"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 药店店员 -->
            <div v-if="userType == 52">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 药企管理员 -->
            <div v-if="userType == 22">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 业务员 -->
            <div v-if="userType == 51">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

            <!-- 业务组织管理员 -->
            <div v-if="userType == 50">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>

             <!-- 业务管理员 -->
            <div v-if="userType == 49 || userType == 55 || userType == 56">
                <div class="currentTime-item" v-for="(item,index) in realTimeAjax" :key="index" @click="jumpPrescriptionDetail(item.orderNo)">
                    <div class="currentTime-main">
                        <div class="currentTime-normal">
                            <span>处方时间：</span>
                            <span v-text="item.blTime"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药企名称：</span>
                            <span v-text="item.drugCompName"></span>
                        </div>
                        <div class="currentTime-normal">
                            <span>药店名称：</span>
                            <span v-text="item.drugStoreName"></span>
                        </div>
                        <div class="currentTime-drug">
                            <span>药品信息：</span>
                            <div>
                                <div v-for="(list,i) in item.prescriptionDrugList" :key="i">
                                    <span v-text="list.drugName">阿莫西林胶囊</span>
                                    <span class="currentTime-num">{{list.count}}{{list.count_unit}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="currentTime-arrow" :src="arrow_icon" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import arrow_icon from '@/common/images/arrow_icon.png'
export default {
    props: ['realTimeAjax'],
    data(){
        return{
           arrow_icon: arrow_icon,
           userType: this.$store.state.userType
        }
    },
    methods:{
        jumpPrescriptionDetail(orderNo){
            console.log(orderNo);
            this.$router.push({name:'prescriptionDetail',params:{orderNo:orderNo}});
        }
    }
}
</script>
<style>
    .currentTime{
        background: #fff;
    }
    .currentTime-item{
        padding: 0.1rem 0.15rem 0.12rem 0;
        margin-left: 0.15rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #ededed;
    }
    .currentTime-item:last-child{
        border-bottom: none;
    }
    .currentTime-main{
        flex-grow: 2;
        -webkit-flex-grow: 2;
    }
    .currentTime-item .currentTime-arrow{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .currentTime-normal{
        line-height: 0.22rem;
    }
    .currentTime-drug{
        display: flex;
        display: -webkit-flex;
    }
    .currentTime-drug>span{
         flex-shrink: 0;
        -webkit-flex-shrink: 0;
    }
    .currentTime-drug>div{
        flex-grow: 2;
        -webkit-flex-grow: 2;
    }
    .currentTime-num{
        margin-left: 0.21rem;
    }
    .currentTime-line{
        margin-left: 0.15rem;
        border-bottom: 1px solid #ededed;
    }
    .currentTime-line:last-child{
        border: none;
    }
</style>

