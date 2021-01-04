// pages/chef/chefList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cheflist:[],
     cheflist1:[],
     key:''
     
  },
  jumpto:function(ex){
    var id=ex.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url:'/pages/chefview/chefview?id='+id,
    })
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
      url: 'http://192.168.43.183:8000/dcapi/getchefbyrandom',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        console.log(cc.data);
        that.setData({
          cheflist1:cc.data//把后端查询出来的菜品列表信息存放到cheflist1数组中
        });
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
  onShow:function(){
    var that=this;
      //在此处编写请求厨师列表的逻辑代码
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getcheflist',
      method: 'POST',
      data: {
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(ee) {
        console.log(ee.data);
        that.fngetdata();
        that.setData({
         cheflist:ee.data//把后端查询出来的厨师列表信息存放到cheflist数组中

        });
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