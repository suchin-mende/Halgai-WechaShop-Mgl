
const HalgaiAPI = require('../../halgaiApi/main')
const CONFIG = require('../../config.js')
const HalgaiI18 = require('../../language/mn')
//応用実例を取得
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: 0,
    loadingMoreHidden: true,

    hasNoCoupons: true,
    coupons: [],
    searchInput: '',

    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0,
    //i18
    inmls: HalgaiI18.inmls,
    isOwner:false
  },

  tabClick: function(e) {
    let offset = e.currentTarget.offsetLeft;
    if (offset > 150) {
      offset = offset - 150
    } else {
      offset = 0;
    }
    this.setData({
      activeCategoryId: e.currentTarget.id,
      curPage: 1,
      cateScrollTop: offset
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //時間処理メソッド
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function(e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function(option) {
    var that = this
    this.setData({
      isOwner:option.isOwner
    })
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
      // title: HalgaiI18.injs0001
    })
    /**
     * 表示例：
     *
     */
    HalgaiAPI.banners({
      type: 'index'
    }).then(function(res) {
      if (res.code == 700) {
        getApp().showModal(this, {
          title: HalgaiI18.injs0002,
          content: HalgaiI18.injs0003,
          showCancel: false
        })
      } else {
        that.setData({
          banners: res.data
        });
      }
    }).catch(function(e) {
      wx.showToast({
        title: "res.msg",
        icon: 'none'
      })
    })
    HalgaiAPI.goodsCategory().then(function(res) {
      var categories = [{
        id: 0,
        name: HalgaiI18.injs000,
      }];
      if (res.code == 0) {
        for (var i = 0; i < res.data.length; i++) {
          categories.push(res.data[i]);
        }
      }
      that.setData({
        categories: categories,
        activeCategoryId: 0,
        curPage: 1
      });
      that.getGoodsList(0);
    })
    that.getCoupons();
    that.getNotice();
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  getGoodsList: function(categoryId, append) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.showLoading({
      "mask": true
    })
    HalgaiAPI.goods({
      categoryId: categoryId,
      nameLike: that.data.searchInput,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    }).then(function(res) {
      wx.hideLoading()
      if (res.code == 404 || res.code == 700) {
        let newData = {
          loadingMoreHidden: false
        }
        if (!append) {
          newData.goods = []
        }
        that.setData(newData);
        return
      }
      let goods = [];
      if (append) {
        goods = that.data.goods
      }
      for (var i = 0; i < res.data.length; i++) {
        goods.push(res.data[i]);
      }
      that.setData({
        loadingMoreHidden: true,
        goods: goods,
      });
    })
  },
  getCoupons: function() {
    var that = this;
    HalgaiAPI.coupons().then(function (res) {
      if (res.code == 0) {
        that.setData({
          hasNoCoupons: false,
          coupons: res.data
        });
      }
    })
  },
  gitCoupon: function(e) {
    const that = this
    if (e.currentTarget.dataset.pwd) {
      wx.navigateTo({
        url: "/pages/fetch-coupon/index?id=" + e.currentTarget.dataset.id
      })
      return
    }
    HalgaiAPI.fetchCoupons({
      id: e.currentTarget.dataset.id,
      token: wx.getStorageSync('token')
    }).then(function (res) {
      if (res.code == 20001 || res.code == 20002) {
        getApp().showModal(this, {
          title: HalgaiI18.injs0003,
          content: HalgaiI18.injs0004,
          showCancel: false
        })
        return;
      }
      if (res.code == 20003) {
        getApp().showModal(this, {
          title: HalgaiI18.injs0003,
          content: HalgaiI18.injs0005,
          showCancel: false
        })
        return;
      }
      if (res.code == 30001) {
        getApp().showModal(this, {
          title: HalgaiI18.injs0003,
          content: HalgaiI18.injs0006,
          showCancel: false
        })
        return;
      }
      if (res.code == 20004) {
        getApp().showModal(this, {
          title: HalgaiI18.injs0003,
          content: HalgaiI18.injs0007,
          showCancel: false
        })
        return;
      }
      if (res.code == 0) {
        wx.showToast({
          title: HalgaiI18.injs0008,
          icon: 'success',
          duration: 2000
        })
      } else {
        getApp().showModal(this, {
          title: HalgaiI18.injs0003,
          content: res.msg,
          showCancel: false
        })
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: '"' + wx.getStorageSync('mallName') + '" ' + CONFIG.shareProfile,
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid'),
      success: function(res) {
        // 転送成功
      },
      fail: function(res) {
        // 転送失敗
      }
    }
  },
  getNotice: function() {
    var that = this;
    HalgaiAPI.noticeList({pageSize: 5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        });
      }
    })
  },
  listenerSearchInput: function(e) {
    this.setData({
      searchInput: e.detail.value
    })

  },
  toSearch: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  onReachBottom: function() {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId)
  },
  edit: function (option) {
    
    var data = JSON.stringify(option.currentTarget.dataset.banner);
    wx.navigateTo({
      url: '/pages/userShop/editBanner/index?data='+data,
    })
  },
  openShop:function (){
    wx.navigateTo({
      url: '/pages/openshop-firstPage/index',
    })
  }
  
})

