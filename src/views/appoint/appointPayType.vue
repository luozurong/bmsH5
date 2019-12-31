<template>
    <div v-cloak>
        <headBread :headBread="appointMsg"></headBread>
        <div class="list-calender-fixed"  v-show="showCalendar">
            <calendar 
                :range="calendar2.range" 
                :value="calendar2.value" 
                @select="calendarSelect">
            </calendar>
        </div>
        <div class="appoint-wrap">
            <div class="appoint-wrap-item">
                <span>充值类型</span>
                <div v-if="balance.rechargeType == 1" class="appoint-div">保证金充值</div>
                <div v-if="balance.rechargeType == 2" class="appoint-div" >预付充值</div>
            </div>
            <div class="appoint-line"></div>
            
            <div class="appoint-wrap-item" v-if="calModelType == 1">
                <span>充值金额</span>
                <input type="text" v-if="balance.rechargeType == 1" placeholder="请输入金额" class="appoint-disabled" disabled  v-model="balance.money">
                <input type="number" v-if="balance.rechargeType == 2" placeholder="请输入金额" class="appoint-disabled" @blur="moneyBlur" @focus="moneyFocus"  v-model="chongMoney">
            </div>
            <div class="appoint-line"  v-if="balance.rechargeType == 2 && calModelType == 1"></div>     
            <div class="appoint-wrap-item" v-if="balance.rechargeType == 2 && calModelType == 1">
                <span>可开处方次数</span>
                <div class="appoint-div" v-text="kaiNum"></div>
            </div>

            <div class="appoint-wrap-item" v-if="calModelType == 2">
                <span>充值年数</span>
                <input type="text" v-if="balance.rechargeType == 1" placeholder="请输入金额" class="appoint-disabled" disabled  v-model="balance.money">
                <input type="number" v-if="balance.rechargeType == 2" placeholder="请输入金额" class="appoint-disabled" @blur="moneyBlur" @focus="moneyFocus"  v-model="chongMoney">
            </div>
            <div class="appoint-line"  v-if="balance.rechargeType == 2 && calModelType == 2"></div>     
            <div class="appoint-wrap-item" v-if="balance.rechargeType == 2 && calModelType == 2">
                <span>充值金额</span>
                <div class="appoint-div" v-text="kaiNum"></div>
            </div>

            <div class="appoint-line"></div>
            <div class="appoint-wrap-item">
                <span>支付方式</span>
                <div class="appoint-wrap-item-choose">
                    <div :class="{'choose-active': balance.payType == 1}" @click="chooseType(1)">
                        <i></i>
                        <span>微信</span>
                    </div>
                    <div :class="{'choose-active': balance.payType == 3}" @click="chooseType(3)">
                        <i></i>
                        <span>企业网银</span>
                    </div>
                    <div :class="{'choose-active': balance.payType == 2}" @click="chooseType(2)">
                        <i></i>
                        <span>上传凭证</span>
                    </div>
                </div>
            </div>
            <div class="appoint-line" v-if="balance.payType != 1"></div>
            <div  class="appoint-wrap-item" v-if="balance.payType != 1">
                <span>付款人</span>
                <input type="text" placeholder="请填写付款人" v-model="balance.payer">
            </div>
            <div class="appoint-line" v-if="balance.payType != 1"></div>
            <div class="appoint-wrap-item" v-if="balance.payType != 1">
                <span>付款人开户行</span>
                <input type="text" placeholder="请填写付款人开户行" v-model="balance.payerKhyh">
            </div>
            <div class="appoint-line" v-if="balance.payType != 1"></div>
            <div class="appoint-wrap-item" v-if="balance.payType != 1">
                <span>开户行账号</span>
                <input type="text" placeholder="请填写开户行账号" v-model="balance.payerKhyhzh">
            </div>
            <div class="appoint-line" v-if="balance.payType != 1"></div>
            <div class="appoint-wrap-item" @click="calendarShow()" v-if="balance.payType != 1">
                <span>付款日期</span>
                <input type="text"  class="appoint-disabled" disabled placeholder="请选择付款日期" v-model="balance.payTime">
                <!-- <img :src="arrow_icon" alt=""> -->
            </div>
            <div class="appoint-line" v-if="balance.payType != 1"></div>
            <div class="appoint-wrap-item" v-if="balance.payType != 1">
                <span>备注</span>
                <input v-if="balance.rechargeType == 1 && balance.status == 1" type="text" placeholder="请填写备注" v-model="remark">
                <input v-if="balance.rechargeType == 2 && rechargeRecordId != 0" type="text" placeholder="请填写备注" v-model="balance.remark">
                <input v-if="balance.rechargeType == 2 && rechargeRecordId == 0" type="text" placeholder="请填写备注" v-model="remark">
            </div>
            <div class="appoint-line" v-if="balance.payType == 2"></div>
        </div>
        <div class="appoint-file" v-show="balance.payType == 2" v-if="balance.payUrl != null  && balance.payUrl != ''">
            <div  @click="uploadPic()"  class="appoint-file-wrap appoint-file-wrap-pic">
                <img v-if="payUrl == ''" width="1" :src="balance.payUrl">
                <img v-if="payUrl != ''" :src="payUrl">
                <div> </div>
            </div>
            <div class="appoint-file-word">上传付款凭证</div>
        </div>

        <div class="appoint-file" v-show="balance.payType == 2" v-if="balance.payUrl == null || balance.payUrl == ''  ">
            <div  @click="uploadPic()"  class="appoint-file-wrap">
                <img v-if="payUrl == ''" class="appoint-file-wrap-d" :src="upload_icon" alt="" > 
                <img v-if="payUrl != ''" class="appoint-file-wrap-wx" :src="payUrl">
                <div></div>
            </div>
            <div v-if="balance.payUrl == ''" class="appoint-file-word">上传付款凭证</div>
        </div>

        <div class="appoint-height"></div>
        <div class="appoint-submit">
            <span @click="test()">取消</span>
            <span class="appoint-sure"  v-if="balance.payType != 1" @click="appointSubmit()">提交</span>
            <span class="appoint-sure"  v-if="balance.payType == 1" @click="appointSubmit()">去支付</span>
        </div>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import upload_icon from '@/common/images/upload_icon.png'

