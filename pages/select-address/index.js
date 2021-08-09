const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
const app = getApp()
Page({
  data: {
    semls: HalgaiI18.semls,
    addressList: [],
  },
  radioChange(e) {
    const items = this.data.addressList
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].id === e.detail.value
    }
    this.setData({
      items:this.data.addressList
    })

  },
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    }
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
      const listItems = res.data
      for (let i = 0, len = listItems.length; i < len; ++i) {
        listItems[i].checked = listItems[i].isDefault === "1"
      }
      that.setData({
      addressList: listItems
      });
  } else if (res.code == 700) {
      that.setData({
      addressList: null
      });
      }
    })
    
  },
  editTap: function (){
    console.log("hhhh")
  },
  saveAddressManager: function (){
    const items = this.data.addressList
    for (let i = 0, len = items.length; i < len; ++i) {
      if(items[i].checked){
        HalgaiAPI.saveDefaultAddress(items[i]).then(function(res) {
          if (res.code == 0) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    }
  }
})
