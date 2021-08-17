Page({
  
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    pickerHidden: true,
    chosen: ''
  },
  onLoad:function (e) {
    this.setData({
      registType:e.registType
    })
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {

    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // wx.navigateTo({
    //   url: '/pages/shop-type/index',
    // })
    this.goFinal()
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  goDetail:function () {
    wx.navigateTo({
      url: '/pages/openshop-detailPage/index',
    })
  },
  goFinal:function () {
    wx.navigateTo({
      url: '/pages/openshop-finalPage/index?registType='+this.data.registType,
    })
  }
})