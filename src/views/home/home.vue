<template>
  <div v-wechat-title="$route.meta.title">  
    <templates></templates>
  </div>
</template>
<script>
import templates from '@/views/commonComponents/template.vue'
export default {
  name: 'home',
  data(){
    return{
        
    }
  },
  components:{
    templates
  }
}
</script>