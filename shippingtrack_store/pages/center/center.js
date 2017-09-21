var pageCount = 5
var pageIndex = 0

Page({
  data: {
    last: '<',
    next: '>',
    isSelect: 0,
    pageArr: [1, 2, 3]
  },
  onLoad: function (options) {
    var that = this
    var pageArr = []
    var pageLength = 10
    for(var i=0; i<(5<pageLength?5:pageLength); i++){
      pageArr.push(i+1)
    }
    this.setData({
      pageArr: pageArr
    })
    if(pageLength>5){
      that.setData({
        nextShow: true
      })
    }
  },
  numGoPage:function(e){
    console.log(pageIndex)
    pageIndex = e.currentTarget.id
    this.setData({
      isSelect: pageIndex
    })
  },
  goPage: function(e){
    console.log(e.currentTarget.id)
    if(e.currentTarget.id == 'last' && pageIndex - 1 >= 0){
      pageIndex--
    }
    if (e.currentTarget.id == 'next' && pageIndex + 1 < pageCount){
      //console.log(111)
      pageIndex++
    }
    console.log(pageIndex)
    this.setData({
      isSelect: pageIndex
    })
  }
})