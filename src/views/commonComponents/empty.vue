<template>
    <div class="empty" v-if="isShow">
        <img :src="default_icon" alt="">
        <span>暂无相关数据！</span>
        <div></div>
    </div>
</template>
<script>
import default_icon from '@/common/images/default_icon.png'
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            default_icon: default_icon,
            isShow: false
        }
    },
    mounted(){
        setTimeout(()=>{
            this.isShow = true;
        },100);
    }
}
</script>
<style scoped>
    .empty img{
        display: block;
        width: 0.48rem;
        height: 0.48rem;
        margin: 1.13rem auto 0.3rem;
    }
    .empty span{
        display: block;
        text-align: center;
        color: #999;
    }
    .empty div{
        height: 0.5rem;
    }
</style>
    