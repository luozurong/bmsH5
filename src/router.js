import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {cookie} from '@/common/js/common.js'

const router =  new Router({
  mode: 'history',
  base: 'bmsH5',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/businessManager/businessManagerIndex')
    },
    {
      path: '/businessManagerIndex',
      name: 'businessManagerIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/businessManager/businessManagerIndex')
    },
    {
      path: '/businessIndex',
      name: 'businessIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/business/businessIndex')
    },
    {
      path: '/businessOrganizationManagerIndex',
      name: 'businessOrganizationManagerIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/businessOrganizationManager/businessOrganizationManagerIndex')
    },
    {
      path: '/drugCompanyManagerIndex',   //药企管理员
      name: 'drugCompanyManagerIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/drugCompanyManager/drugCompanyManagerIndex')
    },
    {
      path: '/druggistIndex',             //药店管理员
      name: 'druggistIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/druggist/druggistIndex')
    },
    {
      path: '/drugStoreClerkIndex',       //药店店员
      name: 'drugStoreClerkIndex',
      meta: {
          title: '南风医生'
      },
      component: () => import('./views/drugStoreClerk/drugStoreClerkIndex')
    },
    {
      path: '/settlementIndex',
      name: 'settlementIndex',
      meta: {
          title: '结算单列表'
      },
      component: () => import('./views/settlement/settlementIndex')
    },
    {
      path: '/settlementList/:account',
      name: 'settlementList',
      meta: {
          title: '结算单列表'
      },
      component: () => import('./views/settlement/settlementList')
    },
    {
      path: '/statementNew',
      name: 'statementNew',
      meta: {
          title: '结算单详情'
      },
      component: () => import('./views/settlement/statementNew')
    },
    {
      path: '/settlementOrderDetail/:id',
      name: 'settlementOrderDetail',
      meta: {
          title: '结算单详情'
      },
      component: () => import('./views/settlement/settlementOrderDetail')
    },
    {
      path: '/examineStatementDetail',
      name: 'examineStatementDetail',
      meta: {
          title: '结算单详情'
      },
      component: () => import('./views/settlement/examineStatementDetail')
    },
    {
      path: '/prescriptionList/:blTime/:drugStoreAccount/:clerkAccount/:userName',
      name: 'prescriptionList',
      meta: {
          title: ''
      },
      component: () => import('./views/prescriptionDetail/prescriptionList')
    },
    {
      path: '/prescriptionDetail/:orderNo',
      name: 'prescriptionDetail',
      meta: {
          title: '处方笺'
      },
      component: () => import('./views/prescriptionDetail/prescriptionDetail')
    },
    /**
     * 预付款模块
     */
    {
      path: '/appointIndex',      //预支付列表
      name: 'appointIndex',
      meta: {
          title: '预付账户管理'
      },
      component: () => import('./views/appoint/appointIndex')
    },
    {
      path: '/appointEdit',    
      name: 'appointEdit',
      meta: {
          title: '付款详情'
      },
      component: () => import('./views/appoint/appointEdit')
    },
    {
      path: '/appointNoPassEdit',   
      name: 'appointNoPassEdit',
      meta: {
          title: '付款详情'
      },
      component: () => import('./views/appoint/appointNoPassEdit')
    },
    {
      path: '/appointCheck/:rechargeRecordId',   
      name: 'appointCheck',
      meta: {
          title: '付款详情'
      },
      component: () => import('./views/appoint/appointCheck')
    },
    {
      path: '/appointAffirmInfo/:status',   
      name: 'appointAffirmInfo',
      meta: {
          title: '付款详情'
      },
      component: () => import('./views/appoint/appointAffirmInfo')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          title: '登录'
      },
      component: () => import('./views/login/login')
    },
    {
      path: '/invoiceDetail/:invoiceId/:status',
      name: 'invoiceDetail',
      meta: {
          title: '开票信息'
      },
      component: () => import('./views/invoice/invoiceDetail')
    },
    {
      path: '/invoiceList',
      name: 'invoiceList',
      meta: {
          title: '开票信息'
      },
      component: () => import('./views/invoice/invoiceList')
    },
    {
      path: '/invoiceEdit/:invoiceId/:status',
      name: 'invoiceEdit',
      meta: {
          title: '开票信息'
      },
      component: () => import('./views/invoice/invoiceEdit')
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.name == 'login' ){
      if(cookie.getCookie('userTypeMy') == 52){
        next({ name: 'drugStoreClerkIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == 51){
        next({ name: 'businessIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == 50){
        next({ name: 'businessOrganizationManagerIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == 49){
        next({ name: 'drugStoreClerkIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == 22){
        next({ name: 'drugCompanyManagerIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == 19){
        next({ name: 'druggistIndex'});
        return false;
      }
      if(cookie.getCookie('userTypeMy') == null || cookie.getCookie('userTypeMy') == ''){
         next();
      }
    }else{
      if(cookie.getCookie('userTypeMy') == null || cookie.getCookie('userTypeMy') == ''){
        next({name: 'login'});
        return false;
      }
    }
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    next();
});
export default router;
