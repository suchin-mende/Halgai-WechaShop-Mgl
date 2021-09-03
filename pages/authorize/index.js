const HalgaiAPI = require('../../halgaiApi/main')
var app = getApp();
const HalgaiI18 = require('../../language/mn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aumls: HalgaiI18.aumls
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
  getUserProfile: function (e) {
    var userInfo
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        userInfo = res.userInfo
        if (!userInfo) {
          return;
        }
        console.log("app.globalData.isConnected", app.globalData.isConnected)
        if (app.globalData.isConnected) {
          wx.setStorageSync('userInfo', userInfo)
          this.login();
        } else {
          wx.showToast({
            title: HalgaiI18.aujs0001,
            icon: 'none',
          })
        }
      }
    })
  },
  login: function () {
    const that = this;
    const token = wx.getStorageSync('token');
    if (token) {
      HalgaiAPI.checkToken(token).then(function (res) {
        if (res.code != 0) {
          wx.removeStorageSync('token')
          that.login();
        } else {
          // 回到原来的地方放
          app.navigateToLogin = false
          wx.navigateBack();
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        HalgaiAPI.login(res.code).then(function (res) {
          if (res.code == 10000) {
            // 去注册
            that.registerUser(res.session_key);
            return;
          }
          if (res.code != 0) {
            // 登录错误
            wx.hideLoading();
            getApp().showModal(that, {
              title: HalgaiI18.aujs0002,
              content: HalgaiI18.aujs0003,
              showCancel: false
            })
            return;
          }
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          // 回到原来的地方放
          app.navigateToLogin = false
          wx.navigateBack();
        })
      }
    })
  },
  registerUser: function (session_key) {
    let that = this;
    wx.login({
      success: function (res) {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            let referrer = '' // 推荐人
            let referrer_storge = wx.getStorageSync('referrer');
            if (referrer_storge) {
              referrer = referrer_storge;
            }
            // 下面开始调用注册接口
            HalgaiAPI.register({
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              referrer: referrer,
              session_key: session_key
            }).then(function (res) {
              wx.hideLoading();
              that.login();
            })
          }
        })
      }
    })
  }
})