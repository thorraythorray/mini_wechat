var app = getApp()
const requestUrl = require('../../config')
Page({
    data: {
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
		curIndex: 0
    },
    onShow: function() {

        var that = this
        wx.request({
            url: requestUrl + 'WebServer/category/list/',
            method: 'POST',
            data: {},
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(res) {
                that.setData({
                    cates: res.data.data,
                })
            }
        }),

        wx.request({
            url: requestUrl + 'WebServer/category/products/',
            method: 'POST',
            data: {"id": 1},
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(res) {
                that.setData({
                    navLeftItems: res.data.data
                })
            }
        })
    },
   

    //事件处理函数
    switchRightTab: function(e) {
        let id = e.target.dataset.id,
			index = parseInt(e.target.dataset.index);
		this.setData({
			curNav: id,
			curIndex: index
        })

        var that = this
        wx.request({
            url: requestUrl + 'WebServer/category/products/',
            method: 'POST',
            data: {"id": id},
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(res) {
                that.setData({
                    navLeftItems: res.data.data
                })
            }
        })
        
    }

})