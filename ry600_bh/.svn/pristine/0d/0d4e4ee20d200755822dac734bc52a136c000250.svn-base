// pages/loginPage/forget/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '找回密码',
    checkImg: 'http://m.ry600.com/jcaptcha.action?_dc=1507789481649',
    userName: '',
    checkCode: ''
  },
  userInput: function(e){
    this.setData({
      userName: e.detail.value
    });
  },
  checkInput: function (e) {
    this.setData({
      checkCode: e.detail.value
    });
  },
  doCheck: function(){
    var _data = this.data;
    if(!_data.userName){
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false
      })
    }else if(!_data.checkCode){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
    }
  }
})