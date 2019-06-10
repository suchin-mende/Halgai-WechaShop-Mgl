const HalgaiAPI = require('../../halgaiApi/main')
const app = getApp()
const HalgaiI18 = require('../../language/mn')
Page({
  data: {
    wumls: HalgaiI18.wumls
  },
  onLoad: function (e) {
    var orderId = e.id;
    this.data.orderId = orderId;
  },
  onShow: function () {
    var that = this;
    HalgaiAPI.orderDetail(that.data.orderId, wx.getStorageSync('token')).then(function (res) {
      if (res.code != 0) {
        wx.showModal({
          title: HalgaiI18.wujs0001,
          content: res.msg,
          showCancel: false
        })
        return;
      }
      that.setData({
        orderDetail: res.data,
        logisticsTraces: res.data.logisticsTraces.reverse()
      });
    })
  }
})
