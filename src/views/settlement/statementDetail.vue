<template>
    <div>
        <headBread :headBread="headBreadMsg"></headBread>
        <div class="settlementList-msg">
            <div>
                <span>付款方名称：</span>
                <span>大参林集团有限公司</span>
            </div>
            <div>
                <span>开户银行：</span>
                <span>兴业银行股份有限公司广州分行</span>
            </div>
            <div>
                <span>结算周期：</span>
                <span>月结</span>
            </div>
        </div>
        <headBread class="settlementList-dan" :headBread="settlementList"></headBread>
        <div class="settlementList-wrap">
            <div class="settlementList-wrap-item">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span>1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span class="settlementList-outTime">待付款-超时</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
            <div class="settlementList-wrap-border"></div>
            <div class="settlementList-wrap-item">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span>1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span class="settlementList-waitOutTime">待付款</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
            <div class="settlementList-wrap-border"></div>
            <div class="settlementList-wrap-item">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span>1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span class="settlementList-noPass">复核不通过</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
            <div class="settlementList-wrap-border"></div>
            <div class="settlementList-wrap-item">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span>1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span class="settlementList-waitPass">待审核</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
            <div class="settlementList-wrap-border"></div>
             <div class="settlementList-wrap-item">
                <div class="settlementList-wrap-left">
                    <div>
                        <span>结算周期：</span>
                        <span>2019.1.1~2019.1.31</span>
                    </div>
                    <div>
                        <span>结算金额：</span>
                        <span>1009.30</span>
                    </div>
                    <div>
                        <span>结算状态：</span>
                        <span>完成</span>
                    </div>
                </div>
                <img :src="arrow_icon" alt="">
            </div>
            <div class="settlementList-wrap-border"></div>
        </div>
        <moreData></moreData>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import moreData from '@/views/commonComponents/moreData.vue'
export default {
    data(){
        return{
            headBreadMsg: '结算主体信息',
            settlementList: '结算单',
            arrow_icon: arrow_icon
        }
    },
    components:{
        headBread,
        moreData
    }
}
</script>
<style scoped>
    .settlementList-msg{
        padding: 0.13rem 0.15rem;
        background: #fff;
    }
    .settlementList-msg div{
        margin-bottom: 0.01rem;
    }
    .settlementList-wrap{
        background: #fff;
    }
    .settlementList-wrap-item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
         padding: 0.13rem 0.15rem;
    }
    .settlementList-wrap-left{
        flex-grow: 2;
        -webkit-flex-grow: 2
    }
    .settlementList-wrap-item img{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 0.07rem;
        height: 0.12rem;
    }
    .settlementList-wrap-border{
        border-bottom: 1px solid #ebebeb;
        margin-left: 0.15rem;
    }
    .settlementList-wrap-border:last-child{
        border-bottom: none;
    }
    .settlementList-wrap-item span{
        color: #333;
    }
    .settlementList-wrap-item .settlementList-outTime{
        color: #ff5858;
    }
    .settlementList-wrap-item .settlementList-waitOutTime{
        color: #ff9b24;
    }
    .settlementList-wrap-item .settlementList-noPass{
        color: #ff5858;
    }
    .settlementList-wrap-item .settlementList-waitPass{
        color: #3081f2;
    }
</style>