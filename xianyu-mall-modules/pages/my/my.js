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
          url: "../pub/pub"
        },

        {
          text:'我的收藏',
          url: "../collect/collect"
        },

        {
          text:'我的交易',
          url: "../trade/trade"
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

  },

  logining(e) {
    var that = this
    console.log('click login------',e);
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      wx_atuhorize: true
    })

  }
})
