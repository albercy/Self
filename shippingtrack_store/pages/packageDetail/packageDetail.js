var mLocation = new Object()
var httpApi = require('../../utils/httpApi')

Page({
  data: {},
  onLoad: function (options) {
    var that = this
    var idData = JSON.parse(options.idData)
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
      },1,idData)
    })
  }
})