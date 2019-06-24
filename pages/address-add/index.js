const HalgaiAPI = require('../../halgaiApi/main')
const regeneratorRuntime = require('../../utils/runtime')
const HalgaiI18 = require('../../language/mn')
//获取应用实例
var app = getApp()
Page({
  data: {
    pickerRegionRange: [],
    pickerSelect:[0, 0, 0],
    showRegionStr: HalgaiI18.adjs0001,
    admls: HalgaiI18.admls,
  },
  initRegionPicker () {
    HalgaiAPI.province().then(res => {
      if (res.code === 0) {
        let _pickerRegionRange = []
        _pickerRegionRange.push(res.data)
        _pickerRegionRange.push([{ name: HalgaiI18.adjs0001 }])
        _pickerRegionRange.push([{ name: HalgaiI18.adjs0001 }])
        this.data.pickerRegionRange = _pickerRegionRange
        this.bindcolumnchange({ detail: { column: 0, value: 0 } })
      }
    })
  },
  async initRegionDB (pname, cname, dname) {
    this.data.showRegionStr = pname + cname + dname
    let pObject = undefined
    let cObject = undefined
    let dObject = undefined
    if (pname) {
      const index = this.data.pickerRegionRange[0].findIndex(ele=>{
        return ele.name == pname
      })
      console.log('pindex', index)
      if (index >= 0) {
        this.data.pickerSelect[0] = index
        pObject = this.data.pickerRegionRange[0][index]
      }
    }
    if (!pObject) {
      return
    }
    const _cRes = await HalgaiAPI.nextRegion(pObject.id)
    if (_cRes.code === 0) {
      this.data.pickerRegionRange[1] = _cRes.data
      if (cname) {
        const index = this.data.pickerRegionRange[1].findIndex(ele => {
          return ele.name == cname
        })
        if (index >= 0) {
          this.data.pickerSelect[1] = index
          cObject = this.data.pickerRegionRange[1][index]
        }
      }
    }
    if (!cObject) {
      return
    }
    const _dRes = await HalgaiAPI.nextRegion(cObject.id)
    if (_dRes.code === 0) {
      this.data.pickerRegionRange[2] = _dRes.data
      if (dname) {
        const index = this.data.pickerRegionRange[2].findIndex(ele => {
          return ele.name == dname
        })
        if (index >= 0) {
          this.data.pickerSelect[2] = index
          dObject = this.data.pickerRegionRange[2][index]
        }
      }
    }
    this.setData({
      pickerRegionRange: this.data.pickerRegionRange,
      pickerSelect: this.data.pickerSelect,
      showRegionStr: this.data.showRegionStr,
      pObject: pObject,
      cObject: cObject,
      dObject: dObject
    })
  },
  bindchange: function(e) {
    console.log(e)
    const pObject = this.data.pickerRegionRange[0][e.detail.value[0]]
    const cObject = this.data.pickerRegionRange[1][e.detail.value[1]]
    const dObject = this.data.pickerRegionRange[2][e.detail.value[2]]
    const showRegionStr = pObject.name + cObject.name + dObject.name
    this.setData({
      pObject: pObject,
      cObject: cObject,
      dObject: dObject,
      showRegionStr: showRegionStr
    })
  },
  bindcolumnchange: function(e) {
    const column = e.detail.column
    const index = e.detail.value
    console.log('eeee:', e)
    const regionObject = this.data.pickerRegionRange[column][index]
    console.log('bindcolumnchange', regionObject)
    if (column === 2) {
      this.setData({
        pickerRegionRange: this.data.pickerRegionRange
      })
      return
    }
    if (column === 1) {
      this.data.pickerRegionRange[2] = [{ name: HalgaiI18.adjs0001 }]
    }
    if (column === 0) {
      this.data.pickerRegionRange[1] = [{ name: HalgaiI18.adjs0001 }]
      this.data.pickerRegionRange[2] = [{ name: HalgaiI18.adjs0001 }]
    }
    // // 后面的数组全部清空
    // this.data.pickerRegionRange.splice(column+1)
    // 追加后面的一级数组
    HalgaiAPI.nextRegion(regionObject.id).then(res => {
      if (res.code === 0) {
        this.data.pickerRegionRange[column + 1] = res.data
      }
      this.bindcolumnchange({ detail: { column: column + 1, value: 0 } })
    })
  },
  bindSave: function(e) {
    HalgaiAPI.addTempleMsgFormid({
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    if (linkMan == ""){
      getApp().showModal(this, {
        title: HalgaiI18.adjs0002,
        content: HalgaiI18.adjs0003,
        showCancel:false
      })
      return
    }
    if (mobile == ""){
      getApp().showModal(this, {
        title: HalgaiI18.adjs0002,
        content: HalgaiI18.adjs0004,
        showCancel:false
      })
      return
    }
    if (!this.data.pObject || !this.data.cObject){
      getApp().showModal(this, {
        title: HalgaiI18.adjs0002,
        content: HalgaiI18.adjs0005,
        showCancel:false
      })
      return
    }
    if (address == ""){
      getApp().showModal(this, {
        title: HalgaiI18.adjs0002,
        content: HalgaiI18.adjs0006,
        showCancel:false
      })
      return
    }
    if (code == ""){
      getApp().showModal(this, {
        title: HalgaiI18.adjs0002,
        content: HalgaiI18.adjs0007,
        showCancel:false
      })
      return
    }
    let apiResult
    if (that.data.id) {
      apiResult = HalgaiAPI.updateAddress({
        token: wx.getStorageSync('token'),
        id: that.data.id,
        provinceId: this.data.pObject.id,
        cityId: this.data.cObject.id,
        districtId: this.data.dObject ? this.data.dObject.id : '',
        linkMan: linkMan,
        address: address,
        mobile: mobile,
        code: code,
        isDefault: 'true'
      })
    } else {
      apiResult = HalgaiAPI.addAddress({
        token: wx.getStorageSync('token'),
        provinceId: this.data.pObject.id,
        cityId: this.data.cObject.id,
        districtId: this.data.dObject ? this.data.dObject.id : '',
        linkMan: linkMan,
        address: address,
        mobile: mobile,
        code: code,
        isDefault: 'true'
      })
    }
    apiResult.then(function (res) {
      if (res.code != 0) {
        // 登录错误
        wx.hideLoading();
        getApp().showModal(this, {
          title: HalgaiI18.adjs0008,
          content: res.msg,
          showCancel: false
        })
        return;
      }
      // 跳转到结算页面
      wx.navigateBack({})
    })
  },
  onLoad: function (e) {
    const _this = this
    _this.initRegionPicker() // 初始化省市区选择器
    if (e.id) { // 修改初始化数据库数据
      HalgaiAPI.addressDetail(e.id, wx.getStorageSync('token')).then(function (res) {
        if (res.code === 0) {
          _this.setData({
            id: e.id,
            addressData: res.data,
            showRegionStr: res.data.provinceStr + res.data.cityStr + res.data.areaStr
          });
          _this.initRegionDB(res.data.provinceStr, res.data.cityStr, res.data.areaStr)
          return;
        } else {
          getApp().showModal(this, {
            title: HalgaiI18.adjs0002,
            content: HalgaiI18.adjs0009,
            showCancel: false
          })
        }
      })
    }
  },
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    getApp().showModal(this, {
      title: HalgaiI18.adjs0002,
      content: HalgaiI18.adjs0010,
      success: function (res) {
        if (res.confirm) {
          HalgaiAPI.deleteAddress(id, wx.getStorageSync('token')).then(function () {
            wx.navigateBack({})
          })
        } else {
          console.log(HalgaiI18.adjs0011)
        }
      }
    })
  },
  readFromWx : function () {
    const _this = this
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        _this.initRegionDB(res.provinceName, res.cityName, res.countyName)
        _this.setData({
          wxaddress: res
        });
      }
    })
  }
})
