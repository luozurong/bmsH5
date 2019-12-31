<template>
  <div id="app">
    <router-view  :key="$route.fullpath"></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
   
  }
}
</script>