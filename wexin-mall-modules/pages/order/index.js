var app = getApp()
const requestUrl = require('../../config')
Page( {
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
  },

 
  /**
   * 计算商品总价格事件
   */
  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let totalPrice = 0;
    cartList.forEach(function (item) {
      item.goodsList.forEach(function (goods) {
        // console.log(goods);
        if (goods.hasSelected) {
          totalPrice += goods.price * goods.quantity;
        }
        // console.log(totalPrice);
      })
    })
 
    this.setData({
      totalPrice: totalPrice
    })
  },
 
  /**
   * 验证是否全选事件
   */
  verifyHasAllSelected() {
    let hasAllSelected = true;
    let cartList = this.data.cartList;
    cartList.forEach(function (item) {
      if (!item.merchantInfo.hasSelected) {
        hasAllSelected = false;
        return;
      }
      item.goodsList.forEach(function (goods) {
        if (!goods.hasSelected) {
          hasAllSelected = false;
          return;
        }
      })
    })
    console.log(hasAllSelected);
    this.setData({
      hasAllSelected: hasAllSelected,
    })
  },
 
  /**
   * 单个商品选择事件
   */
  selectGoodsSingle(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            const hasSelected = goods.hasSelected;
            goods.hasSelected = !hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 商品数量减1事件
   */
  minus(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const merchantId = e.currentTarget.dataset.merchantId;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      if (item.merchantInfo.merchantId === merchantId) {
        item.goodsList.forEach(function (goods) {
          if (goods.id === goodsId) {
            if (goods.quantity <= 1) {
              wx.showToast({
                title: '商品数量少于1',
              })
            } else {
              goods.quantity -= 1;
            }
            hasSelected = goods.hasSelected;
            return;
          }
        })
        return;
      }
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
  },
 
  /**
   * 商品数量加1事件
   */
  pluse(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const goodsId = e.currentTarget.dataset.goodsId;
    let hasSelected;
 
    cartList.forEach(function (item) {
      item.goodsList.forEach(function (goods) {
        if (goods.id === goodsId) {
          if (goods.quantity >= 10) {
            wx.showToast({
              title: '数量超过10',
            })
          } else {
            goods.quantity += 1;
          }
          hasSelected = goods.hasSelected;
          return;
        }
      })
    });
    this.setData({
      cartList: cartList,
    })
    if (hasSelected) {
      this.calculateTotalPrice();
    }
 
  },
 
  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let hasAllSelected = this.data.hasAllSelected;
    hasAllSelected = !hasAllSelected;
    let cartList = this.data.cartList;
    for (let i = 0; i < cartList.length; i++) {
      let item = cartList[i];
      item.hasSelected = hasAllSelected;
      item.merchantInfo.hasSelected = hasAllSelected;
      let goodsList = item.goodsList;
      for (let i = 0; i < goodsList.length; i++) {
        let goodsItem = goodsList[i];
        goodsItem.hasSelected = hasAllSelected;
      }
    }
 
    this.setData({
      hasAllSelected: hasAllSelected,
      cartList: cartList
    });
    this.calculateTotalPrice();
  },
 
  /**
   * 显示修改单个商品数量布局事件
   */
  showUpdateQuantity(e) {
    console.log(e);
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(goodsId, true);
  },
 
  /**
   * 隐藏修改单个商品数量事件 
   */
  hideUpdateQuantity(e) {
    console.log(e);
    const goodsId = e.currentTarget.dataset.goodsId;
 
    this.showOrHideUpdateQuantity(goodsId, false);
  },
 
  /**
   * 显示改商品数量对话框事件
   */
  showUpdateQuantityDialog() {
 
  },
 
  /**
   * 显示或者隐藏修改商品数量布局事件
   */
  showOrHideUpdateQuantity(goodsId, quantityUpdatable) {
    let cartList = this.data.cartList;
    cartList.forEach(function (item) {
      item.goodsList.forEach(function (goods) {
        if (goods.id === goodsId) {
          goods.quantityUpdatable = quantityUpdatable;
          return;
        }
      })
    });
    this.setData({
      cartList: cartList,
    })
  },


  onLoad: function() {
    console.log('onLoad')
    var that = this
        //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
        //更新数据
        console.log("userInfo", userInfo)
        //sliderList
          wx.request({
            url: requestUrl + 'WebServer/order/list',
            method: 'POST',
            data: {
                "userId": userInfo.nickName
            },
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "Keep-Alive"
            },
            success: function(res) {
              let ordersimple = res.data.data
              that.setData({
                cartList: ordersimple,
                userInfo: userInfo
              })
            }
        })
    })    
  }
})
