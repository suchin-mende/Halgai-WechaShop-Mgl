// pages/shop-type/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chosen:1,
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
  onShow: function () {
    this.setData({
      chosen:chosen
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
  payMoney: function(){
    wx.navigateBack()
  },
  choseOne: function(e){
    console.log(e);
  },
  baiyin: function(){
    this.setData({
      chosen:1
    })
  },
  huangjin: function(){
    this.setData({
      chosen:2
    })
  },
  bojin: function(){
    this.setData({
      chosen:3
    })
  },
  zuanshi: function(){
    this.setData({
      chosen:4
    })
  },
})