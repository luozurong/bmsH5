<template>
    <!-- 药企管理员 -->
   <div v-wechat-title="$route.meta.title">
       <templates></templates>
    </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'

export default {
    name: 'drugCompanyManagerIndex',
    data(){
       return{
           
       }
    },
    components:{
        templates
    }
}
</script>