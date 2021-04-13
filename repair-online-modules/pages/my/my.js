<<<<<<< HEAD
const app = getApp();
const common = require("../../utils/common.js");
=======
const app = getApp()
>>>>>>> 53fc3e0ba8d17998d8100b8055be66208b707324

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
<<<<<<< HEAD
          icon:'/images/reset_passwd.png',
=======
          icon:'/images/Personal.png',
>>>>>>> 53fc3e0ba8d17998d8100b8055be66208b707324
          text:'修改密码',
          url: "../profile/index"
      },
      {
        icon:'/images/Introduce.png',
<<<<<<< HEAD
        text:'留言',
        url: "../user_pages/liuyanban/index"
      },
        {
          icon:'/images/logout.png',
=======
        text:'留言板',
        url: "../user_pages/liuyanban/index"
      },
        {
          icon:'/images/Personal.png',
>>>>>>> 53fc3e0ba8d17998d8100b8055be66208b707324
          text:'退出登录',
          url: "../login/login"
      },
      ]
    },
  
  onLoad: function(){
    var that = this;
<<<<<<< HEAD
    var username = app.globalData.username;
    var auth_type = app.globalData.identification;
    wx.hideTabBar({
      success: function () {
          app.onTabBar(auth_type);
      }
    });

    var ind = "学生登录"
    var items = [
      {
        icon:'/images/Personal.png',
        text:'个人信息',
        url: "../profile/index"
      },
      {
        icon:'/images/reset_passwd.png',
        text:'修改密码',
        url: "../passwd/index"
      },
      {
        icon:'/images/Introduce.png',
        text:'留言',
        url: "../user_pages/liuyanban/index"
      },
        {
          icon:'/images/logout.png',
          text:'退出登录',
          url: "../login/login"
      }
    ]
    if (auth_type == "admin"){
      ind = "管理员登录"
      items = [
        {
          icon:'/images/Personal.png',
          text:'个人信息',
          url: "../profile/index"
        },
        {
          icon:'/images/reset_passwd.png',
          text:'修改密码',
          url: "../passwd/index"
        },
          {
            icon:'/images/logout.png',
            text:'退出登录',
            url: "../login/login"
        }
      ]
    }

    var userObj = common.getUser(username)
    that.setData({
      userInfo: userObj,
      auth_type: ind,
      items: items
    })
=======
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
>>>>>>> 53fc3e0ba8d17998d8100b8055be66208b707324
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
