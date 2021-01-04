// pages/foodlist/foodlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist:[],
    key:''
  },
  fngotofoodview:function(ex){
    var id=ex.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/dishesview/dishesview?id='+id,
    })
  },
  fnsearchinputchange:function(e){
    var that = this;
    var curvalue = e.detail.value;
    getApp().globalData.key=curvalue;
    console.log(curvalue);
    that.fngetdata();
  },
  fngetdata:function()
  {
    var that=this;
    var key=getApp().globalData.key;
    if(key==undefined||key==null||key=="undefined")
    {
      key="";
    }
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getfoodlist',
      method: 'POST',
      data: {
        key:key
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          foodlist:cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
      }
    });
  },


  fndianwo:function(){
      console.log("我被点击了!");
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
    var v=getApp().globalData.key;
    console.log(v);
    this.setData({
      key:v
    });
    this.fngetdata();

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