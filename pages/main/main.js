const app = getApp();
Page({
  data: {
    cardCur: 0,
    openid:'',
    regtime:'',
    regusername:'',
    headimg:'',
  	showhide:[],
  	maskFlag:[],
    swiperList:[],
  	banquetarr:[]
  },
  onLoad() {
    this.getCurrentMonthFirst()
	  var that=this;
	  wx.request({
      url: 'http://192.168.43.183:8000/dcapi/getppt',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
        that.setData({
          swiperList: cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
        });
        wx.request({
          url: 'http://192.168.43.183:8000/dcapi/getrecommend',
          method: 'POST',
          data: {
          }, 
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          dataType: 'json',
          success(cc) {
            that.fngetopenid();
            that.setData({
              banquetarr: cc.data//把后端查询出来的菜品列表信息存放到foodlist数组中
            });
          }
        });
      }
    });  
  },
  onShow() {
    this.fngetusername()
    this.getCurrentMonthFirst()
  },
  fngetusername:function(){
    var currentusername = wx.getStorageSync('currentusername');
    console.log("用户id"+currentusername)
    if (currentusername.length < 1) {
       wx.hideTabBar();
	     this.setData({
	      maskFlag: false,
	      showhide: false,
	    }); 
    }else{
      wx.showTabBar(); 
      this.setData({
          maskFlag: true,
          showhide: true
      }); 
		}
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  fngotofoodview: function (ex) {
    var id = ex.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/dishesview/dishesview?id='+id,
    })
  },
  jumpto: function (ex) {
    var id = ex.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/chefview/chefview?id=' + id,
    })
  },
  onShareAppMessage: function () {
    //分享
    console.log("分享")
    var that = this
    console.log("分享1")
    return {
      title: '白日梦想|法餐厅 Day dream 主页',
      path: '/pages/main/main',
      success: res => {
        console.log("分享成功" + res)
        console.log(res.shareTickets[0]);
        // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
        // 如果这里有 shareTickets，则说明是分享到群de 如果没有则是转发到好友的
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: res => {
            that.setData({
              isShow: true
            })
            console.log(that.setData.isShow)
          },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        console.log("分享失败" + res)
      }
    }

  },
  getCurrentMonthFirst: function () {
    var that = this;
    var date = new Date();
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    console.log("今天："+todate);
    that.setData({
      regtime:todate
    });
  },
  fngetopenid:function(){
    var that = this;
    wx.login({
      success: res => {
        console.log(res.code)//登录成功后获取js_code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appid + '&secret=' + app.globalData.secret + '&js_code=' + res.code + '&grant_type=authorization_code',//获取openid的url，请求微信服务器
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log("Openid为" + res.data.openid)
            console.log("返回秘钥：" + res.data.session_key)//返回秘钥
            var openid = res.data.openid; //返回openid
            that.setData({
              openid:openid
            })
            wx.setStorageSync("currentopenid", openid);
            wx.request({
              url: 'http://192.168.43.183:8000/dcapi/getuserinform',
              method: 'POST',
              data: {
                openid:openid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              dataType: 'json',
              success(cc) {
                console.log(cc.data)
                if(cc.data.length>0)
                {
                  var aaa=cc.data[0].id;
                  console.log(aaa)
                  wx.setStorageSync("currentuserid", cc.data[0].id);
                  wx.setStorageSync("currentusername", cc.data[0].username);
                  wx.setStorageSync("currentusertruename", cc.data[0].truename);
                  wx.setStorageSync("currentusertel", cc.data[0].tel);
                  wx.setStorageSync("currentuseraddress", cc.data[0].address);
                  wx.setStorageSync("currentuserbirthday", cc.data[0].birthday);
                  wx.setStorageSync("currentuseroccupation", cc.data[0].occupation);
                  wx.setStorageSync("currentuserpoints", cc.data[0].points);
                  that.fngetusername()
                }
              }
            });

          }
        })
      }
    });
  },
  getUserInfo(e) {
    console.log(e)
    var that=this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      regusername: e.detail.userInfo.nickName,
      headimg: e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
    setTimeout(() => {
      that.fnreg()
    }, 2000)
  },
  fnreg:function(){
    var that=this;
    var regtime = this.data.regtime;
    var regusername= this.data.regusername;
    var openid= this.data.openid;
    var headimg = this.data.headimg;
    console.log("注册时间" + openid)
    wx.request({
      url: 'http://192.168.43.183:8000/dcapi/reg',
      method: 'POST',
      data: {
        regtime: that.data.regtime,
        username: that.data.regusername,
        headimg: that.data.headimg,
        openid: that.data.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success(cc) {
          wx.setStorageSync("currentopenid", cc.data[0].openid);
          wx.setStorageSync("currentuserid", cc.data[0].id);
          wx.setStorageSync("currentusername", cc.data[0].username);
          wx.setStorageSync("currentuserpoints", cc.data[0].points);
          console.log("aaaa:zhuruchenggong")
          wx.showTabBar(); 
          that.setData({
              maskFlag: true,
              showhide: true
          }); 
          that.fngetopenid();
      }
    });
  },
})