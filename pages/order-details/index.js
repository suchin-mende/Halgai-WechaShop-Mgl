const app = getApp();
const CONFIG = require('../../config.js')
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({
    data:{
      orderId:0,
      goodsList:[],
      yunPrice:"0.00",
      appid: CONFIG.appid,
      ordmls: HalgaiI18.ordmls
    },
    onLoad:function(e){
      var orderId = e.id;
      this.data.orderId = orderId;
      this.setData({
        orderId: orderId,
        ordmls: HalgaiI18.ordmls,
      });

    },
    onShow : function () {
      var that = this;
      HalgaiAPI.orderDetail(that.data.orderId, wx.getStorageSync('token')).then(function (res) {
        if (res.code != 0) {
          getApp().showModal(this, {
            title: HalgaiI18.ordjs0001,
            content: HalgaiI18.res.msg,
            showCancel: false
          })
          return;
        }
        that.setData({
          orderDetail: res.data
        });
      })
      var yunPrice = parseFloat(this.data.yunPrice);
      var allprice = 0;
      var goodsList = this.data.goodsList;
      for (var i = 0; i < goodsList.length; i++) {
        allprice += parseFloat(goodsList[0].price) * goodsList[0].number;
      }
      this.setData({
        allGoodsPrice: allprice,
        yunPrice: yunPrice
      });
    },
    wuliuDetailsTap:function(e){
      var orderId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/wuliu/index?id=" + orderId
      })
    },
    confirmBtnTap:function(e){
      let that = this;
      let orderId = this.data.orderId;
      HalgaiAPI.addTempleMsgFormid({
        token: wx.getStorageSync('token'),
        type: 'form',
        formId: e.detail.formId
      })
      getApp().showModal(this, {
        title: HalgaiI18.ordjs0002,
          content: '',
          success: function(res) {
            if (res.confirm) {
              HalgaiAPI.orderDelivery(orderId, wx.getStorageSync('token')).then(function (res) {
                if (res.code == 0) {
                  that.onShow();
                  // 模板消息，提醒用户进行评价
                  let postJsonString = {};
                  postJsonString.keyword1 = { value: that.data.orderDetail.orderInfo.orderNumber, color: '#173177' }
                  let keywords2 = HalgaiI18.ordjs0003;
                  if (app.globalData.order_reputation_score) {
                    keywords2 + HalgaiI18.ordjs0004 + app.globalData.order_reputation_score + HalgaiI18.ordjs0005;
                  }
                  postJsonString.keyword2 = { value: keywords2, color: '#173177' }
                  HalgaiAPI.sendTempleMsg({
                    module: 'immediately',
                    postJsonString: JSON.stringify(postJsonString),
                    template_id: 'uJL7D8ZWZfO29Blfq34YbuKitusY6QXxJHMuhQm_lco',
                    type: 0,
                    token: wx.getStorageSync('token'),
                    url: '/pages/order-details/index?id=' + orderId
                  })
                }
              })
            }
          }
      })
    },
    submitReputation: function (e) {
      let that = this;
      HalgaiAPI.addTempleMsgFormid({
        token: wx.getStorageSync('token'),
        type: 'form',
        formId: e.detail.formId
      })
      let postJsonString = {};
      postJsonString.token = wx.getStorageSync('token');
      postJsonString.orderId = this.data.orderId;
      let reputations = [];
      let i = 0;
      while (e.detail.value["orderGoodsId" + i]) {
        let orderGoodsId = e.detail.value["orderGoodsId" + i];
        let goodReputation = e.detail.value["goodReputation" + i];
        let goodReputationRemark = e.detail.value["goodReputationRemark" + i];

        let reputations_json = {};
        reputations_json.id = orderGoodsId;
        reputations_json.reputation = goodReputation;
        reputations_json.remark = goodReputationRemark;

        reputations.push(reputations_json);
        i++;
      }
      postJsonString.reputations = reputations;
      HalgaiAPI.orderReputation({
        postJsonString: JSON.stringify(postJsonString)
      }).then(function (res) {
        if (res.code == 0) {
          that.onShow();
          // 模板消息，通知用户已评价
          let postJsonString = {};
          postJsonString.keyword1 = { value: that.data.orderDetail.orderInfo.orderNumber, color: '#173177' }
          let keywords2 = HalgaiI18.ordjs0006;
          if (app.globalData.order_reputation_score) {
            keywords2 += app.globalData.order_reputation_score + HalgaiI18.ordjs0007;
          }
          postJsonString.keyword2 = { value: keywords2, color: '#173177' }
          HalgaiAPI.sendTempleMsg({
            module: 'immediately',
            postJsonString: JSON.stringify(postJsonString),
            template_id: 'uJL7D8ZWZfO29Blfq34YbuKitusY6QXxJHMuhQm_lco',
            type: 0,
            token: wx.getStorageSync('token'),
            url: '/pages/order-details/index?id=' + that.data.orderId
          })
        }
      })
    }
})
