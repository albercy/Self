var httpApi = require('../../utils/httpApi')
var orderArr = []
var packageArr = []
var pageCount = 0
var pageIdx = 0
var pageList = 0

Page({
  data: {
    packageShow: false
  },
  onLoad: function (options) {
    //console.log(options)
    var that = this
    var getOrder = 'getERPSellBillsForRelOrgId'
    var orderData = JSON.parse(options.idData)
    var getBill = 'getTmsParcelsByBizBillCode'
    // var packageData = {
    //   orgId: orderData.orgId,
    //   bizBillCode: orderData.bizCenterId
    // }
    that.setData({
      orgName: orderData.orgName
    })
    var httpPromise = new Promise(function (resolve, reject) {
      httpApi.getHttp(getOrder, function (callback) {
        //console.log(callback)
        if (callback.success) {
          pageCount = callback.totals
          pageIdx = Math.ceil(pageCount / 10)
          orderArr = callback.results
          // that.setData({
          //   orderArr: callback.results
          // })
          resolve(callback.results)
        }
      }, 0, orderData)
    })
    httpPromise.then(function (val) {
      var packageData = {
        orgId: JSON.parse(options.idData).orgId
      }
      ;(function getPackage(i) {
        //console.log(i)
        if (i == val.length) {
          return
        }
        packageData.bizBillCode = val[i].billId
        httpApi.getHttp(getBill, function (callback) {
          if (callback.success) {       
            if(callback.results.length == 0){
              val[i].packageShow = false
            }
            else{
              val[i].packageShow = true
              val[i].packageArr = callback.results
            }
            getPackage(i+1)
          }
        }, 1, packageData)
      })(0)
      that.setData({
        orderArr: val
      })
    })
  }
})