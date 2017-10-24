Page({
  data: {
    btnTxt: '取消'
  },
  onLoad: function (options) {},
  inputEntry: function(e){
    if(e.detail.value != ''){
      this.setData({
        isFocus: true,
        btnTxt: '搜索'
      })
    }
    else{
      this.setData({
        isFocus: false,
        btnTxt: '取消'
      })
    }
  },
  searchClick: function(){
    if(this.data.btnTxt == '取消'){
      wx.navigateBack({
        url: '../index/index'
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '没有搜索结果'
      })
    }
  }
})