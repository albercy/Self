var httpUtil = require('../../utils/httpUtil.js')
var _msgData

Page({
  data: {
    orgArr: ['梅花园药店', '京溪药店', '体育路药店', '同和药店', '天河南药店', '番禺市桥药店', '广州爱心大药房', '中山三院便民药房'],
    radioSelect: 0,
    showModalStatus: false,
    navigateEvent: false
  },
  onLoad: function (options) {
    var that = this
    _msgData = getApp().globalData.msgData
    this.setData(_msgData)
    wx.setNavigationBarTitle({
      title: _msgData.relOrgName,
    })
    var userData = {
      action: 'VSUser.getBasicInfo'
    }
    httpUtil.getHttp(userData,function(callback){
      that.setData(callback.results[0])
    })
  },
  selectOrg: function (e) {
    var _idx = e.currentTarget.dataset.idx
    this.setData({
      radioSelect: _idx
    })
  },
  powerDrawer: function (e) {
    var that = this
    var currentStatus = e.currentTarget.dataset.status
    var orgTitle = e.currentTarget.dataset.org
    var orgStr = ''

    if(orgTitle == 'org'){
      orgStr = '供应商'
    }
    if (orgTitle == 'relOrg'){
      orgStr = '机构'
    }

    that.setData({
      orgTitle: '我的'+orgStr+'选择'
    })

    if(_msgData.orgIdArr){
      that.util(currentStatus)
    }
    else{
      wx.showModal({
        title: '提示',
        content: '没有更多的' + orgStr + '选择',
        showCancel: false,
        confirmColor: '#2a9293'
      })
    }
    
  },
  util: function (currentStatus) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0
    })

    this.animation = animation

    animation.opacity(0).rotateX(-100).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).rotateX(0).step()
      this.setData({
        animationData: animation
      })

      if (currentStatus == 'close') {
        this.setData({
          showModalStatus: false
        })
      }
    }.bind(this), 200)

    if (currentStatus == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  changeAccount: function(){
    wx.showModal({
      title: '提示',
      content: '此操作会退出当前用户，是否继续',
      confirmColor: '#2a9293',
      success: function(res){
        if(res.confirm){
          wx.reLaunch({
            url: '../login/login'
          })
        }
      }
    })
  },
  getOrder: function(e){
    wx.navigateTo({
      url: '../search/search?type=' + e.currentTarget.id,
    })
  }
})