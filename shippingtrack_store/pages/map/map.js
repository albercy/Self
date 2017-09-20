// pages/map/map.js
Page({
  data: {},
  onLoad: function (options) {
    //console.log(JSON.parse(options.location))
    var mLocation = JSON.parse(options.location)
    var markers = [{
      id: 'num1',
      iconPath: '../images/marker_red.png',
      latitude: mLocation.latitude,
      longitude: mLocation.longitude
    }]
    var points = new Array()
    for(let i=0; i<5; i++){
      points.push({latitude: mLocation.latitude + (i/1000), longitude: mLocation.longitude + (i/10000)})
    }
    console.log(points)
    this.setData({
      mLatitude: mLocation.latitude,
      mLongitude: mLocation.longitude,
      mMarkers: markers,
      mPolyline: [{
        "points": points,
        "color": '#233fcc',
        "width": 5
      }]
    })
  }
})