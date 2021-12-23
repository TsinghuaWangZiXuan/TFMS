// 引入coolsite360交互配置设定
require('../index/coolsite.config.js');
// 获取全局应用程序实例对象
var app = getApp();
// 创建页面实例对象
Page({
  name: "index",
  data: {
    currentYear: 2000,
    currentMonth: 1,
    currentDate: 1,
    currentHour: 0,
    currentMinute: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    wx.cloud.init();
    const db = wx.cloud.database({
      env:'traffic-1gq85yh7f2053223'
    })

    var that = this;
    var time = new Date();
    this.setData({
        currentYear: String(time.getFullYear()),
        currentMonth: String(time.getMonth()),
        currentDate: String(time.getDate()),
        currentHour: String(time.getHours()),
        currentMinute: String(time.getMinutes())
    })
    var interval = setInterval(function() {
      var stNewTime=that.data.currentYear+'-'+that.data.currentMonth+'-'+that.data.currentDate+' '+that.data.currentHour+':'+that.data.currentMinute+':00';
      let cnNewTime=new Date();
      var newTime=cnNewTime.toString();
      wx.request({
        url:"https://api.jsonbin.io/b/61c3ed08f8c69823dd404ed7",
        header: {
          "secret-key": "$2b$10$D0BptmO/1jpV0zyXbQUH7.vK4k8uezLPzyHDv6q6UJLTmzKFclRs2"
        },
        success:function(res){
            db.collection('TrafficFlow').doc('听涛园').update({
              data: {
                number: res.data['0'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
            db.collection('TrafficFlow').doc('人文社科').update({
              data: {
                number: res.data['1'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
            db.collection('TrafficFlow').doc('四教').update({
              data: {
                number: res.data['2'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
            db.collection('TrafficFlow').doc('六教').update({
              data: {
                number: res.data['3'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
            db.collection('TrafficFlow').doc('南区公寓').update({
              data: {
                number: res.data['4'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
            db.collection('TrafficFlow').doc('游泳馆篮球场').update({
              data: {
                number: res.data['5'],
                time: newTime
              },
              success:function(res){
                console.log(data)
              }
            })
        },
        fail:function(err){
            console.log(err)
        }
      })
    }, 60000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },
  //以下为自定义点击事件
  tap_45dc5084:function(e){
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e,this);
  },
})

