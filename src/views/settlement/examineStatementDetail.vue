<template>
    <!-- 复核不通过-编辑  结算单详情-->
    <div>
        <headBread :headBread="examineStatementDetailMsg"></headBread>
        <div class="examineStatement">
            <div class="examineStatement-msg" v-for="(item,index) in suggestion" :key="index">
                <div>
                    <span>审批操作：</span>
                    <span v-if="item.handleType == 0">复核不通过</span>
                    <span v-if="item.handleType == 1">审核通过</span>
                    <span v-if="item.handleType == 2">复核不通过</span>
                    <span v-if="item.handleType == 3">复核通过</span>
                </div>
                <div>
                    <span>审批时间：</span>
                    <span v-text="item.createTime">2019.2.27</span>
                </div>
                <div>
                    <span>备注信息：</span>
                    <span v-text="item.remark"></span>
                </div>
            </div>
        </div>
        <statement v-if=" balance!=null " :balance="balance" :suggestion="suggestion" :id="id"></statement>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import statement from '@/views/settlement/statement.vue'

import {blanceBodyDetailServlet} from '@/common/js/resource.js'

export default {
    name: 'examineStatementDetail',
    data(){
        return{
            examineStatementDetailMsg: '审批意见',
            balance: null,
            suggestion: null,
            id: sessionStorage.examineStatementDetailid
        }
    },
    components:{
        headBread,
        statement
    },
    methods:{
        blanceBodyDetailServletAjax(){
            var params = {
                 body: {
                   id: sessionStorage.examineStatementDetailid//this.$route.params.id
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            blanceBodyDetailServlet(params).then(res => {
                console.log(res);
                if(res.result == 0){
                    this.balance = res.data.balance;
                    this.suggestion = res.data.suggestion;
                }
            })
        }
    },
    mounted() {
        this.blanceBodyDetailServletAjax();
    }
}
</script>
<style scoped>
    .examineStatement{
        background: #fff;
    }
    .examineStatement-msg{
        padding: 0.13rem 0.15rem 0.13rem 0;
        background: #fff;
        margin-left: 0.15rem;
        border-bottom: 1px solid #ebebeb;
    }
    .examineStatement-msg:last-child{
        border-bottom: none;
    }
    .examineStatement-msg div{
        margin-bottom: 0.01rem;
    }
    .examineStatement-msg div span{
        color: #333;
    }
</style>
