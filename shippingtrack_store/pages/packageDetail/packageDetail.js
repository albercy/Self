var mLocation = new Object()
Page({
  data: {},
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res.accuracy)
        mLocation.latitude = res.latitude
        mLocation.longitude = res.longitude
        that.setData({
          localX: res.latitude,
          localY: res.longitude
        })
      }
    })
  },
  toMap: function () {
    wx.navigateTo({
      url: '../map/map?location=' + JSON.stringify(mLocation),
    })
  }
})