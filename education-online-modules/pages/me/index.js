const app = getApp()

Page({
  
  data:{
    picture: "../../image/teacher.png",
    name: "Wong",
    wx_atuhorize: true,
    // 1.菜单栏数据
      items:[
          {
          icon:'../../image/Question.png',
          text:'我的题库',
          url: "../favarite/index?type=favorite"
        },

        {
            icon:'../../image/notes.png',
          text:'我的笔记',
          url: "../notes/index"
        },

          {
            icon:'../../image/Personal.png',
          text:'个人信息',
          url: "../profile/index"
        },
        
          {
            icon:'../../image/place.png',
          text:'北京市海淀区',
        },
        
          {
            icon:'../../image/phone.png',
          text:'010-12345678',
        },
        
          {
            icon:'../../image/emil.png',
          text:'abc@abc.com',
        }
      ]
    },
  
  onLoad: function(){
    var that = this;
    wx.getSetting({
      success(ress) {
        if (!ress.authSetting['scope.userInfo']) {
          that.setData({
            wx_atuhorize: false
          })
        }else{
          app.getUserInfo(function(userInfo){
            that.setData({
              userInfo: userInfo,
              wx_atuhorize: true
            })
          })
        }
      }
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
