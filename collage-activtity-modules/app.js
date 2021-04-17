// app.js
App({
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
    dataInfo: [
      {
        "id": 0,
        "name": "计算机科学技术学院",
        "organizition":[
          {
            "org_id": "0",
            "name": "学生会",
            "activity": [
              {
                "act_id": "0",
                "name": "编程大赛",
                "introduce": "1234456",
                "pm": "steve",
                "images": []
              }
            ]
          }
        ]
      },
      {
        "id": 1,
        "name": "文学院",
        "organizition":[
          {
            "org_id": "1",
            "name": "学生会",
            "activity": [
              {
                "ac:_id": "1",
                "name": "诗词大赛",
                "introduce": "1234456",
                "pm": "jack",
                "images": []
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "教育学院",
        "organizition":[
          {
            "org_id": "2",
            "name": "学生会",
            "activity": [
              {
                "act_id": "2",
                "name": "马拉松",
                "introduce": "1234456",
                "pm": "rose",
                "images": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "数学科学学院",
        "organizition":[
          {
            "org_id": "3",
            "name": "学生会",
            "activity": [
              {
                "act_id": "3",
                "name": "最强大脑",
                "introduce": "1234456",
                "pm": "tony",
                "images": []
              }
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "外国语学院",
        "organizition":[
          {
            "org_id": "4",
            "name": "学生会",
            "activity": [
              {
                "act_id": "4",
                "name": "名著翻译",
                "introduce": "1234456",
                "pm": "tony",
                "images": []
              }
            ]
          }
        ]
      }
    ]
  }
})