import calendar from '@/views/settlement/calendars.vue'

import '@/common/lxjTip/lxjTip.css'
import "@/common/lxjTip/lxjTip.js"

import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { Dialog } from 'vant';

Vue.use(wx).use(Dialog)

import {cookie} from '@/common/js/common.js'
import {blanceBodySaveServlet,wxImageUpload,balanceRechargeSaveServlet,wxPayCreateOrderServlet,wxPayQueryOrderServlet,bankXySearchFlow,balanceRecordPayFailedServlet,balanceRecordPaySuccessServlet} from '@/common/js/resource.js'
import { setTimeout } from 'timers';
import { parse } from 'path';
import { open } from 'fs';

export default {
    props: ['balance','rechargeTypeRouter'],
    name: 'appoint',
    data(){
        return{
            appointMsg: '付款信息',
            arrow_icon: arrow_icon,
            upload_icon: upload_icon,
            kaiNum: this.balance.currentUseNum,
            rechargeRecordId: sessionStorage.rechargeRecordId,//  this.GetURLParameter('rechargeRecordId'),//this.$route.params.rechargeRecordId,
            chongMoney: this.balance.money,
            calendar2:{
                range:false,
                value:[], 
            }, 
            showCalendar: false,
            payUrl: '',
            remark: '',
            serverId: '',
            serverIdPic: null,
            localIds: [],
            isShow: false,
            submitFlag: true,
            calModelType: sessionStorage.calModelType ? sessionStorage.calModelType : ''
           
        }
    },
    components:{
        headBread,
        calendar
    },
    watch: {
        chongMoney(newVal,oldVal){
            console.log(newVal);
            if(newVal == ''){
                 //this.kaiNum = 0;
                 return false;
            }
            var zheng = parseFloat(parseFloat(newVal).toFixed(2) / parseFloat(this.balance.balancePrice).toFixed(2));
            var zhengOther = zheng.toFixed(3);
            if(zhengOther > parseInt(zhengOther)){
                this.kaiNum = parseInt(zhengOther)+1;
            }else{
                this.kaiNum = parseInt(zheng);
            } 
            this.balance.money = newVal;
              console.log(newVal);
        },
        balance(newVal,oldVal){       
            this.kaiNum = newVal.currentUseNum;
            if(this.isEmpty(newVal.money) || newVal.money == 0){
                this.chongMoney == '';
            }else{
                 this.chongMoney = newVal.money;
            }
            if(newVal.payType == 0 || newVal.payType == null){
                this.balance.payType = 1;
            }
        }
    },
    methods: {
        GetURLParameter(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        moneyFocus(){
            if(this.chongMoney == 0){
                this.chongMoney = '';
            }
        },
        moneyBlur(){
            if(this.chongMoney == ''){
                this.chongMoney = 0;
            }
        },
        calendarShow(){
            this.showCalendar = true;
        },
        calendarSelect(begin,end){
            this.dateStr = begin.join("-");
            var that = this;
            setTimeout(function(){
                that.showCalendar = false;
                that.balance.payTime=  that.dateStr;
            },500)              
        },
        chooseType(i){
            this.balance.payType = i;
            if(i == 2 || i == 3){
                this.balance.picShow = true; 
            }else{
                this.balance.picShow = false;
            }
        },
        appointSubmit(){
            if( this.isEmpty(this.chongMoney) || this.isEmpty(this.balance.money) || this.balance.money == 0){
                lxjTip.msg("请填写充值金额");
                return false;
            }
            if(this.isEmpty(this.balance.payer) && this.balance.payType == 3){
                lxjTip.msg("请填写付款人");
                return false;
            }
            if(this.balance.payType == 3 && this.balance.payType == 3){
                if(this.isEmpty(this.balance.payerKhyh)){
                    lxjTip.msg("请填写付款人开户行");
                    return false;
                }
                if(this.isEmpty(this.balance.payerKhyhzh)){
                    lxjTip.msg("请填写开户行账号");
                    return false;
                }
            }
            if(this.isEmpty(this.balance.payTime) && this.balance.payType == 3){
                lxjTip.msg("请填写付款日期");
                return false;
            }   
            if(this.balance.payType == 2 && this.isEmpty(this.payUrl) && this.isEmpty(this.balance.payUrl)){
                if(this.serverId == ''){
                    lxjTip.msg("请上传付款凭证");
                    return false;
                }
            }
            if(this.serverId == ''){
                this.balanceRechargeSaveServletAjax();
            }else{
                this.wxImageUploadAjax(this.serverId);
            }
        },
        blanceBodySaveServletAjax(){
            var that = this;
            var params = {
                 body: {
                    id: this.id,
                    payer: this.payer,
                    khyh:this.khyh,
                    khyhAccount:this.khyhAccount,
                    payTime:this.payTime,
                    remark:this.remark,
                    payEvidence:this.payEvidence,

                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            
            blanceBodySaveServlet(params).then(res => {
               if(res.result == 0){
                   setTimeout(function(){
                        that.$router.go(-1);
                   },500);
               }
            })
        },
         uploadPic() {
            var that = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    var picUrl = res.localIds;
                    that.getIosLocalImgData(0, picUrl);
                }
            });
        },
        getIosLocalImgData(i, list) { //上传图片
            
            var that = this;
            var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if(isiOS){
                wx.getLocalImgData({
                    localId: list[i], // 图片的localID
                    success: function(iosRes) {
                        that.payUrl = iosRes.localData; // localData是图片的base64数据，可以用img标签显示
                    }
                });
            }else{
                that.payUrl = list[0].toString();
            }
            
            wx.uploadImage({
                localId: list[i].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(upres) {
                    that.serverId = upres.serverId;
                }
            });
        },
        wxImageUploadAjax(serverIdParams){
            var that = this;
            var params = '[' + serverIdParams + ']';
            wxImageUpload(params).then(res =>{
                if(res.result == 0){
                    var picUrlObj = res.data;
                    for(var v in picUrlObj){  
                        if(v ==  that.serverId){
                            that.balance.payUrl = picUrlObj[v];
                        }
                    } 
                    that.balanceRechargeSaveServletAjax();
                }
            });
        },
        test(){
             this.$router.go(-1);
        },
        calendarValue(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            this.calendar2.value[0] = year;
            this.calendar2.value[1] = month;
            this.calendar2.value[2] = day;
            this.payTime = year + '-' + month + '-' + day;
        },
        balanceRechargeSaveServletAjax(){
            var that = this;  
            var remark = '';
            if(!this.submitFlag){
                return false;
            }
            this.submitFlag = false;
            let rechargeRecordId = this.rechargeRecordId;
            if(this.rechargeRecordId == 0){
                remark = this.remark;
                rechargeRecordId = '';
            }else if(this.balance.status == 1 && this.balance.rechargeType == 1){
                remark = this.remark;
            }else{
                remark = this.balance.remark;
            }  
            var params = {
                body: {
                    rechargeRecordId: rechargeRecordId,
                    balanceAccount: this.balance.balanceAccount,
                    balanceName: this.balance.balanceName,
                    balanceType: this.balance.balanceType,
                    rechargeType: this.balance.rechargeType,
                    money: this.balance.money,
                    balancePrice: this.balance.balancePrice,
                    currentUseNum: this.balance.currentUseNum,
                    payType: this.balance.payType,
                    payer: this.balance.payer,
                    payerKhyh: this.balance.payerKhyh,
                    payerKhyhzh: this.balance.payerKhyhzh,
                    payTime: this.balance.payTime,
                    payUrl: this.balance.payUrl,
                    remark: remark,
                    status: this.balance.status,
                    orderNo: ''
                },
                header: {
                    token: '_test',
                    time_temp: new Date().getTime()
                }
            }
            console.log(params);
            balanceRechargeSaveServlet(params).then(res => {
                setTimeout(function(){
                    that.submitFlag = true;
                },2000)
                if(res.result == 0){
                    if(this.balance.payType == 1){
                        this.wxPayCreateOrderServletAjax(res.rechargeRecordId,this.balance.money,this.$store.state.openid,this.$store.state.appid,this.balance.rechargeType)
                    }else if(this.balance.payType == 2){
                        this.$router.back();
                    }else if(this.balance.payType == 3){
                        Dialog.confirm({
                            title: '支付',
                            message: '支付完成后根据您的情况点击下面按钮',
                            cancelButtonText: '支付失败',
                            confirmButtonText: '支付成功',
                            }).then(() => {
                              //
                             setTimeout(()=>{
                                that.balanceRecordPaySuccessServletAjax(res.rechargeRecordId,1); //支付成功
                             },0)
                            }).catch(() => {
                                 that.$router.back();
                             console.log(2)
                            }
                        );
                    }
                }          
            })
        },
        wxPayCreateOrderServletAjax(opertaorId,totalFee,openid,appid,rechargeType){
            var that = this;
            var params = {
                body: {
                    body:'预付充值',
                    opertaorId: opertaorId,
                    totalFee: totalFee,
                    openid: cookie.getCookie("openId") ,//'olhwswTLR4rlrWnZz2Rr_NNXB1kA',//
                    appid: cookie.getCookie("appId"), //'wx9b8b8bf1db2d870b',//
                    rechargeType: rechargeType
                },
                header: {
                    token: this.$store.state.token,
                    time_temp: new Date().getTime()
                }
            }
         
            wxPayCreateOrderServlet(params).then(res => {
                if(res.result == 0){
                    this.chooseWXPay(res.timeStamp,res.nonceStr,res.package,res.signType,res.paySign,res.outTradeNo)
                   // this.onBridgeReady(cookie.getCookie("appId"),res.timeStamp,res.nonceStr,res.package,res.paySign)
                  
                } 
            })
        },
        chooseWXPay(timeStamp,nonceStr,packages,signType,paySign,outTradeNo){
            var that = this;
            wx.chooseWXPay({
                timestamp: timeStamp, //时间戳
                nonceStr: nonceStr, // 支付签名随机串
                package: packages, // 统一支付接口
                signType: signType, // 签名方式
                paySign: paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    that.wxPayQueryOrderServletAjax(outTradeNo)
                }
            });
        },
        onBridgeReady(appid,timeStamp,nonceStr,packages,paySign){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": appid,    
                    "timeStamp":timeStamp,        
                    "nonceStr":nonceStr, 
                    "package": packages,     
                    "signType":"MD5",           
                    "paySign": paySign
                },
                function(res){
                    lxjTip.msg(JSON.stringify(res));
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    } 
            }); 
        },
        //微信支付查询
        wxPayQueryOrderServletAjax(outTradeNo){
            var that = this;
            var params = {
                 body: {
                   outTradeNo: outTradeNo
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            
            wxPayQueryOrderServlet(params).then(res => {
                if(res.result == 0){
                   lxjTip.msg("支付成功");
                   setTimeout(function(){
                       that.$router.back();
                   },2000)
                }else{
                   lxjTip.msg("支付失败"); 
                }
            })
        },
        //系统审核中
        balanceRecordPaySuccessServletAjax(rechargeRecordId,type){
             lxjTip.msg("系统审核中");
             var that = this;
             var params = {
                 body: {
                    orderId: rechargeRecordId,
                    type: type,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            balanceRecordPaySuccessServlet(params).then(res => {
                if(res.result == 0){
                   //this.bankXySearchFlowAjax(rechargeRecordId);
                   setTimeout(()=>{
                        that.$router.back();
                   },2500);
                }
            })
        },
        //兴业银行企业网银查询用户是否支付完成
        bankXySearchFlowAjax(orderId){
          
            var params = {
                 body: {
                   acctId: this.balance.payerKhyhzh,
                   money: this.chongMoney,
                   orderId: orderId,
                   beginTime: this.balance.payTime,
                   userType: this.balance.rechargeType
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
            };
            bankXySearchFlow(params).then(res => {
                if(res.result == 0){
                   this.$router.back();
                }
            })
            
        }  
    },
    mounted() {   
        this.wxConfig();
        this.calendarValue();       
        setTimeout(()=>{ 
            this.isShow  = true;
        },100);
    }
}
</script>
<style scoped>
    [v-cloak]{
        display: none;
    }
    input::placeholder{
        color: #999;
    }
    .appoint-wrap{
        background: #fff;
        padding-left: 0.15rem;
    }
    .appoint-wrap-item{
        padding-right: 0.15rem;
        display: flex;
        display: -webkit-flex;
        height: 0.4rem;
        align-items: center;
    }
    .appoint-wrap-item span{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        color: #333;
    }
    .appoint-wrap-item input{
        flex-grow: 2;
        -webkit-flex-grow: 2;
        margin-left: 0.2rem;
        text-align: right;
        outline: none;
        border: none;
        color: #333;
    }
    .appoint-div{
         flex-grow: 2;
        -webkit-flex-grow: 2;
        margin-left: 0.2rem;
        text-align: right;
        color: #333;
    }
    .appoint-wrap-item img{
        width: 0.07rem;
        height: 0.12rem;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        margin-left: 0.07rem;
    }
    .appoint-line{
        border-bottom: 1px solid #ebebeb;
    }
    .appoint-file{
        padding: 0.3rem 0;
        background: #fff;
    }
    .appoint-file .appoint-file-wrap{
        position: relative;
        width: 2.4rem;
        height: 1.6rem;
        margin: 0 auto;
        background-color: #eeeeee;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }
    .appoint-file div img{
        width: 0.5rem;
    }
    .appoint-file div div{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        margin: 0 auto;
        opacity: 0;
    }
    .appoint-file .appoint-file-word{
        font-size: 0.14rem;
        color: #333;
        text-align: center;
        margin-top: 0.07rem;
    }
    .appoint-height{
        height: 0.58rem;
    }
    .appoint-submit{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
        height: 0.48rem;
        background: #fff;
        display: flex;
        display: -webkit-flex;
        width: 100%;
        align-items: center;
        -webkit-align-items: center;
    }
    .appoint-submit span{
        width: 1.65rem;
        height: 0.36rem;
        border-radius: 0.08rem;
        text-align: center;
        color: #fff;
        line-height: 0.36rem;
        background: #9da0a5;
        margin-left: 0.15rem;
    }
    .appoint-submit span.appoint-sure{
       background: #3081f2;
    }
    .appoint-disabled{
        background: #fff;
        color: #333;
    }
    .list-calender-fixed{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        box-shadow: 0 0 0.1rem #999;
        background: #fff;
    }
    .appoint-file .appoint-file-wrap-pic{
        background-size: contain;
        background-repeat: no-repeat; 
        background-position: center; 
        background-color: #fff;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        overflow: hidden;
    }
    .appoint-file .appoint-file-wrap-pic img{
        width: 100%;
    }
    .appoint-wrap-item-choose{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.47rem;
    }
    .appoint-wrap-item-choose>div{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        align-items: -webkit-center;
        justify-content: -webkit-center;
        margin-left: 0.2rem;
    }
    .appoint-wrap-item-choose>div:first-child{
        margin-left: 0rem;
    }
    .appoint-wrap-item-choose  i {
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        background-image: url(../../common/images/unchecked_btn.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain; 
        margin-right: 0.05rem;
    }
    .appoint-wrap-item-choose div.choose-active i {
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        background-image: url(../../common/images/checked_btn.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain; 
        margin-right: 0.05rem;
    }
    .appoint-file-wrap{
        overflow: hidden;
    }
    .appoint-file-wrap .appoint-file-wrap-d{
        width: 0.5rem !important;
        height: 0.5rem !important;
    }
    .appoint-file-wrap-wx{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100% !important;
        margin: auto;
    }
    input:disabled,input[disabled] {
        color: #333!important;
        opacity: 1;
    }
</style>