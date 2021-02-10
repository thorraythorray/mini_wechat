App({
  globalData: {
    userInfo: {}
  },
  
  getSelfUserInfo:function(cb){
    try {
      const value = wx.getStorageSync('userInfo')
      if (value) {
        var res = JSON.parse(value)
        typeof cb == "function" && cb(res)
      }else{
        wx.showToast({
          title: '登录超时！',
          icon: 'error',
          duration: 2000
        })
        setTimeout(
          function () {
            wx.redirectTo({
              url: '../login/index',
            })
          },
          1000
        )
      }
    } catch (e) {
      console.log("get storage userinfo init error", e)
      return 
    }   
  },

  onLaunch: function () {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      //console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    //获取缓存中的城市id
    var cid = wx.getStorageSync('cid');
    var rubbish_list = [{
      "name": "干垃圾",
      "name_sx": "glj",
      "desc": "是指除可回收物、有害垃圾、厨余（餐厨）垃圾以外的其它生活废弃物。包括砖瓦陶瓷、普通一次性电池（碱性电池）、受污染的一次性餐盒、卫生间废纸等。",
      "id": 4
    }, {
      "name": "湿垃圾",
      "name_sx": "slj",
      "desc": "是指餐饮垃圾、厨余垃圾及废弃食用油脂和集贸市场有机垃圾等易腐蚀性垃圾，包括废弃的食品、蔬菜、瓜果皮核以及家庭产生的花草、落叶等。",
      "id": 5
    }, {
      "name": "可回收物",
      "name_sx": "khsw",
      "desc": "是指适宜回收和资源化利用的生活垃圾，包括纸类、塑料、金属、玻璃、木料和织物。",
      "id": 3
    },
    {
      "name": "有害垃圾",
      "name_sx": "yhlj",
      "desc": "是指对人体健康或者自然环境造成直接或潜在危害的生活垃圾，包括废电池、废弃药品、废杀虫剂、废水银产品等。",
      "id": 6
    }
    ]
  },
  globalData: {
    userInfo: null,
    rubbish_list: null
  }
})