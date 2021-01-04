// pages/chefview/chefview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',      //厨师姓名
    sex:'',          //性别
    tel:'',          //电话
    nativeplace:'',   //籍贯
    introduce:'',   //个人介绍
    comments:'',   //评价
    img:'',    //图片的路径
    chefid:''    //厨师的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
   
    var id=options.id;
     console.log(options.id);
    wx.request({
     url: 'http://192.168.43.183:8000/dcapi/getchefbyid',
     method: 'POST',
     data: {
       id: id
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },
     dataType: 'json',
     success(cc) {
       console.log(cc.data);
       that.setData({
         chefid:cc.data[0].id,
         comments:cc.data[0].comments,
         introduce:cc.data[0].introduce,
         name: cc.data[0].name,
         tel: cc.data[0].tel,
         sex: cc.data[0].sex,
         nativeplace:cc.data[0].nativeplace,
         img:"http://192.168.43.183:8000/static/uploadimg/"+cc.data[0].img,
         
       });
      
     }
   });
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