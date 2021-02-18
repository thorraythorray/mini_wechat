const app = getApp();

function getAllProducts(){
  var baseProds = [];
  for (var i in app.globalData.cateInfo){
    baseProds = baseProds.concat(app.globalData.cateInfo[i].items)
  }
  var addProds = wx.getStorageSync('pub_list') || []
  if (addProds.length > 0){
    addProds = JSON.parse(addProds)
  }
  var allProds = baseProds.concat(addProds)
  return allProds
}

function getCateProducts(cate_id){
  var baseProds = [];
  for (var i in app.globalData.cateInfo){
    if (app.globalData.cateInfo[i].id == parseInt(cate_id))
    baseProds = baseProds.concat(app.globalData.cateInfo[i].items)
  }
  var addProds = wx.getStorageSync('pub_list') || []
  var addCateProds = []
  if (addProds.length > 0){
    addProds = JSON.parse(addProds)
    for (var i in addProds){
      if (addProds[i].state == 1 && addProds[i].categoryID == parseInt(cate_id)){
        addCateProds.push(addProds[i])
        addCateProds[i].src = addCateProds[i].images[0]
      }
    }
  }
  var allCateProds = baseProds.concat(addCateProds)
  return allCateProds
}

function getOnSaleProducts(){
  var addProds = wx.getStorageSync('pub_list') || []
  var addCateProds = []
  if (addProds.length > 0){
    addProds = JSON.parse(addProds)
    for (var i in addProds){
      console.log("addProdsaddProdsaddProds", addProds[i])
      if (addProds[i].state == 1){
        addCateProds.push(addProds[i])
        addCateProds[i].src = addCateProds[i].images[0]
      }
    }
  }
  return addCateProds
}

function getOffSaleProducts(){
  var addProds = wx.getStorageSync('pub_list') || []
  var addCateProds = []
  if (addProds.length > 0){
    addProds = JSON.parse(addProds)
    for (var i in addProds){
      if (addProds[i].state == 0){
        addCateProds.push(addProds[i])
        addCateProds[i].src = addCateProds[i].images[0]
      }
    }
  }
  return addCateProds
}

module.exports = {
  allProds: getAllProducts,
  getCateProducts: getCateProducts,
  getOnSaleProducts: getOnSaleProducts,
  getOffSaleProducts: getOffSaleProducts
}
