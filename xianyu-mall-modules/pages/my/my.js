const app = getApp();

Page({
  
  data:{
    picture: "../../image/teacher.png",
    name: "Wong",
    wx_atuhorize: true,
    // 1.菜单栏数据
      items:[
        {
          text:'我的发布',
          url: "../pubInfo/detail"
        },

        {
          text:'我的收藏',
          url: "../collect/detail"
        },

        {
          text:'我的交易',
          url: "../trade/detail"
        },
        
        {
            text:'我的消息',
            url: "../message/message"
        }
      ]
    },
  
  onLoad: function(){
    var that = this;
    var userInfo = app.globalData.userInfo;
    that.setData({
      userInfo: userInfo,
      wx_atuhorize: true
    })
  }
})
