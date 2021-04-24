// pages/act1/act1.js
const app = getApp();
const common = require("../../utils/common.js");
Page({
  data: {
    status:true,
    inform:'精彩瞬间'
  },

  onLoad: function(options){
    let that = this;
    let act_id = options.id;
    console.log("act_id", act_id)
    let user = app.globalData.userInfo.nickName;
    let act = common.getActByID(act_id);
    let my_act = common.getActByUser(user);
    let my_flag = true;
    for (var i in my_act){
      if (my_act[i].act_id == act_id){
        my_flag = false
        break
      }
    }

    let jingcai = common.getJingcaiByAct(act_id)
    that.setData({
      act: act,
      status: my_flag,
      act_id: act_id,
      jingcai: jingcai
    })
  },

  baoming: function(){
    var that = this;
    wx.navigateTo({
      url: '../../pages/jingcai/index?act_id=' + that.data.act_id ,
    })
  }
})