<template>
    <div class="headBread">
        <div class="headBread-height"></div>
        <div class="headBread-gai">
            <i></i>
            <span v-text="headBread"></span>
        </div>
    </div>
</template>
<script>
export default {
    props:['headBread'],
    data(){
        return{
           
        }
    },
    methods:{
       
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
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        box-sizing: border-box;
    }
    .headBread-gai i{
        display: inline-block;
        width: 0.02rem;
        height: 0.1rem;
        background: #3081f2;
        margin-top: 0.01rem;
    }
    .headBread-gai span{
        display: inline-block;
        color: #333;
        font-weight: 600; 
        margin-left: 0.04rem;
        width: 3.13rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>

