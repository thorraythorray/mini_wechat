const requestUrl = require('../../config').requestUrl
Page({
  data: {
    audios: {
      'img': 'voice',
      'name': '语音查询'
    }, //录音图标
    hot_list: '',
    is_show: false,
    detail: '',
    seah_name: '',
    is_clock: false,
    keywords: '',
    width: '320',
    bar_height: '26',
    bto_height: '58',
    height: '32',
    rubbish_list: [{
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
    ],
    name: "西安"
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.statusBarHeight
        })
      },
    })
    //加载搜索热词
    // wx.request({
    //   url: requestUrl + 'Rubbish/hots',
    //   data: {

    //   },
    //   success(res) {
    //     if (res.data.status == 0) {
    //       that.setData({
    //         hot_list: res.data.result
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '网络异常',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // })
  },
  //点击切换城市
  bindLocation: function() {
    this.setData({
      is_show: false,
      keywords: ''
    })
    wx.navigateTo({
      url: '../location/location'
    })
  },
  //热词点击事件
  bindNameDeatail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.rid
    })
  },
  //跳转图谱页
  bindDownLoad: function() {
    this.setData({
      is_show: false,
      keywords: ''
    })
    wx.navigateTo({
      url: '../download/download'
    })
  },
  //搜索框
  bindReplaceInput: function(e) {
    let keywords = e.detail.value;
    this.setData({
      is_show: false,
      keywords: keywords
    })
    
    if (keywords) {
      var that = this;
      wx.request({
        url: requestUrl + 'GarbageSorting/garbage/search',
        data: {
          name: keywords
        },
        success(res) {
          
          if (res.statusCode == 200) {
            that.setData({
              detail: ''
            })
            if (res.data.data.length > 0) {
              that.setData({
                is_show: true,
                detail: res.data.data,
                seah_name: keywords
              })
            } else {
              wx.showToast({
                title: '当前查找未被录入官方指导书中！',
                icon: 'none',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: '网络异常',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      this.setData({
        is_show: false
      })
    }
  },

//分类跳转
changeDetail: function(e) {
  console.log("+++++++++++++++++++++++++++", e)
  var id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../detail/detail?id=' + id
  })
}
})