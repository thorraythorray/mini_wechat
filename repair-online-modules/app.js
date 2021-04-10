// app.js
App({
  // 自定义显示tabbar
  onTabBar: function (key) {
    var _curPageArr = getCurrentPages();
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.tabBarData[key];
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true;// 根据页面地址设置当前页面状态
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  tabBarData: {
    userInfo: null,
    pop: 2,
    num: 0,
    user: {
      "color": "#dbdbdb",
      "selectedColor": "#1296db",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [{
          "pagePath": "/pages/user_pages/index/index",
          "text": "首页",
          "iconPath": "/images/home.png",
          "selectedIconPath": "/images/home_active.png",
          "clas": "tabbar-item",
          "active": true
        },
        {
          "pagePath": "/pages/user_pages/notify/index",
          "text": "通知",
          "iconPath": "/images/notice.png",
          "selectedIconPath": "/images/notice_active.png",
          "clas": "tabbar-item",
          "active": false
        },
        {
          "pagePath": "/pages/user_pages/my/index",
          "text": "我的",
          "iconPath": "/images/me.png",
          "selectedIconPath": "/images/me_active.png",
          "clas": "tabbar-item",
          "active": false
        }
      ]
    },
    admin: {
      "color": "#dbdbdb",
      "selectedColor": "#1296db",
      "backgroundColor": "white",
      "borderStyle": "white",
      "position": "bottom",
      "list": [{
          "pagePath": "/pages/admin_pages/index/index",
          "text": "首页",
          "iconPath": "/images/home.png",
          "selectedIconPath": "/images/home_active.png",
          "clas": "tabbar-item",
          "active": true
        },
        {
          "pagePath": "/pages/admin_pages/message/index",
          "text": "留言板",
          "iconPath": "/images/liuyanban.png",
          "selectedIconPath": "/images/liuyanban_active.png",
          "clas": "tabbar-item",
          "active": false
        },
        {
          "pagePath": "/pages/admin_pages/my/index",
          "text": "我的",
          "iconPath": "/images/me.png",
          "selectedIconPath": "/images/me_active.png",
          "clas": "tabbar-item",
          "active": false
        }
      ]
    },
  },


  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    identification: null    
  }
})
