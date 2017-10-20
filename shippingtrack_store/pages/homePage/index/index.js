var httpUtil = require('../../../utils/httpUtil')
Page({
  data: {},
  onLoad: function (options) {
    var _data = { 'action': 'VSUser.getBasicInfo'}
    httpUtil.getHttp(_data,function(callback){
      console.log(callback)
    })
  }
})