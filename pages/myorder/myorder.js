// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myorderlist:[]
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
    this.fngetorderlist();
  },
  fngetorderlist:function(){
    var that = this;
    //在此处编写请求首页菜品数据的逻辑代码
    var currentuserid = wx.getStorageSync('currentuserid');
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getorderlist',
      method: 'POST',
      data: {
        userid: currentuserid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data[0].issure);
        that.setData({
          myorderlist: cc.data

        });
        wx.request({
          url: 'http://192.168.43.183:8000/dcapi/getorderlistview',
          method: 'POST',
          data: {
            userid: currentuserid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          dataType: 'json',
          success(cc) {
            console.log(cc.data);
            that.setData({
              myorderlistview: cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
            });
          }
        });
      }
    });
  },
  fnsureorder:function(e){
    var orderid = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    var currentuserid = wx.getStorageSync('currentuserid');
    var that = this;
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/sureorder',
      method: 'POST',
      data: {
        orderid: orderid,
        price: price,
        userid: currentuserid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        that.fngetorderlist();
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