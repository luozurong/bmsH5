<template>
  <!-- 开票信息 -->
  <div v-wechat-title="$route.meta.title">
    <div class="invoice-views">
      <div>
        <span>开票状态</span>
        <span v-if="invoiceManageDetail.status == 1">未开票</span>
        <span v-if="invoiceManageDetail.status == 2">申请中</span>
        <span v-if="invoiceManageDetail.status == 3">已开票</span>
      </div>
      <div>
        <span>开票类型</span>
        <span v-if="invoiceManageDetail.type == 1">电子增值税普通发票</span>
        <span v-if="invoiceManageDetail.type == 2">增值税普通发票（纸质）</span>
        <span v-if="invoiceManageDetail.type == 3">增值税专用发票</span>
      </div>
      <div>
        <span>申请时间</span>
        <span v-text="invoiceManageDetail.createTime"></span>
      </div>
      <div v-if="invoiceType == 3">
        <span>开票时间</span>
        <span v-text="invoiceManageDetail.finishTime"></span>
      </div>
      <div v-if="invoiceType == 1">
        <span>失败原因</span>
        <span v-text="invoiceManageDetail.message"></span>
      </div>
    </div>
    <div class="invoice-detail-word">发票详情</div>
    <div class="invoice-views">
      <div>
        <span>发票抬头</span>
        <span v-text="invoiceManageDetail.buyerName"></span>
      </div>
      <div>
        <span>税号</span>
        <span v-text="invoiceManageDetail.taxNum"></span>
      </div>
      <div>
        <span>地址</span>
        <span  v-text="invoiceManageDetail.address"></span>
      </div>
      <div v-if="invoiceManageDetail.type == 3">
        <span>开户银行</span>
        <span v-text="invoiceManageDetail.bankName"></span>
      </div>
      <div v-if="invoiceManageDetail.type == 3">
        <span>开户银行支行</span>
        <span v-text="invoiceManageDetail.bankLocalName">佛山支行</span>
      </div>
      <div v-if="invoiceManageDetail.type == 3">
        <span>银行账号</span>
        <span v-text="invoiceManageDetail.bankCode"></span>
      </div>
      <div>
        <span>备注</span>
        <span v-text="invoiceManageDetail.remarks">></span>
      </div>
    </div>
    <div class="invoice-views invoice-views-margin" @click="showInvoiceList()">
      <div>
        <span>开票金额</span>
        <span class="invoice-views-right">
          <span>共{{invoiceManageDetail.totalFp}}张结算单</span>
          <img v-if="!showInvoiceListFlag" :src="arrow_icon" alt="">
          <img v-if="showInvoiceListFlag" class="invoice-views-nor"  :src="select_icom" alt="">
        </span>
        <span class="invoice-views-color">{{invoiceManageDetail.money}}元</span>
      </div>
    </div>
    <div v-show="showInvoiceListFlag">
      <div class="invoice" v-for="(item,index) in FpList" :key="index">
        <div class="invoice-item"> 
          <div class="invoice-main">
            <div class="invoice-normal">
              <span>支付模式：</span>
              <span v-if="item.payModelType == 1">后付费</span>
              <span v-if="item.payModelType == 2">预付费</span>
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
              <span v-if="item.status">已结算</span>
            </div>
            <div class="invoice-normal">
              <span>提交时间：</span>
              <span v-text="item.createTime">2019-4-20</span>
            </div>
          </div>
          <!-- <img class="invoice-arrow" :src="arrow_icon" alt=""> -->
        </div>
      </div>
    </div>
    <div class="invoice-detail-word">接收方式</div>
    <div class="invoice-views">
      <div v-if="invoiceManageDetail.type == 1">
        <span>电子邮件</span>
        <span v-text="invoiceManageDetail.email">44788821@qq.com</span>
      </div>
      <div v-if="invoiceManageDetail.type == 2 || invoiceManageDetail.type == 3">
        <span>收件人</span>
        <span v-text="invoiceManageDetail.saleName">刘叔叔</span>
      </div>
      <div v-if="invoiceManageDetail.type == 2 || invoiceManageDetail.type == 3">
        <span>收件地址</span>
        <span v-text="invoiceManageDetail.saleAddress">广东省佛山市顺德区</span>
      </div>
    </div>
    <div style="height: 0.58rem"></div>
    <div class="checkStatements" v-if="invoiceType == 3">
      <span @click="checkInvoice()">查看发票</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);

import {invoiceManageDetailServlet} from '@/common/js/resource.js'

import arrow_icon from '@/common/images/arrow_icon.png'
import select_icom from '@/common/images/select_icom.png'
export default{
  data(){
      return {
        arrow_icon,
        select_icom,
        showInvoiceListFlag: false,
        invoiceManageDetail: {},
        FpList: [],
        invoiceType: this.$route.params.status
      }
  },
  methods:{
    showInvoiceList(){
      if(this.showInvoiceListFlag){
        this.showInvoiceListFlag = false;
      }else{
         this.showInvoiceListFlag = true;
      }
    },
    checkInvoice(){
      ImagePreview([
        this.invoiceManageDetail.fpLocalUrl
      ]);
    },
    invoiceManageDetailServletAjax(){
      var params = {
        body: {
           invoiceManageId: this.$route.params.invoiceId
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
      }
      invoiceManageDetailServlet(params).then(res => {
        if(res.result == 0){
         console.log(res);
         this.invoiceManageDetail = res.invoiceManageDetail;
         this.FpList = res.FpList;
        }  
      });
    },
  },
  mounted(){
    this.invoiceManageDetailServletAjax()
  }
}
</script>
<style scoped>
  .invoice-views{
    background: #fff;
    padding: 0 0.15rem;
    color: #666;
  }
  .invoice-views div{
    line-height: 0.4rem;
    border-bottom: 1px solid #eee;
  }
  .invoice-views div:last-child{
    border: none;
  }
  .invoice-views div span:first-child{
    display: inline-block;
    min-width: 0.7rem;
  }
  .invoice-views div span:nth-child(2){
    float: right;
    text-align: right;
  }
  .invoice-detail-word{
    line-height: 0.4rem;
    color: #999;
    padding-left: 0.15rem;
  }
  .invoice-views input{
    width: 2.3rem;
    outline: none;
    border: none;
    color: #666;
    text-align: right;
  }
  .invoice-views-right{
    float: right;
  }
  .invoice-views-color{
    color: #f60
  }
  .invoice-views-margin{
    margin-top: 0.1rem;
  }
  .invoice-views-margin img{
    width: 0.07rem;
    height: 0.12rem;
    margin-left: 0.1rem;
  }
  .invoice-views-margin img.invoice-views-nor{
    width: 0.12rem;
    height: 0.07rem;
  }
  .invoice{
    background: #fff;
  }
  .invoice-item{
    padding: 0.1rem 0 0.12rem 0;
    margin-left: 0.15rem;
    margin-right: 0.15rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    color: #333;
    border-bottom: 1px solid #ededed;
  }
  .invoice:last-child .invoice-item{
   border-bottom: none
  }
  .invoice-main{
    flex-grow: 2;
    -webkit-flex-grow: 2;
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
  
</style>
