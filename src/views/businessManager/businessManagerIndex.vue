<template>
    <!-- 业员管理员 -->
    <div v-wechat-title="$route.meta.title">  
        <templates></templates>
    </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'
import close_btn from '@/common/images/close_btn.png'
import caution_icon from '@/common/images/caution_icon.png'

import {getRoleJlData} from '@/common/js/resource.js'
import {GetURLParameter} from '@/common/js/common.js'

export default {
    name: 'businessOrganizationManagerIndex',
    data(){
        return{
           close_btn: close_btn,
           caution_icon: caution_icon
        }
    },
    components:{
        templates,
    },
    methods:{
           
    },
    watch:{
       
    },
    mounted() {
        console.log(1);
    },
}
</script>
<style scoped>
    .businessManager-fixed{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        z-index: 10;
        background: rgba(0,0,0,0.2);
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }
    .businessManager-wrap{
        width: 3rem;
        background: #fff;
        border-radius: 0.08rem;
        padding-bottom: 0.2rem;
    }
    .businessManager-wrap-hread{
        line-height: 0.4rem;
        color: 0.16rem;
        color: #3081f2;
        font-weight: 600;
        text-align: center;
        border-bottom: 1px solid #ededed;
        position: relative;
    }
    .businessManager-wrap-hread img{
        position: absolute;
        width: 0.12rem;
        top: 0.13rem;
        right:0.13rem;
        z-index: 1;
    }
    .businessManager-wrap-item {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-top: 0.1rem;
    }
    .businessManager-wrap-item span{
        display: inline-block;
        width: 1.28rem;
        text-align: right;
        color: #333;
    }
    .businessManager-wrap-item div{
        display: inline-block;
        width: 1.5rem;
        height: 0.32rem;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        border-radius: 0.04rem;
        background-image: url(../../common/images/select_icom.png);
        background-position: 1.27rem 0.12rem; 
        background-repeat: no-repeat; 
        background-size: 0.12rem; 
        line-height: 0.32rem;
        color: #999;
        padding-left: 0.05rem;
        box-sizing: border-box;
    }
    .businessManager-sure{
        height: 0.32rem;
        line-height: 0.32rem;
        width: 1.8rem;
        background: #3081f2;
        margin: 0.2rem auto 0;
        text-align: center;
        border-radius: 0.04rem;
        color: #fff;
    }
    .businessManager-select-div{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 11;
        width: 100%;
        height: 100%;
        background: transparent; 
        overflow: auto;
    }
    .businessManager-select-fixed{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 12;
        width: 100%;
        background: #fff; 
        overflow: auto;
    }
    .businessManager-select-fixed .businessManager-wrap-hread{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        text-align: center;
        background: #fff;
        width: 100%;
    }
    .businessManager-select-auto{
        max-height: 5rem;
        overflow: auto;
    }
    .businessManager-select-item{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-left: 0.15rem;
        height: 0.4rem;
        border-bottom: 1px solid #ededed;
    }
    .businessManager-select-item img{
        width: 0.18rem;
        height: 0.18rem;
        margin-left: 0.1rem;
    }
    .businessManager-select-active{
        background-image: url(../../common/images/selected_icon.png);
        background-position: 3.33rem 0.15rem; 
        background-repeat: no-repeat; 
        background-size: 0.12rem; 
    }
    .businessManager-select-height{
        height: 0.4rem;
    }
    .businessManager-select-sure{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 12;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        color: #fff;
        background: #3081f2;
    }
    .guan::before{
        content: '*';
        color: red;
    }
</style>
