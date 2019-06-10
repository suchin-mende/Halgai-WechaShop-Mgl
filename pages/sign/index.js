import initCalendar from '../../template/calendar/index';
import { setTodoLabels } from '../../template/calendar/index';
const HalgaiAPI = require('../../halgaiApi/main')
const HalgaiI18 = require('../../language/mn')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    simls: HalgaiI18.simls
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
    initCalendar({
      afterTapDay: (currentSelect, allSelectedDays) => {
        // 不是今天，直接 return
        const myDate = new Date();
        // console.log('y:', myDate.getFullYear())
        // console.log('m:', myDate.getMonth() + 1)
        // console.log('d:', myDate.getDate())
        if (myDate.getFullYear() != currentSelect.year ||
          (myDate.getMonth() + 1) != currentSelect.month ||
          myDate.getDate() != currentSelect.day) {
          return
        }
        if (currentSelect.hasTodo) {
          wx.showToast({
            title: HalgaiI18.sijs0001,
            icon: 'none'
          })
          return
        }
        HalgaiAPI.scoreSign(wx.getStorageSync('token')).then(r => {
          wx.showToast({
            title: HalgaiI18.sijs0002,
            icon: 'none'
          })
          setTodoLabels({
            pos: 'bottom',
            dotColor: '#40',
            days: [{
              year: currentSelect.year,
              month: currentSelect.month,
              day: currentSelect.day,
              todoText: HalgaiI18.sijs0003
            }],
          });
        })
      }
    });
    HalgaiAPI.scoreSignLogs({
      token: wx.getStorageSync('token')
    }).then(res => {
      if (res.code == 0) {
        res.data.result.forEach(ele => {
          const _data = ele.dateAdd.split(" ")[0]
          setTodoLabels({
            pos: 'bottom',
            dotColor: '#40',
            days: [{
              year: parseInt(_data.split("-")[0]),
              month: parseInt(_data.split("-")[1]),
              day: parseInt(_data.split("-")[2]),
              todoText: HalgaiI18.sijs0003
            }],
          });
        })
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

  }
})
