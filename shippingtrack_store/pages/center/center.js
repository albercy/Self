Page({
  data: {
    last: '<',
    next: '>',
    pageArr: [1, 2, 3]
  },
  onLoad: function (options) {
    var pageArr = []
    for(var i=0; i<10; i++){
      pageArr.push(i+1)
    }
    this.setData({
      pageArr: pageArr
    })
  }
})