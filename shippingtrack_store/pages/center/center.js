var pageCount = 5
var pageIndex = 1
var pageArr = []
var dropArr = ['aaa', 'bbb', 'ccc']
var md5 = require('../../utils/md5')

Page({
  data: {
    last: '<',
    next: '>',
    isSelect: 1,
    changeTxt: '全部',
    pageArr: [1, 2, 3],
    dropArr: ['aaa','bbb','ccc'],
    testArr: [{bArr: ['111', '222', '333']}],
    pickerArr: ['aa','bb','cc'],
    pickerIdx: 0
  },
  onLoad: function (options) {
    var that = this
    var pageTotal = 13
    pageCount = pageTotal
    for(var i=0; i<(5<pageCount?5:pageCount); i++){
      pageArr.push(i+1)
    }
    if(pageCount>5){
      that.setData({
        nextShow: true
      })
    }
    this.setData({
      pageArr: pageArr
    })
  },
  idxChange: function (e) {
    console.log(e)
    var that = this
    pageIndex = e
    if(e-2>=1&&e+1<=pageCount){
      //console.log(e)
      pageArr = []
      var i = e-2
      if(e+1 == pageCount){
        i = e-3
      }
      for(i; i<=(e+2<pageCount?e+2:pageCount); i++){
        //console.log(i)
        pageArr.push(i)
      }
      that.setData({
        pageArr: pageArr
      })
    }
    if(e>=1&&e<=pageCount){
      that.setData({
        isSelect: pageIndex
      })
    }
    if(e>3){
      that.setData({
        lastShow: true
      })
    }
    if(e<=3){
      that.setData({
        lastShow: false
      })
    }
    if(e<pageCount-2){
      that.setData({
        nextShow: true
      })
    }
    if(e>=pageCount-2){
      that.setData({
        nextShow: false
      })
    }
  },
  numGoPage: function(e){
    this.setData({
      isSelect: e.currentTarget.id
    })
    this.idxChange(parseInt(e.currentTarget.id))
  },
  goPage: function(e){
    var that = this
    //console.log(e.currentTarget.id)
    if(e.currentTarget.id == 'next'){
      that.idxChange(pageIndex+1)
    }
    else if (e.currentTarget.id == 'last') {
      that.idxChange(pageIndex-1)
    }
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
  },
  pickerChange: function (e){
    console.log(e.detail.value)
    this.setData({
      pickerIdx: e.detail.value
    })
  }
})