<template>
    <div class="headBread">
        <div class="headBread-height"></div>
        <div class="headBread-gai">
            <i></i>
            <span v-text="headBread"></span>
            <img @click="businessManagerShow()" :src="filter_btn" alt="">
        </div>
    </div>
</template>
<script>
import filter_btn from '@/common/images/filter_btn.png'
export default {
    props:['headBread'],
    data(){
        return{
           filter_btn: filter_btn
        }
    },
    methods:{
       businessManagerShow(){
           this.$store.commit('businessManagerShowFlag',true);
       }
    }
}
</script>
<style scoped>
    .headBread-height{
        height: 0.1rem;
    }
    .headBread-gai{
        color: red;
        background-color: #fff;
        padding: 0 0.15rem;
        border-bottom: 1px solid #ebebeb;
        height: 0.36rem;
        box-sizing: border-box;
    }
    .headBread-gai i{
        display: inline-block;
        width: 0.02rem;
        height: 0.1rem;
        background: #3081f2;  
        margin-top: 0.13rem;
        float: left;
    }
    .headBread-gai span{
        display: inline-block;
        color: #333;
        font-weight: 600; 
        margin-left: 0.04rem;
        float: left;
        margin-top: 0.08rem;
        width: 3.13rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .headBread-gai img{
        width: 0.18rem;
        float: right;
        margin-top: 0.08rem;
    }
</style>