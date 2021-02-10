var app = getApp()
const requestUrl = require('../../config')
Page( {
  data: {
    cartImg: '../../images/cart-null.png',
    tipWords: '购物车空空如也',
  },

  onShow: function() {
    console.log('onLoad')
    var that = this

    wx.getSetting({
      success(ress) {
        console.log("sssssssssssss", ress)
        if (ress.authSetting['scope.userInfo']) {
          app.getUserInfo(function(userInfo) {
            //更新数据
            wx.request({
              url: requestUrl + 'WebServer/cart/detail',
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
                var emptycart = 1
                if (res.data.data.length > 0){
                  emptycart = 0
                }
                that.setData({
                  cartList: res.data.data,
                  userId: userInfo.nickName,
                  emptycart: emptycart
                })
              }
            })
          })
        }else{
          that.setData({
            emptycart: 1
          })
        }
      }
    })
  },
 
  /**
   * 计算商品总价格事件
   */
  calculateTotalPrice() {
    let cartList = this.data.cartList;
    let totalPrice = 0;
    cartList.forEach(function (item) {
      console.log("item.hasSelected", item.hasSelected);
      if (item.hasSelected == true) {
        totalPrice += item.product.price * item.productCount;
      }
      console.log("totalPrice", totalPrice);
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
      if (!item.hasSelected) {
        hasAllSelected = false;
        return;
      }
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
    const goodsid = parseInt(e.currentTarget.dataset.goodsid);
 
    cartList.forEach(function (item) {
      if (item.product.id === goodsid) {
        const hasSelected = item.hasSelected;
        item.hasSelected = !hasSelected;
        return;
      }
    });

    this.setData({
      cartList: cartList,
    })

    console.log("=================", this.data.cartList)
    this.calculateTotalPrice();
    this.verifyHasAllSelected();
  },
 
  /**
   * 商品数量减1事件
   */
  minus(e) {
    console.log(e);
    let cartList = this.data.cartList;
    const goodsid = parseInt(e.currentTarget.dataset.goodsid);
    let hasSelected;
    cartList.forEach(function (item) {
      if (item.product.id === goodsid) {
        if (item.productCount < 2) {
          wx.showToast({
            icon: 'success',
            title: '商品数量少于1',
          })
          return;
        }
        item.productCount -= 1;
        hasSelected = item.hasSelected;
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
    const goodsid = parseInt(e.currentTarget.dataset.goodsid);
    let hasSelected;
    cartList.forEach(function (item) {
      if (item.product.id === goodsid) {
        item.productCount += 1;
        hasSelected = item.hasSelected;
        return;
      }
    });
    console.log("-----------------", cartList)
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
  // showUpdateQuantity(e) {
  //   console.log(e);
  //   const goodsid = parseInt(e.currentTarget.dataset.goodsid);
 
  //   this.showOrHideUpdateQuantity(goodsid, true);
  // },
 
  /**
   * 隐藏修改单个商品数量事件 
   */
  hideUpdateQuantity(e) {
    console.log(e);
    const goodsid = parseInt(e.currentTarget.dataset.goodsid);
    const ids = parseInt(e.currentTarget.dataset.ids);
 
    this.showOrHideUpdateQuantity(goodsid, ids, true);
  },
 
  /**
   * 显示改商品数量对话框事件
   */
  showUpdateQuantityDialog() {
 
  },
 
  /**
   * 显示或者隐藏修改商品数量布局事件
   */
  showOrHideUpdateQuantity(goodsid, ids, quantityUpdatable) {
    var that = this; 
    let cartList = that.data.cartList;
    cartList.forEach(function (item) {
      if (item.product.id === goodsid) {
        item.quantityUpdatable = quantityUpdatable;
        cartList.splice(ids, 1)

        app.getUserInfo(function(userInfo) {
          //更新数据
          console.log("userInfo", userInfo)

          wx.request({
            url: requestUrl + 'WebServer/cart/remove',
            method: 'POST',
            data: {
                "userId":userInfo.nickName,
                "productId": goodsid
            },
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "Keep-Alive"
            },
            success: function(res) {
              wx.showToast({
                icon: 'success',
                title: '删除成功！',
              })
            }
          })
        })
      }
    });
    that.setData({
      cartList: cartList,
    })
  },

  // 付款
  goToOrderSubmit: function() {
    var that = this;
    console.log("that.totalPrice", that.data.totalPrice)
    if (!that.data.totalPrice){
      wx.showToast({
        icon: 'loading',
        title: '请先选择商品',
      })
    }else{
      wx.request({
        url: requestUrl + 'WebServer/order/create',
        method: 'POST',
        data: {
            "userId": that.data.userId
        },
        header: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            "Cache-Control": "no-cache",
            "Connection": "Keep-Alive"
        },
        success: function(res) {
          wx.showToast({
            icon: 'success',
            title: '购买成功，已发货！',
          })
          that.clearCart(123)
        }
      })
    }
  },

  clearCart(xxx) {
    var that = this;
    wx.request({
      url: requestUrl + 'WebServer/cart/clear',
      method: 'POST',
      data: {
          "userId": xxx
      },
      header: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "Cache-Control": "no-cache",
          "Connection": "Keep-Alive"
      },
      success: function(res) {
        console.log("ssssssssssssssssssss", that.data.emptycart)
        that.setData({
          cartList: [],
          emptycart: 1
        })
      }
    })
  }
})
