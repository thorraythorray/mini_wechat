const requestUrl = require('../../config').requestUrl;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    searec_name:'',
    userInfo: {},
    empty_collect: 0,
    collects: [
      // {id: 41, name: "苹果", categoryId: 5, categoryName: "湿垃圾", categoryUrl: "http://www.atoolbox.net/Images/RefuseClassification/20190615142410.png"},
      // {id: 42, name: "苹果派", categoryId: 5, categoryName: "湿垃圾", categoryUrl: "http://www.atoolbox.net/Images/RefuseClassification/20190615142410.png"}
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {

    var that = this
    //调用应用实例的方法获取全局数据
    app.getSelfUserInfo(function(res) {
      wx.request({
        url: requestUrl + 'GarbageSorting/favorite/list',
        data: {
          userId: res.userId
        },
        success(res) {
          if (res.statusCode == 200) {
            var ec = 1
            if (res.data.data.length > 0){
              ec = 0
            }
            that.setData({
              collects: res.data.data,
              empty_collect: ec
            })
          } else {
            wx.showToast({
              title: '网络异常',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
      })
    })
  }
})