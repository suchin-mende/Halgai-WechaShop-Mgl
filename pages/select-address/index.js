const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/zh-cn')
const app = getApp()
Page({
  data: {
    semls: HalgaiI18.semls,
    addressList: []
  },

  selectTap: function(e) {
    var id = e.currentTarget.dataset.id;
    HalgaiAPI.updateAddress({
    token: wx.getStorageSync('token'),
    id: id,
    isDefault: 'true'
    }).then(function(res) {
      wx.navigateBack({})
    })
  },

  addAddess: function() {
    wx.navigateTo({
      url: "/pages/address-add/index"
    })
  },

  editAddess: function(e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },

  onLoad: function() {
    console.log('onLoad')


  },
  onShow: function() {
    this.initShippingAddress();
  },
  initShippingAddress: function() {
    var that = this;
    HalgaiAPI.queryAddress(wx.getStorageSync('token')).then(function(res) {
    if (res.code == 0) {
      that.setData({
      addressList: res.data
      });
  } else if (res.code == 700) {
      that.setData({
      addressList: null
      });
      }
    })
  }

})