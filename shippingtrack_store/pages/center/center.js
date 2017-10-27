var pageCount = 5
var pageIndex = 1
var pageArr = []

Page({
  data: {
    last: '<',
    next: '>',
    isSelect: 1,
    pageArr: [1, 2, 3],
    orgArr: ['梅花园药店', '京溪药店', '体育路药店', '同和药店', '天河南药店', '番禺市桥药店', '广州爱心大药房', '中山三院便民药房'],
    radioSelect: 0,
    showModalStatus: false,
    isShow: true,
    testArr: [
      {
        title: '测试1',
        mArr: ['111','222','333'],
        isTrue: true
      },
      {
        title: '测试2',
        isTrue: false
      }
    ]
  },
  onLoad: function (options) {
    var that = this
    var pageTotal = 15
    pageCount = pageTotal
    for (var i = 0; i < (5 < pageCount ? 5 : pageCount); i++) {
      pageArr.push(i + 1)
    }
    if (pageCount > 5) {
      that.setData({
        nextShow: true
      })
    }
    this.setData({
      pageArr: pageArr
    })
  },
  idxChange: function (e) {
    //console.log(e)
    var that = this
    pageIndex = e
    if (e - 2 >= 1 && e + 1 <= pageCount) {
      console.log(e)
      pageArr = []
      var i = e - 2
      if (e + 1 == pageCount) {
        i = e - 3
      }
      for (i; i <= (e + 2 < pageCount ? e + 2 : pageCount); i++) {
        //console.log(i)
        pageArr.push(i)
      }
      that.setData({
        pageArr: pageArr
      })
    }
    if (e === 2) {
      console.log(2)
      pageArr = []
      for (let i = 1; i <= (5 < pageCount ? 5 : pageCount); i++) {
        pageArr.push(i)
      }
      that.setData({
        pageArr: pageArr
      })
    }

    if (e >= 1 && e <= pageCount) {
      that.setData({
        isSelect: pageIndex
      })
    }
    if (e > 3 && pageCount > 5) {
      that.setData({
        lastShow: true
      })
    }
    if (e <= 3) {
      that.setData({
        lastShow: false
      })
    }
    if (e < pageCount - 2 && pageCount > 5) {
      that.setData({
        nextShow: true
      })
    }
    if (e >= pageCount - 2) {
      that.setData({
        nextShow: false
      })
    }
  },
  numGoPage: function (e) {
    this.setData({
      isSelect: e.currentTarget.id
    })
    this.idxChange(parseInt(e.currentTarget.id))
  },
  goPage: function (e) {
    var that = this
    //console.log(e.currentTarget.id)
    if (e.currentTarget.id == 'next') {
      that.idxChange(pageIndex + 1)
    }
    else if (e.currentTarget.id == 'last') {
      that.idxChange(pageIndex - 1)
    }
  },
  selectOrg: function (e) {
    var _idx = e.currentTarget.dataset.idx
    this.setData({
      radioSelect: _idx
    })
  },
  powerDrawer: function (e) {
    var currentStatus = e.currentTarget.dataset.status
    this.util(currentStatus)
  },
  util: function (currentStatus) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
      delay: 0
    })

    this.animation = animation

    animation.opacity(0).rotateX(-100).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).rotateX(0).step()
      this.setData({
        animationData: animation
      })

      if (currentStatus == 'close') {
        this.setData({
          showModalStatus: false
        })
      }
    }.bind(this), 200)

    if (currentStatus == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  }
})