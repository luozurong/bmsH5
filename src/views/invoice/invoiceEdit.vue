<template>
  <!-- 开票信息 -->
  <div v-wechat-title="$route.meta.title">
    <div class="invoice-types">
      <div>开票类型</div>
      <div>
        <div v-for="(item,index) in invoiceTypesAttr" :key="index" @click="invoiceTypesFunc(item.type)">
          <img v-if="!item.isFlag" :src="select_nor" alt="">
          <img v-if="item.isFlag" :src="checked_btn" alt="">
          <span v-text="item.name"></span>
        </div>
      </div>
    </div>
    <div class="invoice-detail-word">发票详情</div>
    <div class="invoice-views">
      <div>
        <span>发票抬头</span>
        <span><input type="text" v-model="invoiceManageObject.buyerName" placeholder="填写发票抬头"></span>
      </div>
      <div>
        <span>税号</span>
        <span><input type="text" v-model="invoiceManageObject.taxNum" placeholder="填写税号"></span>
      </div>
      <div>
        <span>地址</span>
        <span><input type="text" v-model="invoiceManageObject.address" placeholder="填写地址"></span>
      </div>
      <div>
        <span>开户银行</span>
        <span><input type="text" v-model="invoiceManageObject.bankName" placeholder="填写开户银行"></span>
      </div>
      <div>
        <span>开户银行支行</span>
        <span><input type="text" v-model="invoiceManageObject.bankLocalName" placeholder="填写开户银行支行"></span>
      </div>
      <div>
        <span>银行账号</span>
        <span><input type="text" v-model="invoiceManageObject.bankAccount" placeholder="填写银行账号"></span>
      </div>
       <div>
        <span>手机号</span>
        <span><input type="text" v-model="invoiceManageObject.phone" placeholder="填写手机号"></span>
      </div>
      <div>
        <span>备注</span>
        <span><input type="text" v-model="invoiceManageObject.remarks" placeholder="填写备注"></span>
      </div>
    </div>
    <div class="invoice-views invoice-views-margin" @click="showInvoiceList()">
      <div>
        <span>开票金额</span>
        <span class="invoice-views-right">
          <span>共{{invoiceManageObject.totalFp}}张结算单</span>
          <img v-if="!showInvoiceListFlag" :src="arrow_icon" alt="">
          <img v-if="showInvoiceListFlag" class="invoice-views-nor"  :src="select_icom" alt="">
        </span>
        <span class="invoice-views-color">{{invoiceManageObject.money}}元</span>
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
      <div v-if="invoiceType == 1">
        <span>电子邮件</span>
        <span><input type="text" v-model="invoiceManageObject.email" placeholder="填写电子邮件"></span>
      </div>
      <div  v-if="invoiceType == 2 || invoiceType == 3">
        <span>收件人</span>
        <span><input type="text" v-model="invoiceManageObject.saleName" placeholder="填写收件人"></span>
      </div>
      <div  v-if="invoiceType== 2 || invoiceType == 3">
        <span>收件地址</span>
        <span><input type="text" v-model="invoiceManageObject.saleAddress" placeholder="填写收件地址"></span>
      </div>
    </div>
    <div style="height: 0.6rem;"></div>
    <div class="checkStatements">
      <span @click="sureInvoice()">确认开票</span>
    </div>
  </div>
</template>
<script>
import {invoiceManageServlet,invoiceManageSaveServlet,invoiceManageFailedSaveServlet,invoiceManageDetailServlet} from '@/common/js/resource.js'

