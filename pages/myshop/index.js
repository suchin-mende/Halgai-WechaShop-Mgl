// pages/myshop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      "id": 101,
      "name": " ᠰᠡᠯᠡᠭᠦᠴᠡᠨ ᠵᠤᠭᠠᠴᠠᠬᠤ",
      "parent_id": "null"
    }, {
      "id": 102,
      "name": " ᠬᠤᠪᠴᠠᠰᠤ ᠵᠠᠰᠠᠯ",
      "parent_id": "null"
    }, {
      "id": 103,
      "name": " ᠮᠠᠯ ᠠᠵᠤ ᠠᠬᠤᠢ",
      "parent_id": "null"
    }, {
      "id": 104,
      "name": " ᠤᠨᠴᠠ ᠭᠠᠷᠤᠯᠳᠠ",
      "parent_id": "null"
    }, {
      "id": 105,
      "name": "ᠬᠡᠷ᠎ᠦᠨ ᠴᠢᠮᠡᠭᠯᠡᠯ",
      "parent_id": "null"
    }, {
      "id": 106,
      "name": " ᠰᠤᠷᠭᠠᠨ ᠬᠦᠮᠦᠵᠢᠯ",
      "parent_id": "null"
    }, {
      "id": 107,
      "name": " ᠠᠮᠢᠳᠤᠷᠠᠯ᠎ᠤᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ",
      "parent_id": "null"
    }, {
      "id": 108,
      "name": " ᠬᠤᠷᠢᠮ ᠶᠤᠰᠤᠯᠠᠯ",
      "parent_id": "null"
    }, {
      "id": 109,
      "name": " ᠵᠤᠭᠠᠴᠠᠯ",
      "parent_id": "null"
    }, {
      "id": 110,
      "name": " ᠭᠠᠷ ᠤᠷᠠᠯᠠᠯ᠎ᠤᠨ ᠪᠦᠳᠦᠭᠡᠭᠳᠡᠭᠦᠨ",
      "parent_id": "null"
    }, {
      "id": 111,
      "name": " ᠬᠤᠭᠤᠯᠠ ᠢᠳᠡᠬᠡᠨ",
      "parent_id": "null"
    }, {
      "id": 112,
      "name": " ᠪᠤᠰᠤᠳ",
      "parent_id": "null"
    }, {
      "id": 201,
      "name": " ᠪᠠᠭᠠᠷ",
      "parent_id": 101
    }, {
      "id": 202,
      "name": "KTV",
      "parent_id": 101
    }, {
      "id": 203,
      "name": " ᠪᠡᠶ᠎ᠡ ᠤᠭᠢᠶᠠᠬᠤ",
      "parent_id": 101
    }, {
      "id": 204,
      "name": " ᠬᠥᠯ ᠢᠯᠡᠯᠭᠡ",
      "parent_id": 101
    }, {
      "id": 205,
      "name": " ᠬᠠᠯᠠᠭᠤᠨ ᠷᠠᠱᠢᠶᠠᠨ",
      "parent_id": 101
    }, {
      "id": 206,
      "name": "ᠮᠤᠭ᠌ᠭᠤᠯ ᠳᠡᠪᠡᠯ ᠲᠡᠷᠯᠢᠭ",
      "parent_id": 102
    }, {
      "id": 207,
      "name": " ᠵᠤᠳᠤᠭ ᠳᠤᠬᠤᠤ",
      "parent_id": 102
    }, {
      "id": 208,
      "name": " ᠰᠠᠬᠠᠢ ᠭᠤᠲᠤᠯ",
      "parent_id": 102
    }, {
      "id": 209,
      "name": " ᠵᠠᠰᠠᠯ ᠴᠢᠮᠡᠭᠯᠡᠯ",
      "parent_id": 102
    }, {
      "id": 210,
      "name": " ᠬᠤᠷᠢᠶ᠎ᠠ ᠬᠦᠷᠢᠶ᠎ᠡ",
      "parent_id": 103
    }, {
      "id": 211,
      "name": " ᠲᠤᠤᠷ ᠬᠦᠷᠢᠶ᠎ᠡ",
      "parent_id": 103
    }, {
      "id": 212,
      "name": " ᠦᠷ᠎ᠡ᠎ᠶᠢᠨ ᠮᠠᠯ᠎᠎ᠶᠢᠨ ᠵᠠᠬ᠎ᠠ",
      "parent_id": 103
    }, {
      "id": 213,
      "name": " ᠳᠡᠭᠡᠰᠦ ᠳᠠᠲᠠᠯᠭ᠎ᠠ",
      "parent_id": 103
    }, {
      "id": 214,
      "name": " ᠡᠪᠡᠰᠦ ᠪᠤᠷᠳᠤᠭ᠎ᠠ",
      "parent_id": 103
    }, {
      "id": 215,
      "name": " ᠮᠠᠯ᠎ᠤᠨ ᠡᠮ",
      "parent_id": 103
    }, {
      "id": 216,
      "name": " ᠬᠤᠨᠢ ᠤᠭᠢᠶᠠᠬᠤ ᠮᠠᠱᠢᠨ",
      "parent_id": 103
    }, {
      "id": 217,
      "name": " ᠡᠪᠡᠰᠦ ᠬᠠᠳᠤᠬᠤ ᠮᠠᠱᠢᠨ",
      "parent_id": 103
    }, {
      "id": 218,
      "name": " ᠮᠠᠱᠢᠨ ᠳᠤᠨᠤᠭ",
      "parent_id": 103
    }, {
      "id": 219,
      "name": " ᠮᠠᠱᠢᠨ ᠳᠤᠨᠤᠭ",
      "parent_id": 103
    }, {
      "id": 220,
      "name": " ᠤᠯᠠᠭᠠᠨ ᠢᠳᠡᠭᠡ",
      "parent_id": 103
    }, {
      "id": 221,
      "name": " ᠴᠠᠭᠠᠨ ᠢᠳᠡᠭᠡ",
      "parent_id": 103
    }, {
      "id": 222,
      "name": " ᠪᠤᠲᠠ ᠮᠠᠯ᠎ᠤᠨ ᠬᠤᠳᠠᠯᠳᠤᠭ᠎ᠠ",
      "parent_id": 103
    }, {
      "id": 223,
      "name": " ᠪᠤᠭ ᠮᠠᠯ᠎ᠤᠨ ᠬᠤᠳᠠᠯᠳᠤᠭ᠎ᠠ",
      "parent_id": 103
    }, {
      "id": 224,
      "name": " ᠮᠠᠯ᠎ᠤᠨ ᠭᠠᠷᠤᠯᠳᠠ",
      "parent_id": 103
    }, {
      "id": 225,
      "name": " ᠴᠠᠭᠠᠨ ᠢᠳᠡᠭᠡᠨ",
      "parent_id": 104
    }, {
      "id": 226,
      "name": " ᠤᠯᠠᠭᠠᠨ ᠢᠳᠡᠭᠡᠨ",
      "parent_id": 104
    }, {
      "id": 227,
      "name": " ᠬᠠᠳᠠᠭᠰᠠᠨ ᠪᠤᠷᠴᠠ",
      "parent_id": 104
    }, {
      "id": 228,
      "name": " ᠪᠤᠤᠪᠤ ᠪᠤᠭᠤᠷᠰᠤᠭ",
      "parent_id": 104
    }, {
      "id": 229,
      "name": " ᠱᠢᠬᠢᠷ",
      "parent_id": 104
    }, {
      "id": 230,
      "name": " ᠪᠤᠰᠤᠳ ᠭᠠᠷᠤᠯᠳᠠ",
      "parent_id": 104
    }, {
      "id": 231,
      "name": "ᠭᠡᠷ᠎ᠦᠨ ᠳᠥᠰᠦᠪ ᠵᠢᠷᠤᠭ",
      "parent_id": 105
    }, {
      "id": 232,
      "name": " ᠪᠠᠷᠢᠯᠭ᠎ᠠ᠎ᠶᠢᠨ ᠮᠠᠲ᠋ᠧᠷᠢᠶᠠᠯ",
      "parent_id": 105
    }, {
      "id": 233,
      "name": " ᠭᠡᠷ᠎᠎ᠤᠨ ᠡᠳ᠋ ᠬᠡᠷᠡᠭᠰᠡᠯ",
      "parent_id": 105
    }, {
      "id": 234,
      "name": " ᠠᠯᠪᠠᠲᠠᠨ",
      "parent_id": 106
    }, {
      "id": 235,
      "name": " ᠳᠤᠰᠭᠠᠢ ᠠᠵᠢᠯ᠎ᠤᠨ ᠮᠡᠷᠭᠡᠵᠢᠯ",
      "parent_id": 106
    }, {
      "id": 236,
      "name": " ᠭᠠᠳᠠᠭᠠᠳᠤ ᠬᠡᠯᠡ",
      "parent_id": 106
    }, {
      "id": 237,
      "name": " ᠳᠠᠭᠤᠤ ᠬᠦᠭᠵᠢᠮ",
      "parent_id": 106
    }, {
      "id": 238,
      "name": " ᠤᠷᠠᠨ ᠵᠢᠷᠤᠭ",
      "parent_id": 106
    }, {
      "id": 239,
      "name": " ᠵᠢᠯᠤᠭᠤᠴᠢ᠎ᠶᠢᠨ ᠦᠨᠡᠮᠯᠡᠯ",
      "parent_id": 106
    }, {
      "id": 240,
      "name": " ᠮᠤᠨᠭ᠌ᠭᠤᠯ ᠨᠤᠮ",
      "parent_id": 106
    }, {
      "id": 241,
      "name": " ᠤᠶᠤᠨ᠎ᠤ ᠳᠤᠭᠯᠠᠭᠠᠮ",
      "parent_id": 106
    }, {
      "id": 242,
      "name": " ᠬᠡᠦᠬᠡᠳ᠎ᠦᠨ ᠰᠤᠷᠭᠠᠨ ᠬᠦᠮᠦᠵᠢᠯ",
      "parent_id": 106
    }, {
      "id": 243,
      "name": " ᠭᠡᠷ ᠨᠡᠭᠦᠭᠦ᠌",
      "parent_id": 107
    }, {
      "id": 244,
      "name": " ᠭᠡᠷ ᠠᠬᠤᠢ᠎ᠶᠢᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ",
      "parent_id": 107
    }, {
      "id": 245,
      "name": " ᠴᠡᠴᠡᠭ᠎ᠦᠨ ᠳᠡᠯᠭᠡᠭᠦᠷ",
      "parent_id": 107
    }, {
      "id": 246,
      "name": " ᠵᠤᠴᠢᠳ᠎ᠤᠨ ᠪᠠᠭᠤᠳᠠᠯ",
      "parent_id": 107
    }, {
      "id": 247,
      "name": " ᠬᠠᠤᠯᠢ ᠴᠠᠭᠠᠵᠠ᠎ᠶᠢᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ",
      "parent_id": 107
    }, {
      "id": 248,
      "name": " ᠰᠤᠶᠤᠯ ᠵᠠᠭᠤᠴᠢᠯᠠᠭᠤᠷ",
      "parent_id": 107
    }, {
      "id": 249,
      "name": " ᠮᠠᠱᠢᠨ ᠵᠠᠰᠠᠬᠤ",
      "parent_id": 107
    }, {
      "id": 250,
      "name": " ᠳᠤᠭᠤᠢ ᠵᠠᠰᠠᠬᠤ",
      "parent_id": 107
    }, {
      "id": 251,
      "name": " ᠵᠢᠷᠤᠭ ᠰᠡᠭᠦᠳᠡᠷ",
      "parent_id": 108
    }, {
      "id": 252,
      "name": " ᠵᠢᠰᠦ ᠭᠤᠶᠤᠯᠬᠤ",
      "parent_id": 108
    }, {
      "id": 253,
      "name": " ᠨᠠᠢᠷ᠎ᠤᠨ ᠬᠡᠷᠡᠭᠰᠡᠯ",
      "parent_id": 108
    }, {
      "id": 254,
      "name": " ᠬᠤᠷᠢᠮ᠎ᠤᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ",
      "parent_id": 108
    }, {
      "id": 255,
      "name": " ᠨᠠᠢᠷ᠎ᠤᠨ ᠲᠠᠯᠠᠪᠠᠢ",
      "parent_id": 108
    }, {
      "id": 256,
      "name": " ᠨᠠᠢᠷ᠎ᠤᠨ ᠲᠠᠯᠠᠪᠠᠢ᠎ᠶᠢᠨ ᠴᠢᠮᠡᠭᠯᠡᠯ",
      "parent_id": 108
    }, {
      "id": 257,
      "name": " ᠬᠤᠷᠢᠮ᠎ᠤᠨ ᠲᠡᠷᠭᠡ",
      "parent_id": 108
    }, {
      "id": 258,
      "name": " ᠬᠤᠷᠢᠮ᠎ᠤᠨ ᠭᠡᠷ᠎ᠦᠨ ᠴᠢᠮᠡᠭᠯᠡᠯ",
      "parent_id": 108
    }, {
      "id": 259,
      "name": " ᠬᠤᠸᠠᠷ ᠴᠡᠴᠡᠭ",
      "parent_id": 108
    }, {
      "id": 260,
      "name": " ᠠᠷᠢᠬᠢ ᠳᠠᠷᠤᠰᠤ᠎ᠶᠢᠨ ᠵᠠᠬᠢᠶᠠᠯᠠᠭ᠎ᠠ",
      "parent_id": 108
    }, {
      "id": 261,
      "name": " ᠦᠵᠡᠮᠵᠢ᠎ᠶᠢᠨ ᠤᠷᠤᠨ",
      "parent_id": 109
    }, {
      "id": 262,
      "name": " ᠵᠤᠭᠠᠴᠠᠯ᠎ᠤᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ",
      "parent_id": 109
    }, {
      "id": 263,
      "name": " ᠮᠠᠯᠴᠢᠨ ᠠᠢᠯ",
      "parent_id": 109
    }, {
      "id": 264,
      "name": " ᠵᠠᠮ ᠳᠠᠭᠠᠭᠤᠯᠤᠭᠴᠢ",
      "parent_id": 109
    }, {
      "id": 265,
      "name": " ᠠᠷᠠᠰᠤᠨ ᠡᠳᠡᠯᠡᠯ",
      "parent_id": 110
    }, {
      "id": 266,
      "name": " ᠠᠯᠳᠠ ᠮᠥᠩᠭᠦᠨ ᠡᠳᠡᠯᠡᠯ",
      "parent_id": 110
    }, {
      "id": 267,
      "name": " ᠮᠤᠩᠭᠤᠯ ᠡᠯᠧᠮᠧᠨ᠋ᠲ",
      "parent_id": 110
    }, {
      "id": 268,
      "name": " ᠭᠠᠷ ᠤᠷᠠᠯᠠᠯ",
      "parent_id": 110
    }, {
      "id": 269,
      "name": " ᠵᠠᠰᠠᠯ ᠵᠡᠮᠰᠦᠭ",
      "parent_id": 110
    }, {
      "id": 270,
      "name": " ᠰᠤᠭᠤᠮᠠᠯ",
      "parent_id": 110
    }, {
      "id": 271,
      "name": " ᠱᠢᠷᠤᠢ᠎ᠶᠢᠨ ᠪᠦᠳᠦᠭᠡᠭᠳᠡᠭᠦᠨ",
      "parent_id": 110
    }, {
      "id": 272,
      "name": " ᠮᠤᠩᠭᠤᠯ ᠬᠤᠭᠤᠯᠠ",
      "parent_id": 111
    }, {
      "id": 273,
      "name": " ᠲᠦᠷᠭᠡᠨ ᠬᠤᠭᠤᠯᠠ",
      "parent_id": 111
    }, {
      "id": 274,
      "name": " ᠪᠦᠷᠢᠶᠠᠳ ᠬᠤᠭᠤᠯᠠ",
      "parent_id": 111
    }, {
      "id": 275,
      "name": " ᠴᠠᠢ᠎ᠶᠢᠨ ᠥᠷᠦᠭᠡ",
      "parent_id": 111
    }, {
      "id": 276,
      "name": " ᠬᠠᠯᠠᠭᠤᠨ ᠳᠤᠭᠤᠭ᠎ᠠ",
      "parent_id": 111
    }, {
      "id": 277,
      "name": " ᠰᠤᠷᠤᠯᠢᠭ",
      "parent_id": 111
    }, {
      "id": 278,
      "name": " ᠱᠢᠨᠵᠢᠶᠠᠩ ᠬᠤᠭᠤᠯᠠ",
      "parent_id": 111
    }, {
      "id": 279,
      "name": " ᠵᠡᠭᠦᠨ ᠬᠤᠢᠳᠤ᠎ᠶᠢᠨ ᠨᠤᠭᠤᠭ᠎ᠠ",
      "parent_id": 111
    }, {
      "id": 280,
      "name": " ᠺᠤᠹᠧ",
      "parent_id": 111
    }, {
      "id": 281,
      "name": " ᠶᠠᠫᠤᠨ ᠬᠤᠭᠤᠯᠠ",
      "parent_id": 111
    }, {
      "id": 282,
      "name": " ᠪᠤᠰᠤᠳ ᠢᠳᠡᠭᠡᠨ",
      "parent_id": 111
    }, {
      "id": 283,
      "name": " ᠪᠤᠰᠤᠳ",
      "parent_id": 112
    }],
    FtypeList: ["ᠥᠮᠦᠳᠦ", " ᠳᠡᠪᠡᠯ", " ᠱᠠᠬᠠᠢ", " ᠮᠠᠯᠠᠭᠠᠢ", " ᠬᠦᠵᠦᠭᠦᠪᠴᠢ"],
    StypeList: ["ᠥᠮᠦᠳᠦ", " ᠳᠡᠪᠡᠯ", " ᠱᠠᠬᠠᠢ", " ᠮᠠᠯᠠᠭᠠᠢ", " ᠬᠦᠵᠦᠭᠦᠪᠴᠢ"],
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = this.data.typeList
    console.log("typelist", data)
    var flist = [];
    var slist = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.parent_id == 'null') {
        flist.push(element)
      } else {
        slist.push(element)
      }
    }
    console.log("slist", slist)
    this.setData({
      FtypeList: flist,
      StypeList: slist
    })
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
    if (!that.data.tempFilePaths) {

    } else {
      num = 9 - that.data.tempFilePaths.length
    }
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        if (!that.data.tempFilePaths) {
          const tempFilePaths = res.tempFilePaths
          that.setData({
            tempFilePaths: tempFilePaths
          })
        } else {
          const newTempfilePaths = that.data.tempFilePaths.concat(res.tempFilePaths)
          that.setData({
            tempFilePaths: newTempfilePaths
          })
        }
      }
    })
  },
  delImage: function (index) {
    const list = this.data.tempFilePaths
    list.splice(index.currentTarget.dataset.smile, 1)
    this.setData({
      tempFilePaths: list
    })

  },

  showpicker() {
    var that = this
    console.log('show', that.data.FtypeList)
    that.picker.showDialog(that.data.StypeList)
  },
  _lefttap() {
    this.setData({
      type: ''
    })
  },
  _righttap(e) {
    var that = this
    var type = e.detail.type
    this.setData({
      type: type
    })
  },
  _cancel() {},
  editContent: function () {
    this.setData({
      show: true
    })
  },
  exit: function () {
    this.setData({
      show: false
    })
  },
  textAreaUnfocus: function (e) {
    this.setData({
      textContent: e.detail.value
    })
  },
})