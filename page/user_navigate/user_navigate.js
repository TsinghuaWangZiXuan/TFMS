// pages/demo01/demo01.js
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk
wx.cloud.init({
  env: 'traffic-1gq85yh7f2053223'  //数据库ID
})
const db = wx.cloud.database({
  env: 'traffic-1gq85yh7f2053223'
})
Page({
    data: {
      latitude: 40.00232426877767,
      longitude: 116.33063971996307,
      minscale: 13,
      maxscale: 18,
      array: ['人文社科', '听涛园', '六教', '四教','南区公寓','游泳馆篮球场','紫荆公寓'],
      objectArray: [
        {
          id: 1,
          name: '人文社科',
          location: '40.00463362464222,116.32764101028442',
          location_num: {
            latitude:40.00463362464222,
            longitude:116.32764101028442
          },
          number: 0,
          dis: []
        },
        {
          id: 0,
          name: '听涛园',
          location: '40.006174521157895,116.32751226425171',
          location_num: {
            latitude:40.006174521157895,
            longitude:116.32751226425171
          },
          number: 0,
          dis: []
        },
        {
          id: 3,
          name: '六教',
          location: '40.00232426877767,116.33063971996307',
          location_num: {
            latitude:40.00232426877767,
            longitude:116.33063971996307
          },
          number: 0,
          dis: []
        },
        {
          id: 4,
          name: '四教',
          location: '40.0021968821339,116.32789313793182',
          location_num: {
            latitude:40.0021968821339,
            longitude:116.32789313793182
          },
          number: 0,
          dis: []
        },
        {
          id: 5,
          name: '南区公寓',
          location: '40.0047692249312,116.33054316043854',
          location_num: {
            latitude:40.0047692249312,
            longitude:116.33054316043854
          },
          number: 0,
          dis: []
        },
        {
          id: 6,
          name: '游泳馆篮球场',
          location: '40.00663,116.330355',
          location_num: {
            latitude:40.00663,
            longitude:116.330355
          },
          number: 0,
          dis: []
        },
        {
          id: 7,
          name: '紫荆公寓',
          location: '40.010852,116.328694',
          location_num: {
            latitude:40.010852,
            longitude:116.328694
          },
          number: 0,
          dis: []
        }
      ],
      index: '',
      pl: []
    },
    onLoad: function (options) {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: '7ABBZ-IYCEP-BXHDX-LC7WD-TOGQ2-SLB22'
        });
        var that = this;
        that.updateNumber();
    },
    onshow: function () {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: 0  //是你想显示标亮的导航按钮的下标
          })
        }
    },
    onUnload: function () {
      var that = this;
      clearInterval(that)
    },
    //触发表单提交事件，调用接口
    formSubmit(e) {
        var _this = this;
        var pl = [];
        console.log(e);
        //调用距离计算接口
        qqmapsdk.direction({
        mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
        //from参数不填默认当前地址
        from: e.detail.value.start,
        to: _this.data.objectArray[e.detail.value.dest].location, 
        success: function (res) {
          var ret = res;
          var coors = ret.result.routes[0].polyline;
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          var kr = 1000000;
          for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
          //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
          _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
              points: pl,
              color: '#FF0000DD',
              width: 4
          }]
          })
          _this.data.pl = pl;
          _this.remindCongestion();
        },
        fail: function (error) {
            console.error(error);
        }
        });
    },

    rad:function(d) {
      return d * Math.PI / 180.0;
    },

    distanceOf: function(p1, p2) {
      var that = this;
      var radLng1 = that.rad(p1.longitude);
      var radLng2 = that.rad(p2.longitude);
      var mdifference = radLng1 - radLng2;
      var difference = that.rad(p1.latitude) - that.rad(p2.latitude);
      var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(difference / 2), 2)
          + Math.cos(radLng1) * Math.cos(radLng2) * Math.pow(Math.sin(mdifference / 2), 2)));
      distance = distance * 6378.137;
      distance = Math.abs(Math.round(distance * 10000) / 10);
      return distance;
    },

    remindCongestion: function(){
      var that = this;
      var name = [];
      for (var i = 0; i < that.data.array.length; i++) {
        var m = 1000;
        for (var j = 0; j < that.data.pl.length; j++){
          var distance = that.distanceOf(that.data.objectArray[i].location_num, that.data.pl[j])
          if (m > distance){
            m = distance;
          }
        }
        if (m <= 10 && that.data.objectArray[i].number > 30){
          name.push(that.data.objectArray[i].name);
        }
      }
      if (name.length > 0){
        var Name = name.toString();
        wx.showModal({
          title: '提示',
          content: '当前道路中,'+Name+'路段较为拥堵'
        });
      }
    },
    
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },

    //更新路口流量
    updateNumber: function(){
      var that = this;
      var interval = setInterval(function(){
        db.collection('TrafficFlow').get({
          success:function(res){
            for(var i = 0; i < res.data.length; i++){
              that.data.objectArray[i].number = res.data[i].number;
            }
          }
        })
      },1000)
    },
})