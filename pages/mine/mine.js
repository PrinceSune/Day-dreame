// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    headimg:'',
    regtime:''

  },
   showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
	
	hideModal(e) {
	    this.setData({
	      modalName: null
	    })
	  },

  clearall(e) {
    this.setData({
      modalName: null
    });
    wx.clearStorageSync();
    wx.switchTab({
      url: '/pages/main/main',
    })
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
      var that = this;
      var currentopenid = wx.getStorageSync("currentopenid");
      wx.request({
        url: 'http://192.168.43.183:8000/dcapi/getuserinform',
        method: 'POST',
        data: {
          openid:currentopenid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json',
        success(cc) {
          console.log(cc.data[0])
          that.setData({
            username: cc.data[0].username,
            headimg: cc.data[0].headimg,
            regtime: cc.data[0].regtime
          }); 
          var points = cc.data[0].points
          if (points < 3000) {
            console.log(points)
            var cha_points = parseInt(3000) - parseInt(points);
            var percentage_points = parseInt(points) / parseInt(30);
            console.log(percentage_points)
            that.setData({
              the_cha_points: cha_points,
              the_percentage_points: percentage_points
            })
          }
        }
      })
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