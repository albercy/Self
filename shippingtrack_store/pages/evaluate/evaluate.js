var httpApi = require('../../utils/httpUtil')
var idData = new Object()
var relOrgId

Page({
  data: {
    tip: '请写下你此次的购物体验与评价来帮助其他小伙伴~'
  },
  onLoad: function (options) {
    idData = JSON.parse(options.idData)
    var that = this
    var imgArr = new Array()
    var selectArr = []
    imgArr[0] = '1'
    for (let i = 0; i < 4; i++) {
      imgArr.push('0')
    }
    var getMark = 'getTmsParcelMarksByParcelCode'
    httpApi.getHttp(getMark, function (callback) {
      console.log(callback)
      if (callback.success) {
        relOrgId = callback.results[0].relOrgId
        for (var i = 0; i < callback.results.length; i++) {
          selectArr[i] = new Object()
          selectArr[i].selectTitle = callback.results[i].markItemName
          selectArr[i].markItemId = callback.results[i].markItemId
          selectArr[i].starArr = imgArr
        }
        //console.log(selectArr)
        that.setData({
          selectArr: selectArr
        })
      }
    }, 1, idData)
  },
  imgClick: function (e) {
    var selectArr = this.data.selectArr
    var selectId = parseInt(e.currentTarget.dataset.sidx)
    var imgId = parseInt(e.currentTarget.id)
    //console.log()
    var imgArr = ['0', '0', '0', '0', '0']
    for (let i = 0; i < imgId + 1; i++) {
      imgArr[i] = '1'
    }
    selectArr[selectId].starArr = imgArr
    this.setData({
      selectArr: selectArr
    })
  },
  markSubmit: function () {
    //console.log(this.data.selectArr)

    var markArr = this.data.selectArr
    var masterDs = []

    for (var i = 0; i < markArr.length; i++) {
      var markVal = 0
      for (var j = 0; j < markArr[i].starArr.length; j++) {
        if (markArr[i].starArr[j] === '1') {
          markVal++
        }
      }
      //console.log(markVal)
      masterDs[i] = new Object()
      masterDs[i].markItemId = markArr[i].markItemId
      masterDs[i].markValue = markVal
    }

    //console.log(masterDs)
    var submitMark = 'submitTmsParcelMark'
    var markData = idData
    markData.relOrgId = relOrgId
    markData.masterDs = masterDs
    console.log(markData)
    httpApi.getHttp(submitMark, function (callback) {
      console.log(callback)
    }, 1, markData)
  }
})