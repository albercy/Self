var pageCount = 5
var pageIndex = 0
var dropArr = ['aaa', 'bbb', 'ccc']

Page({
  data: {
    last: '<',
    next: '>',
    isSelect: 0,
    changeTxt: '全部',
    pageArr: [1, 2, 3],
    dropArr: ['aaa','bbb','ccc']
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
    var that = this
    console.log(e.currentTarget.id)
    if(e.currentTarget.id == 'last' && pageIndex - 1 >= 0){
      pageIndex--
    }
    if (e.currentTarget.id == 'next' && pageIndex + 1 < pageCount){
      //console.log(111)
      pageIndex++
    }
    if(pageIndex > 0){
      that.setData({
        nextShow: true,
        lastShow: true
      })
    }
    else{
      that.setData({
        lastShow: false
      })
    }

    console.log(pageIndex)
    this.setData({
      isSelect: pageIndex
    })
  },
  drop: function(){
    this.setData({
      dropShow: !this.data.dropShow
    })
  },
  change: function(e){
    //console.log(e)
    dropArr[e.currentTarget.dataset.ididx] = this.data.changeTxt
    this.setData({
      changeTxt: e.currentTarget.dataset.ctxt,
      dropArr: dropArr,
      dropShow: false
    })
  }
})