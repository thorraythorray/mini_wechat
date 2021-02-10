const app = getApp()

var order = ['red', 'yellow', 'green', 'blue', 'red']
Page({
  data: {
    toView: "red",
    scrollTop: 100,
    videoInfo: {
      src: app.globalData.resource_url + 'video.mp4',
      title: "Travel journal",
      desc: "The chess-board is the world:the pieces are the phenomena1 of the universe;"
    }
  },

  onLoad: function(){
    var that = this;
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },

  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})