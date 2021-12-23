
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

wx.cloud.init({
  env: 'traffic-1gq85yh7f2053223'  //数据库ID
})
 
const db = wx.cloud.database({
  env: 'traffic-1gq85yh7f2053223'
})

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page1",
  /**
   * 页面的初始数据
   */

  data: {
    userN:'',  
    passW:'',
  },

  userNameInput:function(e){  
    this.setData({  
      userN: e.detail.value  
    })  
  },

  userPasswordInput:function(e){  
    this.setData({  
      passW: e.detail.value  
    })  
  },  

  logIn: function () {
    var that = this
    if (that.data.userN.length == 0 || that.data.passW.length == 0) {
      wx.showModal({
        title: '温馨提示：',
        content:'手机号或密码不能为空！',
        showCancel:false
      })
    } else {
      db.collection('Administrator').where({phonenumber:that.data.userN}).get({
        success:function(res){
          if (res.data.length == 0){
            wx.showModal({
              title: '错误',
              content: '用户名不存在'
            });
          }
          if (that.data.passW == res.data[0].password){
            wx.redirectTo({
               url: '../showinfo/showinfo'
            }) 
          }
          else{
            wx.showModal({
              title: '错误',
              content: '密码错误'
            });
          }
         }
         
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
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
  
})