import select_nor from '@/common/images/select_nor.png'
import checked_btn from '@/common/images/checked_btn.png'
import arrow_icon from '@/common/images/arrow_icon.png'
import select_icom from '@/common/images/select_icom.png'
import { setTimeout } from 'timers';
export default{
  data(){
      return {
        arrow_icon,
        select_icom,
        checked_btn,
        select_nor,
        showInvoiceListFlag: false,
        invoiceTypesAttr: [
          {isFlag: true,name: '电子增值税普通发票',type: 1},
          {isFlag: false,name: '增值税普通发票（纸质）',type: 2},
          {isFlag: false,name: '增值税专用发票',type: 3},
        ],
        invoiceManageObject: {},
        FpList: [],
        invoiceType: 1,
        submitFlag: true
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
    invoiceTypesFunc(type){
      for(var i = 0; i < this.invoiceTypesAttr.length; i++){
        this.invoiceTypesAttr[i].isFlag = false;
      }
      this.invoiceTypesAttr[type-1].isFlag = true;
      this.invoiceType = type;
    },
    //获取开票数据
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
          this.FpList = res.FpList;
          this.invoiceManageObject = res.invoiceManageDetail;
          this.invoiceManageObject.bankName = res.invoiceManageDetail.bankName;
          this.invoiceManageObject.bankLocalName = res.invoiceManageDetail.bankLocalName
          this.invoiceManageObject.bankAccount = res.invoiceManageDetail.bankCode;
        }  
      });
    },
    //获取开票列表数据
    invoiceManageServletAjax(){
      var params = {
        body: {
           balanceBodyCountFpIds: this.$route.params.invoiceId,
           balanceAccount: this.$store.state.account
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
      }
      invoiceManageServlet(params).then(res => {
        if(res.result == 0){
          console.log(res);
          this.FpList = res.FpList;
          this.invoiceManageObject = res.invoiceManageObject;
        }  
      });
    },
    //确认开票
    sureInvoice(){
      console.log(111);
      if(!this.submitFlag) return false
      if(this.invoiceManageObject.buyerName == ''){
        lxjTip.msg("请填写发票抬头")
        return false;
      }
      if(!this.invoiceManageObject.taxNum && this.invoiceManageObject.taxNum.length  < 6 && this.invoiceManageObject.taxNum.length  > 20){
        console.log(this.invoiceManageObject.taxNum);
        lxjTip.msg("请填写税号(6-20位)")
        return false;
      }
      if(this.invoiceManageObject.address  == ''){
        lxjTip.msg("请填写地址")
        return false;
      }
      if(this.invoiceManageObject.bankName  == ''){
        lxjTip.msg("请填写开户银行")
        return false;
      }
      if(this.invoiceManageObject.bankLocalName  == ''){
        lxjTip.msg("请填写开户银行支行")
        return false;
      }
      if(!this.invoiceManageObject.bankAccount && this.invoiceManageObject.bankAccount.length < 6){
        lxjTip.msg("请填写正确银行账号")
        return false;
      }
      if(this.invoiceManageObject.phone == ''){
        lxjTip.msg("请填写手机号")
        return false;
      }
      if(this.invoiceManageObject.email == '' && this.invoiceType == 1){
        lxjTip.msg("填写电子邮件")
        return false;
      }
      if(this.invoiceManageObject.saleName == '' && this.invoiceType != 1){
        lxjTip.msg("填写收件人")
        return false;
      }
      if(this.invoiceManageObject.saleAddress == '' && this.invoiceType != 1){
        lxjTip.msg("填写收件地址")
        return false;
      }
      this.submitFlag = false;

      if(this.$route.params.status == 0){
        this.invoiceManageSaveServlet();
      }else if(this.$route.params.status == 2){
        this.invoiceManageFailedSaveServletAjax();
      }
    },
    //重新开票
    invoiceManageFailedSaveServletAjax(){
      var params = {
        body: {
           invoiceManageId: this.$route.params.invoiceId,
           balanceBodyCountFpIds: this.invoiceManageObject.balanceBodyCountFpIds,
           balanceAccount: this.$store.state.account,
           buyername: this.invoiceManageObject.buyerName,
           taxNum: this.invoiceManageObject.taxNum,
           address: this.invoiceManageObject.address,
           bankName: this.invoiceManageObject.bankName,
           phone: this.invoiceManageObject.phone,
           bankLocalName: this.invoiceManageObject.bankLocalName,
           bankAccount: this.invoiceManageObject.bankAccount,
           remark: this.invoiceManageObject.remarks,
           money: this.invoiceManageObject.money,
           saleName: this.invoiceManageObject.saleName,
           saleAddress: this.invoiceManageObject.saleAddress,
           email: this.invoiceManageObject.email
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
      }
      invoiceManageFailedSaveServlet(params).then(res => {
        this.submitFlag = true;
        if(res.result == 0){
          lxjTip.msg('提交成功');
          sessionStorage.setItem('tabIndex',2)
          setTimeout(()=>{
            //this.$router.push({name:"invoiceList",params:{}});
            this.$router.back();
          },2000)
        }  
      });
    },
    //编辑开票
    invoiceManageSaveServlet(){
      var params = {
        body: {
           balanceBodyCountFpIds: this.$route.params.invoiceId,
           balanceAccount: this.$store.state.account,
           buyername: this.invoiceManageObject.buyerName,
           taxNum: this.invoiceManageObject.taxNum,
           address: this.invoiceManageObject.address,
           bankName: this.invoiceManageObject.bankName,
           phone: this.invoiceManageObject.phone,
           bankLocalName: this.invoiceManageObject.bankLocalName,
           type: this.invoiceType,
           bankAccount: this.invoiceManageObject.bankAccount,
           remark: this.invoiceManageObject.remarks,
           money: this.invoiceManageObject.money,
           saleName: this.invoiceManageObject.saleName,
           saleAddress: this.invoiceManageObject.saleAddress,
           email: this.invoiceManageObject.email
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
      }
      invoiceManageSaveServlet(params).then(res => {
         this.submitFlag = true;
        if(res.result == 0){
          lxjTip.msg('提交成功');
          sessionStorage.setItem('tabIndex',2)
          setTimeout(()=>{
            this.$router.push({name:"invoiceList",params:{}});
          },2000)
        }  
      });
    }
  },
  mounted(){
    if(this.$route.params.status == 2){
      this.invoiceManageDetailServletAjax();
    }else if(this.$route.params.status == 0){
       this.invoiceManageServletAjax();
    }

    console.log(this.invoiceManageObject.phone);
  }
}
</script>
<style scoped>
  .invoice-types{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    background: #fff;
    padding: 0.1rem 0.15rem;
    color: #333;
  }
  .invoice-types div{
    line-height: 35px;
  }
  .invoice-types>div:first-child{
    flex-shrink: 0; 
    -webkit-flex-shrink: 0; 
    width: 1rem;
  }
  .invoice-types>div:last-child{
    flex-grow: 2;
    -webkit-flex-grow: 2;
  }
  .invoice-types div div{
    display: flex;
    align-items: center;
  }
  .invoice-types div img{
    width: 0.14rem;
    margin-right: 0.05rem;
  }
  .invoice-types div div span{
    display: inline-block;
    line-height: 0.35rem;
  }
  .invoice-detail-word{
    line-height: 0.4rem;
    color: #999;
    padding-left: 0.15rem;
  }
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
  .invoice-views input::placeholder{
    color: #ccc;
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