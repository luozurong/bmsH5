<template>
    <div class="prescriptionDetail"  v-wechat-title="$route.meta.title">
        <div class="prescriptionDetail-height"></div>
        <div class="prescriptionDetail-shadow" v-if="prescriptionDate != null">
            <div class="prescriptionDetail-head-wrap">
                <div class="prescriptionDetail-head">
                    <img class="prescriptionDetail-head-logo" :src="logojian" alt="">
                    <img class="prescriptionDetail-head-er" :src="prescriptionDate.barCodeUrl" alt="">
                </div>
                <div class="prescriptionDetail-word">处方笺</div>
                <div class="prescriptionDetail-line"></div>
                <img class="prescriptionDetail-zhang" :src="official_seal" alt="">
            </div>
            <div class="prescriptionDetail-wrap">
                <div>
                    <span>费别：</span>
                    <span class="line prescriptionDetail-line1" v-text="prescriptionDate.fb">自费</span>
                    <span>医疗证/医保卡号：</span>
                    <span class="line prescriptionDetail-line2" v-text="prescriptionDate.sbcardNo">3265475211111</span>
                </div>
                <div>
                    <span>姓名：</span>
                    <span class="line prescriptionDetail-line3" v-text="prescriptionDate.userName"></span>
                    <span>性别：</span>
                    <span class="line prescriptionDetail-line4">{{prescriptionDate.sex == 1 ? "男" : "女"}}</span>
                    <span>年龄：</span>
                    <span class="line prescriptionDetail-line5">{{prescriptionDate.age}}岁</span>
                    <span>就诊卡号：</span>
                    <span class="line prescriptionDetail-line6" v-text="prescriptionDate.cardNo"></span>
                </div>
                <div>
                    <span>科别：</span>
                    <span class="line prescriptionDetail-line7">内科</span>
                    <span>诊号：</span>
                    <span class="line prescriptionDetail-line8" v-text="prescriptionDate.blNo"></span>
                    <span>开方日期：</span>
                    <span class="line prescriptionDetail-line9">{{prescriptionDate.blTime | timeString}}</span>
                </div>
                <div>
                    <span>临床诊断：</span>
                    <span class="line prescriptionDetail-line10" v-text="prescriptionDate.diagnoseDetail"></span>
                </div>
                <div>
                    <span>住址/电话：</span>
                    <span class="line prescriptionDetail-line11">{{prescriptionDate.address}}</span>
                </div>
                <div>
                    <span>协议药店：</span>
                    <span class="line prescriptionDetail-line10" v-text="prescriptionDate.drugstoreName"></span>
                </div>
            </div>
            <div class="prescriptionDetail-rp">
                <img :src="rp" alt="">
            </div>
            <div class="prescriptionDetail-drup">
                <div class="prescriptionDetail-drup-item" v-for="(item,index) in prescriptionDate.prescriptionDrugList" :key="index">
                    <div class="prescriptionDetail-drup-name">
                        <span>{{index+1}}、{{item.drugName}}</span>
                        <span>{{item.norms}}*{{item.count}}{{item.count_unit}}</span>
                    </div>
                    <div class="prescriptionDetail-drup-use">用法：{{item.dosage}}  {{item.useage}}</div>
                </div>
            </div>
            <div class="prescriptionDetail-empty">
                <i></i>
                <span>以下为空</span>
                <i></i>
            </div>
            <div class="prescriptionDetail-tip">注：{{prescriptionDate.dec}}</div>
            <div class="prescriptionDetail-container">
                <div class="prescriptionDetail-container-item">
                    <span>公费记账：</span>
                    <span class="line prescriptionDetail-line12"></span>
                    <span class="prescriptionDetail-yuan">元</span>
                    <span>付现：</span>
                    <span class="line prescriptionDetail-line13"></span>
                    <span class="prescriptionDetail-yuan">元</span>
                    <span>药品金额：</span>
                    <span class="line prescriptionDetail-line14"></span>
                    <span>元</span>
                </div>
                <div class="prescriptionDetail-container-item">
                    <span>医师：</span>
                    <span class="line prescriptionDetail-line15">
                        <span v-text="prescriptionDate.doctorName"></span>
                        <img :src="prescriptionDate.doctorSign" alt="">
                    </span>
                    <span>审方：</span>
                    <span class="line prescriptionDetail-line16"></span>
                </div>
                <div class="prescriptionDetail-container-item">
                    <span>调配：</span>
                    <span class="line prescriptionDetail-line17"></span>
                    <span>核对发药：</span>
                    <span class="line prescriptionDetail-line18">
                         <img :src="prescriptionDate.hosCachetUrl" alt="">
                    </span>
                </div>
            </div>
            <div class="prescriptionDetail-tip-last">注意：根据《互联网医院管理办法（试行）》规定，处方仅限本协议药店有效，自行下载不具有处方效力。为确保用药安全，处方三日内有效。</div>
        </div>
    </div>
