const wxpay = require('../../utils/pay.js')
const app = getApp()
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({
  data: {
    orlmls: HalgaiI18.orlmls,
    statusType: HalgaiI18.orljs0001,
    currentType: 0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap: function(e) {
    const curType = e.currentTarget.dataset.index;
    console.log(e)
    this.data.currentType = curType
    this.setData({
    currentType: curType
    });
    console.log('this',this)
    this.onShow();
  },
  orderDetail: function(e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
    url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    getApp().showModal(this, {
    title: HalgaiI18.orljs0002,
    content: '',
    success: function(res) {
      if (res.confirm) {
      HalgaiAPI.orderClose(orderId, wx.getStorageSync('token')).then(function(res) {
        if (res.code == 0) {
        that.onShow();
            }
          })
        }
      }
    })
  },
  toPayTap: function(e) {
    const that = this;
    const orderId = e.currentTarget.dataset.id;
    let money = e.currentTarget.dataset.money;
    const needScore = e.currentTarget.dataset.score;
    HalgaiAPI.userAmount(wx.getStorageSync('token')).then(function(res) {
      if (res.code == 0) {
        // 增加提示框
        if (res.data.score < needScore) {
          wx.showToast({
            title: HalgaiI18.orljs0003,
            icon: 'none'
          })
          return;
        }
        let _msg = HalgaiI18.orljs0004 + money + HalgaiI18.orljs0005
        if (res.data.balance > 0) {
          _msg += HalgaiI18.orljs0006 + res.data.balance + HalgaiI18.orljs0005
          if (money - res.data.balance > 0) {
            _msg += HalgaiI18.orljs0008 + (money - res.data.balance) + HalgaiI18.orljs0005
          }
        }
        if (needScore > 0) {
          _msg += HalgaiI18.orljs0010 + money + HalgaiI18.orljs0011
        }
        money = money - res.data.balance
        getApp().showModal(this, {
          title: HalgaiI18.orljs0012,
          content: _msg,
          confirmText: HalgaiI18.orljs0013,
          cancelText: HalgaiI18.orljs0014,
          success: function (res) {
          console.log(res);
          if (res.confirm) {
          that._toPayTap(orderId, money)
          } else {
            console.log(HalgaiI18.orljs0015)
          }
          }
        });
      } else {
        getApp().showModal(this, {
          title: HalgaiI18.orljs0016,
          content: HalgaiI18.orljs0017,
          showCancel: false
        })
      }
    })
  },
  _toPayTap: function (orderId, money){
    const _this = this
    if (money <= 0) {
      // 直接使用余额支付
      HalgaiAPI.orderPay(orderId, wx.getStorageSync('token')).then(function (res) {
        _this.onShow();
      })
    } else {
      wxpay.wxpay('order', money, orderId, "/pages/order-list/index");
    }
  },
  onLoad: function(options) {
    if (options && options.type) {
      this.setData({
        currentType: options.type
      });
    }
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },
  getOrderStatistics: function() {
    var that = this;
    HalgaiAPI.orderStatistics(wx.getStorageSync('token')).then(function(res) {
      if (res.code == 0) {
        var tabClass = that.data.tabClass;
        if (res.data.count_id_no_pay > 0) {
          tabClass[0] = "red-dot"
        } else {
          tabClass[0] = ""
        }
        if (res.data.count_id_no_transfer > 0) {
          tabClass[1] = "red-dot"
        } else {
          tabClass[1] = ""
        }
        if (res.data.count_id_no_confirm > 0) {
          tabClass[2] = "red-dot"
        } else {
          tabClass[2] = ""
        }
        if (res.data.count_id_no_reputation > 0) {
          tabClass[3] = "red-dot"
        } else {
          tabClass[3] = ""
        }
        if (res.data.count_id_success > 0) {
          //tabClass[4] = "red-dot"
        } else {
          //tabClass[4] = ""
        }

        that.setData({
        tabClass: tabClass,
        });
      }
    })
  },
  onShow: function() {
    // 获取订单列表
    console.log('thisOrder',this.data.orderList)
    var that = this;
    var postData = {
      token: wx.getStorageSync('token')
    };
    postData.status = that.data.currentType;
    console.log('postData',postData)
    this.getOrderStatistics();
    HalgaiAPI.orderList(postData).then(function(res) {
      console.log('res',res)
      if (res.code == 0) {
        let newOrderList=[];
        //遍历orderList 如果that.data.currentType==res.data.oderList里面的status 便赋值
        for (let i = 0, len = res.data.orderList.length; i < len; ++i) {
          if(res.data.orderList[i].status == that.data.currentType){
            newOrderList.push(res.data.orderList[i]); 
          }
        }
        console.log('newOrderList',newOrderList)
        
        that.setData({
          orderList: newOrderList,
          logisticsMap: res.data.logisticsMap,
          goodsMap: res.data.goodsMap
        });
        if(newOrderList.length<1){
            that.setData({
            orderList: null,
            logisticsMap: {},
            goodsMap: {}
          })
        }
      } else {
        that.setData({
          orderList: null,
          logisticsMap: {},
          goodsMap: {}
        });
      }
    })

  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  }
})
