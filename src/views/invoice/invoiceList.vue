<template>
  <!-- 开票列表 -->
  <div v-wechat-title="$route.meta.title">
    <div class="invoice-tab">
      <div :class="{'invoice-tab-active': tabIndex == 1}" @click="invoiceTab(1)">
        <div>可开发票结算单</div>
        <span></span>
      </div>
      <div :class="{'invoice-tab-active': tabIndex == 2}" @click="invoiceTab(2)">
        <div>开票记录</div>
        <span></span>
      </div>
    </div>
    <div class="invoice-header-div"></div>
    <div v-show="tabIndex == 1" class="invoice-wrap invoice-wrap-kai">
      <div class="invoice" v-for="(item,index) in invoiceAttr" :key="index">
        <div class="invoice-item"> 
          <div class="invoice-select" @click="selectInvoice(index)">
            <img v-if="!item.selectFlag" :src="select_nor" alt="">
            <img v-if="item.selectFlag" :src="checked_btn" alt="">
          </div> 
          <div class="invoice-main">
            <div class="invoice-normal">
              <span>支付模式：</span>
              <span v-if="item.payModelType == 1">后付费</span>
              <span v-if="item.payModelType == 2">预付</span>
              <span v-if="item.payModelType == 3">免费</span>
            </div>
            <div class="invoice-normal">
              <span>结算周期：</span>
              <span v-text="item.balanceTime">2019-01-01～2019-02-01</span>
            </div>
            <div class="invoice-normal">
              <span>结算金额：</span>
              <span>¥{{item.balanceMoney}}</span>
            </div>
            <div class="invoice-normal">
              <span>结算状态：</span>
              <span v-if="item.payModelType == 1">已结算</span>
            </div>
            <div class="invoice-normal">
              <span>提交时间：</span>
              <span v-text="item.createTime">2019-4-20</span>
            </div>
          </div>
        </div>
        <div class="invoice-btn">
          <span @click="jumpInvoiceEdit(item.balanceBodyCountFpId)">开发票</span>
        </div>
      </div>
      <moreData v-if="invoiceAttr.length > 0"  v-on:clickStatusFunc="clickMore()" :moreDataText="moreDataText"/>
      <empty v-if="invoiceAttr.length == 0"/>
    </div>
    <div v-show="tabIndex == 2" class="invoice-wrap">
      <div class="invoice"  @click="jumpInvoiceDetail(item.invoiceManageId,item.status)" v-for="(item,index) in invoiceAttrRecord" :key="index">
        <div class="invoice-item">
          <div class="invoice-main">
            <div class="invoice-normal">
              <span>开票金额：</span>
              <span v-text="item.money"></span>
            </div>
            <div class="invoice-normal">
              <span>开票结算单数：</span>
              <span v-text="item.totalFp"></span>
            </div>
            <div class="invoice-normal">
              <span>发票种类：</span>
              <span v-if="item.type == 1">电子增值税普通发票</span>
              <span v-if="item.type == 2">增值税普通发票（纸质）</span>
              <span v-if="item.type == 3">增值税专用发票</span>
            </div>
            <div class="invoice-normal">
              <span>开票状态：</span>
              <span v-if="item.status == 1">申请中 </span>
              <span v-if="item.status == 2">开票失败 </span>
              <span v-if="item.status == 3">开票成功 </span>
            </div>
            <div class="invoice-normal">
              <span>提交时间：</span>
              <span v-text="item.createTime"></span>
            </div>
          </div>
        </div>
      </div>
      <moreData v-if="invoiceAttrRecord.length > 0"  v-on:clickStatusFunc="clickMoreRecord()" :moreDataText="moreDataTextRecord"/>
      <empty v-if="invoiceAttrRecord.length == 0"/>
    </div>
    <div class="invoice-div"></div>
    <div v-if="tabIndex == 1 && invoiceAttr.length > 0" class="checkStatements">
      <span @click="morekP()">批量开票</span>
    </div>
  </div>
</template>
<script>
import {balanceBodyCountFpListServlet,invoiceManageListServlet} from '@/common/js/resource.js'

import moreData from '@/views/commonComponents/moreData.vue'
import empty from '@/views/commonComponents/empty.vue'

