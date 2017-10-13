Page({
  data: {},
  onLoad: function (options) {},
  toShopcase: function(){
    wx.switchTab({
      url: '../showcase/showcase'
    })
  },
  toShopcart: function(){
    wx.switchTab({
      url: '../shopcart/shopcart'
    })
  },
  toAccount: function(){
    wx.switchTab({
      url: '../account/account'
    })
  },
  scanBill: function(){
    wx.scanCode({
      success: function(){
        console.log('success')
      }
    })
  }
})