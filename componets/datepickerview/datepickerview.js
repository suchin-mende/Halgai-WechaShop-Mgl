var that
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Flist: {
      type: Array,
      value: []
    },
    Slist: {
      type: Array,
      value: []
    },
    end: {
      type: Number,
      value: 9999
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    value: [0],
    FtypeList: [],
    StypeList: [],
    type:'',
    dialogh: 0
  },
  attached: function () {
    console.log('attached')
    that = this
    that.animation = wx.createAnimation({
      duration: 300
    })
    var dialoghpx = 500 / 750 * wx.getSystemInfoSync().windowWidth
    that.setData({
      dialogh: dialoghpx
    })
  },
  detached: function () {
    console.log('detached')
    
  },
  pageLifetimes: {
    //组件所在的页面被展示时执行 最低版本2.2.3
    show: function () {
      console.log('ohyeye',this)
      console.log('页面show',that.properties.Flist)
      this.setData({
        FtypeList:that.properties.Flist,
        StypeList:that.properties.Slist
      })
    },
    //组件所在的页面被隐藏时执行 最低版本2.2.3
    hide: function () {
      console.log('页面被隐藏')
    },
    //这个函数一般使用场景较少，了解就可以了  最低版本2.4.0
    resize: function (size) {
      console.log('页面尺寸变化')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindChange: function (e) {
      var that = this
      const val = e.detail.value
      console.log('e',e.detail.value)
      var flistelement = that.data.FtypeList[val[0]].id
      console.log('firstPor',that.data.FtypeList[val[0]].name)
      var StypeList = that.data.StypeList
      console.log("StypeList",StypeList)
      var slist = []
      for (let i = 0; i < StypeList.length; i++) {
        const element = StypeList[i];
        if(element.parent_id==flistelement){
          slist.push(element)
        }
      }
      console.log('secondPor',slist[val[1]].name)
      console.log("slist",slist)
      that.setData({
        NStypeList: slist,
        type:that.data.FtypeList[val[0]].name+slist[val[1]].name
      })
      
    },
    showDialog(typeList){
      var initList = []
      for (let i = 0; i < typeList.length; i++) {
        const element = typeList[i];
        if (element.parent_id==101) {
          initList.push(element)
        }
      }
      that.setData({
        isShow: true,
        NStypeList:initList
      })
      that.animation.translateY(that.data.dialogh).translateY(0).step()
      that.setData({animation: that.animation.export()})
    },
    cancel(){
      this.triggerEvent("cancel")
      that.dimsss()
    },
    dimsss(){
      that.animation.translateY(that.data.dialogh).step()
      that.setData({animation: that.animation.export()})
      setTimeout(() => {
        that.setData({
          isShow: false
        })
     }, 300)
    },
    lefttap(){
      this.triggerEvent("lefttap")
      that.dimsss()
    },
    righttap(){
      this.triggerEvent("righttap",{
        type: that.data.type
      })
      that.dimsss()
    }
  }
})
