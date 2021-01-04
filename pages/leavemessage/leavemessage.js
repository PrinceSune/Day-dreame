// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    linktype:'',
    truename:''
  }, 
  fnmessage:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        message:e.detail.value
      });
  
  },
  fnlinktype:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
       linktype:e.detail.value
      });
  },
  fntruename:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        truename:e.detail.value
      });
  },
  fnsubmit:function(){
      var that=this;
      var message= this.data.message;
	  var linktype= this.data.linktype;
	  var truename= this.data.truename;
      wx.request({
        url: 'http://192.168.43.183:8000/dcapi/leavemessage',
        method: 'POST',
        data: {
		  message: that.data.message,
		  linktype: that.data.linktype,
		  truename: that.data.truename,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json',
        success(cc) {
           console.log(cc);

          if(cc.data.length>0)
          {
            wx.showToast({
              title: '感谢您的反馈'
            });
			setTimeout(function () {
			    wx.switchTab({
			      url: '/pages/leavemessage/leavemessage',
			    })
			}, 1000);
			that.setData({
			  kong: ""
			});
          }
          else
          {
            that.setData({
              msg:"网络出了一会小差"
            });
          }
          
        }
      });
  },
 
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})