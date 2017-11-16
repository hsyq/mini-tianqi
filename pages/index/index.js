Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:" ",
    weather:"晴天",
    temper:"12°C"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
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

  loadInfo(){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;

        console.log(latitude);
        console.log(longitude);

        that.loadCity(latitude, longitude);
        that.loadTemper(latitude, longitude);
        
      }
    })
  },

  loadCity: function (latitude, longitude){
    let that = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location=' + latitude + ',' + longitude + '&output=json',
      header:{
        'Content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        let city = res.data.result.addressComponent.city;
        console.log(city);
        that.setData({ location:city});
      }
    })
  },

  // 加载天气,
  loadTemper: function (latitude, longitude){
    let that = this;
    wx.request({
      url: 'https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=' + latitude + '&longitude=' + longitude +'&appKey=null&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh-cn',
      header:{
        'Content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        let weather = parseInt(res.data.current.weather);
        let temper = res.data.current.temperature.value
        console.log(weather);
        console.log(temper);
        that.setData({temper:temper});  
        that.tranWeather(weather);
      }
    })
  },

  // 转换天气
  tranWeather:function(code){
    let weather = "";
      switch(code){
          case 0: weather = "晴";break;
          case 1: weather = "多云"; break;
          case 2: weather = "阴"; break;
          case 3: weather = "阵雨"; break;
          case 4: weather = "雷阵雨"; break;
          case 5: weather = "雷阵雨并伴有冰雹"; break;
          case 6: weather = "雨夹雪"; break;
          case 7: weather = "小雨"; break;
          case 8: weather = "中雨"; break;
          case 9: weather = "大雨"; break;
          case 10: weather = "暴雨"; break;
          case 11: weather = "大暴雨"; break;
          case 12: weather = "特大暴雨"; break;
          case 13: weather = "阵雪"; break;
          case 14: weather = "小雪"; break;
          case 15: weather = "中雪"; break;
          case 16: weather = "大雪"; break;
          case 17: weather = "暴雪"; break;
          case 18: weather = "雾"; break;
          case 19: weather = "冻雨"; break;
          case 20: weather = "沙尘暴"; break;
          case 21: weather = "小雨转中雨"; break;
          case 22: weather = "中雨转大雨"; break;
          case 23: weather = "大雨转暴雨"; break;
          case 24: weather = "暴雨转大暴雨"; break;
          case 25: weather = "大暴雨转特大暴雨 "; break;
          case 26: weather = "小雪转中雪"; break;
          case 27: weather = "中雪转大雪"; break;
          case 28: weather = "大雪转暴雪"; break;
          case 29: weather = "浮尘"; break;
          case 30: weather = "扬沙"; break;
          case 31: weather = "强沙尘暴"; break;
          case 32: weather = "飑"; break;
          case 33: weather = "龙卷风"; break;
          case 34: weather = "若高吹雪"; break;
          case 35: weather = "轻雾"; break;
          case 53: weather = "霾"; break;
          case 99: weather = "未知"; break;
          default:
            weather = "dfadfasd";
      }
      // console.log(weather);
      this.setData({weather:weather});
      
  }
})