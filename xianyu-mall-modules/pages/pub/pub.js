// pages/productReleased/productReleased.js
var app = getApp();
const common = require("../../common.js")
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    info: "",
    point: "",
    price: "",
    type: [{
      name: "实物",
      id: 0
    }, {
      name: "虚拟",
      id: 1
    }],
    state: [{
      name: "下架",
      id: 11
    }, {
      name: "上架",
      id: 1
    }],
    productID: 0,
    category: [
      {
        title: "书籍",
        categoryID: 0
      },
      {
        title: "文具",
        categoryID: 1
      },
      {
        title: "美妆",
        categoryID: 2
      },
      {
        title: "服装",
        icategoryID: 3
      },
      {
        title: "鞋包",
        categoryID: 4
      },
      {
        title: "饰品",
        categoryID: 5
      },
      {
        title: "智能设备",
        categoryID: 6
      },
      {
        title: "办公用品",
        categoryID: 7
      },
      {
        title: "百货海淘",
        categoryID: 8
      }
    ],
    categoryInd: -1, //类别
    typeInd: 0, //类型
    stateInd: 1, //状态
    banner: [], //轮播图片
    bannerNew: [],
    bannerAll: [],
    detail: [], //详情图片
    detailNew: [],
    detailAll: [],
    checkUp: true, //判断从编辑页面进来是否需要上传图片
    chooseViewShowDetail: true,
    chooseViewShowBanner: true,
    params: {
      productID: 0,
      contentFile: "",
      bannerFile: "",
      check: false,
    },
    dis: false,
    choose_images: [],
    title: "",
    price: "",
    newLevel: "",
    phone: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
        title: "",
        info: "",
        price: "",
        detail: [],
        categoryInd: -1,
        categoryTitle:'',
        bannerNew: [],
        bannerAll: [],
        newLevel: "",
        phone: ""
      })
  },

  /**
   * 获取标题
   */
  titleBlur(e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 获取商品价格
   */
  priceBlur(e) {
    this.setData({
      price: e.detail.value
    })
  },
  /**
   * 获取商品信息
   */
  infoBlur(e) {
    this.setData({
      info: e.detail.value
    })
  },
  /**
   * 获取商品卖点
   */
  pointBlur(e) {
    this.setData({
      point: e.detail.value
    })
  },
  /** 
   * 商品价格
   */
  price(e) {
    this.setData({
      price: e.detail.value
    })
  },
  /**
   * 商品类型
   */
  type(e) {
    this.setData({
      typeInd: e.detail.value
    })
  },
  /**
   * 商品状态
   */
  state(e) {
    if (e.detail.value == "0"){
      var stateInd = 11;
    }else{
      var stateInd = 1;
    }
    this.setData({
      stateInd: stateInd
    })
  },
  /**
   * 商品类别
   */
  categoryyyyy(e) {
    console.log("eeeeee",e)
    var that = this;
    var selectCate = parseInt(e.detail.value);
    that.setData({
      categoryInd: that.data.category[selectCate].categoryID,
      categoryTitle: that.data.category[selectCate].title,
    })
  },
 
  /**发布提交 */
  formSubmit(e) {
    let that = this
    var priceTF = /^\d+(\.\d{1,2})?$/
    console.log("form data", e)
    if (e.detail.value.title === "") {
      wx.showToast({
        title: '请输入商品名称',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.title.length > 60) {
      wx.showToast({
        title: '商品名称不得大于60字',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.title.length === "") {
      wx.showToast({
        title: '请输入商品价格',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (!priceTF.test(e.detail.value.price)) {
      wx.showToast({
        title: '商品价格精确到两位',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.info === "") {
      wx.showToast({
        title: '请输入商品信息',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.point === "") {
      wx.showToast({
        title: '请输入商品卖点',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.categoryInd === -1) {
      wx.showToast({
        title: '请选择商品类别',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.typeInd === -1) {
      wx.showToast({
        title: '请选择商品类型',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (that.data.stateInd === -1) {
      wx.showToast({
        title: '请选择商品状态',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    // } else if (that.data.banner.length === 0) {
    //   wx.showToast({
    //     title: '请选择轮播图片',
    //     icon: "none",
    //     duration: 1000,
    //     mask: true,
    //   })
    } else if (that.data.detail.length === 0) {
      wx.showToast({
        title: '请选择详情图片',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      var pubList = wx.getStorageSync('pub_list');
      var pub_cnt = pubList.length;
      let params = {
        item_id: pub_cnt + 99,
        name: e.detail.value.title,
        price: e.detail.value.price,
        images: that.data.detail,
        info: ["新旧：" + e.detail.value.newLevel, "价格：" + e.detail.value.price, "联系电话: " + e.detail.value.phone],
        categoryID: that.data.categoryInd,
        state: that.data.stateInd,
        newLevel: e.detail.value.newLevel,
        phone: e.detail.value.phone
      }
      console.log("new pub info", params)
      if (pub_cnt > 0){
        var pubListSerial = JSON.parse(pubList);
      }else{
        var pubListSerial = []
      }
      pubListSerial.push(params)
      wx.setStorageSync('pub_list', JSON.stringify(pubListSerial))
      wx.showToast({
        title: '发布成功！',
        icon: 'success'
      })

      setTimeout(function(){
        wx.switchTab({
          url: '../my/my',
        })
        that.onLoad();
      }, 1000)
    }
  },
 
  /**判断轮播新旧数组是否有相同值 */
  checkBanner() {
    let banner = this.data.banner
    let bannerNew = this.data.bannerNew
    let bannerAll = this.data.bannerAll
    for (var i = 0; i < banner.length; i++) {
      for (var j = 0; j < bannerNew.length; j++) {
        if (banner[i] === bannerNew[j]) {
          bannerAll = bannerAll.concat(bannerNew[j])
          this.setData({
            bannerAll: bannerAll
          })
        } else {
          console.log("banner无相同")
        }
      }
    }
  },
 
  /**判断详情新旧数组是否有相同值 */
  checkDetail() {
    let detail = this.data.detail
    let detailNew = this.data.detailNew
    let detailAll = this.data.detailAll
    for (var i = 0; i < detail.length; i++) {
      for (var j = 0; j < detailNew.length; j++) {
        if (detail[i] === detailNew[j]) {
          detailAll = detailAll.concat(detail[i])
          this.setData({
            detailAll: detailAll
          })
        } else {
          console.log("detail无相同")
        }
      }
    }
  },
  /** 选择图片detail */
  chooseDetail: function() {
    var that = this;
    if (that.data.detail.length < 3) {
      wx.chooseImage({
        count: 3,
        sizeType: [ 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(photo) {
          //detail中包含的可能还有编辑页面下回显的图片，detailNew中包含的只有所选择的图片
          let detail = that.data.detail;
          detail = detail.concat(photo.tempFilePaths);
          let detailNew = that.data.detailNew
          detailNew = detailNew.concat(photo.tempFilePaths)
          that.setData({
            detail: detail,
            detailNew: detailNew,
            checkUp: false
          })
          that.chooseViewShowDetail();
        }
      })
    } else {
      wx.showToast({
        title: '限制选择3个文件',
        icon: 'none',
        duration: 1000
      })
    }
  },
 
  /** 删除图片detail */
  deleteImvDetail: function(e) {
    var that = this;
    var detail = that.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    if (that.data.productID != 0) {
      wx.showModal({
        title: '提示',
        content: '删除不可恢复，请谨慎操作',
        success(res) {
          if (res.confirm) {
            detail.splice(itemIndex, 1);
            that.setData({
              detail: detail,
              checkUp: false
            })
            that.chooseViewShowDetail();
          }
        }
      })
    } else {
      detail.splice(itemIndex, 1);
      that.setData({
        detail: detail,
        checkUp: false
      })
      that.chooseViewShowDetail();
    }
  },
 
 
  /** 是否隐藏图片选择detail */
  chooseViewShowDetail: function() {
    if (this.data.detail.length >= 3) {
      this.setData({
        chooseViewShowDetail: false
      })
    } else {
      this.setData({
        chooseViewShowDetail: true
      })
    }
  },
 
  /** 查看大图Detail */
  showImageDetail: function(e) {
    var detail = this.data.detail;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: detail[itemIndex], // 当前显示图片的http链接
      urls: detail // 需要预览的图片http链接列表
    })
  },
 
 
  /** 选择图片Banner */
  chooseBanner: function() {
    var that = this;
    if (that.data.banner.length < 2) {
      wx.chooseImage({
        count: 2, //最多选择4张图片- that.data.imgArr.length,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(photo) {
          var banner = that.data.banner;
          banner = banner.concat(photo.tempFilePaths);
          var bannerNew = that.data.bannerNew;
          bannerNew = bannerNew.concat(photo.tempFilePaths);
          that.setData({
            banner: banner,
            bannerNew: bannerNew,
            checkUp: false
          })
          that.chooseViewShowBanner();
          if (that.data.productID != 0) {
            let params = {
              productID: that.data.productID,
              isBanner: false,
              index: -1,
            }
            app.deleteProductImage(params).then(res => {
              if (res.data.fileContent !== "" && res.data.fileBanner !== "") {
                that.data.params.contentFile = res.data.fileContent
                that.data.params.bannerFile = res.data.fileBanner
              }
            })
          }
        }
      })
 
    } else {
      wx.showToast({
        title: '限制选择2个文件',
        icon: 'none',
        duration: 1000
      })
    }
  },
 
  /** 删除图片Banner */
  deleteImvBanner: function(e) {
    var that = this
    var banner = that.data.banner;
    var itemIndex = e.currentTarget.dataset.id;
    if (that.data.productID != 0) {
      wx.showModal({
        title: '提示',
        content: '删除不可恢复，请谨慎操作',
        success(res) {
          if (res.confirm) {
            banner.splice(itemIndex, 1);
            that.setData({
              banner: banner,
              checkUp: false
            })
            that.chooseViewShowBanner();
            let params = {
              productID: that.data.productID,
              isBanner: true,
              index: itemIndex,
            }
            app.deleteProductImage(params).then(res => {
              if (res.data.fileContent !== "" && res.data.fileBanner !== "") {
                that.data.params.contentFile = res.data.fileContent
                that.data.params.bannerFile = res.data.fileBanner
              }
            })
          }
        }
      })
    } else {
      banner.splice(itemIndex, 1);
      that.setData({
        banner: banner,
        checkUp: false
      })
      that.chooseViewShowBanner();
    }
  },
 
 
  /** 是否隐藏图片选择Banner*/
  chooseViewShowBanner() {
    if (this.data.banner.length >= 2) {
      this.setData({
        chooseViewShowBanner: false
      })
    } else {
      this.setData({
        chooseViewShowBanner: true
      })
    }
  },
 
  /** 查看大图Banner */
  showImageBanner: function(e) {
    var banner = this.data.banner;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: banner[itemIndex], // 当前显示图片的http链接
      urls: banner // 需要预览的图片http链接列表
    })
  },
})