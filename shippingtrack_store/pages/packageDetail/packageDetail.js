var mLocation = new Object()
var httpApi = require('../../utils/httpApi')

Page({
  data: {},
  onLoad: function (options) {
    var that = this
    var detailData = JSON.parse(options.detailData)
    //console.log(detailData)
    var getDetails = 'getTmsParcelTracks'
    httpApi.getHttp(getDetails, function (callback){
      console.log(callback)
      if(callback.success){
        that.setData({
          billId: callback.results[0].billId,
          remarkArr: callback.results
        })
      }
    }, 1, detailData)
  }
})