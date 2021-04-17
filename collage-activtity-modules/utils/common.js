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

module.exports = {
  getLoginItems: getLoginItems
}