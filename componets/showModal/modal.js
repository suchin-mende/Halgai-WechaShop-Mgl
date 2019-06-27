// componets/showModal/modal.js
const HalgaiI18 = require('../../language/mn')

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    
    //modal的高度
    
    isShow : {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    smmls: HalgaiI18.smmls

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask() {
      // this.setData({show: false})
    },

    cancel() {
      this.setData({ isShow: false })
      this.triggerEvent('cancel')
    },

    confirm() {
      this.setData({ isShow: false })
      this.triggerEvent('confirm')
    },
    show() {
      this.setData({ isShow: false})
    },
    showModal(o) {
      o.isShow = true;
      this.setData(o);
    }
  }
})