import arrow_icon from '@/common/images/arrow_icon.png'
import select_nor from '@/common/images/select_nor.png'
import checked_btn from '@/common/images/checked_btn.png'
export default{
  name: 'invoiceList',
  data(){
      return {
        tabIndex: sessionStorage.tabIndex || 1,
        arrow_icon,
        select_nor,
        checked_btn,
        moreDataText: '点击查看更多',
        moreDataTextRecord: '点击查看更多',
        invoiceAttr: [],
        pageNum: 1,
        invoiceAttrRecord: [],
        pageNumRecord: 1
       
      }
  },
  components:{
    moreData,
    empty
  },
  methods:{
    invoiceTab(i){
      this.tabIndex = i;
      sessionStorage.setItem('tabIndex',i)
      this.$emit('tabIndexValue', i);
    },
    jumpInvoiceDetail(id,status){
      if(status == 2){
        this.$router.push({
        name:'invoiceEdit',
        params:{
          invoiceId: id,
          status: 2
        }});
        return false;
      }
      this.$router.push({
        name:'invoiceDetail',
        params:{
          invoiceId: id,
          status: status
        }});
    },
    jumpInvoiceEdit(id){
      this.$router.push({
        name:'invoiceEdit',
        params:{
          invoiceId: id,
          status: 0
        }}
      );
    },
    balanceBodyCountFpListServletAjax(pageSize,pageNum){
      var params = {
        body: {
          balanceAccount: this.$store.state.account,
          pageSize: pageSize,
          pageNum: pageNum
        },
        header: {
          token: '_test',
          time_stamp: new Date().getTime()
        }
      }
      balanceBodyCountFpListServlet(params).then(res => {
        if(res.result == 0){
          let fpAttr = res.data.data;
          for(var i = 0; i < fpAttr.length; i++){
            fpAttr[i].selectFlag = false;
            this.invoiceAttr.push(fpAttr[i]);
          }
          if(fpAttr.length < pageSize){
            this.moreDataText = '没有更多数据了';
          }else{
            this.pageNum += 1;
          }
        }  
      });
    },
    selectInvoice(i){
      if(this.invoiceAttr[i].selectFlag){
        this.invoiceAttr[i].selectFlag = false;
      }else{
        this.invoiceAttr[i].selectFlag = true;
      }
    },
    clickMore(){
      if(this.moreDataText == '点击查看更多'){
        this.balanceBodyCountFpListServletAjax(10,this.pageNum);
      }
    },
    //一开发票记录
    invoiceManageListServletAjax(pageSize,pageNum){
      var params = {
        body: {
          balanceAccount: this.$store.state.account,
          pageSize: pageSize,
          pageNum: pageNum
        },
        header: {
          token: '_test',
          time_stamp: new Date().getTime()
        }
      }
      invoiceManageListServlet(params).then(res => {
        if(res.result == 0){
          let fpAttrRecord = res.data.data;
          for(var i = 0; i < fpAttrRecord.length; i++){
            this.invoiceAttrRecord.push(fpAttrRecord[i]);
          }
          if(fpAttrRecord.length < pageSize){
            this.moreDataTextRecord = '没有更多数据了'
          }else{
            this.pageNumRecord += 1;
          }
        }  
      });
    },
    clickMoreRecord(){
      if(this.moreDataTextRecord == '点击查看更多'){
        this.invoiceManageListServletAjax(10,this.pageNumRecord);
      }
    },
    morekP(){
      let invoiceAttrString = []
      for(var i = 0; i < this.invoiceAttr.length; i++){
        if(this.invoiceAttr[i].selectFlag){
          invoiceAttrString.push(this.invoiceAttr[i].balanceBodyCountFpId)
        }
      }

      if(invoiceAttrString.length > 0){
        this.$router.push({name:'invoiceEdit',params:{invoiceId: invoiceAttrString.toString()}})
      }else{
        lxjTip.msg("请选择可开发票结算单");
      }
    }
  },
  mounted(){
    this.balanceBodyCountFpListServletAjax(10,this.pageNum);
    this.invoiceManageListServletAjax(10,this.pageNumRecord);
  }
}
</script>
<style scoped>
  .invoice-header-div{
    height: 0.4rem;
  }
  .invoice-tab{
    display: flex;
    display: -webkit-flex;
    background: #fff;
    height: 0.4rem;
    margin-bottom: 0.1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
  .invoice-tab>div{
    width: 50%;
    text-align: center;
    line-height: 0.38rem;
  }
  .invoice-tab>div.invoice-tab-active{
    color: #3081f2;
  }
  .invoice-tab>div.invoice-tab-active span{
    display: block;
    height: 0.02rem;
    width: 0.24rem;
    background: #3081f2;
    margin: 0 auto;
  }
  .invoice{
    background: #fff;
  }
  .invoice-wrap-kai .invoice-item{
    margin-top: 0.1rem;
  }
  .invoice-item{
    padding: 0.1rem 0.15rem 0.12rem 0;
    margin-left: 0.15rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    color: #333;
    border-bottom: 1px solid #ededed;
  }
  .invoice-main{
    flex-grow: 2;
    -webkit-flex-grow: 2;
  }
  .invoice-wrap{
    margin-top: 0.1rem;
  }
  .invoice-item .invoice-arrow{
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    width: 0.07rem;
    height: 0.12rem;
  }
  .invoice-normal{
    line-height: 0.22rem;
  }
  .invoice-btn{
    padding: 0.05rem 0;
    overflow: hidden;
  }
  .invoice-btn span{
    padding: 0.05rem 0.15rem;
    border: 1px solid #3081f2;
    border-radius: 0.15rem;
    color: #3081f2;
    float: right;
    margin-right: 0.15rem;
    font-size: 0.12rem;
  }
  .checkStatements{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background: #fff;
    height: 0.48rem;
  }
  .checkStatements span{
    display: block;
    margin: 0 0.15rem;
    color: #fff;
    background: #3081f2;
    line-height: 0.36rem;
    text-align: center;
    border-radius: 0.08rem;
    margin-top: 0.06rem;
  }
  .invoice-div{
    height: 0.58rem;
  }
  .invoice-select{
    width: 0.3rem;
  }
  .invoice-select img{
    width: 0.14rem;
  }
  .invoice:last-child .invoice-item{
    border: none;
  }
</style>