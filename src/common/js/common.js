import Vue from 'vue'
import {getWxSignature} from '@/common/js/resource.js'
import wx  from 'weixin-js-sdk';

export function getSessionStorage(name){
    var nameValue = sessionStorage.getItem(name);
    if(nameValue == '' || nameValue == null || nameValue == undefined){
        return '';
    }
    return nameValue; 
}

export const cookie = {
	setCookie(name, value, Days){
		if(Days <= 0) Days = 7;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg)){
	        return decodeURI(arr[2]);
	    }else{
	        return null;
	    }
	}
}

Vue.prototype.isEmpty = function(name){
    if(name == '' || name == null || name == undefined){
        return true;
    }
    return false;
}

Vue.prototype.isIos = function(){
    const u = navigator.userAgent;
    return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
}


var wxUrl = '';
var u = navigator.userAgent;
var isIOS = u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1
if(isIOS){
    if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
        window.entryUrl = location.href;
        wxUrl = entryUrl;
    }
}
Vue.prototype.wxConfig = function(){
    var signatureUrl;
    if(wxUrl == ''){
        signatureUrl = window.location.href.split("?")[0];
        console.log(signatureUrl);
    }else{
        signatureUrl = wxUrl;   
    }

    var params = {
        body:{
            signatureUrl: signatureUrl.split("?")[0]
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
   };

   getWxSignature(params).then(res =>{
       wx.config({
            debug: false,
            appId: res.appid, 
            timestamp: res.timestamp, 
            nonceStr: res.noncestr, 
            signature: res.signature,
            jsApiList: [
                'chooseImage',
                'uploadImage',
                'downloadImage',
                'chooseWXPay'
            ] 
        });
        wx.ready(function(res){
          
        });
        wx.error(function(res){
           
        });
   });
}