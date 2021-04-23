const app = getApp();
const common = require("../../utils/common.js");

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
          icon:'/images/reset_passwd.png',
          text:'修改密码',
          url: "../profile/index"
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
      },
      ]
    },
  
  onLoad: function(){
    var that = this;
    var username = app.globalData.username;
    var auth_type = app.globalData.identification;
    console.log("auth_type", auth_type)
    wx.hideTabBar({
      success: function () {
          app.onTabBar(auth_type);
      }
    });

    var ind = "学生"
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
      ind = "管理员"
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
    var notice = common.getNotice()
    that.setData({
      userInfo: userObj,
      auth_type: ind,
      items: items,
      username: auth_type,
      notice: notice
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
