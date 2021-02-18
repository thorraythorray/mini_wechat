const app = getApp();
var common = require("../../common.js")
//js用到的全局变量
Page({
  data: {
    isShow: true,
    searchRecord: [],
    is_show: false,
    showHistory: false,
    leftMin: 0,
    leftMax: 6,
    rightMin: 0,
    rightMax: 6,
    leftValue: 0,
    rightValue: 6

  },
  
  inputText: function (e) {
    var that = this;
    var searchWord = e.detail.value;
    var showHistory = true;
    var is_show = false;
    var searchDetail = []

    if (searchWord){
      showHistory = false;
      is_show = true;
      console.log("searchWord", searchWord)
      var allProds = common.allProds();
      for (var i in allProds){
        if(allProds[i].name.indexOf(searchWord) > -1){
          searchDetail.push(allProds[i])
        }
      }
    }
    that.setData({
      searchWord: searchWord,
      detail: searchDetail,
      is_show: is_show,
      showHistory: showHistory
    });
  },

  onLoad: function() {
    var that = this;
    var searchHis = wx.getStorageSync('search_history') || []
    var searHis = []
    if (searchHis.length > 0){
      searHis = JSON.parse(searchHis)
    }
    that.setData({
      historyList: searHis
    })
  },
  
  historyClick: function(e) {
    var that = this;
    var searchWord = e.currentTarget.dataset.searchdetail;
    console.log("searchWord", searchWord)
    var allProds = common.allProds();
    var searchDetail = []
    for (var i in allProds){
      if(allProds[i].name.indexOf(searchWord) > -1){
        searchDetail.push(allProds[i])
      }
    }
    that.setData({
      searchWord: searchWord,
      detail: searchDetail,
      is_show: true,
      showHistory: false
    });
  },

  bindNameDeatail: function(e) {
    var that = this;
    var searHis = []
    var searchHis = wx.getStorageSync('search_history') || []
    if (searchHis.length > 0){
      searHis = JSON.parse(searchHis)
    }
    searHis.push(that.data.searchWord)
    wx.setStorageSync('search_history', JSON.stringify(searHis))
    that.setData({
      historyList: searHis,
      is_show: true,
      showHistory: false
    })
    var item_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../item/item?itemId=' + item_id
    })
  },

  // 隐藏搜索历史框
  hideHistory:function(){
    this.setData({
      showHistory: !this.data.showHistory
    });
  },

  // 显示搜索历史框
  showHistory:function(){
    this.setData({
      showHistory: !this.data.showHistory,
      // searchRecord: wx.getStorageSync('searchRecord') || []
    })
  },

  clearHistory:function(){
    var that = this;
    wx.removeStorageSync("search_history")
    that.setData({
      historyList: []
    })
  },

  leftSchange: function (e) {
    var that = this
    that.setData({
      isQuery: false
    })
    var value = e.detail.value
    if(value==that.data.rightValue){
      if(that.data.rightValue==6) value--
      else value++
    }
    that.setData({
      leftValue: value
    })
    if(value<that.data.rightValue){
      var bg_price = that.data.priceList[value].slice(1)
      var end_price = that.data.priceList[that.data.rightValue].slice(1)
    }
    else{
      var end_price = that.data.priceList[value].slice(1)
      var bg_price = that.data.priceList[that.data.rightValue].slice(1)
    }
    list['bg_price'] = bg_price
    list['end_price'] = end_price
    wx.setStorageSync("priceList", { bg_price: value, end_price: that.data.leftValue})
    setTimeout(function () {
      wxb.Post('/api/minsu.index/index', list, function (data) {
        console.log(list,"价格slider")
        console.log(data)
        that.setData({
          isQuery: true
        })
        if (data.length != 0) {
          that.setData({
            result: data.num + '套',
          })
        }
        else {
          that.setData({
            result: '0套',
          })
        }
      })
    }, 700)
  },
//右边
rightSchange: function (e) {
    var that = this
    that.setData({
      isQuery: false
    })
    var value = e.detail.value
    if (value == that.data.leftValue) {
      if(that.data.leftValue==6) value--
      else value++
    }
    that.setData({
      rightValue: value
    })
    if (value < that.data.leftValue) {
      var bg_price = that.data.priceList[value].slice(1)
      var end_price = that.data.priceList[that.data.leftValue].slice(1)
    }
    else {
      var end_price = that.data.priceList[value].slice(1)
      var bg_price = that.data.priceList[that.data.leftValue].slice(1)
    }
    list['bg_price'] = bg_price
    list['end_price'] = end_price
    wx.setStorageSync("priceList", { bg_price: value, end_price: that.data.leftValue })
    setTimeout(function () {
      wxb.Post('/api/minsu.index/index', list, function (data) {
        console.log(list, "价格slider")
        console.log(data)
        that.setData({
          isQuery: true
        })
        if (data.length != 0) {
          that.setData({
            result: data.num + '套',
          })
        }
        else {
          that.setData({
            result: '0套',
          })
        }
      })
    }, 700)
  },


})
