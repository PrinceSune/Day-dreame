// pages/myinform/myinform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thedate: '编辑生日',
    occupation: '我的职业',
    region: '编辑城市',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinformation()
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
  getinformation: function () {
    var that = this;
    var currentuserid = wx.getStorageSync("currentuserid");
    console.log(currentuserid)
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getuserinform',
      method: 'POST',
      data: {
        userid: currentuserid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        that.setData({
          username: cc.data[0].username,
          tel: cc.data[0].tel,
          headimg: cc.data[0].headimg,
        });
        if (cc.data[0].birthday == " ") {
        } else {
          that.setData({
            date: cc.data[0].birthday
          });
        };
        if (cc.data[0].address == " ") {
        } else {
          that.setData({
            region: cc.data[0].address
          });
        };
        if (cc.data[0].occupation == " ") {
        } else {
          that.setData({
            occupation: cc.data[0].occupation
          });
        };
      }
    })
  },
  DateChange(e) {
    this.setData({
      thedate: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  fninputusername: function (e) {
    var that = this;
    console.log(e.detail.value);
    that.setData({
      username: e.detail.value
    });
  },
  fninputbirthday: function (e) {
    var that = this;
    console.log(e.detail.value);
    that.setData({
      date: e.detail.value
    });

  },
  fninputaddress: function (e) {
    var that = this;
    console.log(e.detail.value);
    that.setData({
      region: e.detail.value
    });
  },
  fninputoccupation: function (e) {
    var that = this;
    console.log(e.detail.value);
    that.setData({
      occupation: e.detail.value
    });
  },
  edit: function () {
    var that = this;
    var currentuserid = wx.getStorageSync("currentuserid");
    var username = this.data.username;
    var date = this.data.date;
    var region = this.data.region;
    var occupation = this.data.occupation;
    console.log(username);
    wx.setStorageSync("currentusername", username);
    wx.setStorageSync("currentuseraddress", region);
    wx.setStorageSync("currentuserbirthday", date);
    wx.setStorageSync("currentuseroccupation", occupation);
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/edituserinform',
      method: 'POST',
      data: {
        userid: currentuserid,
        username: that.data.username,
        birthday: that.data.date,
        address: that.data.region,
        occupation: that.data.occupation
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc);
        if (cc.data.length > 0) {
          // wx.setStorageSync("username","tangyan")
          wx.showToast({
            title: '修改成功'
          });
          that.getinformation()
        }
        else {
          wx.showToast({
            title: '修改失败'
          });
        }

      }
    });
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