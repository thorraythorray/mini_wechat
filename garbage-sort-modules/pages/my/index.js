const app = getApp();
const requestUrl = require('../../config').requestUrl;
Page( {
  data: {
    userInfo: {},
    choose_avatarUrl: "",
    userListInfo: [{
        icon: '../../images/share_index.png',
        text: '我的收藏',
        isunread: true,
        num: 0
      },
      {
        icon: '../../images/share_index.png',
        text: '我的投诉',
        isunread: true,
        num: 1
        },
        {
          icon: '../../images/share_index.png',
          text: '需要帮助',
          isunread: true,
          num: 2
          },
          {
            icon: '../../images/icon/restart-line.png',
            text: '注销',
            isunread: true,
            num: 3
            }
    ]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据

    
    app.getSelfUserInfo(function(res) {
      console.log("userinfo : ", res)
      that.setData( {
        authFlag: 1,
        userInfo: res
      })
    })
  },

  clickevent: function(option) {
    var num = parseInt(option.currentTarget.dataset.num)
    
    if (num == 1){
      wx.redirectTo({
        url: '../suggest/index',
      })
    }else if(num == 0){
      wx.redirectTo({
        url: '../collect/index',
      })
    }else if(num == 2){
      wx.redirectTo({
        url: '../help/index',
      })
    }else{
      console.log("0000000000000000000000000000000")
      wx.clearStorage()
      wx.redirectTo({
        url: '../login/index',
      })
    }
  },

  logining(e) {
    var that = this
    console.log('click login------',e);
    that.setData({
      userInfo: e.detail.userInfo,
      authFlag: 1
    })
  }, 

  update_userinfo: function() {
    wx.redirectTo({
      url: '../profile/index',
    })
  },

  bindViewTap: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("choose pic res:", res)
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          choose_avatarUrl: tempFilePaths
        })
        
        // wx.uploadFile({ 
        //   url: requestUrl + 'GarbageSorting/upload',
        //   filePath: tempFilePaths[0], // 要上传的文件的路径，注：一次只能上传一个文件，若要上传多张图片，请使用递归
        //   name: 'file', // 文件对应的键名，后端可以通过这个key获取到文件的二进制内容
        //   formData:{
        //     'userId': res.data.userInfo.userId
        //   },
        //   success: function(res){
        //     wx.showToast({
        //       title: '修改成功！',
        //       icon: 'success',
        //       duration: 2000
        //     })
        //   }
        // })
      }
    })
  }
})