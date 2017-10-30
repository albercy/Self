var httpUtil = require('../../utils/httpUtil.js')
var inputContent = ''
var _msgData
var itemIdx
var stateArr
var scorllHeight

Page({
  data: {
    btnTxt: '搜索',
    showBtn: true,
    scorllHeight: 0,
    orderArr: [],
    canScorll: true
  },
  onLoad: function (options) {
    var that = this
    itemIdx = 0
    stateArr = ['已揽收', '配送中', '已收货', '已延迟']
    _msgData = getApp().globalData.msgData

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scorllHeight: (res.windowHeight * 2 - 66) + 'rpx'
        })
      }
    })

    this.setData({
      isFocus: true
    })
    
    if(options.type == 'order'){
      that.getListItems(itemIdx)
    }
  },
  inputEntry: function (e) {
    inputContent = e.detail.value
  },
  searchClick: function () {
    this.setData({
      orderArr: [],
      showBtn: false
    })
    this.getListItems(0,inputContent)
  },
  inputFocus: function () {
    this.setData({
      showBtn: true
    })
  },
  getListItems: function (e,inputContent) {
    var that = this

    var orderData = {
      action: 'VSERPSellBill.getERPSellBillsForRelOrgId',
      start: e,
      limit: 5
    }

    if(inputContent != undefined && inputContent != ''){
      orderData.billId = inputContent
      that.setData({
        canScorll: false
      })
    }
    else{
      that.setData({
        canScorll: true
      })
    }

    orderData = Object.assign(orderData, _msgData)

    var httpPromise = new Promise(function (resolve, reject) {
      httpUtil.getHttp(orderData, function (callback) {
        //console.log(callback)
        if(callback.success){
          if(callback.results.length > 0){
            that.setData({
              hasOrder: true
            })
            resolve(callback.results)
          }
          else{
            that.setData({
              hasOrder: false
            })
          }
        }

      })
    })
    httpPromise.then(function (val) {
      var packageData = {
        action: 'VSTms.getTmsParcelsByBizBillCode',
        orgId: _msgData.orgId
      }
      ; (function getPackage(i) {
        //console.log(i)
        
        if (i == val.length) {
          //console.log(val)
          var _orderArr = that.data.orderArr
          _orderArr.push.apply(_orderArr,val)
          //console.log(_orderArr)
          that.setData({
            orderArr: _orderArr
          })
          return
        }

        packageData.bizBillCode = val[i].billId
        httpUtil.getHttp(packageData, function (callback) {
          if (callback.success) {
            //console.log(callback)
            if(callback.results.length > 0){
              val[i].packageArr = callback.results
              for(let j=0; j<val[i].packageArr.length; j++){
                val[i].packageArr[j].state = stateArr[val[i].packageArr[j].state]
              }
            }
            getPackage(i + 1)
          }
        })
      })(0)
    })
  },
  scrollEvent: function(){
    itemIdx = itemIdx + 5
    this.getListItems(itemIdx)
  },
  toDetail: function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../packageDetail/packageDetail?code=' + e.currentTarget.dataset.code + '&pId=' + e.currentTarget.dataset.pid
    })
  }
})