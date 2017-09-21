var httpApi = require('../../utils/httpApi')
var parcelState = ['已揽收','配送中','已收货','已延迟']

Page({
  data: {},
  onLoad: function (options) {
    //console.log(options)
    var that = this
    var idData = JSON.parse(options.idObj)
    that.setData({
      userName: wx.getStorageSync('userName'),
      relOrgName: idData.relOrgName,
      orgName: idData.orgName
    })

    var httpPromise = new Promise(function (resolve, reject) {
      var getOrder = 'getERPSellBillsForRelOrgId'
      var orderData = idData
      orderData.start = '1810'
      //console.log(orderData)
      httpApi.getHttp(getOrder, function (callback) {
        //console.log(callback)
        if (callback.success) {
          that.setData({
            orderCode: callback.results[0].billId,
            createTime: callback.results[0].billDate
          })
          resolve(callback.results[0])
        }
      }, 0, orderData)
    })

    httpPromise.then(function (val) {
      //console.log(val)
      var getBill = 'getTmsParcelsByBizBillCode'
      var billData = {
        'orgId': idData.orgId,
        'bizBillCode': val.billId
      }
      //console.log(billData)
      httpApi.getHttp(getBill, function (callback) {
        console.log(callback)
        var parcelArr = callback.results
        for(var i=0; i<callback.results.length; i++){
          parcelArr[i].state = parcelState[parcelArr[i].state]
        }
        that.setData({
          parcelArr: parcelArr
        })
      }, 1, billData)
    })
  },
  select: function (e) {
    console.log(e.currentTarget.id)
    wx.redirectTo({
      url: '../select/select?page=' + e.currentTarget.id + '&noSkip=' + true,
    })
  },
  exitAccount: function (){
    wx.showModal({
      title: '提示',
      content: '是否退出当前用户',
      success: function(res){
        if(res.confirm){
          wx.reLaunch({
            url: '../login/login',
          })
        }
      }
    })
  }
})