Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: { 
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    upgrade: '无'
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  currentchange(e){
    let current = e.detail.current;
    //console.log(source);
    // 这里的source是判断是否是手指触摸 触发的事件
    if(current == 0) {
      this.setData({
        upgrade:"无"
      })
    }else if (current == 1){
      this.setData({
        upgrade: "累计积分达到3000分，升到lv2"
      })
    }else{
      this.setData({
        upgrade: "累计积分达到8000分，升到lv3"
      })
    }
}       
})