var httpUrl = getApp().getDomainName() + '/jsonaction/websiteaction.action?action='
var vsTms = 'VSTms.'
var vsShop = 'VSShop.'
var vsERP = 'VSERPSellBill.'
var cookie = ''

var cookieListener = {
  saveCookie: function (options){
    cookie = options
  },
  getCookie: function (){
    return cookie
  }
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
    header: cookie,
    data: options,
    method: 'GET',
    success: function (res) {
      callback(res.data)
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
    }
  })
}
module.exports = {
  cookieListener: cookieListener,
  getHttp: getHttp,
  postHttp: postHttp
}