var utilHandle = new require('../../utils/util.js')

Page({
  data: {
    items: [
      // {
      //   key: 0,
      //   title: '考试总结',
      //   date: '2020-1-22 12:32:54'
      // },
      // {
      //   key: 1,
      //   title: '英语练习笔记',
      //   date: '2020-1-22 15:35:12'
      // },
      // {
      //   key: 2,
      //   title: '在线笔记',
      //   date: '2020-1-22 19:48:42'
      // }
    ],
  },

  onLoad: function (options) {
    var that = this;
    var storage_note_list = utilHandle.getNoteStorage()
    console.log("storage list:", storage_note_list)
    that.setData({
      items: storage_note_list
    })
  },

  /**
   * 首次渲染事件
   */
  onShow: function () {
    // 获取数据
  },

  /**
   * 新增笔记事件
   */
  onNewItem: function (event) {
    wx.navigateTo({
      url: "../noteinfo/index?type=create"
    })
  },

  /**
   * 编辑笔记事件
   */
  onEditItem: function (event) {
    wx.navigateTo({
      url: '../noteinfo/index?type=edit&key=' + event.currentTarget.dataset.key
    })
  },
})
