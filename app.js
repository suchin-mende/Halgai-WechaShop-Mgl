const HalgaiAPI = require('halgaiApi/main')
const HalgaiI18 = require('language/mn.js')
App({
  navigateToLogin: false,
  onLaunch: function() {
    const that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: HalgaiI18.apjs0001,
        content: HalgaiI18.apjs0002,
        content: '',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: HalgaiI18.apja0003,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: HalgaiI18.apjs0004,
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
    //  获取接口和后台权限
    HalgaiAPI.vipLevel().then(res => {
      that.globalData.vipLevel = res.data
    })
    //  获取商城名称
    HalgaiAPI.queryConfig({
      key: 'mallName'
    }).then(function(res) {
      if (res.code == 0) {
        wx.setStorageSync('mallName', res.data.value);
      }
    })
    HalgaiAPI.scoreRules({
      code: 'goodReputation'
    }).then(function(res) {
      if (res.code == 0) {        
        that.globalData.order_reputation_score = res.data[0].score;
      }
    })
    // 获取充值的最低金额
    HalgaiAPI.queryConfig({
      key: 'recharge_amount_min'
    }).then(function(res) {
      if (res.code == 0) {
        that.globalData.recharge_amount_min = res.data.value;
      }
    })
    // 获取砍价设置
    HalgaiAPI.kanjiaList().then(function(res) {
      if (res.code == 0) {
        that.globalData.kanjiaList = res.data.result;
      }
    })
    // 判断是否登录
    let token = wx.getStorageSync('token');
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    HalgaiAPI.checkToken(token).then(function(res) {
      if (res.code != 0) {
        wx.removeStorageSync('token')
        that.goLoginPageTimeOut()
      }
    })
  },
  goLoginPageTimeOut: function() {
    if (this.navigateToLogin){
      return
    }
    wx.removeStorageSync('token')
    this.navigateToLogin = true
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)
  },
  goStartIndexPage: function() {
    setTimeout(function() {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },
  onShow (e) {
    this.globalData.launchOption = e
    // 保存邀请人
    if (e && e.query && e.query.inviter_id) {
      wx.setStorageSync('referrer', e.query.inviter_id)
    }
  },
  globalData: {                
    isConnected: true,
    launchOption: undefined,
    vipLevel: 0
  },
  showModal(caller,o){
    var component = caller.selectComponent('#modalComponent');
    component.showModal(o);
  }
})