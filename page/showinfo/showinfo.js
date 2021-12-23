
// 引入coolsite360交互配置设定
require('coolsite.config.js');

const DB =wx.cloud.database({env:'traffic-1gq85yh7f2053223'}).collection('TrafficFlow'); 
//db.collection("traffic-1gq85yh7f2053223").doc("TrafficFlow");
var app = getApp();
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "showinfo",
  /**
   * 页面的初始数据
   */

  data: {
      ne:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    const DB=wx.cloud.database({
      env:'traffic-1gq85yh7f2053223'
    })
    DB.collection('TrafficFlow').get({
      success:res=>{
        this.setData({
          ne:res.data
        })
      }
    })
  },
  //跳转
  godetail(e){
    console.log("跳转到详情", e);
    wx.navigateTo({
      url: '/page/pagedetail/pagedetail?id='+e.currentTarget.dataset.id,
    })
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
    const DB=wx.cloud.database({
      env:'traffic-1gq85yh7f2053223'
    })
    DB.collection('TrafficFlow').get({
      success:res=>{
        this.setData({
          ne:res.data
        })
      }
    })
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
  
})

