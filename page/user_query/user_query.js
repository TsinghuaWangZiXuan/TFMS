Page({
    data: {
      themeArr: {location: '地点', num: '人数', time: '监测时间'},
      itemArr: [
        {location: '人文社科', num: '无', time: '无'},
        {location: '听涛园', num: '无', time: '无'},
        {location: '六教', num: '无', time: '无'},
        {location: '四教', num: '无', time: '无'},
        {location: '南区公寓', num: '无', time: '无'},
        {location: '游泳馆篮球场', num: '无', time: '无'},
      ]
    },
    onLoad() {
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2  //是你想显示标亮的导航按钮的下标
        })
      }
      wx.cloud.init()
      const db = wx.cloud.database({
        env:'traffic-1gq85yh7f2053223'
      })
      var self = this
      db.collection('TrafficFlow').get({
        success: function(res) {
          console.log('suc')
          for (let i = 0; i < 6; i++) {
            self.setData({
              ['itemArr['+ i +'].num']: res.data[i].number,
              ['itemArr['+ i +'].time']: res.data[i].time.substring(4,10) + res.data[i].time.substring(15,24),
            })
          }
        }
      })
      var interval = setInterval(function() {
        db.collection('TrafficFlow').get({
          success: function(res) {
            for (let i = 0; i < 6; i++) {
              self.setData({
                ['itemArr['+ i +'].num']: res.data[i].number,
                ['itemArr['+ i +'].time']: res.data[i].time.substring(4,10) + res.data[i].time.substring(15,24),
              })
            }
          }
        })
      }, 10000)
    },
    onshow: function () {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2  //是你想显示标亮的导航按钮的下标
          })
        }
    },
  });