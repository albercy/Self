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
    var orderData = {
      action: 'VSERPSellBill.getERPSellBillsForRelOrgId',
      start: 0,
      limit: 5
    }

    orderData = Object.assign(orderData, _msgData)
    var httpPromise = new Promise(function (resolve, reject) {
      httpUtil.getHttp(orderData, function (callback) {
        console.log(callback)
        resolve(callback.results)
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
              console.log(callback)
              getPackage(i + 1)
            }
          })
        })(0)
    })
  }
})