var httpUtil = require('../../utils/httpUtil.js')
var inputContent = ''
var _msgData = getApp().globalData
var itemIdx = 0

Page({
  data: {
    btnTxt: '搜索',
    showBtn: true
  },
  onLoad: function (options) {
    _msgData = _msgData.msgData
    this.setData({
      isFocus: true
    })
    this.getListItems()
  },
  inputEntry: function (e) {
    inputContent = e.detail.value
  },
  searchClick: function () {
    this.setData({
      showBtn: false
    })
    this.getListItems(inputContent)
  },
  inputFocus: function () {
    this.setData({
      showBtn: true
    })
  },
  getListItems: function (e) {
    var that = this
    var orderArr = []

    var orderData = {
      action: 'VSERPSellBill.getERPSellBillsForRelOrgId',
      start: 1807,
      limit: 5
    }

    orderData = Object.assign(orderData, _msgData)
    var httpPromise = new Promise(function (resolve, reject) {
      httpUtil.getHttp(orderData, function (callback) {
        //console.log(callback)
        if(callback.success){
          if(callback.results.length > 0){
            that.setData({
              hasOrder: true
            })
          }
          resolve(callback.results)
        }
      })
    })
    httpPromise.then(function (val) {
      var packageData = {
        action: 'VSTms.getTmsParcelsByBizBillCode',
        orgId: _msgData.orgId
      }
      ; (function getPackage(i) {
        //console.log(i)
        
        if (i == val.length) {
          return
        }

        packageData.bizBillCode = val[i].billId
        httpUtil.getHttp(packageData, function (callback) {
          if (callback.success) {
            //console.log(callback)
            if(callback.results.length > 0){
              val[i].hasPackage = true
              val[i].packageArr = callback.results
            }
            else{
              val[i].hasPackage = false
            }
            getPackage(i + 1)
          }
        })
      })(0)
      console.log(val)
      that.setData({
        orderArr: val
      })
    })
  }
})