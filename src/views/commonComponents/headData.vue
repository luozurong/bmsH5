<template>
    <div class="headData">
        <headBreadPic v-if="userTypeMy != 52" :headBread="headBread"></headBreadPic>
        <headBread v-if="userTypeMy == 52" :headBread="headBread"></headBread>
        <!-- 药企管理员 -->
        <div class="headData-wrap" v-if="userType == 22">
            <div class="headData-item-four" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>药店数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuSum"></span>
                </div>
            </div>
            <div class="headData-item-four" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>店员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuSum"></span>
                </div>
            </div>
            <div class="headData-item-four" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>订单数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuSum"></span>
                </div>
            </div>
            <div class="headData-item-four" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuSum"></span>
                </div>
            </div>
        </div> 

        <!-- 药店店员 -->
        <div class="headData-wrap" v-if="userType == 52">
            <div class="headData-item"  :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>订单数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuSum"></span>
                </div>
            </div>
            <div class="headData-item"  :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuSum"></span>
                </div>
            </div>
            <div class="headData-item"  :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>绩效</span>    
                </div>
                <div class="headData-month">
                    <span>上月</span>
                    <span class="headData-month-ti">:</span>
                    <span>{{performanceNmuMonth | toFixedValue}}</span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span>{{performanceNmuSum | toFixedValue}}</span>
                </div>
            </div>
        </div>

        <!-- 药店管理员 -->
        <div class="headData-wrap" v-if="userType == 19">
            <div class="headData-item"  :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>店员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuSum"></span>
                </div>
            </div>
            <div class="headData-item"  :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>订单数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuSum"></span>
                </div>
            </div>
            <div class="headData-item"  :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuSum"></span>
                </div>
            </div>
        </div>

        <!-- 业务员/业务组织管理员 -->
        <div class="headData-wrap" v-if="userType == 51 || userType == 50">
            <div class="headData-item" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>订单数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>绩效</span>    
                </div>
                <div class="headData-month">
                    <span>上月</span>
                    <span class="headData-month-ti">:</span>
                    <span>{{performanceNmuMonth | toFixedValue}}</span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span>{{performanceNmuSum | toFixedValue}}</span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>药企数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugCompanyNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugCompanyNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>药店数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>店员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuSum"></span>
                </div>
            </div> 
        </div> 


        <!-- 业员管理员 -->
        <div class="headData-wrap" v-if="userType == 49 || userType == 55 || userType == 56">
            <div class="headData-item" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>订单数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="orderNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="userNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>业务员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="countermanNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="countermanNmuSum"></span>
                </div>
            </div>
            <div class="headData-item-one" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>组织管理员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="countermanOrgAdminNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="countermanOrgAdminNmuSum">13</span>
                </div>
            </div> 
            <div class="headData-item-two" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>药企数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugCompanyNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugCompanyNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item-two" :style="{'background':'#599eff'}">
                <div class="headData-user">
                    <span>药店数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="drugStoreNmuSum"></span>
                </div>
            </div> 
            <div class="headData-item-two" :style="{'background':'#55d82c'}">
                <div class="headData-user">
                    <span>店员数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuMonth"></span>
                </div>
                <div class="headData-count">
                    <span>当前</span>
                    <span class="headData-month-ti">:</span>
                    <span v-text="clerkNmuSum"></span>
                </div>
            </div>  
        </div> 

        <!-- 模板 -->
        <div class="headData-wrap" v-if="userType == 0">
            <div class="headData-item" :style="{'background':'#ffad4c'}">
                <div class="headData-user">
                    <span>用户数</span>    
                </div>
                <div class="headData-month">
                    <span>当月</span>
                    <span class="headData-month-ti">:</span>
                    <span>12</span>
                </div>
                <div class="headData-count">
                    <span>累计</span>
                    <span class="headData-month-ti">:</span>
                    <span>13</span>
                </div>
            </div> 
        </div> 
       <headBread :headBread="headBreadOrder"></headBread>


        <!--实时数据/历史数据/用户数据切换 -->
        <div class="headData-tab">
            <div :class="{'headData-tab-active': tabIndex == 1}" @click="headDataTab(1)">
                <div>实时数据</div>
                <span></span>
            </div>
            <div :class="{'headData-tab-active': tabIndex == 2}" @click="headDataTab(2)">
                <div>历史数据</div>
                <span></span>
            </div>
            <div :class="{'headData-tab-active': tabIndex == 3}"  @click="headDataTab(3)">
                <div>用户数据</div>
                <span></span>
            </div>
        </div>

        <jumpUserTypePage></jumpUserTypePage>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import headBreadPic from '@/views/commonComponents/headBreadPic.vue'
