const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    sumprice: 0,
    VerticalNavTop: 0,
    itemLists:[],
    timelist: [{"day":0,"time":0,"text":"午餐：12:00/15:00"},{"day":0,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":1,"time":0,"text":"午餐：12:00/13:00"},{"day":1,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":2,"time":0,"text":"午餐：12:00/13:00"},{"day":2,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":3,"time":0,"text":"午餐：12:00/13:00"},{"day":3,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":4,"time":0,"text":"午餐：12:00/13:00"},{"day":4,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":5,"time":0,"text":"午餐：12:00/13:00"},{"day":5,"time":1,"text":"晚餐：17:30/20:30"},
	{"day":6,"time":0,"text":"午餐：12:00/13:00"},{"day":6,"time":1,"text":"晚餐：17:30/20:30"}],
    datelist: [{ "name": "今日", "id": 0 }, { "name": "6.16日(二)", "id": 1 }, { "name": "6.17日(三)", "id": 2 }, { "name": "6.18日(四)", "id": 3 }, 
	{ "name": "6.19日(五)", "id": 4 }, { "name": "6.20日(六)", "id": 5 }, { "name": "6.21日(天)", "id": 6 }]
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      datetime: e.currentTarget.dataset.datetime
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  toSure(e) {
    this.setData({
      modalName: null
    })
    wx.showToast({
      title: '预定成功'
    });
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    }); 
  }, 
  onShow() {
    this.getCurrentMonthFirst()
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
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  
   getDates:function(todate) {
    var dateArry = [];
    for(var i = 0; i<7; i++) {
      this.dateLater(todate, i)
    }
  },
  getCurrentMonthFirst: function () {
    var date = new Date();
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    console.log(todate);
    this.getDates(todate)
  },
  dateLater:function(dates,later) {
    let dateObj = {};
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    var theyear = date.getFullYear();
    var themonth = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
    var theday = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    var week = show_day[day];
    let list = this.data.itemLists
    list.push({ id: later, date: themonth+'-'+theday, year:theyear,week:week})
    this.setData({
      itemLists: list
    })
    console.log(dateObj.date);
    
  }


 })