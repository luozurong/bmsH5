import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {getSessionStorage,cookie} from '@/common/js/common.js'

const state = {
    isLogin: false,
    jumpFlag: false,
    token: cookie.getCookie('token')? cookie.getCookie('token'): '',
    isGetCode: cookie.getCookie('isGetCode')? false: true,
    userName: cookie.getCookie('userName'),
    userNameMy: cookie.getCookie('userNameMy'),
    account: cookie.getCookie('account'),
    accountMy: cookie.getCookie('accountMy'),
    userType: cookie.getCookie('userType'),
    userTypeMy: cookie.getCookie('userTypeMy'),
    isSettlement: cookie.getCookie('isSettlement'),
    isSettlementMy: cookie.getCookie('isSettlementMy'),
    businessManagerShowFlag: false,
    payType: sessionStorage.getItem('payType') ? sessionStorage.getItem('payType') : 1,   //付款方式:0结算款、1为预付款
    isPay: cookie.getCookie('isPay'),
    isLoad: false,
    openId: cookie.getCookie('openId') || null,
    appId: cookie.getCookie('appId') || null
}

const getters = {}
const mutations = {
    isLogin(state,bool){
        state.isLogin = bool;
    },
    isGetCode(state,bool){
        state.isGetCode = bool;
    },
    token(state,token){
        state.token = token;
    },
    userName(state,userName){
        state.userName = userName;
    },
    userNameMy(state,userNameMy){
        state.userNameMy = userNameMy;
    },
    account(state,account){
        state.account = account;
    },
    accountMy(state,accountMy){
        state.accountMy = accountMy;
    },
    userType(state,userType){
        state.userType = userType;
    },
    userTypeMy(state,userTypeMy){
        state.userTypeMy = userTypeMy;
    },
    isSettlement(state,isSettlement){
        state.isSettlement = isSettlement;
    },
    isSettlementMy(state,isSettlementMy){
        state.isSettlementMy = isSettlementMy;
    },
    businessManagerShowFlag(state,businessManagerShowFlag){
        state.businessManagerShowFlag = businessManagerShowFlag;
    },
    payType(state,payType){
        state.payType = payType;
    },
    isPay(state,isPay){
        state.isPay = isPay;
    },
    isLoad(state,bool){
        state.isLoad = bool;
    },
    openId(state,openId){
        state.openId = openId;
    },
    appId(state,appId){
        state.appId = appId;
    }
}
const actions = {}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;