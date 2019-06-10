const app = getApp()
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scemls: HalgaiI18.scemls,
    uid: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  bindSave: function(e) {
    var that = this;
    var amount = e.detail.value.amount;

    if (amount == "") {
       wx.showModal({
       title: HalgaiI18.scejs0001,
       content: HalgaiI18.scejs0002,
       showCancel: false
       })
    return
    }
  HalgaiAPI.scoreExchange(amount, wx.getStorageSync('token')).then(function(res) {
    if (res.code == 700) {
       wx.showModal({
         title: HalgaiI18.scejs0001,
         content: HalgaiI18.scejs0004,
       showCancel: false
       })
        return
      }
    if (res.code == 0) {
        wx.showModal({
          title: HalgaiI18.scejs0005,
          content: HalgaiI18.scejs0006 + res.data.score + HalgaiI18.scejs0007,
        showCancel: false,
        success: function(res) {
    if (res.confirm) {
              that.bindCancel();
            }
          }
        })
      } else {
        wx.showModal({
          title: HalgaiI18.scejs0001,
        content: res.data.msg,
        showCancel: false
        })
      }
    })
  }
})
