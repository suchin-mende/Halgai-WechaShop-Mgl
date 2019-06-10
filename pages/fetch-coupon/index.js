const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/zh-cn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponDetailMap: {},
    femls: HalgaiI18.femls
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    if (options.id) {
      HalgaiAPI.couponDetail(options.id).then(res => {
        if (res.code == 0) {
          _this.setData({
            couponDetailMap: res.data
          });
        }
      })
    }
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

  },
  bindSave: function (e) {
    const _this = this
    const pwd = e.detail.value.pwd;
    if (!pwd) {
      wx.showModal({
        title: HalgaiI18.fejs0001,
        content: HalgaiI18.fejs0002,
        showCancel: false
      })
      return;
    }
    HalgaiAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    HalgaiAPI.fetchCoupons({
      id: _this.data.couponDetailMap.info.id,
      pwd: pwd,
      token: wx.getStorageSync('token')
    }).then(function (res) {
      if (res.code == 20001 || res.code == 20002) {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: HalgaiI18.fejs0003,
          showCancel: false
        })
        return;
      }
      if (res.code == 20003) {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: HalgaiI18.fejs0004,
          showCancel: false
        })
        return;
      }
      if (res.code == 30001) {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: HalgaiI18.fejs0005,
          showCancel: false
        })
        return;
      }
      if (res.code == 20004) {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: HalgaiI18.fejs0006,
          showCancel: false
        })
        return;
      }
      if (res.code == 700) {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: HalgaiI18.fejs0007,
          showCancel: false
        })
        return;
      }
      if (res.code == 0) {
        wx.showToast({
          title: HalgaiI18.fejs0008,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateBack({})
        }, 1000)
      } else {
        wx.showModal({
          title: HalgaiI18.fejs0001,
          content: res.msg,
          showCancel: false
        })
      }
    })
  }
})