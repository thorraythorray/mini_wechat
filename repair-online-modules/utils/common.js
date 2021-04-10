const app = getApp();

// repair status 
// 0 提交, 1 已接受, 2 处理中，3 处理完成， 4  

function repairList(){
    var repair_list = wx.getStorageSync('repair_list') || []
    return repair_list
}




module.exports = {
  repairList: repairList
}