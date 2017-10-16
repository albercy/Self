var httpUrl = getApp().globalData.domainName + '/jsonaction/websiteaction.action/'

function getHttp(method, head, callback, options) {
  wx.request({
    url: httpUrl + method,
    header: head,
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res.data)
    }
  })
}

function postHttp(method, options, callback) {
  wx.request({
    url: httpUrl + method,
    data: options,
    method: 'POST',
    header: { "content-type": "application/x-www-form-urlencoded" },
    success: function (res) {
      // success
      console.log(res.data)
      callback(res.data)
    }
  })
}

module.exports = {
  getHttp: getHttp,
  postHttp: postHttp
}