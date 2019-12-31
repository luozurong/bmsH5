<template>
    <!-- 药店店员 -->
   <div v-wechat-title="$route.meta.title">
       <templates></templates>
    </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'

export default {
    name: 'drugStoreClerkIndex',
    data(){
       return{
           
       }
    },
    components:{
        templates
    }
}
</script>

