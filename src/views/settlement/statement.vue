<template>
    <div>
        <headBread :headBread="statementMsg"></headBread>
        <div class="list-calender-fixed"  v-show="showCalendar">
            <calendar 
                :range="calendar2.range" 
                :value="calendar2.value" 
                @select="calendarSelect"></calendar>
        </div>
        <div class="statement-wrap">
            <div class="statement-wrap-item">
                <span>结算周期</span>
                <input type="text" class="statement-disabled" disabled v-model="balance.timeStr">
            </div>
            <div class="statement-line"></div>
            <div class="statement-wrap-item">
                <span>金额</span>
                <input type="text"  class="statement-disabled" disabled v-model="balance.balanceMoney">
            </div>
            <div class="statement-line"></div>
            <div class="appoint-wrap-item">
                <span>支付方式</span>
                <div class="appoint-wrap-item-choose">
                    <div :class="{'choose-active': payType == 1}" @click="chooseType(1)">
                        <i></i>
                        <span>微信</span>
                    </div>
                   
                    <div :class="{'choose-active': payType == 3}" @click="chooseType(3)">
                        <i></i>
                        <span>企业网银</span>
                    </div>
                     <div :class="{'choose-active': payType == 2}" @click="chooseType(2)">
                        <i></i>
                        <span>上传凭证</span>
                    </div>
                </div>
            </div>
            <div class="statement-line" v-if="payType != 1"></div>
            <div  class="statement-wrap-item" v-if="payType != 1">
                <span>付款人</span>
                <input type="text" placeholder="请填写付款人" v-model="payer">
            </div>
            <div class="statement-line" v-if="payType != 1"></div>
            <div  class="statement-wrap-item" v-if="payType != 1">
                <span>付款人开户行</span>
                <input type="text" placeholder="请填写付款人开户行" v-model="khyh">
            </div>
            <div class="statement-line" v-if="payType != 1"></div>
            <div class="statement-wrap-item" v-if="payType != 1">
                <span>开户行账号</span>
                <input type="text" placeholder="请填写开户行账号" v-model="khyhAccount">
            </div>
            <div class="statement-line" v-if="payType != 1"></div>
            <div class="statement-wrap-item" @click="calendarShow()" v-if="payType != 1">
                <span>付款日期</span>
                <input type="text"  class="statement-disabled" disabled placeholder="请选择付款日期" v-model="payTime">
            </div>
            <div class="statement-line" v-if="payType != 1"></div>
            <div class="statement-wrap-item" v-if="payType != 1">
                <span>备注</span>
                <input type="text" placeholder="请填写备注" v-model="remark">
            </div>
            <div class="statement-line" v-if="payType == 2"></div>
        </div>
        <div class="statement-file" v-if="picFlag && payEvidence != '' && payEvidence != null && payType == 2">
            <div class="statement-file-wrap statement-file-wrap-pic">
                <img :src="payEvidence">
                <div @click="uploadPic()"> </div>
            </div>
            <div class="statement-file-word">上传付款凭证</div>
        </div>

        <div class="statement-file" v-if="!picFlag || payEvidence == '' || payEvidence == null  && payType == 2">
            <div class="statement-file-wrap">
                <img :src="upload_icon" alt="" >
                <div @click="uploadPic()"> </div>
            </div>
            <div class="statement-file-word">上传付款凭证</div>
        </div>
        <div class="statement-height"></div>
        <div class="statement-submit">
            <span @click="test()">取消</span>
            <span class="statement-sure" v-if="payType != 1" @click="statementSubmit()">提交</span>
            <span class="statement-sure" v-if="payType == 1" @click="statementSubmit()">支付</span>
        </div>
    </div>
</template>
<script>
import headBread from '@/views/commonComponents/headBread.vue'
import arrow_icon from '@/common/images/arrow_icon.png'
import upload_icon from '@/common/images/upload_icon.png'

import calendar from '@/views/settlement/calendars.vue'
import {cookie} from '@/common/js/common.js'

import Vue from 'vue'
import wx from 'weixin-js-sdk'
import { Dialog } from 'vant';
Vue.use(wx).use(Dialog)

import {blanceBodySaveServlet,wxImageUpload,wxPayCreateOrderServlet,wxPayQueryOrderServlet,bankXySearchFlow,balanceRecordPaySuccessServlet} from '@/common/js/resource.js'
import { setTimeout } from 'timers';

