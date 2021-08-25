const app = getApp()
const CONFIG = require('../../config.js')
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
// // pages/index/board.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // app.goLoginPageTimeOut()
      this.popUserLogin()
    }
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
  popUserLogin: function (){
    getApp().showModal(this, {
      title: '',
      content: '* ᠲᠤᠰ ᠴᠢᠳᠠᠮᠵᠢ᠎ᠶᠢ ᠵᠠᠷᠤᠬᠤ᠎ ᠎ᠳᠦ wechat᠎ ᠲᠤ ᠨᠡᠪᠲᠡᠷᠡᠵᠤ ᠤᠷᠠᠬᠤ ᠴᠢᠬᠤᠯᠠ ᠲᠠᠢ ᠂ ᠲᠠ ᠡᠭᠦᠨ᠎ ᠡᠴᠡ wechat᠎ ᠲᠤ ᠨᠡᠪᠲᠡᠷᠡᠵᠤ ᠤᠷᠠᠬᠤ ᠦᠦ ？',
      showCancel:true,
    })
    console.log('this',this)
  },
  confirmLogin: function () {
    app.goLoginPageTimeOut()
  },
  cancelLogin: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})