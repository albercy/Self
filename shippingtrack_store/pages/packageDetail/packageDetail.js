var idData = new Object()
var httpApi = require('../../utils/httpApi')

Page({
  data: {
    hasMark: false
  },
  onLoad: function (options) {
    var that = this
    idData = JSON.parse(options.idData)
    console.log(idData)
    var getTracks = 'getTmsParcelTracks'
    var getDetails = 'getTmsParcelDetail'
    var httpPromise = new Promise(function(resolve,reject){
      httpApi.getHttp(getTracks, function (callback) {
        console.log(callback)
        if (callback.success) {
          that.setData({
            billId: callback.results[0].billId,
            remarkArr: callback.results
          })
          resolve()
        }
      }, 1, idData)
    })
    httpPromise.then(function(val){
      httpApi.getHttp(getDetails,function(callback){
        console.log(callback)
        that.setData(callback.results[0])
        // that.setData({
        //   hasMark: !callback.results[0].hasMark
        // })
        if(callback.results[0].parcelItems.length > 0){
          that.setData({
            productShow: true,
            productArr: callback.results[0].parcelItems
          })
        }
        else{
          that.setData({
            productShow: false
          })
        }
      },1,idData)
    })
  },
  toEvaluate: function(){
    wx.navigateTo({
      url: '../evaluate/evaluate?idData=' + JSON.stringify(idData)
    })
  }
})