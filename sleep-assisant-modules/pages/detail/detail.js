// pages/TrainingContent/TrainingContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:"https://blz-videos.nosdn.127.net/1/OverWatch/AnimatedShots/Overwatch_AnimatedShot_Soldier76_Hero.mp4",
    state:true,
    currentTime:"00:00",
    duration:"00:00",
    jd:0,
    questions:[
      {
        id: 0,
        title: '如何改善睡眠质量?',
        content: '想要改善睡眠质量，通过药物改善的话，并不是一种好的方法，毕竟是药三分毒，是会对身体造成伤害的，损伤到肝肾功能的健康，使用药物是最坏的结果.'
      },
      {
        id: 1,
        title: '解决失眠的最佳方法',
        content: '失眠最好的治疗是先排除其他器质性疾病，运用心理、行为和物理疗法进行治疗，并使用抗焦虑、抗抑郁药物改善焦虑、抑郁状态，从而缓解身体症状。其他治疗方法包括体育锻炼、旅游疗养、中医治疗，改善工作和生活方式也能改善紧张情绪，达到治疗神经衰弱的目的。'
      },
      {
        id: 2,
        title: '长期失眠怎么治最好?',
        content: '第一失眠是心病必须从心理改变、你需要用心态改变睡眠而不是睡眠改变心态。我现在告诉你一个道理、你过去睡眠好的时候、会很开心吗、肯定不会、因为你觉得很正常。那么你现在失眠了、每天就想睡眠，这样你每天都活在失眠的恐惧中、白天想着昨晚睡不好、晚上就害怕看到床、害怕今晚依旧睡不好，其实这些都是你内心的想法。'
      },
      {
        id: 3,
        title: '1分钟立马睡着的方法',
        content: '有睡眠障碍的人，在晚上睡觉前一定要注意避免喝咖啡、浓茶等，这些容易导致神经兴奋的饮料，以免让自己入睡更加困难。'
      },
      {
        id: 4,
        title: '治睡眠不好小偏方',
        content: '可以在晚饭后进行适当的下楼活动，有助眠的效果。在睡前进行泡澡，使全身放松，适于入睡。给自己创造一个较好的睡眠环境，换一个遮光性较好的窗帘，睡前听一段轻音乐，有助于入眠.'
      }
    ],
    title: "晨间呼吸觉知练习"
  },
  back(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    for (var i in that.data.questions){
      if (that.data.questions[i].id == parseInt(options.id)){
        that.setData({
          title: that.data.questions[i].title
        })
        break
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  play(){
    console.log(this.videoContext)
    if(this.data.state){
      this.videoContext.play();
    }else{
      this.videoContext.pause();
    }
    this.setData({
      state:!this.data.state
    })
  },
  bc(e){
    var fz = Math.floor(e.detail.duration/60)>=10?Math.floor(e.detail.duration/60):("0"+Math.floor(e.detail.duration/60));
    var mm = Math.floor(e.detail.duration%60)>=10?Math.floor(e.detail.duration%60):("0"+Math.floor(e.detail.duration%60));
    var jd = Math.floor(e.detail.currentTime);
    if(jd<10){
      jd = "00:0"+jd;
    }else if(jd>59){
      var hh = Math.floor(jd/60);
      if(hh<10){
        hh = "0"+hh;
      }
      var ms = (Math.floor(jd%60))>=10?(Math.floor(jd%60)):"0"+(Math.floor(jd%60))
      jd = hh+":"+ms;
    }else{
      jd = "00:"+jd
    }
    this.data.currentTime = jd;
    this.data.duration = fz+":"+mm;
    console.log(e.detail.currentTime/e.detail.duration*100)
    this.setData({
      currentTime:this.data.currentTime,
      duration:this.data.duration,
      jd:e.detail.currentTime/e.detail.duration*100+"%"
    })
  },
  end(){
    this.setData({
      state:true
    })
  },
  touch(e){
    console.log(e);
    var touch = e.touches[0];
    var pageY = touch.pageY;
    console.log(pageY);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})