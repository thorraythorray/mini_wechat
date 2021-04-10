const app = getApp();

// repair status 
// 0 提交, 1 处理中，2 处理完成

function getAllRepair(){
    var repair_serialize = wx.getStorageSync('repair_info') || [];
    var repairList = [];
    if (repair_serialize.length > 0){
      repairList = JSON.parse(repair_serialize)
    }
    return repairList
}

function getUserRepair(user){
  var repairList = getAllRepair();
  var userList = []
  for (var i in repairList){
    if (repairList[i].user == user){
      userList.push(repairList[i])
    }
  }
  return userList
}

function setNewRepair(info){
  var repairList = getAllRepair();
  repairList.push(info)
  wx.setStorageSync('repair_info', JSON.stringify(repairList))
}

function setRepairStatus(id, status){
  var repairList = getAllRepair();
  for (var i in repairList){
    if (repairList[i].id == id){
      repairList[i].status = parseInt(status)
      break
    }
  }
  if (repairList){
    wx.setStorageSync('repair_info', JSON.stringify(repairList))  
  }
}

function delRepair(id){
  var repairList = getAllRepair();
  for (var i in repairList){
    if (repairList[i].id == id){
      repairList.splice(i, 1)
      break
    }
  }
  if (repairList){
    wx.setStorageSync('repair_info', JSON.stringify(repairList))  
  }
}
function addRepairInfo(id, end_time, comment){
  var repairList = getAllRepair();
  for (var i in repairList){
    if (repairList[i].id == id){
      if (end_time){
        repairList["end_date"] = end_time
      }
      if (comment){
        repairList["comment"] = end_time
      }
      break
    }
  }
  if (repairList){
    wx.setStorageSync('repair_info', JSON.stringify(repairList))  
  }
}


module.exports = {
  getAllRepair: getAllRepair,
  getUserRepair: getUserRepair,
  setNewRepair: setNewRepair,
  setRepairStatus: setRepairStatus,
  delRepair: delRepair,
  addRepairInfo: addRepairInfo

}