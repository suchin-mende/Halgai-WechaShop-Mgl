const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail: {},
    swiperCurrent: 0,
    kamls: HalgaiI18.kamls
  },

  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onLoad: function(e) {
    this.data.id = e.id;
    this.data.kjId = e.kjId;
    this.data.joiner = e.joiner;
  },
  onShow: function() {
    var that = this
    HalgaiAPI.goodsDetail(that.data.id).then(function(res) {
      if (res.code == 0) {
        that.data.goodsDetail = res.data;
        if (res.data.basicInfo.videoId) {
          that.getVideoSrc(res.data.basicInfo.videoId);
        }
        that.setData({
          goodsDetail: res.data
        });
        WxParse.wxParse('article', 'html', res.data.content, that, 5);
        that.getKanjiaInfo(that.data.kjId, that.data.joiner);
        that.getKanjiaInfoMyHelp(that.data.kjId, that.data.joiner);
      }
    })
  },
  onShareAppMessage: function() {
    var that = this;
    return {
      title: HalgaiI18.kajs0001,
      path: "/pages/kanjia/index?kjId=" + that.data.kjId + "&joiner=" + that.data.joiner + "&id=" + that.data.id,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  getVideoSrc: function(videoId) {
    var that = this;
    HalgaiAPI.videoDetail(videoId).then(function(res) {
      if (res.code == 0) {
        that.setData({
          videoMp4Src: res.data.fdMp4
        });
      }
    })
  },
  getKanjiaInfo: function(kjid, joiner) {
    var that = this;
    HalgaiAPI.kanjiaDetail(kjid, joiner).then(function(res) {
      if (res.code != 0) {
        wx.showModal({
          title: HalgaiI18.kajs0007,
          content: res.msg,
          showCancel: false
        })
        return;
      }
      that.setData({
        kanjiaInfo: res.data
      });
    })
  },
  getKanjiaInfoMyHelp: function(kjid, joiner) {
    var that = this;
    HalgaiAPI.kanjiaHelpDetail(kjid, joiner, wx.getStorageSync('token')).then(function(res) {
      if (res.code == 0) {
        that.setData({
          kanjiaInfoMyHelp: res.data,
          curuid: wx.getStorageSync('uid')
        });
      }
    })
  },
  helpKanjia: function() {
    var that = this;
    HalgaiAPI.kanjiaHelp(that.data.kjId, that.data.joiner, wx.getStorageSync('token'), '').then(function(res) {
      if (res.code != 0) {
        wx.showModal({
          title: HalgaiI18.kajs0007,
          content: res.msg,
          showCancel: false
        })
        return;
      }
      that.setData({
        mykanjiaInfo: res.data
      });
      wx.showModal({
        title: HalgaiI18.kajs0004,
        content: HalgaiI18.kajs0005 + res.data.cutPrice + HalgaiI18.kajs0006,
        showCancel: false
      })
      that.getKanjiaInfo(that.data.kjId, that.data.joiner);
      that.getKanjiaInfoMyHelp(that.data.kjId, that.data.joiner);
    })
  },
  tobuy: function() {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + this.data.kanjiaInfo.kanjiaInfo.goodsId + "&kjId=" + this.data.kanjiaInfo.kanjiaInfo.kjId
    })
  }
})
