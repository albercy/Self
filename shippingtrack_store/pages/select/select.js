var httpApi = require('../../utils/httpApi')
var idList = new Object()
var page = 1
var relArr = []
var orgArr = []
var relIdx = 0
var orgIdx = 0

Page({
  data: {
    selectArr: []
  },
  onLoad: function (options) {
    var that = this
    var selectArr = []

    var getRel = 'getRelStores'
    var getOrg = 'getOrgs'

    if (options.page != 2) {
      wx.setNavigationBarTitle({
        title: '选择机构',
      })
      httpApi.getHttp(getOrg, function (callback) {
        console.log(callback.results)
        relArr = callback.results
        if (callback.success) {
          for (var i = 0; i < callback.results.length; i++) {
            selectArr.push(callback.results[i].orgName)
          }
          that.setData({ selectArr: selectArr })

          if (callback.results.length == 1 && !options.noSkip) {
            setTimeout(function () {
              wx.redirectTo({
                url: '../select/select?page=2',
              })
            }, 500)

          }
        }
      }, 1)
    }
    else {
      page = options.page
      wx.setNavigationBarTitle({
        title: '选择供应商',
      })
      httpApi.getHttp(getRel, function (callback) {
        console.log(callback)
        orgArr = callback.results
        for (var i = 0; i < callback.results.length; i++) {
          selectArr.push(callback.results[i].orgName)
        }
        that.setData({ selectArr: selectArr })

        if (callback.results.length == 1 && !options.noSkip) {
          that.goPage()
        }
      }, -1)
    }
  },
  selectItem: function (e) {
    //console.log(e.currentTarget.id)
    var idxNum = parseInt(e.currentTarget.id) 
    if (page == 1) {
      relIdx = idxNum
      wx.navigateTo({
        url: '../select/select?page=2',
      })
    }
    else {
      orgIdx = idxNum
      this.goPage()
    }
  },
  goPage: function () {
    idList.relOrgId = relArr[relIdx].orgId
    idList.relOrgName = relArr[relIdx].orgName
    idList.orgId = orgArr[orgIdx].storeOrgId
    idList.bizCenterId = orgArr[orgIdx].bizCenterId
    idList.orgName = orgArr[orgIdx].orgName
    setTimeout(function () {
      wx.redirectTo({
        url: '../index/index?idObj=' + JSON.stringify(idList)
      })
    }, 500)
  }
})