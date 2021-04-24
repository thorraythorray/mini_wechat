const app = getApp();

function getBaseData(){
  let data_serialize = wx.getStorageSync('data') || [];
  let dataList = app.globalData.dataInfo;
  if (data_serialize.length > 0){
    dataList = JSON.parse(data_serialize)
  }
  return dataList
}

function getLoginItems(){
  let data = getBaseData();
  let login_list = []
  for (let i in data) {
    let item = {
      title: data[i].name,
      categoryID: data[i].id
    }
    login_list.push(item)
  }
  console.log("getLoginItems", login_list)
  return login_list
}

function getOrgsByInst(inst){
  let data = getBaseData();
  let login_list = []
  for (var i in data){
    if (data[i].name == inst) {
      let org_obj = data[i].organizition
      for (let j in org_obj) {
        let item = {
          title: org_obj[j].name,
          categoryID: org_obj[j].org_id
        }
        login_list.push(item)
      }
      break
    }
  }
  console.log("getOrgsByInst", login_list)
  return login_list
}

function getOrgInfo(){
  let data = getBaseData();
  let org_list = []
  for(let i in data){
    let org = data[i].organizition
    for (let j in org) {
      org[j].inst_name = data[i].name
      org_list.push(org[j])
    }
  }
  return org_list
}

function getOrgByID(id) {
  console.log("find org is", id)
  let _org = ""
  let data = getBaseData();
  for(let i in data){
    let org = data[i].organizition
    for (let j in org) {
      if (org[j].org_id == id){
        _org = org[j]
        _org["institute"] = data[i].name;
        break
      }
    }
  }
  return _org
}

