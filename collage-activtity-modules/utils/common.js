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
  for(var i in data){
    let org = data[i].organizition
    for (var j in org) {
      org_list.push(org[j])
    }
  }
  return org_list
}

function getOrgByID(id) {
  let _org = ""
  let data = app.globalData.dataInfo;
  for(var i in data){
    let org = data[i].organizition
    for (var j in org) {
      _org = org[j]
      _org["institute"] = data[i].name;
    }
  }
  return _org
}

module.exports = {
  getLoginItems: getLoginItems,
  getOrgInfo: getOrgInfo,
  getOrgByID: getOrgByID
}