const app = getApp()
Page({
  data: {
    loading: true,
    hideGoods: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    isshowpersoninfo: "none",
    btntxt: "选好了",
    sumprice: 0,
    disheslist: [],
    tblist: [],
    list: [{ "name": "前菜", "id": 0, "top": 0, "bottom": 415 }, { "name": "主菜", "id": 1, "top": 415, "bottom": 830 }, { "name": "生蚝吧", "id": 2, "top": 830, "bottom": 1245 }, { "name": "汤品", "id": 3, "top": 1245, "bottom": 1660 }, { "name": "甜品", "id": 4, "top": 1660, "bottom": 2075 }, { "name": "冰淇淋", "id": 5, "top": 2075, "bottom": 2490 }, { "name": "套餐", "id": 6, "top": 2490, "bottom": 2905}]
  }, 
   fngotofoodview:function(ex){
      var id=ex.currentTarget.dataset.id;
	  console.log(id);
      wx.navigateTo({
        url: '/pages/dishesview/dishesview?id='+id,
      })
    },
  onLoad() {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // }); 
    this.progressiveLoad() 
  }, 
  progressiveLoad:function() {
    setTimeout(() => {
      this.setData({
        loading: false,
        hideGoods: true
      })
    }, 500)
  }, 
  onShow() {
    this.fngetdata();
  },
  onReady() {
    wx.hideLoading()
  },
 
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
	let tblist = this.data.tblist;
    let tabHeight = 0;
    if (this.data.load) {
      console.log("23")
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          tblist[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          tblist[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > tblist[i].top && scrollTop < tblist[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  fnsaveorder: function () {
    var that = this;
    var currentusertruename = wx.getStorageSync("currentusertruename");
    var currentuserid = wx.getStorageSync("currentuserid");
    if (currentusertruename.length < 1) {
      wx.showToast({
        title: '你还没有登录',
        icon: 'none'
      });
    }
    else {
      wx.request({
        url: 'http://192.168.43.183:8000/dcapi/saveorder',
        method: 'POST',
        data: {
          sumprice: that.data.sumprice,//总价
          sname: that.data.sname,
          stel: that.data.stel,
          saddress: that.data.saddress,
          ptime: that.data.ptime,
          memo: that.data.memo,
          userid: currentuserid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json',
        success(cc) {
          console.log(cc.data);
          wx.showToast({
            title: '下单成功!'
          });
          wx.redirectTo({
            url: '/pages/myorder/myorder',
          });
        }
      });

    }
  },
  bindDateChange: function (e) {
    this.setData({
      ptime: e.detail.value
    });
  },
  fnsname: function (e) {
    this.setData({
      sname: e.detail.value
    });
  },
  fntel: function (e) {
    this.setData({
      stel: e.detail.value
    });
  },
  fnaddress: function (e) {
    this.setData({
      saddress: e.detail.value
    });
  },
  fnmemo: function (e) {
    this.setData({
      memo: e.detail.value
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
        that.fngetdata();
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
        that.fngetdata();
      }
    });
  },
  fngetdata: function () {
    var userid = wx.getStorageSync('currentuserid');
    var that = this;
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getcarlist',
      method: 'POST',
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
      var heightt=0;
      var toptop=0;
      let list = [{}];
      for(var j=0;j<7;j++){
			var sum=0;
			for(var i=0;i<cc.data.length;i++){
				var aa=cc.data[i].typeid;
				var typeid=parseInt(aa);
				var bb=parseInt(j);
				if(typeid == bb){
					sum=sum+1;
				}
			}
			toptop=heightt;
			heightt=heightt+sum;
			console.log(heightt);
			
			  list[j] = {};
			  list[j].bottom=heightt*115+40*j;
			  list[j].top=toptop*115+50*j;
				that.setData({
					tblist:list
				});
		};
		
        var sum = 0;
         cc.data.forEach(element => {
           sum += parseFloat(element.price) * parseFloat(element.procount);
         });
        that.setData({
          sumprice: sum,
          disheslist: cc.data
        });
      }
    });

  },

  fntap: function () {
    var that = this;
    if (that.data.btntxt == "确定下单") {
      console.log("1111111===============")
      that.fnsaveorder();
    }
    else {
      that.setData({
        isshowpersoninfo: "block",
        btntxt: "确定下单"
      });
    }
  },
  fnback: function () {
    var that = this;
    that.setData({
      isshowpersoninfo: "none",
      btntxt: "去结算"
    });
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },
  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }
})