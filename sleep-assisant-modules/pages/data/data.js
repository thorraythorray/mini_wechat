import * as echarts from '../../ec-canvas/echarts';
let chart;
// pages/data/data.js
function addZero(str) {
  if (String(str).length == 1) {
    return "0" + String(str);
  } else {
    return String(str);
  }
}

function flushChart(data) {
  var option = {
    backgroundColor: '#0c1041',
    // title: {
    //   text: '当天睡眠时间曲线图',
    //   left: 'center',
    //   color: '#62c4d9',
    //   backgroundColor: '#fff'
    // },
    color: ["#62c4d9"],
    legend: {
      data: ['睡眠时间'],
      top: 20,
      left: 'right',
      backgroundColor: '#0c1041',
      textStyle:{
        color:'#fff',
      }
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine:{
        lineStyle:{
          color: '#fff',
          width:1,//这里是为了突出显示加上的
        }
    }
    },
    yAxis: {
      name: "时长" ,
      x: 'center',
      type: 'value',
      axisLine:{
        lineStyle:{
          color: '#fff',
          width:1,//这里是为了突出显示加上的
        }
      // splitLine: {
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      }
      // show: false
    },
    series: [{
      name: '睡眠时间',
      type: 'line',
      smooth: true,
      data: data,
      color: '#62c4d9'
    }]
  };
  chart.setOption(option, true);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: false,
    nowDate: [{ //日历的初始化数据
      month: 'current',
      day: new Date().getDate(),
      color: '#ffd700',
      background: 'white'
    }],
    total1: 0,
    total2: 0,
    total3: 0,
    temArr: [],
    humArr: [],
    clickDate: "",
    status: "",

    isShow: false,
    
    year: addZero(new Date().getFullYear()),
    month: addZero(new Date().getMonth()),
    date: addZero(new Date().getDate()),
    hours: addZero(new Date().getHours()),

    moke_data: {
      "20210201": [
        {
          sleepAllTime: 902,
          sleepFeedback: "很好"
        },
        {
          sleepAllTime: 222,
          sleepFeedback: "疲惫"
        }
      ],
      "20210202": [
        {
          sleepAllTime: 902,
          sleepFeedback: "很好"
        },
        {
          sleepAllTime: 222,
          sleepFeedback: "疲惫"
        },
        {
          sleepAllTime: 902,
          sleepFeedback: "很好"
        },
        {
          sleepAllTime: 222,
          sleepFeedback: "疲惫"
        },
        {
          sleepAllTime: 902,
          sleepFeedback: "很好"
        }
      ]
    }
    
  },
  dayClick(event) { //日历点击选择日期    
    var that = this;
    var clickDate = String(event.detail.year) + addZero(event.detail.month) + addZero(event.detail.day)
    that.getTargetData(clickDate)
    console.log("change date", that.data.target_sleep_list)
    flushChart(that.data.target_sleep_list)

    that.setData({
      nowDate: [{
        month: 'current',
        day: event.detail.day,
        color: 'white',
        background: '#82d5f8'
      }, {
        month: 'current',
        day: new Date().getDate(),
        color: '#ffd700',
        background: 'white'
      }],
      clickDate: clickDate
      // ec: {
      //   onInit: that.construct_sleep_plot
      // }
    })
  },

  getTargetData(date) {
    var that = this;
    var sleep_data = wx.getStorageSync("sleep_data")
    console.log("find date is", date)
    if (sleep_data){
      if (date == "20210202" || date == "20210201"){
        var parse_sleep_data = that.data.moke_data[date]
      }else{
        var parse_sleep_data = JSON.parse(sleep_data)[date]
      }
      var sleep_cnt = 0
      if (parse_sleep_data){
        sleep_cnt = parse_sleep_data.length;
      }
      var sleep_time = 0.0;
      var sleep_desc = "";
      var sleep_tj_map = {
        '早醒': 0,
        '疲惫': 0,
        '多梦': 0,
        '很好': 0
      };
      var slepp_sugg = "";
      var target_sleep_list = [];
      for (var i in parse_sleep_data){
        var fix_sleep_tm = (parse_sleep_data[i].sleepAllTime / 60).toFixed(1);
        sleep_time += parseFloat(fix_sleep_tm);
        sleep_tj_map[parse_sleep_data[i].sleepFeedback] += 1
        target_sleep_list.push(parseFloat(fix_sleep_tm))
      }
      
      for(var j in sleep_tj_map){
        if (sleep_tj_map[j] > 0){
          sleep_desc += j + String(sleep_tj_map[j]) + " 次."
        }
      }
      switch (sleep_cnt) {
        case 5:
          slepp_sugg = "继续保持睡前良好状态";
          break;
        case 1:
          slepp_sugg = "学会释放工作压力";
          break;
        case 2:
          slepp_sugg = "睡前一小时不要进行有氧运动";
          break;
        case 3:
          slepp_sugg = "睡前尽量不要摄入高热量餐饮";
          break;
        case 0:
          slepp_sugg = "还未产生睡眠报告";
          break;
        case 4:
          slepp_sugg = "做一些助眠工作";
          break;
      }
      that.setData({
        data_dispaly: true,
        sleep_cnt: sleep_cnt,
        sleep_time: sleep_time.toFixed(1),
        sleep_desc: sleep_desc,
        slepp_sugg: slepp_sugg,
        target_sleep_list: target_sleep_list,
        ec: {}
      })
    }
  },

  initChart(canvas, width, height){
    var that = this;
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    console.log("plot in ......")
    canvas.setChart(chart);
    flushChart(that.data.target_sleep_list)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var that = this;
    console.log("that.data.month + 1", that.data.month + 1)
    var clickDate = String(that.data.year) + String(that.data.month) + String(that.data.date)
    clickDate = String(parseInt(clickDate) + 100)
    that.getTargetData(clickDate)
    that.setData({
      clickDate: clickDate,
      ec: {
        onInit: that.initChart
      }
    })
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