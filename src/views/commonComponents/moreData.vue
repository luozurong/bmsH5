<template>
    <div class="more">
       <div class="data-more">
            <span v-text="moreDataText" @click="moreDate()"></span>
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['moreDataText','clickStatus'],
    data(){
        return{
         
        }
    },
    methods:{
        moreDate(){
            this.$emit("clickStatusFunc",this.clickStatus)
        }
    }
}
</script>
<style scoped>
    .data-more{
        text-align: center;
    }
    .data-more span{
        line-height:0.42rem;
        color: #999999;
    }
    .data-more div{
        height:0.48rem;
    }
</style>