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
    console.log("coming in ..", org)
    that.setData({
      org: org
    })
  }
})