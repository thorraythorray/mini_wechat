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

function getActByUser(user) {
  let org_list = getOrgInfo();
  let my_act = []
  for (let i in org_list) {
    let user_list = org_list[i].user_list || [];
    if (user_list.indexOf(user) > -1){
      my_act.concat(org_list[i].activity)
    }
  }
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
  let data = getBaseData();
  for (var i in data){
    let org = data[i].organizition;
    for (var j in org){
      if (data[i].org_id == org_id) {
        data[i].activity.push(info)
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
        break
      }
    }
  }
  wx.setStorageSync('data', JSON.stringify(data))
}


module.exports = {
  getLoginItems: getLoginItems,
  getOrgsByInst: getOrgsByInst,
  
  getOrgInfo: getOrgInfo,
  getOrgByID: getOrgByID,
  addNewOrg: addNewOrg, 

  getAllActivity: getAllActivity,
  getActByID: getActByID,
  getActByUser: getActByUser,
  addNewAct: addNewAct,

  getAllApply: getAllApply,
  getApplyByUser: getApplyByUser,
  getApplyByInst: getApplyByInst,
  applyOrganize: applyOrganize,
  feedbackApply: feedbackApply
}