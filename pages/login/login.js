const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	isshowpersoninfo: "none",
    tel:'',
    password:'',
    msg:'',
    regtel:'',
    regpassword:'',
    regusername:'',
    regtruename:'',
    headimg:'',
    regtime:''
  }, 
  fninputedittel:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        tel:e.detail.value
      });
  
  },
  fninputeditpassword:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        password:e.detail.value
      });
  },
  
  fnlogin:function(){
      var that=this;
      var tel= this.data.tel
      var password=this.data.password;

      wx.request({
        url: 'http://192.168.43.183:8000/dcapi/login',
        method: 'POST',
        data: {
          tel: that.data.tel,
          password: that.data.password,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json', 
        success(cc) {
          if(cc.data.length>0)
          {
            wx.setStorageSync("currentuserid", cc.data[0].id);
            wx.setStorageSync("currentusername", cc.data[0].username);
            wx.setStorageSync("currentusertruename", cc.data[0].truename);
            wx.setStorageSync("currentusertel", cc.data[0].tel);
            wx.setStorageSync("currentuseraddress", cc.data[0].address);
            wx.setStorageSync("currentuserbirthday", cc.data[0].birthday);
            wx.setStorageSync("currentuseroccupation", cc.data[0].occupation);
            wx.setStorageSync("currentuserpoints", cc.data[0].points);
            wx.showToast({ 
              title: '登录成功'
            });
            setTimeout(function () {
                wx.switchTab({
                  url: '/pages/main/main',
                })
            }, 1000);
            that.setData({
              msg: ""
            });
          }
          else
          {
            that.setData({
              msg:"用户名或密码错误"
            });
          }
          
        }
      });
  },
  fngotoreg: function () {
     this.setData({
       isshowpersoninfo: "block"
     });
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
            app.globalData.openid = res.data.openid; //返回openid
            wx.redirectTo({
              url: '../main/main'
            })
          }
        })
      }
    });
  },
  
  fnregtel:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        regtel:e.detail.value
      });
  
  },
  fnregpassword:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        regpassword:e.detail.value
      });
  },
  fnregtruename:function(e){
      var that=this;
      console.log(e.detail.value);
      that.setData({
        regtruename:e.detail.value
      });
  },
  getCurrentMonthFirst: function () {
    var that = this;
    var date = new Date();
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    that.setData({
      regtime:todate
    });
    console.log(todate);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      regusername: e.detail.userInfo.nickName,
      headimg: e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
  },
  fnreg:function(){
      var that=this;
      var regtime = this.data.regtime;
      var regusername= this.data.regusername;
      var regpassword=this.data.regpassword;
	    var regtruename= this.data.regtruename;
	    var regtel=this.data.regtel;
      var headimg = this.data.headimg;
    console.log(headimg)
    console.log("注册时间" + regtime)
      if(regtel.length != 11) {
        wx.showToast({
          title: '手机号码位数不正确',
          icon: 'none',
        });
        return;
      }
      var myreg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if(!myreg.test(regtel)) {
        wx.showToast({
          title: '手机号码格式不正确',
          icon: 'none',
        });
        return;
      }
      if(regtruename == '') {
        wx.showToast({
          title: '请填写您的称谓',
          icon: 'none',
        });
        return;
      }
      if(regpassword == '') {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
        });
        return;
      }
      if(regpassword.length < 6) {
        wx.showToast({
          title: '密码位数必须大于6',
          icon: 'none',
        });
        return;
      }
      wx.request({
        url: 'http://192.168.43.183:8000/dcapi/reg',
        method: 'POST',
        data: {
		      regtime: that.data.regtime,
          tel: that.data.regtel,
          username: that.data.regusername,
          password: that.data.regpassword,
		      truename: that.data.regtruename,
          headimg: that.data.headimg
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: 'json',
        success(cc) {
           console.log(cc);
  
          if(cc.data.length>0)
          {
            // wx.setStorageSync("username","tangyan")
            wx.showToast({
              title: '注册成功'
            });
            setTimeout(function () {
                that.setData({
                  isshowpersoninfo: "none"
                });
            }, 1000);
          }
          else
          {
            wx.showToast({
              title: '注册失败'
            });
          }
          
        }
      });
  },
  
  onLuanch(){
  },
 
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentMonthFirst()
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