const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:[
      {
        title: "学校新特色",
        content: "遍布全国40多个城市，开设了超过300个学习中心。新航道培训学校以“我坚持，我成功”为精神内涵，坚持“学术、励志、激情”的教学风格，切实践行“精品小班+全程助教+个性化服务”三大标准。在教学内容、教材研发、授课质量、环境服务等多个方面为业界创立了全新的标准，并倡导英语培训行业的升级。",
        date: "2020-11-22 21:22:02"
      },
      {
        title: "英语秋季公开课",
        content: "公开课是爱华的传统活动，安排在每个学期的第5周至15周，目的是为了使家长能够更好地去了解爱华的教学理念、教学方法，掌握孩子的学习情况，监督教师的授课质量。 中教老师会邀约每一个小朋友的家长进班和小朋友们一起听一次老师的授课。",
        date: "2020-11-12 20:52:14"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.authorizeApp(function(userInfo){
      that.setData({
        userInfo: userInfo
      })
    }),

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})