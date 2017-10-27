var idData = new Object()
var httpUtil = require('../../utils/httpUtil')
var _msgData

Page({
  data: {
    hasMark: false
  },
  onLoad: function (options) {
    var that = this
    _msgData = getApp().globalData.msgData
    _msgData.parcelCode = options.code
    _msgData.bizCenterId = options.pId

    var tracksData = { action: 'VSTms.getTmsParcelTracks' }
    var detailData = { action: 'VSTms.getTmsParcelDetail' }
    tracksData = Object.assign(tracksData,_msgData)
    detailData = Object.assign(detailData,_msgData)

    var httpPromise = new Promise(function (resolve, reject) {
      httpUtil.getHttp(tracksData, function (callback) {
        console.log(callback)
        if (callback.success) {
          if(callback.results.length > 0){
            that.setData({
              billId: callback.results[0].billId,
              remarkArr: callback.results
            })
            resolve()
          }
        }
      })
    })
    httpPromise.then(function (val) {
      httpUtil.getHttp(detailData, function (callback) {
        console.log(callback)
        that.setData(callback.results[0])
        // that.setData({
        //   hasMark: !callback.results[0].hasMark
        // })
        if (callback.results[0].parcelItems.length > 0) {
          that.setData({
            productShow: true,
            productArr: callback.results[0].parcelItems
          })
        }
        else {
          that.setData({
            productShow: false
          })
        }
      })
    })
  },
  toEvaluate: function () {
    wx.navigateTo({
      url: '../evaluate/evaluate?idData=' + JSON.stringify(idData)
    })
  }
})