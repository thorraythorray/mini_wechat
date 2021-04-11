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
      repairList[i]["image"] = repairList[i].images[0]
      userList.push(repairList[i])
    }
  }
  return userList
}

function getRepairObject(id){
  var repairList = getAllRepair();
  var targ = null;
  for (var i in repairList){
    if (repairList[i].id == id){
      targ = repairList[i]
      break
    }
  }
  return targ
}

function setNewRepair(info){
  var repairList = getAllRepair();
  repairList.push(info)
  wx.setStorageSync('repair_info', JSON.stringify(repairList))
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
function addRepairInfo(id, repair_status, comment){
  var repairList = getAllRepair();
  for (var i in repairList){
    if (repairList[i].id == id){
      if (repair_status){
        repairList["repair_status"] = parseInt(repair_status)
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
  delRepair: delRepair,
  addRepairInfo: addRepairInfo,
  getRepairObject: getRepairObject

}