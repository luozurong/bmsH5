import request from '@/common/js/axios.js'

/**
 * 登录接口
 */
export function userLogin(query) {
  var httpURL = "bms/servlet/userLogin?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取当月、累计统计数接口
 */
export function getCurMonthSumCount(query) {
  var httpURL = "bms/servlet/getCurMonthSumCount?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取当月、累计用户统计数接口
 */
export function getCurMonthSumUserCount(query) {
  var httpURL = "bms/servlet/getCurMonthSumUserCount?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取实时数据接口
 */
export function getRealTimeData(query) {
  var httpURL = "bms/servlet/getRealTimeData?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取历史数据接口
 */
export function getHistoryData(query) {
  var httpURL = "bms/servlet/getHistoryData?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取用户数据接口
 */
export function getUsersData(query) {
  var httpURL = "bms/servlet/getUsersData?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 处方笺详情
 */
export function getPrescriptionSignatureInfo(query) {
  var httpURL = "bms/servlet/getPrescriptionSignatureInfo?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 查看处方列表接口
 */
export function getPrescriptionOrderList(query) {
  var httpURL = "bms/servlet/getPrescriptionOrderList?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 结算主体列表
 */
export function settlementResourceServlet(query) {
  var httpURL = "bms/servlet/settlementResourceServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 结算单列表
 */
export function balanceBodyServlet(query) {
  var httpURL = "bms/servlet/balanceBodyServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 待付款-超时/待付款-新建 编辑
 */
export function blanceBodyDetailServlet(query) {
  var httpURL = "bms/servlet/blanceBodyDetailServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 保存当前结算主体的付款信息（包括新建和编辑）
 */
export function blanceBodySaveServlet(query) {
  var httpURL = "bms/servlet/blanceBodySaveServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取各角色级联数据接口
 */
export function getRoleJlData(query) {
  var httpURL = "bms/servlet/getRoleJlData?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取各角色级联数据接口(只显示下级数据且多级级联)
 */
export function getRoleJlDataForMoreLevel(query) {
  var httpURL = "bms/servlet/getRoleJlDataForMoreLevel?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取微信签名
 */
export function getWxSignature(query) {
  var httpURL = "bms/servlet/getWxSignature?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取微信图片上传
 */
export function wxImageUpload(query) {
  var httpURL = "bms/servlet/wxImageUpload?mediaIds="+encodeURI(query);
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取微信重定向url
 */
export function getWXRequestUrl(query) {
  var httpURL = "bms/servlet/getWXRequestUrl?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}


/**
 * 获取微信授权
 */
export function getWXOpenId(query) {
  var httpURL = "bms/servlet/getWXOpenId?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取账户信息列表
 */
export function blanceBodyListServlet(query) {
  var httpURL = "bms/servlet/blanceBodyListServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取账户保证金、预付详情信息
 */
export function blanceBodyRechargeRecordServlet(query) {
  var httpURL = "bms/servlet/blanceBodyRechargeRecordServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 保存账户保证金、预付详情信息
 */
export function balanceRechargeSaveServlet(query) {
  var httpURL = "bms/servlet/balanceRechargeSaveServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取当前结算主体的可开发票结算单列表
 */
export function balanceBodyCountFpListServlet(query) {
  var httpURL = "bms/servlet/balanceBodyCountFpListServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取当前结算主体的开票记录列表
 */
export function invoiceManageListServlet(query) {
  var httpURL = "bms/servlet/invoiceManageListServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 获取当前开票记录详情
 */
export function invoiceManageDetailServlet(query) {
  var httpURL = "bms/servlet/invoiceManageDetailServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 开发票信息页面
 */
export function invoiceManageServlet(query) {
  var httpURL = "bms/servlet/invoiceManageServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 开发票保存
 */
export function invoiceManageSaveServlet(query) {
  var httpURL = "bms/servlet/invoiceManageSaveServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}
/**
 * 重新开票
 */
export function invoiceManageFailedSaveServlet(query) {
  var httpURL = "bms/servlet/invoiceManageFailedSaveServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 创建微信支付单
 */
export function wxPayCreateOrderServlet(query) {
  var httpURL = "bms/servlet/wxPayCreateOrderServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 微信支付查询
 */
export function wxPayQueryOrderServlet(query) {
  var httpURL = "bms/servlet/wxPayQueryOrderServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 兴业银行企业网银查询用户是否支付完成
 */
export function bankXySearchFlow(query) {
  var httpURL = "bms/servlet/bankXySearchFlow?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}

/**
 * 判断系统审核中状态
 */
export function balanceRecordPaySuccessServlet(query) {
  var httpURL = "bms/servlet/balanceRecordPaySuccessServlet?str="+encodeURI(JSON.stringify(query));
  return request({
    url: httpURL,
    method: 'post',
  })
}