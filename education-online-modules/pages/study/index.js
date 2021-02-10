
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({
  
  data:{  
    menu_list: [
      {
        id: 0,
        columnName: "听力板块"
      },
      {
        id: 1,
        columnName: "阅读板块"
      },
      {
        id: 2,
        columnName: "写作板块"
      }
    ],
    item_course: [
      {
        id: 0,
        imgsrc: "../../image/study.png",
        name: "Between persons of equal income there is no social distinction except the distinction of merit"
      },
      {
        id: 1,
        imgsrc: "../../image/study.png",
        name: "Basic knowledge about earthquakes How to protect oneself and help others in disasters "
      },
      {
        id: 2,
        imgsrc: "../../image/study.png",
        name: "Basic knowledge about earthquakes How to protect oneself and help others in disasters"
      },
      {
        id: 3,
        imgsrc: "../../image/study.png",
        name: "Between persons of equal income there is no social distinction except the distinction of merit"
      }
    ]
  }
})



 