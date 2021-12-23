Page({
    data: {
      navData: [
        {
            name: "导航",  //文本
            current: 1,    //是否是当前页，0不是  1是
            style: 0,     //样式
            ico: 'icon-qiugouguanli',  //不同图标
            fn: 'gotoNav'   //对应处理函数
        }, {
            name: "查询",
            current: 0,
            style: 0,
            ico: 'icon-mingpianjia',
            fn: 'gotoOldGoods'
        }, {
            name: "信息",
            current: 0,
            style: 1,
            ico: '',
            fn: 'gotoPublish'
        }
      ],
      latitude: 40.003643,
      longitude: 116.329000,
      minscale: 13,
      maxscale: 18,
      markers: [
        {
          id: 0,
          latitude: 40.00463362464222,
          longitude: 116.32764101028442,
          callout:{
            content:"人文社科\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
        {
          id: 1,
          latitude: 40.006174521157895,
          longitude: 116.32751226425171,
          callout:{
            content:"听涛园\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
        {
          id: 2,
          latitude: 40.00232426877767,
          longitude: 116.33063971996307,
          callout:{
            content:"六教\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
        {
          id: 3,
          latitude: 40.0021968821339,
          longitude: 116.32789313793182,
          callout:{
            content:"四教\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
        {
          id: 4,
          latitude: 40.0047692249312,
          longitude: 116.33054316043854,
          callout:{
            content:"南区公寓\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
        {
          id: 5,
          latitude: 40.00663,
          longitude: 116.330355,
          callout:{
            content:"游泳馆篮球场\r\n人流量:0",
            bgColor:"#fff",
            padding:"5px",
            borderRadius:"2px",
            borderWidth:"1px",
            borderColor:"#07c160",
            display:"BYCLICK",
          }
        },
      ]
    },
    onReady: function (e) {
      this.mapCtx = wx.createMapContext('myMap')
      this.mapCtx.getCenterLocation()
    },
    onLoad: function () {
      var that = this;
      clearInterval(that)
    },

  onUnload () {

  },

  onHide () {

  },
    
    onShow: function () {
      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1  //是你想显示标亮的导航按钮的下标
        })
      }
      wx.cloud.init()
      const db = wx.cloud.database({
        env:'traffic-1gq85yh7f2053223'
      })
      var self = this
      db.collection('TrafficFlow').get({
        success: function(res) {
          self.setData({
            'markers[0].callout.content': res.data[0]._id + "\r\n人流量:" + res.data[0].number,
            'markers[1].callout.content': res.data[1]._id + "\r\n人流量:" + res.data[1].number,
            'markers[2].callout.content': res.data[2]._id + "\r\n人流量:" + res.data[2].number,
            'markers[3].callout.content': res.data[3]._id + "\r\n人流量:" + res.data[3].number,
            'markers[4].callout.content': res.data[4]._id + "\r\n人流量:" + res.data[4].number,
            'markers[5].callout.content': res.data[5]._id + "\r\n人流量:" + res.data[5].number,
          })
        }
      })
      var interval = setInterval(function() {
        db.collection('TrafficFlow').get({
          success: function(res) {
            self.setData({
              'markers[0].callout.content': res.data[0]._id + "\r\n人流量:" + res.data[0].number,
              'markers[1].callout.content': res.data[1]._id + "\r\n人流量:" + res.data[1].number,
              'markers[2].callout.content': res.data[2]._id + "\r\n人流量:" + res.data[2].number,
              'markers[3].callout.content': res.data[3]._id + "\r\n人流量:" + res.data[3].number,
              'markers[4].callout.content': res.data[4]._id + "\r\n人流量:" + res.data[4].number,
              'markers[5].callout.content': res.data[5]._id + "\r\n人流量:" + res.data[5].number,
            })
          }
        })
      }, 10000)
    },
  })
  