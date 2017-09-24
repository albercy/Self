var httpApi = require('../../utils/httpApi')
var orderArr = []
var packageArr = []
var pageCount = 0
var pageIdx = 0
var pageList = 0

Page({
  data: {},
  onLoad: function (options) {
    //console.log(options)
    var getOrder = 'getERPSellBillsForRelOrgId'
    var orderData = JSON.parse(options.idData)
    var getBill = 'getTmsParcelsByBizBillCode'
    // var packageData = {
    //   orgId: orderData.orgId,
    //   bizBillCode: orderData.bizCenterId
    // }
    var httpPromise = new Promise(function(resolve,reject){
      httpApi.getHttp(getOrder,function(callback){
        //console.log(callback)
        if(callback.success){
          pageCount = callback.totals
          pageIdx = Math.ceil(pageCount / 10)
          resolve(callback.results)
        }
      },0,orderData)
    })
    httpPromise.then(function(val){
      //console.log(val)
      //packageArr = val
      console.log(options)
      var packageData = {
        orgId: JSON.parse(options.idData).orgId
      }
      for(var i=0; i<val.length; i++){
        packageData.bizBillCode = val[i].billId
        console.log(packageData)
        httpApi.getHttp(getBill,function(callback){
          console.log(callback)
        },1,packageData)
      }
      //console.log(packageArr)
    })
  }
})