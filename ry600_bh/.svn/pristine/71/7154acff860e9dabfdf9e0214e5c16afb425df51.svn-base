var httpUrl = getApp().globalData.domainName + '/jsonaction/websiteaction.action'
var mHeader = {}

function loginHttp(options, callback) {
  wx.request({
    url: 'http://login.ry600.com/userCenterLogin.jsp',
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res, true)
    },
    fail: function(res){
      callback(res, false)
    }
  })
}

function saveHeader(e) {
  mHeader = {'cookie': e}
}

function getHttp(options, callback) {
  wx.request({
    url: httpUrl,
    header: mHeader,
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res.data, true)
    },
    fail: function(res){
      callback(res, false)
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
      callback(res.data, true)
    },
    fail: function (res) {
      callback(res, false)
    }
  })
}

module.exports = {
  loginHttp: loginHttp,
  saveHeader: saveHeader,
  getHttp: getHttp,
  postHttp: postHttp,
  mHeader: mHeader
}