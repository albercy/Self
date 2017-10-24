var httpApi = require('../../utils/httpUtil')
var orderArr = []
var packageArr = []
var pageCount = 5
var pageIndex = 1
var pageArr = []
var pageCount = 0
var pageIdx = 0
var pageList = 0

Page({
  data: {
    last: '<',
    next: '>',
    isSelect: 1,
    packageShow: false,
    stateArr: ['全　部', '已揽收', '配送中', '已收货','已延迟'],
    stateIdx: 0
  },
  onLoad: function (options) {
    //console.log(options)
    var that = this
    var pageTotal = 15
    pageCount = pageTotal
    for (var i = 0; i < (5 < pageCount ? 5 : pageCount); i++) {
      pageArr.push(i + 1)
    }
    if (pageCount > 5) {
      that.setData({
        nextShow: true
      })
    }
    that.setData({
      pageArr: pageArr
    })
    var getOrder = 'getERPSellBillsForRelOrgId'
    var orderData = JSON.parse(options.idData)
    var getBill = 'getTmsParcelsByBizBillCode'
    // var packageData = {
    //   orgId: orderData.orgId,
    //   bizBillCode: orderData.bizCenterId
    // }
    that.setData({
      orgName: orderData.orgName
    })
    var httpPromise = new Promise(function (resolve, reject) {
      httpApi.getHttp(getOrder, function (callback) {
        //console.log(callback)
        if (callback.success) {
          pageCount = callback.totals
          pageIdx = Math.ceil(pageCount / 10)
          orderArr = callback.results
          // that.setData({
          //   orderArr: callback.results
          // })
          resolve(callback.results)
        }
      }, 0, orderData)
    })
    httpPromise.then(function (val) {
      var packageData = {
        orgId: JSON.parse(options.idData).orgId
      }
      ;(function getPackage(i) {
        //console.log(i)
        if (i == val.length) {
          return
        }
        packageData.bizBillCode = val[i].billId
        httpApi.getHttp(getBill, function (callback) {
          if (callback.success) {       
            if(callback.results.length == 0){
              val[i].packageShow = false
            }
            else{
              val[i].packageShow = true
              val[i].packageArr = callback.results
            }
            getPackage(i+1)
          }
        }, 1, packageData)
      })(0)
      that.setData({
        orderArr: val
      })
    })
  },
  stateChange: function (e){
    this.setData({
      stateIdx: e.detail.value
    })
  },
  idxChange: function (e) {
    //console.log(e)
    var that = this
    pageIndex = e
    if (e - 2 >= 1 && e + 1 <= pageCount) {
      console.log(e)
      pageArr = []
      var i = e - 2
      if (e + 1 == pageCount) {
        i = e - 3
      }
      for (i; i <= (e + 2 < pageCount ? e + 2 : pageCount); i++) {
        //console.log(i)
        pageArr.push(i)
      }
      that.setData({
        pageArr: pageArr
      })
    }
    if (e === 2) {
      console.log(2)
      pageArr = []
      for (let i = 1; i <= (5 < pageCount ? 5 : pageCount); i++) {
        pageArr.push(i)
      }
      that.setData({
        pageArr: pageArr
      })
    }

    if (e >= 1 && e <= pageCount) {
      that.setData({
        isSelect: pageIndex
      })
    }
    if (e > 3 && pageCount > 5) {
      that.setData({
        lastShow: true
      })
    }
    if (e <= 3) {
      that.setData({
        lastShow: false
      })
    }
    if (e < pageCount - 2 && pageCount > 5) {
      that.setData({
        nextShow: true
      })
    }
    if (e >= pageCount - 2) {
      that.setData({
        nextShow: false
      })
    }
  },
  numGoPage: function (e) {
    this.setData({
      isSelect: e.currentTarget.id
    })
    this.idxChange(parseInt(e.currentTarget.id))
  },
  goPage: function (e) {
    var that = this
    //console.log(e.currentTarget.id)
    if (e.currentTarget.id == 'next') {
      that.idxChange(pageIndex + 1)
    }
    else if (e.currentTarget.id == 'last') {
      that.idxChange(pageIndex - 1)
    }
  }
})