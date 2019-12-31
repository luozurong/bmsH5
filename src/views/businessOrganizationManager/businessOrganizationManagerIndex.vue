<template>
    <!-- 业务组织管理员 -->
    <div v-wechat-title="$route.meta.title">  
        <templates></templates>
    </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'
export default {
    name: 'businessOrganizationManagerIndex',
    data(){
        return{
           
        }
    },
    components:{
       templates
    }
}
</script>