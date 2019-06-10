const app = getApp()
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/zh-cn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fxamls: HalgaiI18.fxamls
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
    HalgaiAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    const name = e.detail.value.name
    const mobile = e.detail.value.mobile
    if (!name) {
      wx.showToast({
        title: HalgaiI18.fxajs0001,
        icon: 'none'
      })
      return
    }
    if (!mobile) {
      wx.showToast({
        title: HalgaiI18.fxajs0002,
        icon: 'none'
      })
      return
    }
    HalgaiAPI.fxApply(wx.getStorageSync('token'), name, mobile).then(res => {
      if (res.code != 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      wx.navigateTo({
        url: "/pages/fx/apply-status"
      })
    })
  }
})