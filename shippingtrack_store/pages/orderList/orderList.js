var footTxt = ''
var httpApi = require('../../utils/httpApi')

Page({
  data: {
    footTxt: '删除订单'
  },
  onLoad: function (options) {
    console.log(options.footTxt)
    footTxt = options.footTxt
    this.setData({
      footTxt: footTxt
    })
  },
  toPage: function () {
    if (footTxt == '删除订单') {
      wx.showModal({
        title: '提示',
        content: '是否删除该订单'
      })
    }
    else if (footTxt == '进行催单') {
      wx.showToast({
        title: '催单请求已发送，请耐心等候',
      })
    }
    else if (footTxt == '查看物流') {
      wx.navigateTo({
        url: '../logistics/logistics'
      })
    }
    else {
      wx.navigateTo({
        url: '../evaluate/evaluate'
      })
    }
  }
})