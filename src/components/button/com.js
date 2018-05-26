Component({

    behaviors: [],
  
    properties: {
      myProperty: { // 属性名
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        observer: '_propertyChange'
      },
      mp: String // 简化的定义方式
    },
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},
  
    methods: {
      onMyButtonTap: function(){
        this.setData({
          // 更新属性和数据的方法与更新页面数据的方法类似
        })
      },
      _myPrivateMethod: function(){
        // 内部方法建议以下划线开头
        this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
        this.applyDataUpdates()
      },
      _propertyChange: function(newVal, oldVal) {
        console.log(newVal)
      }
    },
    ready() {
        console.log(this.data.mp === 12121)
    }
  })