</template>
<script>
import logojian from '@/common/images/logojian.png'
import er from '@/common/images/er.png'
import official_seal from '@/common/images/official_seal.png'
import rp from '@/common/images/rp.png'

import {getPrescriptionSignatureInfo} from '@/common/js/resource.js'

export default {
    name: 'prescriptionDetail',
    data(){
        return{
            logojian: logojian,
            er:er,
            official_seal: official_seal,
            rp: rp,
            prescriptionDate: null
        }
    },
    filters:{
        timeString(value){
            return value.substring(0,11);
        }
    },
    methods:{
       getPrescriptionSignatureInfoAjax(){
           var params = {
                body:{
                   orderNo: this.$route.params.orderNo,
                },
                header: {
                    token: '_test',
                    time_stamp: new Date().getTime()
                }
           };
           getPrescriptionSignatureInfo(params).then(res=>{
                if(res.result == 0){
                   this.prescriptionDate = res;
                }
           })
       }
    },
    mounted(){
        this.getPrescriptionSignatureInfoAjax();
    }
}
</script>
<style>
    .prescriptionDetail{ 
        padding: 0 0.15rem;
    }
    .prescriptionDetail-height{
        height: 0.15rem;
    }
    .prescriptionDetail-shadow{
        box-shadow: 0 0.03rem 0.05rem 0 rgba(0, 0, 0, 0.1);
        background: #fff;
    }
    .prescriptionDetail-head{
        overflow: hidden;
        padding: 0.15rem 0.15rem 0 0.15rem;
        box-sizing: border-box;
    }
    .prescriptionDetail-head-logo{
        width: 1.72rem;
        height: 0.23rem;
        float: left;
    }
    .prescriptionDetail-head-er{
        width: 0.82rem;
        height: 0.33rem;
        float: right;
    }
    .prescriptionDetail-word{
        font-size: 0.16rem;
        font-weight: 600;
        text-align: center;
        color: #333;
    }
    .prescriptionDetail-line{
        margin: 0.09rem 0.15rem 0;
        border-bottom: 0.03rem solid #333; 
    }
    .prescriptionDetail-head-wrap{
        position: relative;
    }
    .prescriptionDetail-zhang{
        width: 0.7rem;
        position: absolute;
        top: 0.09rem;
        right: 1.11rem;
        z-index: 1;
    }
    .prescriptionDetail-wrap{
        padding: 0.05rem 0.15rem 0;
    }
    .prescriptionDetail-wrap div span{
        font-size: 0.10rem;
        color: #333;
    }
    .line{
        display: inline-block;
        text-align: center;
        border-bottom: 1px solid #333;
        margin-right: 0.08rem;
        position: relative;
    }
    .prescriptionDetail-line1{  
        width: 0.65rem;
    }
    .prescriptionDetail-line2{
        width: 1.25rem;
        margin-right: 0rem;
    }
    .prescriptionDetail-line3{
        width: 0.5rem;
    }
    .prescriptionDetail-line4{
        width: 0.2rem;
    }
    .prescriptionDetail-line5{
        width: 0.24rem;
    }
    .prescriptionDetail-line6{
        width: 0.54rem;
        margin-right: 0rem;
    }
    .prescriptionDetail-line7{
        width: 0.5rem;
    }
    .prescriptionDetail-line8{
        width: 0.77rem;
    }
    .prescriptionDetail-line9{
        width: 0.6rem;
        margin-right: 0rem;
    }
    .prescriptionDetail-line10{
        width: 2.63rem;
        margin-right: 0rem;
        text-align: left;
        padding-left: 0.05rem;
        box-sizing: border-box;
    }
    .prescriptionDetail-line11{
        width: 2.59rem;
        margin-right: 0rem;
        text-align: left;
        padding-left: 0.05rem;
        box-sizing: border-box;
    }
    .prescriptionDetail-line12{
        width: 0.37rem;
    }
    .prescriptionDetail-line13{
        width: 0.37rem;
    }
    .prescriptionDetail-line14{
        width: 0.37rem;
    }
    .prescriptionDetail-line15{
        width: 1.54rem;
        text-align: left;
    }
    .prescriptionDetail-line16{
        width: 0.92rem;
        margin-right: 0
    }
    .prescriptionDetail-line17{
        width: 1.33rem;
    }
    .prescriptionDetail-line18{
        width: 0.93rem;
        margin-right: 0;
    }
    .prescriptionDetail-rp{
        padding: 0 0.15rem;
    }
    .prescriptionDetail-rp img{
        width: 0.215rem;
        height: 0.17rem;
        margin-top: 0.12rem;
    }
    .prescriptionDetail-drup{
        padding: 0 0.15rem 0 0.3rem;
        min-height: 1rem;
    }
    .prescriptionDetail-drup-item{
        margin-bottom: 0.02rem;
    }
    .prescriptionDetail-drup-name{
        display: flex;
        display: -webkit-flex;
    }
    .prescriptionDetail-drup-name span:first-child{
       flex-grow: 2;
       -webkit-flex-grow: 2;
       font-size: 0.12rem;
       color: #333;
       font-weight: 600;
       line-height: 0.21rem;
    }
    .prescriptionDetail-drup-name span:last-child{
       flex-shrink: 0;
       -webkit-flex-shrink: 0;
       font-size: 0.1rem;
       color: #999;
       line-height: 0.21rem;
    }
    .prescriptionDetail-drup-use{
        font-size: 0.1rem;
        color: #999;
    }
    .prescriptionDetail-empty{
        display: flex;
        display: -webkit-flex;
        align-items:  center;
        margin-top: 0.15rem;
        margin-bottom: 0.15rem;
        padding: 0 0.15rem;
    }
    .prescriptionDetail-empty i{
        flex-grow: 2;
       -webkit-flex-grow: 2;
       border-bottom: 1px dotted #dedede;
    }
     .prescriptionDetail-empty span{
       flex-shrink: 0;
       -webkit-flex-shrink: 0;
       font-size: 0.1rem;
       color: #999;
       margin: 0 0.05rem;
    }
    .prescriptionDetail-tip{
        color: #999;
        font-size: 0.1rem;
        margin: 0 0.15rem;
        text-align: justify;
        padding-bottom: 0.07rem;
        border-bottom: 0.02rem solid #333;
    }
    .prescriptionDetail-container{
        padding: 0 0.15rem;
    }
    .prescriptionDetail-container-item span{
        font-size: 0.1rem;
    }
     .prescriptionDetail-container-item .line1{
         margin-right: 0rem;
     }
    .prescriptionDetail-yuan{
        margin-right: 0.09rem;
    }
    .prescriptionDetail-tip-last{
        color: #999;
        font-size: 0.096rem;
        margin: 0 0.15rem;
        margin-top: 0.04rem;
        padding-bottom: 0.13rem;
    }
    .line img{
        width: 0.42rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        z-index: 1;
    }
    .prescriptionDetail-line15 span{
        text-align: left !important;
        padding-left: 0.15rem !important;
        box-sizing: border-box;
    }
</style>
