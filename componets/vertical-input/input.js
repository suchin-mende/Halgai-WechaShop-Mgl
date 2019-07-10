// componets/vertical-input/input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCustomInputOnFocus: false,
    customInputValue: '',
    customInputValueFake: ''
  },


  observers: {
    'defaultValue': function (defaultValue) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      console.log(defaultValue)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCustomInputTap(event) {
      this.setData({
        isCustomInputOnFocus: true
      });
    },
    onCustomInputFocus: function (e) {
      this.setData({
        customInputValue: this.data.customInputValueFake
      });
    },
    onCustomInputBlur() {
      this.setData({
        isCustomInputOnFocus: false,
        isCustomInputFlick: false
      });
    },
    onCustomInputValueChanged(event) {
      this.setData({
        customInputValueFake: event.detail.value
      });
    },
    setValue(value) {
      this.setData({
        customInputValue: value,
        customInputValueFake: value
      });
    },
    getValue() {
      return this.data.customInputValueFake;
    }
  }
})
