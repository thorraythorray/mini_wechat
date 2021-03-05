//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。
const app = getApp()
const bgMusic = wx.createInnerAudioContext()

Page({
  
  onShareAppMessage() {
    return {
      title: 'rich-text',
      path: 'page/component/pages/rich-text/rich-text'
    }
  },

  data:{

    teachTitle: "高中英语必修一",
    // 1.教学资源
    cell: [
    {
      title:'Unit 1: Friendship',
      subtitle:'Friends and friendship \n Interpersonal relationships',
      id: 0
  },
    
    {
      title:'Unit 2: English around the world',
      subtitle:'English language and its development \n Different kinds of English',
      id: 1
  },
    
    {
      title:'Unit 3: Travel journal',
      subtitle:'Travelling \n Describing a journey',
      id: 2
  },
  {
      title:'Unit 4: Earthquakes',
      subtitle:'Basic knowledge about earthquakes \n How to protect oneself and help others in disasters',
      id: 3
  },
    
    {
      title:'Unit 5: Nelson Mandela - a modern hero',
      subtitle:'The qualities of a great person \n The lives of some great people',
      id: 4
  }
    ],
    hidden: true
  },

  clsoeModal: function(){
    var that = this;
    bgMusic.stop();
    that.setData({
      hidden: true,
      isOpen: false
    })
  },

  listenaudio: function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    var url = e.currentTarget.dataset.url;
    var name = e.currentTarget.dataset.name;
    if (type == "audio"){
      bgMusic.src = app.globalData.resource_url + 'audio.mp3';
      bgMusic.autoplay = true
      that.setData({
        hidden: false,
        resource_type: type,
        resource_name: name,
        isOpen: true
      })
    }
  },

  listenerButtonPause: function(){
    var that = this;
    bgMusic.pause();
    that.setData({
      isOpen: false
    })
  },

  listenerButtonPlay: function(){
    var that = this;
    bgMusic.play();
    that.setData({
      isOpen: true
    })
  },

  watchvideo: function(e){
    var that = this;
    var type = e.currentTarget.dataset.type;
    var url = e.currentTarget.dataset.url;
    var name = e.currentTarget.dataset.name;
    if (type == "video"){
      that.setData({
        hidden: false,
        resource_type: type,
        video_url: app.globalData.resource_url + 'video.mp4',
        resource_name: name
      })
    }
  },
  
  watchppt: function(e) {
    var id = parseInt(e.currentTarget.dataset.id)
    var url = e.currentTarget.dataset.url;
    // console.log("that.globalData.request_url", app.globalData.request_url)
    wx.showToast({
      title: 'load',
      title: '正在打开中...',
      duration: 2000
    })
    wx.downloadFile({
      // 网络请求后，取上面的url。下面为实例
      url: app.globalData.resource_url + 'resource.ppt',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }

})