var appData = getApp().globalData
var httpUrl = appData.domainName + '/jsonaction/websiteaction.action?action='

var vsTms = 'VSTms.'
var vsShop = 'VSShop.'
var vsERP = 'VSERPSellBill.'
var _header

function loginHttp(options,callback){
  wx.request({
    url: 'https://www.yr600.com/fish/login',
    data: options,
    success: function (res){
      if (res.data.success){
        wx.setStorageSync('userName', options.userName)
        _header = { 'Cookie': '_serviceId=' + res.data._serviceId }
        saveData()
      }
      callback(res.data)
      
    },
    fail: function (){
      callback(null)
    }
  })
}

function getHttp(method, callback, isOrder, options) {
  var mUrl = httpUrl
  if (isOrder == 0) {
    mUrl = mUrl + vsERP
  }
  else if (isOrder == 1) {
    mUrl = mUrl + vsTms
  }
  else if (isOrder == -1) {
    mUrl = mUrl + vsShop
  }
  wx.request({
    url: mUrl + method,
    header: _header,
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res.data)
    },
    fail: function (){
      callback(null)
    }
  })
}

function postHttp(method, options, callback, isOrder) {
  var mUrl = httpUrl
  if (isOrder == 0) {
    mUrl = mUrl + vsERP
  }
  else if (isOrder == 1) {
    mUrl = mUrl + vsTms
  }
  else if (isOrder == -1) {
    mUrl = mUrl + vsShop
  }
  wx.request({
    url: mUrl + method,
    data: options,
    method: 'POST',
    header: { "content-type": "application/x-www-form-urlencoded" },
    success: function (res) {
      callback(res.data)
    },
    fail: function (){
      callback(null)
    }
  })
}

function saveData (){
  var getRel = 'getRelStores'
  var getOrg = 'getOrgs'

  var _data = new Object()

  var httpPromise = new Promise(function(resolve,reject){
    getHttp(getRel, function (callback) {
      console.log(callback)
      _data.orgId = callback.results[0].storeOrgId
      _data.bizCenterId = callback.results[0].bizCenterId
      _data.relOrgName = callback.results[0].orgName
      if(callback.results.length > 1){
        _data.orgIdArr = []
        for(let i=0; i<callback.results.length; i++){
          _data.orgIdArr[i].push(callback.results[i].orgId)
        }
      }
      resolve(callback)
    }, -1)
  })
  httpPromise.then(function(val){
    getHttp(getOrg,function (callback){
      //console.log(callback)
    },1)
  })  
}
module.exports = {
  loginHttp: loginHttp,
  getHttp: getHttp,
  postHttp: postHttp
}