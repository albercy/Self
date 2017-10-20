// pages/account/account.js
const http = require('../../../utils/httpUtil.js')

Page({
  data: {
    storeCrr: '万邦药业',
    orgCrr: '同和药店',
    userIcon: 'http://file.ry600.com/snapshot//files/af/afvnal1p3sa59q79/2017-02-08/79l897i7bao7gd3o.gif',
    userName: '',
    fullName: ''
  },
  onLoad: function(){
    const _this = this;
    http.getHttp({action: 'VSUser.getBasicInfo'},function(res, success){
      if(success){
        if(res.success){
          console.log(res)
          let user = res.results[0];
          _this.setData({
            userName: user.userName,
            fullName: user.fullName,
            userIcon: 'http://www.ry600.com' + user.photoUrl
          });
        }else{
          wx.reLaunch({
            url: '/pages/loginPage/login/login',
          });
        }
      }
    });
  },
  test: function(){
    const _this = this;
    http.getHttp({ action: 'VSUser.getBasicInfo' }, function (res, success) {
      if (success) {
        if (res.success) {
          console.log(res)
          let user = res.results[0];
          _this.setData({
            userName: user.userName,
            fullName: user.fullName,
            userIcon: 'http://www.ry600.com' + user.photoUrl
          });
        } else {
          wx.reLaunch({
            url: '/pages/loginPage/login/login',
          });
        }
      }
    });
  },
  orderList: function(){
    wx.navigateTo({
      url: 'orderList/orderList',
    });
  },
  logout: function(){
    wx.request({
      url: 'http://bh.ry600.com/userLogout.action',
      method: 'GET',
      header: http.getHeader(),
      success: function(res){
        console.log(res);
        console.log(2)
      },
      fail: function(res){
        console.log(res)
        console.log(1)
      }
    });
    var loginData = wx.getStorageSync('loginData');
    loginData.autoLogin = 'false';
    wx.setStorage({
      key: 'loginData',
      data: loginData,
      success: function(res){
        wx.reLaunch({
          url: '/pages/loginPage/login/login',
        });
      }
    });
  }
});