import jumpUserTypePage from '@/views/commonComponents/jumpUserTypePage.vue'
export default {
    props: [
            'orderNmuMonth','orderNmuSum',
            'userNmuMonth','userNmuSum',
            'performanceNmuMonth','performanceNmuSum',
            'clerkNmuMonth','clerkNmuSum',
            'drugStoreNmuMonth','drugStoreNmuSum',
            'drugCompanyNmuMonth','drugCompanyNmuSum',
            'countermanNmuMonth','countermanNmuSum',
            'countermanOrgAdminNmuMonth','countermanOrgAdminNmuSum',
            ],
    data(){
        return{
            headBread: '',
            headBreadOrder: '订单数据',
            tabIndex: sessionStorage.tabIndex ? sessionStorage.tabIndex : 1,
        }
    },
    computed: {
        userType(){
            return this.$store.state.userType;
        },
        userTypeMy(){
            return this.$store.state.userTypeMy;
        },
        isLoad(){
            this.tabIndex = sessionStorage.tabIndex ? sessionStorage.tabIndex : 1;
            this.headInfo();
            return this.$store.state.isLoad;
        }
    },
    watch:{
        userTypeMy(val){
            this.headInfo();
        },
        userType(val){
            this.headInfo();
        },
        isLoad(){
           
        }
    },
    components:{
        headBread,
        headBreadPic,
        jumpUserTypePage
    },
    filters:{
        toFixedValue(value){
            return Number(value).toFixed(2);
        }
    },
    methods:{
        headDataTab(i){
            this.tabIndex = i;
            this.$emit('tabIndexValue', i);
            sessionStorage.setItem('tabIndex',i);
        },
        headInfo(){
            var userType = this.$store.state.userType;
            var userName = this.$store.state.userName
            if(this.$store.state.userType == 19){
                this.headBread = '药店管理员：' + userName
            }
            if(this.$store.state.userType == 22){
                this.headBread = '药企管理员：' + userName
            }
            if(this.$store.state.userType == 52){
                this.headBread = '药店店员：' + userName
            }
            if(this.$store.state.userType == 49){
                this.headBread = '业务管理员：' + userName
            }
            if(this.$store.state.userType == 55){
                this.headBread = '业务审批管理员：' + userName
            }
            if(this.$store.state.userType == 50){
                this.headBread = '业务组织管理员：' + userName
            }
            if(this.$store.state.userType == 56){
                this.headBread = '运营商管理员:' + userName
            }
            if(this.$store.state.userType == 51){
                this.headBread = '业务员：' + userName
            }
        }
    },
    mounted() {
        this.headInfo();
    }
}
</script>
<style scoped>
    .headData-gai{
        background-color: #fff;
        padding: 0 0.15rem;
        border-bottom: 1px solid #ebebeb;
        height: 0.36rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        box-sizing: border-box;
    }
    .headData-gai i{
        display: inline-block;
        width: 0.02rem;
        height: 0.1rem;
        background: #3081f2;
        margin-top: 0.01rem;
    }
    .headData-gai span{
        display: inline-block;
        color: #333;
        font-weight: 600; 
        margin-left: 0.04rem;
    }
    .headData-wrap{
        display: flex;
        display: -webkit-flex;
        padding: 0 0.15rem;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0.1rem;
        background: #fff;
    }
    .headData-wrap .headData-item{
        width: 31%;
        height: 0.75rem;
        box-sizing: border-box;
        margin: 0.05rem 0;
        border-radius: 0.04rem;
        text-align: center;
        color: #fff;
    }
    .headData-wrap .headData-item-four{
        width: 21.905%;
        height: 0.75rem;
        box-sizing: border-box;
        margin: 0.05rem 0;
        border-radius: 0.04rem;
        text-align: center;
        margin: 0 0.055rem;
        color: #fff;
    }
    .headData-wrap .headData-item:nth-child(3n-1){
        margin: 0.05rem 0.12rem;
    }
    .headData-wrap .headData-item-one{
        width: 0.98rem;
        height: 0.75rem;
        box-sizing: border-box;
        border-radius: 0.04rem;
        text-align: center;
        margin: 0.05rem 0rem;
        color: #fff;
    }
    .headData-wrap .headData-item-two{
        width: 0.73rem;
        height: 0.75rem;
        box-sizing: border-box;
        border-radius: 0.04rem;
        text-align: center;
        margin: 0.05rem 0rem 0.05rem 0.12rem ;
        color: #fff;
    }
    .headData-user{
        margin-top: 0.04rem;
        line-height: 0.27rem;
        font-weight: 600;
    }
    .headData-month,.headData-count{
        line-height: 0.18rem;
    }
    .headData-wrap .headData-item div span:last-child{
        margin-right: 0.05rem;
    }
    .headData-item div span.headData-month-ti,.headData-item-one div span.headData-month-ti, .headData-item-two div span.headData-month-ti{
        margin:0  0.05rem 0 0.02rem;
    }
    .headData-wrap .headData-item div.headData-user span:last-child{
        margin-right: 0rem;
    }
    .headData-tab{
        display: flex;
        display: -webkit-flex;
        background: #fff;
        height: 0.4rem;
        margin-bottom: 0.1rem;
    }
    .headData-tab>div{
        width: 33.333%;
        text-align: center;
        line-height: 0.38rem;
    }
    .headData-tab>div.headData-tab-active{
        color: #3081f2;
    }
    .headData-tab>div.headData-tab-active span{
        display: block;
        height: 0.02rem;
        width: 0.24rem;
        background: #3081f2;
        margin: 0 auto;
    }
</style>

