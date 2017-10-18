var md5 = require('../../utils/md5')
var httpApi = require('../../utils/httpApi')

Page({
  data: {
    btnLoad: false,
    btnPlain: false
  },
  onLoad: function (options) {
    var that = this

    if (wx.getStorageSync('userName') != null) {
      that.setData({
        username: wx.getStorageSync('userName')
      })
    }
  },
  loginSubmit: function (e) {
    var that = this
    var paramer = e.detail.value
    that.setData({
      btnLoad: true,
      btnPlain: true
    })
    function closeLoading() {
      that.setData({
        btnLoad: false,
        btnPlain: false
      })
    }

    if (paramer.userName == '' || paramer.password == '') {
      closeLoading()
      wx.showModal({
        title: '提示',
        content: '帐号或者密码不能为空',
        showCancel: false
      })
    }
    else {
      paramer.password = md5.md5(paramer.password)
      httpApi.loginHttp(paramer, function (callback) {
        closeLoading()
        if (callback.success) {
          wx.redirectTo({
            url: '../select/select?page=1'
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '帐号或者密码错误，请重新输入',
            showCancel: false
          })
        }
      })
    }

  }
})