Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list:[
      {
          text: "导航",
          pagePath: "/page/user_navigate/user_navigate",
          iconPath: "/images/navigation.png",
          selectedIconPath: "/images/navigation.png"
      },
      {
          text: "查询",
          pagePath: "/page/user_default/user_default",
          iconPath: "/images/query.png",
          selectedIconPath: "/images/query.png"
      },
      {
          text: "信息",
          pagePath: "/page/user_query/user_query",
          iconPath: "/images/info.png",
          selectedIconPath: "/images/info.png"
      }
    ],
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})