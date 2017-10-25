//index.js
//获取应用实例
const app = getApp()
const http = require('../../../utils/httpUtil.js')
const md5 = require('../../../utils/md5.js')

Page({
  data: {
    userName: "",
    password: "",
    vs: app.globalData.version
  },
  onLoad: function(){
    var _this = this;
    wx.getStorage({
      key: 'loginData',
      success: function(res){
        _this.setData({
          userName: res.data.userName,
          password: res.data.password
        })
        if(res.data.autoLogin == 'true'){
          _this.doLogin();
        }
      },
    });
  },
  nameInput: function(e){
    this.setData({
      userName: e.detail.value
    });
  },
  passwordInput: function(e){
    this.setData({
      password: e.detail.value
    });
  },
  doLogin: function(){
    var _this = this;
    if(!this.data.userName){
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false
      });
    }else if(!this.data.password){
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel: false
      });
    }else{
      http.loginHttp({
        act: 'login',
        userName: this.data.userName,
        password: md5.hexMD5(this.data.password)
      },function(res, success){
        if(success){
          for(var i in res.header){
            if(i == 'Set-Cookie'){
              http.saveHeader(res.header[i]);
            }
          }
          if(res.data.success){
            _this.setData({
              tip: '登录成功'
            });
            wx.setStorage({
              key: 'loginData',
              data: {
                userName: _this.data.userName,
                password: _this.data.password,
                autoLogin: 'true'
              },
            });
            wx.switchTab({
              url: '/pages/homePage/home/home'
            });
          }else{
            _this.setData({
              tip: res.data.message
            });
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '请求失败,请点击页面右上角菜单按钮，打开调试后重试',
            showCancel: false
          });
        }
      });
    }
  },
  toForget: function(){
    wx.navigateTo({
      url: '../forget/forget',
    });
  }
});
