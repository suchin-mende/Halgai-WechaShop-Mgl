const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
//获取应用实例
const app = getApp()
Page({
  data: {
    coupons: [],
    mycmls: HalgaiI18.mycmls
  },
  onLoad: function() {},
  onShow: function() {
    this.getMyCoupons();
  },
  getMyCoupons: function() {
    var that = this;
    HalgaiAPI.myCoupons({
      token: wx.getStorageSync('token'),
      status: 0
    }).then(function(res) {
      if (res.code == 0) {
        var coupons = res.data;
        if (coupons.length > 0) {
          that.setData({
            coupons: coupons
          });
        }
      }
    })
  },
  goBuy: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }

})
