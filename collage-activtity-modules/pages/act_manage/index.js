const app = getApp();
const common = require("../../utils/common.js");

Page({
  data: {
    img: [ 
      "/images/slider1.jpg",
      "/images/slider2.jpg",
      "/images/slider3.jpg"
    ],
    test:0,
    indicatorDots:true,
    //是否显示面板指示点
    autoplay:true,
    //是否自动切换
    interval: 5000,
    //自动切换时间间隔
    duration: 500,
    //滑动动画时长
    color:'#ffffff',
    //当前选中的指示点颜色
    height:'',
    //swiper高度
    org_list: []
  },

  nb:function(){
    this.setData({
      test:1
    })
  },

  onLoad:function(){
    let that = this;
    // let org_list = common.getOrgInfo();
    let inst = app.globalData.inst;
    let data = common.getActByInst(inst)
    that.setData({
      org_list: data
    })
  },

  goheight:function (e) {
    var width = wx.getSystemInfoSync().windowWidth
    //获取可使用窗口宽度
    var imgheight = e.detail.height
    //获取图片实际高度
    var imgwidth = e.detail.width
    //获取图片实际宽度
    var height = width * imgheight / imgwidth +"px"
    //计算等比swiper高度
    this.setData({
      height: height
    })
  },

  del_it: function(e){
    let that = this; 
    console.log("e", e)
    let act_id = e.target.dataset.id;
    wx.showModal({
      content: '确认删除？',
      success (res) {
        if (res.confirm) {
          common.delAct(act_id)
          that.onLoad()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})
