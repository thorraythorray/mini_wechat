const app = getApp()
const bgMusic = wx.createInnerAudioContext()

// pages/index/index.js
function addZero(str) {
  if (String(str).length == 1) {
    return "0" + String(str);
  } else {
    return String(str);
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: wx.getSystemInfoSync().windowWidth,
    sleep_sounds: [
      {
        name: '极静琴声',
        audio: app.globalData.resource_url + '1.mp3',
        pic: '../../images/more/audio1.png',
        id: 0,
        duration: 180
      },
      {
        name: '2放松大脑放松大脑放松大脑放松大脑放松大脑',
        audio: app.globalData.resource_url + '2.mp3',
        pic: '../../images/more/audio2.png',
        id: 1,
        duration: 180
      },
      {
        name: '3催眠钢琴曲催眠钢琴曲催眠钢琴曲催眠钢琴曲催眠钢琴曲',
        audio: app.globalData.resource_url + '3.mp3',
        pic: '../../images/more/audio2.png',
        id: 2,
        duration: 180
      },
      {
        name: '4极静琴声极静琴声极静琴声极静琴声极静琴声极静琴声',
        audio: app.globalData.resource_url + '4.mp3',
        pic: '../../images/more/audio1.png',
        id: 3,
        duration: 180
      },
      {
        name: '5放松大脑',
        audio: app.globalData.resource_url + '5.mp3',
        pic: '../../images/more/audio2.png',
        id: 4,
        duration: 180
      }
    ],
    
    mood_choice: [
      {
        name: '心情舒适',
        value: 'comfort',
        class: 'mod-scroll'
      },
      {
        name: '疲倦',
        value: 'tired',
        class: 'mod-scroll'
      },
      {
        name: '压力大',
        value: 'press',
        class: 'mod-scroll'
      },
      {
        name: '无聊',
        value: 'boring',
        class: 'mod-scroll'
      },
      {
        name: '其他',
        value: 'others',
        class: 'mod-scroll'
      }
    ],

    alarm_duration: [
      '5min',
      '10min',
      '15min',
      '20min',
      '30min',
      '60min',
    ],

    feedback_list: [
      {
        icon: "/images/more/bq1.png",
        id: 0,
        name: '早醒',
      },
      {
        icon: "/images/more/bq2.png",
        id: 1,
        name: '疲惫',
      },
      {
        icon: "/images/more/bq3.png",
        id: 2,
        name: '多梦',
      },
      {
        icon: "/images/more/bq4.png",
        id: 3,
        name: '很好',
      }
    ],

    chooseMod: null,
    audioSelect: null,
    sleepAna: false,

    year: addZero(new Date().getFullYear()),
    month: addZero(new Date().getMonth()),
    date: addZero(new Date().getDate()),
    hours: addZero(new Date().getHours()),
    minutes: addZero(new Date().getMinutes()),
    isStart: false,
    status: ""
  },

  InsertOrUpdateSleepSettings(change_info) {
    var sleepSetting = wx.getStorageSync('sleep_setting_info')
    if (sleepSetting){
      var _sleepSetting = JSON.parse(sleepSetting)
      for (var key in change_info){
        _sleepSetting[key] = change_info[key]
      }
      change_info = _sleepSetting
    }
    console.log("Insert or Update Sleeping Setting", change_info)
    wx.setStorageSync('sleep_setting_info', JSON.stringify(change_info))
  },

  InsertOrUpdateSleepData(sleep_result) {
    var that = this;
    // {"2021-02-02":[{id: 0, duration: 123 },{},{}]}
    var new_data = {
      sleepAllTime: that.data.sleepAllTime,
      sleepFeedback: sleep_result,
    }
    var data_key = String(that.data.year) + String(that.data.month) + String(that.data.date);
    data_key = String(parseInt(data_key) + 100)
    var all_data_string = wx.getStorageSync('sleep_data')
    if (all_data_string){
      var all_data = JSON.parse(all_data_string)
      var today_data_list = all_data[data_key]
      if (today_data_list){
        today_data_list.push(new_data)
      }
      all_data[data_key] = [new_data]
    }else{
      var all_data = {}
      var li = []
      li.push(new_data)
      all_data[data_key] = li
    }
    console.log("All Sleep Data refresh", all_data)
    wx.setStorageSync('sleep_data', JSON.stringify(all_data))
  },

  audioSelect: function(options){
    var that = this;
    var id = options.currentTarget.dataset.id;
    console.log("selecet audio music ", id)
    that.setData({
      audioSelect: parseInt(id)
    })
    if (that.data.isStart){
      that.playMusic()
      var update_param = {
        audioSelect: parseInt(id)
      }
      that.InsertOrUpdateSleepSettings(update_param)
    }
  },

  bindPickerChange(e) {
    var that = this;
    console.log("set time is e", e.detail.value)
    var music_dur = 99999 * 60 * 1000;
    if (e.detail.value){
      var t = that.data.alarm_duration[e.detail.value]
      music_dur = parseInt(t.split("min")[0]) * 1000 * 60
    }
    that.setData({
      music_web_sleep_duration: t,
      music_sleep_duration: music_dur
    })
    if (that.data.isStart){
      that.playMusic()
      var update_param = {
        music_web_sleep_duration: t || null,
        music_sleep_duration: music_dur
      }
      that.InsertOrUpdateSleepSettings(update_param)
    }
  },

  choose_mood: function(options){
    var that = this;
    console.log("choose mood is", options)
    var _value = options.currentTarget.dataset.value;
    var mood_choice_list = that.data.mood_choice
    for (var i in mood_choice_list){
      if (mood_choice_list[i].value == _value){
        mood_choice_list[i].class = "choose_mood"
      }else{
        mood_choice_list[i].class = "mod-scroll"
      }
    }
    that.setData({
      mood_choice: mood_choice_list,
      chooseMod: _value
    })
    if (that.data.isStart){
      that.playMusic()
      var update_param = {
        mood_choice: mood_choice_list,
        chooseMod: _value
      }
      that.InsertOrUpdateSleepSettings(update_param)
    }
  },

  playMusic() {
    var that = this;
    bgMusic.stop()
    console.log("start music play...")
    var music_id = that.data.audioSelect;
    var play_dur = that.data.music_sleep_duration || 99999 * 1000 * 60;
    console.log("music_id", music_id)
    if (music_id >= 0) {
      var music = that.data.sleep_sounds;
      var music_src = null;
      for (var i in music){
        if (music[i].id == parseInt(music_id)){
          music_src = music[i].audio
        }
      }
      console.log("1111music_src", music_src)
      bgMusic.src = music_src;
      bgMusic.play()
      setTimeout(function(){
        console.log("music_src", music_src)
        bgMusic.src = music_src;
        bgMusic.play()
        bgMusic.onEnded(() => {
          bgMusic.src = music_src;
          bgMusic.play()
        })
      }, play_dur)
    }
  },

  startTiming() {
    var that = this;
    if (that.data.chooseMod == null){
      wx.showToast({
        title: '请选择睡前状态',
        icon: 'none',
        duration: 2000
      })
    }else{
      that.playMusic()
      var timestamp = Date.parse(new Date());  
      var music_end_tm = timestamp + that.data.music_sleep_duration 
      that.setData({
        isStart: true,
        sleep_start_tm: timestamp,
        music_end_tm: music_end_tm
      })
      var sleep_info = {
        isStart: true,
        audioSelect: that.data.audioSelect,
        chooseMod: that.data.chooseMod,
        mood_choice: that.data.mood_choice,
        sleep_start_tm: timestamp,
        music_end_tm: music_end_tm
      }
      that.InsertOrUpdateSleepSettings(sleep_info)
    }
  },

  endTiming() {
    var that = this;
    var timestamp = Date.parse(new Date());
    var sleep_start_tm = that.data.sleep_start_tm;
    var min_limit_sleep_tm = 10;
    bgMusic.stop()
    if (timestamp - sleep_start_tm < 1000 * 60 * min_limit_sleep_tm){
      wx.showModal({
        // title: '提示',
        content: '睡眠少于10分钟不生成睡眠日志',
        showCancel: false,
      })
      that.setData({
        sleepAna: false,
        isStart: false,
        audioSelect: null,
        music_web_sleep_duration: null,
        music_sleep_duration: null,
        mood_choice: recover_mod,
        // sleepAllTime: (timestamp - sleep_start_tm) / 1000
      })
      wx.removeStorageSync("sleep_setting_info")
      return
    }
    // 结束，曲消反馈了才能散

    var recover_mod = that.data.mood_choice
    for (var i in recover_mod){
      recover_mod[i].class = "mod-scroll"
    }
    var _sleepAna = false;
    wx.showModal({
      // title: '提示',
      content: '需要生成睡眠报告吗？',
      success (res) {
        if (res.confirm) {
          that.setData({
            sleepAna: true,
            isStart: false,
            audioSelect: null,
            music_web_sleep_duration: null,
            music_sleep_duration: null,
            mood_choice: recover_mod,
            sleepAllTime: (timestamp - sleep_start_tm) / 1000
          })
        } else if (res.cancel) {
          that.setData({
            sleepAna: false,
            isStart: false,
            audioSelect: null,
            music_web_sleep_duration: null,
            music_sleep_duration: null,
            mood_choice: recover_mod,
            // sleepAllTime: (timestamp - sleep_start_tm) / 1000
          })
          wx.removeStorageSync("sleep_setting_info")
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  sleepEndFeedback: function(options){
    var that = this;
    var feed_id = options.currentTarget.dataset.id;
    var feed_content = ""
    for (var i in that.data.feedback_list){
      if (that.data.feedback_list[i].id == parseInt(feed_id)){
        feed_content = that.data.feedback_list[i].name
      }
    }
    console.log("asssssssssssssss", feed_content)
    // save sleep data
    that.InsertOrUpdateSleepData(feed_content)
    // clear mem
    wx.removeStorageSync("sleep_setting_info")
    that.setData({
      sleepAna: false
    })
    wx.showModal({
      content: '根据你的睡眠状况，建议您按时作息，养成良好的生活习惯！',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../data/data',
          })
        }
      }
    })
  },

  onLoad: function(options) {
    // var that = this;
    var sleep_info = wx.getStorageSync("sleep_setting_info")
    if(sleep_info){
      var _sleep_info = JSON.parse(sleep_info)
      console.log("sleep init ", _sleep_info)
      this.setData({
        isStart: _sleep_info.isStart || false,
        chooseMod: _sleep_info.chooseMod,
        audioSelect: _sleep_info.audioSelect,
        sleep_start_tm: _sleep_info.sleep_start_tm,
        music_end_tm: _sleep_info.music_end_tm,
        mood_choice: _sleep_info.mood_choice
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})