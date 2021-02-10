var utilHandle = new require('../../utils/util.js')
Page({
  data: {
    items: [],
  },

  onLoad: function (options) {
    var that = this;
    console.log("note edit options", options.type)
    var note_key = parseInt(options.key);
    var note_list = utilHandle.getNoteStorage()
    var edit_note = {}
    for (var i in note_list){
      if (note_list[i].id == note_key){
        edit_note = note_list[i]
        break
      }
    }
    that.setData({
      act_type: options.type,
      note: edit_note
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
      url: "../create/index"
    })
  },

  /**
   * 编辑笔记事件
   */
  onEditItem: function (event) {
    wx.navigateTo({
      url: '../noteinfo/index?key=' + event.currentTarget.dataset.key
    })
  },

  onSubmit: function(e) {
    // var storage_notes = 
    var myDate = new Date()
    var date = utilHandle.formatTime(myDate)
    var storage_notes = utilHandle.getNoteStorage()
    console.log("create storage_notes", storage_notes)
    var new_note = {
      id: storage_notes.length,
      date: date,
      title: e.detail.value.title,
      content: e.detail.value.content, 
    }
    storage_notes.push(new_note)
    wx.setStorage({
      key: "note_list",
      data: JSON.stringify(storage_notes)
    })
    wx.showToast({
      title: '创建成功！',
      type: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '../notes/index',
      })
    }, 1000)
  },

  onEditSubmit: function(e){
    var note_key = parseInt(e.detail.value.key)
    var storage_notes = utilHandle.getNoteStorage()
    for (var i in storage_notes){
      if (storage_notes[i].id == note_key){
        storage_notes[i].title =  e.detail.value.title
        storage_notes[i].content =  e.detail.value.content
        break
      }
    }
    wx.setStorage({
      key: "note_list",
      data: JSON.stringify(storage_notes)
    })
    wx.showToast({
      title: '修改成功！',
      type: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '../notes/index',
      })
    }, 1000)
  },

  onDelete: function(e){
    console.log("del note_key", e)
    var note_key = parseInt(e.currentTarget.dataset.key)
    
    var storage_notes = utilHandle.getNoteStorage()
    for (var i in storage_notes){
      if (storage_notes[i].id == note_key){
        storage_notes.splice(i, 1)
      }
    }
    wx.setStorage({
      key: "note_list",
      data: JSON.stringify(storage_notes)
    })
    wx.showToast({
      title: '删除成功！',
      type: 'success',
      duration: 1000
    })
    setTimeout(function(){
      wx.switchTab({
        url: '../me/index',
      })
    }, 1000)
  }
})
