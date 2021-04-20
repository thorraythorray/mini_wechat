const app = getApp();

function getLoginItems(){
  let data = app.globalData.dataInfo;
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

function getOrgInfo(){
  let data = app.globalData.dataInfo;
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
  let data = app.globalData.dataInfo;
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
  let data = app.globalData.dataInfo;
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

function getAllApply(apply_info) {
  let apply_serialize = wx.getStorageSync('apply_info') || [];
  let applyList = [];
  if (apply_serialize.length > 0){
    applyList = JSON.parse(apply_serialize)
  }
  return applyList
}

function applyOrganize(apply_info){
  let apply_list = getAllApply()
  apply_list.push(apply_info)
  wx.setStorageSync('apply_list', JSON.stringify(apply_list))
}





module.exports = {
  getLoginItems: getLoginItems,
  getOrgInfo: getOrgInfo,
  getOrgByID: getOrgByID,
  getAllActivity: getAllActivity,
  getActByID: getActByID,
  getActByUser: getActByUser,
  getAllApply: getAllApply,
  applyOrganize: applyOrganize
}