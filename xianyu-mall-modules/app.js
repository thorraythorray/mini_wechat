//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    cateInfo: [
      {
        id: 0,
        icon: '/images/1.jpg',
        name: '书籍',
        items: [
          {
            item_id: 0,
            name: '谁的人生不迷茫',
            src: '/images/shuji1.jpg',
            state: 1,
            price: 10,
            info: [
              '作者：成芬',
              '出版社：人民邮电出版社',
              '新旧度：九成',
              '出售价：10/本',
              '联系方式：158****7170'
            ]
          },
          {
            item_id: 1,
            name: '悲惨世界',
            src: '/images/shuji2.jpg',
            state: 1,
            price: 10,
            info: [
              '作者：维克多·雨果[法]',
              '出版社：人民文学出版社',
              '新旧度：八成',
              '出售价：10/本',
              '联系方式：158****7170'
            ]
          },
          {
            item_id: 2,
            name: '人间失格',
            state: 1,
            src: '/images/shuji3.jpg',
            price: 10,
            info: [
              '作者：太宰治[日]',
              '出版社：现代出版社',
              '新旧度：七成',
              '出售价：10/本',
              '联系方式：181****3757'
            ]
          }
        ]
      },
      {
        id: 1,
        icon: '/images/2.jpg',
        name: '文具',
        items: [
          {
            item_id: 3,
            name: '牛皮笔记本',
            src: '/images/wenju1.jpg',
            price: 7,
            state: 1,
            info: [
              '新旧度:全新',
              '出售价:7/本',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 4,
            name: '多功能笔筒',
            src: '/images/wenju2.jpg',
            price: 5,
            state: 1,
            info: [
              '新旧度:八成',
              '出售价:5/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 5,
            name: '全新A4纸',
            src: '/images/wenju3.jpg',
            price: 0.1,
            state: 1,
            info: [
              '新旧度:全新',
              '出售价:0.1/张',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 2,
        icon: '/images/3.jpg',
        name: '美妆',
        items: [
          {
            item_id: 6,
            name: '橘朵七巧板眼影盘(星光珊瑚盘)',
            src: '/images/meizhuang1.jpg',
            state: 1,
            price: 20,
            info: [
              '新旧度:九成（仅试色）',
              '出售价:20/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 7,
            name: '新款珂拉琪镜面唇釉（R702）',
            src: '/images/meizhuang2.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:全新未拆封',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 8,
            name: '雅诗兰黛DW粉底液小样（2C0自然白）',
            src: '/images/meizhuang3.jpg',
            price: 10,
            state: 1,
            info: [
              '新旧度:全新',
              '出售价:10/个',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 3,
        icon: '/images/4.jpg',
        name: '服装',
        items: [
          {
            item_id: 9,
            name: '女式西装外套',
            src: '/images/fuzhuang1.jpg',
            state: 1,
            price: 30,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '尺码：S码',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 10,
            name: '纯棉白色休闲款衬衫女',
            src: '/images/fuzhuang2.jpg',
            price: 30,
            state: 1,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '尺码：S码',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 11,
            name: '短款加绒牛仔外套女',
            src: '/images/fuzhuang3.jpg',
            state: 1,
            price: 30,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '尺码：S码',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 4,
        icon: '/images/5.jpg',
        name: '鞋包',
        items: [
          {
            item_id: 12,
            name: '酒红色斜挎式单肩包',
            src: '/images/xiebao1.jpg',
            state: 1,
            price: 30,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 13,
            name: '漆皮加绒平底马丁靴女',
            src: '/images/xiebao2.jpg',
            state: 1,
            price: 30,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 14,
            name: '皮面高跟鞋（5cm）',
            src: '/images/xiebao3.jpg',
            state: 1,
            price: 30,
            info: [
              '新旧度:全新',
              '出售价:30/件',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 5,
        icon: '/images/6.jpg',
        name: '饰品',
        items: [
          {
            item_id: 15,
            name: '不对称耳饰',
            src: '/images/shipin1.jpg',
            state: 1,
            price: 5,
            info: [
              '新旧度:七成',
              '出售价:5/对',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 16,
            name: '时尚圆形耳饰',
            src: '/images/shipin2.jpg',
            state: 1,
            price: 5,
            info: [
              '新旧度:七成',
              '出售价:5/对',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 17,
            name: '几何耳钉',
            src: '/images/shipin3.jpg',
            state: 1,
            price: 5,
            info: [
              '新旧度:七成',
              '出售价:5/对',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 6,
        icon: '/images/7.jpg',
        name: '智能设备',
        items: [
          {
            item_id: 18,
            name: '无线蓝牙鼠标',
            src: '/images/zhineng1.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 19,
            name: '宿舍神器电子秤',
            src: '/images/zhineng2.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 20,
            name: '运动挂脖式蓝牙耳机',
            src: '/images/zhineng3.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 7,
        icon: '/images/8.jpg',
        name: '办公用品',
        items: [
          {
            item_id: 21,
            name: '得力60页A4资料册',
            src: '/images/bangong1.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 22,
            name: '透明文件夹',
            src: '/images/bangong2.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 23,
            name: '桌上收纳架',
            src: '/images/bangong3.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          }
        ]
      },
      {
        id: 8,
        icon: '/images/9.jpg',
        name: '百货海淘',
        items: [
          {
            item_id: 21,
            name: '可折叠床上桌',
            src: '/images/baihuo1.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 22,
            name: '宿舍神器床头挂筐',
            src: '/images/baihuo2.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          },
          {
            item_id: 23,
            name: '大号收纳箱',
            src: '/images/baihuo3.jpg',
            state: 1,
            price: 15,
            info: [
              '新旧度:七成',
              '出售价:15/个',
              '联系方式:158****7170'
            ]
          }
        ]
      }
    ]
  }
})