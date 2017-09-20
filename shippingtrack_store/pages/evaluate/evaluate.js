Page({
  data: {
    selectArr: ['商品包装','送货速度','配送员速度 '],
    tip: '请写下你此次的购物体验与评价来帮助其他小伙伴~'
  },
  onLoad: function (options) {
    var imgArr = new Array()
    imgArr[0] = '1'
    for (let i = 0; i < 4; i++) {
      imgArr.push('0')
    }
    this.setData({
      starArr: imgArr
    })
  },
  imgClick: function (e) {
    var imgId = parseInt(e.currentTarget.id)
    //console.log(imgId)
    var imgArr = new Array()
    for (let i = 0; i < imgId + 1; i++) {
      imgArr.push('1')
    }
    console.log(imgArr.length)
    for (let i = imgArr.length + 1; i < 6; i++) {
      imgArr.push('0')
    }
    this.setData({
      starArr: imgArr
    })
  }
})