<template>
    <!-- 待付款-超时/待付款-新建  结算单详情 -->
    <div>
        <statement v-if="balance!= null " :balance="balance" :suggestion="suggestion" :id="id"></statement>
    </div>
</template>
<script>
import statement from '@/views/settlement/statement.vue'
import {blanceBodyDetailServlet} from '@/common/js/resource.js'
export default {
    name: 'statementNew',
    data(){
        return{
            balance: null,
            suggestion: null,
            id: sessionStorage.id
        }
    },
    components:{
        statement
    },
    methods:{
        blanceBodyDetailServletAjax(){
            var params = {
                 body: {
                   id: sessionStorage.id
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            blanceBodyDetailServlet(params).then(res => {
                if(res.result == 0){
                    this.balance = res.data.balance;
                }
            })
        }
    },
    mounted() {
        this.blanceBodyDetailServletAjax();
    }
}
</script>
<style>

</style>

