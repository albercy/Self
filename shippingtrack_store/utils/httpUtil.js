var appData = getApp().globalData
var httpUrl = appData.domainName + '/jsonaction/websiteaction.action'
var _header

function loginHttp(options, callback) {
  wx.request({
    url: 'http://login.yr600.com/userCenterLogin.jsp?act=login',
    //url: 'https://www.yr600.com/fish/login',
    data: options,
    success: function (res) {
      var _cookie = res.header['Set-Cookie']
      console.log(_cookie)
      var _strArr = _cookie.split('Path=/,')    
      _strArr = _strArr[1].split(';')[0]

      if (res.data.success) {
        wx.setStorageSync('userName', options.userName)
        //_header = { 'Cookie': '_serviceId=' + res.data._serviceId }
        //_header = { 'Cookie': res.header['Set-Cookie'] }
        _header = { 'Cookie': _strArr }
        saveData(function (dataBack) {
          //console.log(dataBack)
          if (dataBack) {
            callback(res.data)
          }
        })
      }
      else {
        callback(res.data)
      }
    },
    fail: function () {
      callback(null)
    }
  })
}

function getHttp(options, callback) {
  //console.log(_header)
  wx.request({
    url: httpUrl,
    header: _header,
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res.data)
    },
    fail: function () {
      callback(null)
    }
  })
}

function postHttp(options, callback) {
  wx.request({
    url: httpUrl,
    data: options,
    method: 'POST',
    header: { "content-type": "application/x-www-form-urlencoded" },
    success: function (res) {
      callback(res.data)
    },
    fail: function () {
      callback(null)
    }
  })
}

function saveData(dataBack) {
  var _relData = { 'action': 'VSShop.getRelStores' }
  var _orgData = { 'action': 'VSTms.getOrgs' }

  var _data = new Object()

  var httpPromise = new Promise(function (resolve, reject) {
    getHttp(_relData, function (callback) {
      if (callback) {
        _data.orgId = callback.results[0].storeOrgId
        _data.bizCenterId = callback.results[0].bizCenterId
        _data.orgName = callback.results[0].storeName

        if (callback.results.length > 1) {
          _data.orgIdArr = []
          _data.bizCenterIdArr = []
          _data.orgNameArr = []
          for (let i = 0; i < callback.results.length; i++) {
            _data.orgIdArr.push(callback.results[i].storeOrgId)
            _data.bizCenterIdArr.push(callback.results[i].bizCenterId)
            _data.orgNameArr.push(callback.results[i].storeName)
          }
        }
        resolve()
      }
    })
  })
  httpPromise.then(function (val) {
    getHttp(_orgData, function (callback) {
      if (callback) {
        _data.relOrgId = callback.results[0].orgId
        _data.relOrgName = callback.results[0].orgName

        if (callback.results.length > 1) {
          _data.relOrgIdArr = []
          _data.relOrgName = []
          for (let i = 0; i < callback.results.length; i++) {
            _data.relOrgIdArr.push(callback.results[i].orgId)
            _data.relOrgName.push(callback.results[i].orgName)
          }
        }
        getApp().globalData.msgData = _data
        dataBack(_data)
      }
    })
  })
}
module.exports = {
  loginHttp: loginHttp,
  getHttp: getHttp,
  postHttp: postHttp
}