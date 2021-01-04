// pages/dishesview/dishesview.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isshow:"none"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var proid = options.id;
		this.fngetdata(proid);
	},
	
	fngetdata: function (proid) {
	  var that = this;
	  var userid = wx.getStorageSync('currentuserid');
    console.log("菜的id:"+proid+"//  用户id："+userid)
	  wx.request({
	  	url: 'http://192.168.43.183:8000/dcapi/getfoodbyid',
	  	method: 'POST',
	  	data: {
	  		userid: userid,
	  		proid: proid
	  	},
	  	header: {
	  		'content-type': 'application/x-www-form-urlencoded' // 默认值
	  	},
	  	dataType: 'json',
	  	success(cc) {
        that.setData({
          dishesview:cc.data
        });
        if(cc.data[0].procount == 0){
          that.setData({
            isshow: "block" //把后端查询出来的菜品列表信息存放到foodlist数组中
          });
        }else{
          that.setData({
            isshow: "none" //把后端查询出来的菜品列表信息存放到foodlist数组中
          });
        };
	  	}
	  });
	  
	},
	
	fnjia: function (e) {
	  var userid = wx.getStorageSync('currentuserid');
	  var proid = e.currentTarget.dataset.id;
	  var price = e.currentTarget.dataset.price;
	  var count = e.currentTarget.dataset.count;
	  var proname = e.currentTarget.dataset.proname;
	  var imgurl = e.currentTarget.dataset.imgurl;
	  console.log(count)
	  this.fnchangenum(userid,proid,price,1,proname,imgurl);
	},
	fnjian: function (e) {
	  var userid = wx.getStorageSync('currentuserid');
	  var proid = e.currentTarget.dataset.id;
	  var price = e.currentTarget.dataset.price;
	  var count = e.currentTarget.dataset.count;
	  var proname = e.currentTarget.dataset.proname;
	  var imgurl = e.currentTarget.dataset.imgurl;
	  if (count == 1) {
	    this.fndeleteitembyid(userid,proid);
	  } else {
	    this.fnchangenum(userid, proid, price, -1, proname, imgurl);
	  }
	},
	fnchangenum: function (userid,proid,price,typeid,proname,imgurl) {
	  var that = this;
	  wx.request({
	    url: 'http://192.168.43.183:8000/dcapi/addtocar',
	    method: 'POST',
	    data: {
	      userid: userid,
	      proid: proid,
	      price:price,
	      procount:typeid,
	      proname:proname,
	      imgurl:imgurl
	    },
	    header: {
	      'content-type': 'application/x-www-form-urlencoded' // 默认值
	    },
	    dataType: 'json',
	    success(cc) {
	      that.fngetdata(proid);
	    }
	  });
	},
	fndeleteitembyid: function(userid,proid) {
	  var that = this;
	  console.log(userid)
	  console.log(proid)
	  wx.request({
	    url: 'http://192.168.43.183:8000/dcapi/deleteitembyid',
	    method: 'POST',
	    data: {
	      userid: userid,
	      proid:proid 
	    },
	    header: {
	      'content-type': 'application/x-www-form-urlencoded' // 默认值
	    },
	    dataType: 'json',
	    success(cc) {
	      that.fngetdata(proid);
	    }
	  });
	},
	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
