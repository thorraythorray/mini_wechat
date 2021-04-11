const app = getApp()

Page({
  
  data:{
    picture: "/images/user.jpg",
    name: "Wong",
    wx_atuhorize: true,
    // 1.菜单栏数据
      items:[
          {
            icon:'/images/Personal.png',
            text:'个人信息',
            url: "../profile/index"
        },
        {
          icon:'/images/Personal.png',
          text:'修改密码',
          url: "../profile/index"
      },
      {
        icon:'/images/Introduce.png',
        text:'留言板',
        url: "../user_pages/liuyanban/index"
      },
        {
          icon:'/images/Personal.png',
          text:'退出登录',
          url: "../login/login"
      },
      ]
    },
  
  onLoad: function(){
    var that = this;
    wx.hideTabBar({
      success: function () {
          app.onTabBar('user');
      }
    });

    // wx.getSetting({
    //   success(ress) {
    //     if (!ress.authSetting['scope.userInfo']) {
    //       that.setData({
    //         wx_atuhorize: false
    //       })
    //     }else{
    //       app.getUserInfo(function(userInfo){
    //         that.setData({
    //           userInfo: userInfo,
    //           wx_atuhorize: true
    //         })
    //       })
    //     }
    //   }
    // })
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
