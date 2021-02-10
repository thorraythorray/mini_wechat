
//  不要在 onLaunch 的时候调用 getCurrentPage()此时 page 还没有生成。 
// getCurrentPage是获取当前页面的实例对象。

Page({
  
    data:{

      teachTitle: "名句名篇",
  
     // 1.教学资源
     cell: [
      {
       image:'../../image/Introduce.png',
       title:'Friendship',
       subtitle:'Friends and friendship \n Interpersonal relationships'
    },
      
      {
       image:'../../image/Introduce.png',
       title:'English around the world',
       subtitle:'English language and its development \n Different kinds of English'
    },
     
      {
       image:'../../image/Introduce.png',
       title:'Travel journal',
       subtitle:'Travelling \n Describing a journey'
    },
    {
       image:'../../image/Introduce.png',
       title:'Earthquakes',
       subtitle:'Basic knowledge about earthquakes \n How to protect oneself and help others in disasters'
    },
     
      {
       image:'../../image/Introduce.png',
       title:'Nelson Mandela - a modern hero',
       subtitle:'The qualities of a great person \n The lives of some great people'
    }
      ],

    }
})



 