export default {
    props: ['balance','suggestion','id'],
    name: 'statement',
    data(){
        return{
            statementMsg: '付款信息',
            arrow_icon: arrow_icon,
            upload_icon: upload_icon,
            calendar2:{
                range:false,
                value:[], 
            },
            showCalendar: false,
            payer: this.balance.payer,
            khyh:this.balance.khyh,
            khyhAccount:this.balance.khyhAccount,
            payTime:this.balance.payTime,
            remark:this.balance.remark,
            payEvidence:this.balance.payEvidence,
            payType: this.balance.payType ? this.balance.payType: 3,
            picFlag: true,
            serverId: '',
            serverIdPic: null,
            localIds: [],
            isSubmit: true
        }
    },
    components:{
        headBread,
        calendar
    },
    methods: {
        calendarShow(){
            this.showCalendar = true;
        },
        calendarSelect(begin,end){
            this.dateStr = begin.join("-");
            var that = this;
            setTimeout(function(){
                that.showCalendar = false;
                that.payTime =  that.dateStr;
            },500)              
        },
        chooseType(i){
            this.balance.payType = i;
            this.payType = i;
        },
        statementSubmit(){
            if(this.payType == 3){
                if(this.payer == '' || this.payer == null){
                    lxjTip.msg("请填写付款人");
                    return false;
                }
                if(this.isEmpty(this.khyh)){
                    lxjTip.msg("请填写付款人开户行");
                    return false;
                }
                if(this.isEmpty(this.khyhAccount)){
                    lxjTip.msg("请填写开户行账号");
                    return false;
                }
                if(this.isEmpty(this.payTime)){
                    lxjTip.msg("请填写付款日期");
                    return false;
                }
            }
            if(this.payType == 2){
                if(this.payer == '' || this.payer == null){
                    lxjTip.msg("请填写付款人");
                    return false;
                }
                if(this.isEmpty(this.payTime)){
                    lxjTip.msg("请填写付款日期");
                    return false;
                }
                if(this.payEvidence == '' || this.payEvidence == null){
                    if(this.serverId == ''){
                        lxjTip.msg("请上传付款凭证");
                        return false;
                    }
                }
            }
            if(!this.isSubmit){
                setTimeout(()=>{
                    this.isSubmit = true;
                },2000);
                return false;
            }
            this.isSubmit = false;
            if(this.serverId == ''){
                this.blanceBodySaveServletAjax();
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
                    payType: this.payType,
                    khyh: this.khyh,
                    khyhAccount: this.khyhAccount,
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
               console.log(res);
               if(res.result == 0){
                   if(this.payType == 1){  //微信支付
                        that.wxPayCreateOrderServletAjax(this.id,this.balance.balanceMoney,6)
                   }else if(this.payType == 2){ //上传凭证
                        lxjTip.msg("提交成功");
                        setTimeout(function(){
                            that.$router.go(-1);
                        },2500);
                   }else if(this.payType == 3){ //企业网银
                        Dialog.confirm({ title: '支付',
                            message: '支付完成后根据您的情况点击下面按钮',
                            cancelButtonText: '支付失败',
                            confirmButtonText: '支付成功',
                            }).then(() => {
                                setTimeout(()=> {
                                     that.balanceRecordPaySuccessServletAjax(that.id,2); //支付成功
                                },0)
                            }).catch(() => {
                            that.$router.back();//支付失败
                        });
                   } 
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
                        that.payEvidence = iosRes.localData; // localData是图片的base64数据，可以用img标签显示
                    }
                });
            }else{
                that.payEvidence = list[0].toString();
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
                           that.payEvidence = picUrlObj[v];
                        }
                    } 
                    that.blanceBodySaveServletAjax();
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
        wxPayCreateOrderServletAjax(opertaorId,totalFee,rechargeType){
            var that = this;
            var params = {
                body: {
                    body:'结算单充值',
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
        //判断系统审核中状态
        balanceRecordPaySuccessServletAjax(rechargeRecordId,type){
             lxjTip.msg("系统审核中");
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
                        this.$router.back();
                   },2500);
                }
            })
        },
        //兴业银行企业网银查询用户是否支付完成
        bankXySearchFlowAjax(orderId){
           
            var params = {
                 body: {
                   acctId: this.khyhAccount,
                   money: this.balance.balanceMoney,
                   orderId: orderId,
                   beginTime: this.payTime,
                   userType: 3
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
        if(this.isEmpty(this.balance.payType) || this.balance.payType == 0){
            this.balance.payType = 0;
        }
        console.log(this.khyhAccount);
    },
}
</script>
<style scoped>
    input::placeholder{
        color: #999;
    }
    .statement-wrap{
        background: #fff;
        padding-left: 0.15rem;
    }
    .statement-wrap-item{
        padding-right: 0.15rem;
        display: flex;
        display: -webkit-flex;
        height: 0.4rem;
        align-items: center;
    }
    .statement-wrap-item span{
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        color: #333;
    }
    .statement-wrap-item input{
        flex-grow: 2;
        -webkit-flex-grow: 2;
        margin-left: 0.2rem;
        text-align: right;
        outline: none;
        border: none;
        color: #333;
    }
    .statement-wrap-item img{
        width: 0.07rem;
        height: 0.12rem;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        margin-left: 0.07rem;
    }
    .statement-line{
        border-bottom: 1px solid #ebebeb;
    }
    .statement-file{
        padding: 0.3rem 0;
        background: #fff;
    }
    .statement-file .statement-file-wrap{
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
    .statement-file div img{
        width: 0.5rem;
    }
    .statement-file div div{
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
    .statement-file .statement-file-word{
        font-size: 0.14rem;
        color: #333;
        text-align: center;
        margin-top: 0.07rem;
    }
    .statement-height{
        height: 0.58rem;
    }
    .statement-submit{
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
    .statement-submit span{
        width: 1.65rem;
        height: 0.36rem;
        border-radius: 0.08rem;
        text-align: center;
        color: #fff;
        line-height: 0.36rem;
        background: #9da0a5;
        margin-left: 0.15rem;
    }
    .statement-submit span.statement-sure{
       background: #3081f2;
    }
    .statement-disabled{
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
    .statement-file .statement-file-wrap-pic{
        background-size: contain;
        background-repeat: no-repeat; 
        background-position: center; 
        background-color: #fff;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        overflow: hidden;
    }
    .statement-file .statement-file-wrap-pic img{
        width: 100%;
    }
     .appoint-wrap-item{
        padding-right: 0.15rem;
        display: flex;
        display: -webkit-flex;
        height: 0.4rem;
        align-items: center;
    }
    .appoint-wrap-item-choose{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.4rem;
    }
    .appoint-wrap-item-choose>div{
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        align-items: -webkit-center;
        justify-content: -webkit-center;
        margin-left: 0.15rem;
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
</style>