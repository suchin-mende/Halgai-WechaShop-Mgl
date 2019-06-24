const wxpay = require('../../utils/pay.js')
const HalgaiAPI = require('../../halgaiApi/main')
import drawQrcode from '../../utils/weapp.qrcode.min.js'
const app = getApp()
const HalgaiI18 = require('../../language/mn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remls: HalgaiI18.remls,
    uid: undefined,
    showalipay: false,
    rechargeSendRules: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recharge_amount_min = app.globalData.recharge_amount_min;
    if (!recharge_amount_min) {
      recharge_amount_min = 0;
    }
    this.setData({
      uid: wx.getStorageSync('uid'),
      recharge_amount_min: recharge_amount_min
    });
  },

  /**
     * 点击充值优惠的充值送
     */
  rechargeAmount: function (e) {
    var confine = e.currentTarget.dataset.confine;
    var amount = confine;
    this.setData({
      amount: amount
    });
    wxpay.wxpay('recharge', amount, 0, "/pages/my/index");
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
    const _this = this
    HalgaiAPI.rechargeSendRules().then(res => {
      if (res.code === 0) {
        _this.setData({
          rechargeSendRules: res.data
        });
      }
    })

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
    const that = this;
    const amount = e.detail.value.amount;

    if (amount == "" || amount * 1 < 0) {
      // showMask.show({
      //   title: HalgaiI18.rejs0001,
      //   content: HalgaiI18.rejs0002,
      //   showCancel: false
      // })
      getApp().showModal(this,{
        title: HalgaiI18.rejs0001,
        content: HalgaiI18.rejs0002,
        showCancel: false
      });
    
      return
    }
    if (amount * 1 < that.data.recharge_amount_min * 1) {
      wx.showModal({
        title: HalgaiI18.rejs0001,
        content: HalgaiI18.rejs0004 + that.data.recharge_amount_min + HalgaiI18.rejs0005,
        showCancel: false
      })
      return
    }
    that.setData({
      showalipay: e.detail.value.type == 'alipay'
    })
    if (e.detail.value.type == 'wx') {
      // 微信充值
      wxpay.wxpay('recharge', amount, 0, "/pages/my/index");
    } else {
      // 支付宝充值
      HalgaiAPI.alipay({
        token: wx.getStorageSync('token'),
        money: amount
      }, 'post').then(res => {
        if (res.code != 0) {
          wx.showModal({
            title: HalgaiI18.rejs0001,
            content: res.msg,
            showCancel: false
          })
          return
        }
        drawQrcode({
          width: 200,
          height: 200,
          canvasId: 'myQrcode',
          text: res.data,
          _this: that
        })
      })
    }
  },
  saveToMobile: function () {
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: function (res) {
        let tempFilePath = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: (res) => {
            wx.showModal({
              content: HalgaiI18.rejs0007,
              showCancel: false,
              confirmText: HalgaiI18.rejs0008,
              confirmColor: '#333'
            })
          },
          fail: (res) => {
            wx.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  }
})
