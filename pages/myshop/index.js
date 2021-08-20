// pages/myshop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    typeList:["ᠥᠮᠦᠳᠦ"," ᠳᠡᠪᠡᠯ"," ᠱᠠᠬᠠᠢ"," ᠮᠠᠯᠠᠭᠠᠢ"," ᠬᠦᠵᠦᠭᠦᠪᠴᠢ"],
    show:false,
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
    var that = this
    that.picker = that.selectComponent("#custom-picker")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  openCamera: function () {
    const that = this;
    let num = 9
    if(!that.data.tempFilePaths){
      
    }else{
      num = 9 - that.data.tempFilePaths.length
    }
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        if (!that.data.tempFilePaths){
          const tempFilePaths = res.tempFilePaths
          that.setData({
            tempFilePaths:tempFilePaths
          })
        }else{
          const newTempfilePaths = that.data.tempFilePaths.concat(res.tempFilePaths)
          that.setData({
            tempFilePaths:newTempfilePaths
          })
        }
      }
    })
  },
  delImage:function(index){
    const list = this.data.tempFilePaths
    list.splice(index.currentTarget.dataset.smile,1)
    this.setData({
      tempFilePaths:list
    })
    
  },
  
  showpicker(){
    var that = this
    that.picker.showDialog(that.data.typeList)
  },
  _lefttap(){
    this.setData({
      type:''
    })
  },
  _righttap(e){
    var that = this
    var type = e.detail.type
   this.setData({
     type:type
   })
  },
  _cancel(){
  },
  editContent:function (){
    this.setData({
      show:true
    })
  },
  exit:function (){
    this.setData({
      show:false
    })
  },
  textAreaUnfocus:function(e){
    this.setData({
      textContent:e.detail.value
    })
  }
})