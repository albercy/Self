// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeCrr: '万邦药业',
    orgCrr: '同和药店',
    userIcon: 'http://file.ry600.com/snapshot//files/af/afvnal1p3sa59q79/2017-02-08/79l897i7bao7gd3o.gif',
    userName: '湛江市万邦药业有限公司',
    vipLevel: '普通会员'
  },
  orderList: function(){
    wx.navigateTo({
      url: 'orderList/orderList',
    })
  },
  logout: function(){
    wx.reLaunch({
      url: '/pages/loginPage/login/login',
    })
  }
})