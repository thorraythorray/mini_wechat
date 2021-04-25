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
  if (repairList.length > 0){
    wx.setStorageSync('repair_info', JSON.stringify(repairList))  
  }
}
function addRepairInfo(id, repair_status, comment, pingjia){
  var repairList = getAllRepair();
  for (var i in repairList){
    if (repairList[i].id == id){
      repairList[i]["repair_status"] = parseInt(repair_status)
      if (comment){
        repairList[i]["comment"] = comment
      }
      if (pingjia) {
        repairList[i]["pingjia"] = pingjia
      }
      break
    }
  }
  if (repairList.length > 0){
    wx.setStorageSync('repair_info', JSON.stringify(repairList))  
  }
}

function sortRepairListByStatus(username, status){
  var repairList = getAllRepair();
  if (username.indexOf("admin") == -1) {
    repairList = getUserRepair(username)
  }
  
  var sortList = []
  for (var i in repairList){
    if (repairList[i].repair_status == status){
      repairList[i]["image"] = repairList[i].images[0]
      sortList.push(repairList[i])
    }
  }
  return sortList
}

function sortRepairListByType(username, type, status){
  console.log("username", username)
  var repairList = getAllRepair();
  if (username.indexOf("admin") == -1) {
    repairList = getUserRepair(username)
  }
  var sortList = []
  for (var i in repairList){
    console.log("type", type)
    if (repairList[i].type == type && repairList[i].repair_status == status){
      repairList[i]["image"] = repairList[i].images[0]
      sortList.push(repairList[i])
    }
  }
  return sortList
}

function getAllUser() {
  var user_serialize = wx.getStorageSync('user_info') || [];
  var userList = [];
  if (user_serialize.length > 0){
    userList = JSON.parse(user_serialize)
  }
  return userList
}

function resetUserPasswd(username, passwd) {
  var userList = getAllUser();
  for (var i in userList){
    if (userList[i].no == username){
      userList[i].passwd = passwd
      break
    }
  }
  if (userList.length > 0){
    wx.setStorageSync('user_info', JSON.stringify(userList))  
  }
}

function setUserProfile(username, info){
  var userList = getAllUser();
  if (userList.length > 0){
    for (var i in userList){
      if (userList[i].no == username){
        for (var k in info){
          userList[i][k] = info[k]
        }
        break
      }
    }
  }else{
    userList.push(info)
  }
  
  if (userList.length > 0){
    wx.setStorageSync('user_info', JSON.stringify(userList))  
  }
}

function getUser(username){
  var userList = getAllUser(username);
  var userObj = null;
  for (var i in userList){
    if (userList[i].no == username){
      userObj =  userList[i]
      break
    }
  }
  return userObj
}

function getAllMessages(){
  var message_serialize = wx.getStorageSync('message_info') || [];
  var messageList = [];
  if (message_serialize.length > 0){
    messageList = JSON.parse(message_serialize)
  }
  return messageList
}

function getUserMessages(user){
  var messageList = getAllMessages();
  var userMessage = []
  for (var i in messageList){
    if (messageList[i].user == user){
      userMessage.push(messageList[i])
    }
  }
  return userMessage
}

function getNotice(){
  return wx.getStorageSync('notify_info') 
}

function addNotify(info){
  var notifyList = info;
  wx.setStorageSync('notify_info', notifyList) 
}

function addMessage(info){
  var messageList = getAllMessages();
  messageList.push(info)
  wx.setStorageSync('message_info', JSON.stringify(messageList)) 
}

function addMessageComment(id, comment){
  console.log("id", id)
  var messageList = getAllMessages();
  for(var i in messageList){
    if (messageList[i].id == id){
      messageList[i]["reply"] = comment
      break
    }
  }
  if (messageList.length > 0) {
    wx.setStorageSync('message_info', JSON.stringify(messageList)) 
  }
}

function delMessage(id){
  var messageList = getAllMessages();
  for(var i in messageList){
    if (messageList[i].id == id){
      messageList.splice(i, 1)
      break
    }
  }
  if (messageList.length > 0) {
    wx.setStorageSync('message_info', JSON.stringify(messageList)) 
  }
}

module.exports = {
  getAllRepair: getAllRepair,
  getUserRepair: getUserRepair,
  setNewRepair: setNewRepair,
  delRepair: delRepair,
  addRepairInfo: addRepairInfo,
  getRepairObject: getRepairObject,
  sortRepairListByStatus: sortRepairListByStatus,
  sortRepairListByType: sortRepairListByType,

  getAllUser: getAllUser,
  resetUserPasswd: resetUserPasswd,
  setUserProfile: setUserProfile,
  getUser: getUser,

  getAllMessages:getAllMessages,
  getUserMessages:getUserMessages,
  addMessage:addMessage,
  addMessageComment:addMessageComment,
  delMessage:delMessage,

  getNotice: getNotice,
  addNotify: addNotify
}