function addNewOrg(inst_name, info) {
  let data = getBaseData();
  for (var i in data){
    if (data[i].name == inst_name) {
      data[i].organizition.push(info)
      break
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}

function delOrg(org_id) {
  let data = getBaseData();
  for (var i in data){
    let org = data[i].organizition;
    for (var j in org){
      if (org[j].org_id == org_id){
        org.splice(j, 1)
        data[i].organizition = org
        break
      }
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}

function getAllActivity(){
  let org_list = getOrgInfo();
  let act_list = [];
  for (let i in org_list) {
    let activity = org_list[i].activity;
    for (let j in activity){
      act_list.push(activity[j])
    }
  }
  return act_list
}

function getActByInst(inst) {
  let data = getBaseData();
  let login_list = []
  for (var i in data){
    if (data[i].name == inst) {
      let org_obj = data[i].organizition
      for (let j in org_obj) {
        let act = org_obj[j].activity;
        for (var k in act){
          login_list.push(act[k])
        }
      }
      break
    }
  }
  return login_list
}

function delAct(act_id){
  let data = getBaseData();
  for (var i in data){
    let org = data[i].organizition;
    for (var j in org){
      let act = org[j].activity;
      for (var k in act){
        if (act[k].act_id == act_id){
          act.splice(k, 1)
          org[j].activity = act
          data[i].organizition = org
          break
        }
      }
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}


function getActByUser(user) {
  let org_list = getOrgInfo();
  let my_act = []
  for (let i in org_list) {
    let user_list = org_list[i].user_list || [];
    let act_list = org_list[i].activity
    if (user_list.indexOf(user) > -1){
      for (var j in act_list){
        my_act.push(act_list[j])
      }
      break
    }
  }
  console.log("my_act", my_act)
  return my_act
}

function getActByID(id){
  let act = ""
  let data = getBaseData();
  for(let i in data){
    let org = data[i].organizition
    for (let j in org) {
      let acti = org[j].activity;
      for (var k in acti){
        if (acti[k].act_id == id){
          act = acti[k]
          act["org_name"] = org[j].name;
          act["institute"] = data[i].name
          break
        }
      }
    }
  }
  return act
}

function addNewAct(org_id, info) {
  console.log("org_id", org_id)
  console.log("info", info)
  let data = getBaseData();
  for (var i in data){
    let org = data[i].organizition;
    for (var j in org){
      if (org[j].org_id == org_id) {
        console.log("rog", org)
        org[j].activity.push(info)
        data[i].organizition = org
        break
      }
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}

function getAllApply() {
  let apply_serialize = wx.getStorageSync('apply_info') || [];
  let applyList = [];
  if (apply_serialize.length > 0){
    applyList = JSON.parse(apply_serialize)
  }
  return applyList
}

function getApplyByUser(user){
  let apply_list = getAllApply();
  let user_apply_list = [];
  for (let i in apply_list){
    if (apply_list[i].user == user){
      var apply_state = "拒绝"
      if (apply_list[i].status == 0){
        apply_state = "提交"
      }else if(apply_list[i].status == 1){
        apply_state = "通过"
      }
      apply_list[i].apply_state = apply_state;
      user_apply_list.push(apply_list[i])
    }
  }
  return user_apply_list
}

function applyOrganize(apply_info){
  let apply_list = getAllApply()
  apply_list.push(apply_info)
  wx.setStorageSync('apply_info', JSON.stringify(apply_list))
}

function getApplyByInst(inst){
  let apply_list = getAllApply();
  let user_apply_list = [];
  for (let i in apply_list){
    if (apply_list[i].inst_name == inst && apply_list[i].status == 0){
      user_apply_list.push(apply_list[i])
    }
  }
  return user_apply_list
}

function feedbackApply(id, status){
  let apply_list = getAllApply();
  let tar_apply = null;
  for (let i in apply_list){
    if (apply_list[i].id == id){
      apply_list[i].status = parseInt(status)
      tar_apply = apply_list[i]
      break
    }
  }
  if (apply_list.length > 0){
    wx.setStorageSync('apply_info', JSON.stringify(apply_list))
  }

  let org_id = tar_apply.org_id;
  let data = getBaseData();
  for(let i in data){
    let org = data[i].organizition
    for (let j in org) {
      if (org[j].org_id == org_id){
        if (org.hasOwnProperty("user_list")){
          org[j].user_list.push(tar_apply.user)
        }else{
          org[j]["user_list"] = [tar_apply.user]
        }
        data[i].organizition = org
        break
      }
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}

function getAllUser() {
  var user_serialize = wx.getStorageSync('user_info') || [];
  var userList = [];
  if (user_serialize.length > 0){
    userList = JSON.parse(user_serialize)
  }
  return userList
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

function getAllJingcai() {
  let apply_serialize = wx.getStorageSync('jingcai_info') || [];
  let applyList = [];
  if (apply_serialize.length > 0){
    applyList = JSON.parse(apply_serialize)
  }
  return applyList
}
function addJingcai(info){
  let jingcai = getAllJingcai();
  jingcai.push(info)
  wx.setStorageSync('jingcai_info', JSON.stringify(jingcai))  
}

function getJingcaiByAct(act_id){
  let jingcai = getAllJingcai();
  let jc_list = []
  for (var i in jingcai){
    if (jingcai[i].act_id == act_id){
      jc_list.push(jingcai[i])
    }
  }
  return jc_list
}

module.exports = {
  getLoginItems: getLoginItems,
  getOrgsByInst: getOrgsByInst,
  getActByInst: getActByInst,
  
  getOrgInfo: getOrgInfo,
  getOrgByID: getOrgByID,
  addNewOrg: addNewOrg, 
  delOrg: delOrg,
  getAllActivity: getAllActivity,
  getActByID: getActByID,
  getActByUser: getActByUser,
  addNewAct: addNewAct,
  delAct: delAct, 

  getAllApply: getAllApply,
  getApplyByUser: getApplyByUser,
  getApplyByInst: getApplyByInst,
  applyOrganize: applyOrganize,
  feedbackApply: feedbackApply,

  getAllUser: getAllUser,
  setUserProfile: setUserProfile,
  getUser: getUser,

  getAllJingcai: getAllJingcai,
  addJingcai: addJingcai,
  getJingcaiByAct: getJingcaiByAct 
}