const app = getApp();
const common = require("../../utils/common.js");

Page({
  data: {
    org: {}
  },

  onLoad: function(options){
    let org_id = options.id;
    let that = this;
    let org = common.getOrgByID(org_id);
    that.setData({
      org: org
    })
  },

  baoming: function(){
    let that = this;
    let org_id = that.data.org.org_id;
    wx.navigateTo({
      url: '../apply/index?org_id=' + org_id,
    })
  }
})
