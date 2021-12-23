// page/pagedetail.js

var id=""
var newFlow=""
var newTime=""
var newYear=""
var newMonth=""
var newDay=""
var newHour=""
var newMinutes=""

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pos:{},
        currentYear: 2000,
        currentMonth: 1,
        currentDate: 1,
        currentHour: 0,
        currentMinute: 0
    },

    bindDateChange:function(e){
        this.setData({
            dates: e.detail.value
        })
    },
    bindTimeChange:function(e){
        this.setData({
            times: e.detail.value
        })
    },
    getPos(){
        wx.cloud.database({env:"traffic-1gq85yh7f2053223"}).collection("TrafficFlow")
        .doc(id)
        .get()
        .then(res=>{
            this.setData({
                pos:res.data
            })
        })
        .catch(err=>{
            console.log("查询失败",err);
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        id = options.id
        this.getPos();
        var time = new Date();
        this.setData({
            currentYear: String(time.getFullYear()),
            currentMonth: String(time.getMonth()),
            currentDate: String(time.getDate()),
            currentHour: String(time.getHours()),
            currentMinute: String(time.getMinutes())
        })
    },
    //更新人流量
    getNewFlow(e){
        newFlow = e.detail.value
    },
    getNewYear(e){
        newYear = e.detail.value
    },
    getNewMonth(e){
        newMonth = e.detail.value
        if(newMonth.length==1)
            newMonth='0'+newMonth;
    },
    getNewDay(e){
        newDay = e.detail.value
        if(newDay.length==1)
            newDay='0'+newDay;
    },
    getNewHour(e){
        newHour = e.detail.value
        if(newHour.length==1)
            newHour='0'+newHour;
    },
    getNewMinutes(e){
        newMinutes = e.detail.value
        if(newMinutes.length==1)
            newMinutes='0'+newMinutes;
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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

    },

    //更新数据
    update(){
        var that = this;
        var stNewTime=that.data.currentYear+'-'+that.data.currentMonth+'-'+that.data.currentDate+' '+that.data.currentHour+':'+that.data.currentMinute+':00';
        let cnNewTime=new Date();
        newTime=cnNewTime.toString();
        if(newFlow==""){
            wx.showToast({
                title: '数据为空',
                icon:"none"
              })
        }else if(newFlow!=""  && newTime==""){
            wx.cloud.database({env:"traffic-1gq85yh7f2053223"}).collection("TrafficFlow")
            .doc(id)
            .update({
                data:{
                    number: Number(newFlow)
                }
            })
            .then(res=>{
                this.setData({
                    pos:res.data
                })
                this.getPos();
                wx.showToast({
                  title: '更新成功',
                  icon:"success"
                })
            })
            .catch(err=>{
                console.log("更新失败",err);
            })
        }else if(newTime!="" && newFlow==""){
            wx.cloud.database({env:"traffic-1gq85yh7f2053223"}).collection("TrafficFlow")
            .doc(id)
            .update({
                data:{
                    time: newTime
                }
            })
            .then(res=>{
                this.setData({
                    pos:res.data
                })
                this.getPos();
                wx.showToast({
                  title: '更新成功',
                  icon:"success"
                })
            })
            .catch(err=>{
                console.log("更新失败",err);
            })
        }else{
            wx.cloud.database({env:"traffic-1gq85yh7f2053223"}).collection("TrafficFlow")
            .doc(id)
            .update({
                data:{
                    number: Number(newFlow),
                    time: newTime
                }
            })
            .then(res=>{
                this.setData({
                    pos:res.data
                })
                this.getPos();
                wx.showToast({
                  title: '更新成功',
                  icon:"success"
                })
            })
            .catch(err=>{
                console.log("更新失败",err);
            })
        }
    },
})