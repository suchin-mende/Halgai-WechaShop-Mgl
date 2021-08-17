const app = getApp()
const CONFIG = require('../../config.js')
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({
	data: {
    balance:0.00,
    freeze:0,
    score:0,
    score_sign_continuous:0,
    mymls: HalgaiI18.mymls
  },
	onLoad() {

	},
  onShow() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      app.goLoginPageTimeOut()
    } else {
      that.setData({
        userInfo: userInfo,
        version: CONFIG.version,
        vipLevel: app.globalData.vipLevel
      })
    }
    this.getUserApiInfo();
    this.getUserAmount();
  },
  aboutUs : function () {
    getApp().showModal(this, {
      title: HalgaiI18.myjs0001,
      content: HalgaiI18.myjs0002,
      showCancel:false
    })
  },
  getPhoneNumber: function(e) {
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      getApp().showModal(this, {
        title: HalgaiI18.myjs0003,
        content: HalgaiI18.myjs0004 + e.detail.errMsg,
        showCancel: false
      })
      return;
    }
    var that = this;
    HalgaiAPI.bindMobile({
      token: wx.getStorageSync('token'),
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }).then(function (res) {
      if (res.code === 10002) {
        app.goLoginPageTimeOut()
        return
      }
      if (res.code == 0) {
        wx.showToast({
          title: HalgaiI18.myjs0005,
          icon: 'success',
          duration: 2000
        })
        that.getUserApiInfo();
      } else {
        getApp().showModal(this, {
          title: HalgaiI18.myjs0006,
          content: HalgaiI18.myjs0007,
          showCancel: false
        })
      }
    })
  },
  getUserApiInfo: function () {
    var that = this;
    HalgaiAPI.userDetail(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        let _data = {}
        _data.apiUserInfoMap = res.data
        if (res.data.base.mobile) {
          _data.userMobile = res.data.base.mobile
        }
        that.setData(_data);
      }
    })
  },
  getUserAmount: function () {
    var that = this;
    HalgaiAPI.userAmount(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        that.setData({
          balance: res.data.balance.toFixed(2),
          freeze: res.data.freeze.toFixed(2),
          score: res.data.score
        });
      }
    })
  },
  relogin:function(){
    app.goLoginPageTimeOut()
  },
  goAsset: function () {
    wx.navigateTo({
      url: "/pages/asset/index"
    })
  },
  goScore: function () {
    wx.navigateTo({
      url: "/pages/score/index"
    })
  },
  goOrder: function (e) {
    wx.navigateTo({
      url: "/pages/order-list/index?type=" + e.currentTarget.dataset.type
    })
  },
  goOpenShop: function(){
    wx.navigateTo({
      url: '/pages/openshop-firstPage/index',
    })
  }
})
