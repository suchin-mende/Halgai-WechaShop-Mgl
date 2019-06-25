const regeneratorRuntime = require('../../utils/runtime')
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
const wxpay = require('../../utils/pay.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeSendRules: [],
    mamls: HalgaiI18.mamls
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
  onShow () {
    HalgaiAPI.payBillDiscounts().then(res => {
      if (res.code === 0) {
        this.setData({
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
  async bindSave(e) {
    const _this = this
    HalgaiAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    const amount = e.detail.value.amount;
    if (amount == "" || amount * 1 < 0) {
      wx.showToast({
        title: HalgaiI18.majs0001,
        icon: 'none'
      })
      return
    }
    const userMoney = await HalgaiAPI.userAmount(wx.getStorageSync('token'))
    if (userMoney.code != 0) {
      wx.showToast({
        title: userMoney.msg,
        icon: 'none'
      })
      return
    }
    const rechargeSendRule = this.data.rechargeSendRules.sort((a, b) => {
      return b.consume - a.consume
    }).find(ele => {
      return amount >= ele.consume
    })
    let _msg = HalgaiI18.majs0002 + amount + HalgaiI18.majs0003
    let needPayAmount = amount*1
    if (rechargeSendRule) {
      needPayAmount -= rechargeSendRule.discounts
      _msg += HalgaiI18.majs0004 + rechargeSendRule.discounts + HalgaiI18.majs0003
    }
    if (userMoney.data.balance*1 > 0) {
      _msg += HalgaiI18.majs0005 + userMoney.data.balance + HalgaiI18.majs0009
    }
    needPayAmount = needPayAmount.toFixed(2) // 需要买单支付的金额
    const wxpayAmount = (needPayAmount - userMoney.data.balance).toFixed(2) // 需要额外微信支付的金额
    console.log(needPayAmount)
    console.log(wxpayAmount)

    if (wxpayAmount > 0) {
      _msg += HalgaiI18.majs0008 + wxpayAmount + HalgaiI18.majs0009
    }
    getApp().showModal(this, {
      title: HalgaiI18.majs0010 ,
      content: _msg,
      confirmText: HalgaiI18.majs0011 ,
      cancelText: HalgaiI18.majs00012,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          _this.goPay(amount, wxpayAmount)
        }
      }
    });
  },
  goPay(amount, wxpayAmount){
    const _this = this
    if (wxpayAmount > 0) {
      wxpay.wxpay('paybill', wxpayAmount, 0, "/pages/asset/index", { money: amount});
    } else {
      HalgaiAPI.payBill({
        token: wx.getStorageSync('token'),
        money: amount
      }).then(function (res) {
        if (res.code == 0) {
          getApp().showModal(this, {
            title: HalgaiI18.majs0013 ,
            content: HalgaiI18.majs0014 ,
            showCancel: false
          })
        } else {
          getApp().showModal(this, {
            title: HalgaiI18.majs0015,
            content: res.msg,
            showCancel: false
          })
        }
      })
    }
  }
})
