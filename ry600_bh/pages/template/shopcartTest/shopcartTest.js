// pages/shopcart/shopcart.js
const http = require('../../../utils/httpUtil.js')
Page({
  data: {
    editStatus: '编辑',
    isTouchMove: false,
    startX: 0, //开始坐标
    startY: 0,
    storeName: '样板展示平台'
  },
  onLoad: function () {
    http.getHttp({
      action: 'VSShop.getShopCart',
      widthReward: true,
      orgId: '',
      bizCenterId: '',
      onlyAmount: false
    }, function (res, success) {
      if (success) {
        console.log(res)
      }
    });
  },
  touchStart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      isTouchMove: false
    })
  },
  //滑动事件处理
  touchMove: function (e) {
    var that = this,
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    if (Math.abs(angle) > 30) return;
    if (touchMoveX > startX) { //右滑
      this.setData({
        isTouchMove: false
      })
    } else { //左滑
      this.setData({
        isTouchMove: true
      })
    }
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  }
})