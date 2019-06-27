const app = getApp()
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wimls: HalgaiI18.wimls
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
  bindCancel: function() {
    wx.navigateBack({})
  },
  bindSave: function(e) {
    var that = this;
    HalgaiAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    var amount = e.detail.value.amount;

    if (amount == "" || amount * 1 < 100) {
      getApp().showModal(this, {
        title: HalgaiI18.wijs0001,
        content: HalgaiI18.wijs0002,
        showCancel: false
      })
      return
    }
    HalgaiAPI.withDrawApply(amount, wx.getStorageSync('token')).then(function(res) {
      if (res.code == 0) {
        getApp().showModal(this, {
          title: HalgaiI18.wijs0003,
          content: HalgaiI18.wijs0004,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              that.bindCancel();
            }
          }
        })
      } else {
        getApp().showModal(this, {
          title: HalgaiI18.wijs0001,
          content: res.msg,
          showCancel: false
        })
      }
    })
  }
})
