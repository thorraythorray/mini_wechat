// pages/act1/act1.js
const app = getApp();
const common = require("../../utils/common.js");
Page({
  data: {
    status:true,
    inform:'报名已结束'
  },

  onLoad: function(options){
    let act_id = options.id;
    let that = this;
    let act = common.getActByID(act_id);
    that.setData({
      act: act
    })
  },
})