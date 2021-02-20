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

  var baseProds = [];
  for (var i in app.globalData.cateInfo){
    if (app.globalData.cateInfo[i].id == parseInt(cate_id))
    baseProds = baseProds.concat(app.globalData.cateInfo[i].items)
  }
  var allCateProds = addCateProds.concat(baseProds)
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
        addProds[i].src = addProds[i].images[0]
        addCateProds.push(addProds[i])
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
        addProds[i].src = addProds[i].images[0]
        addCateProds.push(addProds[i])
      }
    }
  }
  return addCateProds
}

function delProd(itemId){
  console.log("del prod", itemId)
  var allProds = wx.getStorageSync('pub_list') || []
  allProds = JSON.parse(allProds)
  for (var i in allProds){
    if (allProds[i].item_id == itemId){
      allProds.splice(i, 1)
      break
    }
  }
  wx.setStorageSync('pub_list', JSON.stringify(allProds))

  var collectProds = wx.getStorageSync('collect_list') || []
  if (collectProds.length > 0){
    collectProds = JSON.parse(collectProds)
    for (var i in collectProds){
      if (collectProds[i].item_id == itemId){
        collectProds.splice(i, 1)
        break
      }
    }
    wx.setStorageSync('collect_list', JSON.stringify(collectProds))
  }
}

module.exports = {
  allProds: getAllProducts,
  getCateProducts: getCateProducts,
  getOnSaleProducts: getOnSaleProducts,
  getOffSaleProducts: getOffSaleProducts,
  delProd: delProd
}
