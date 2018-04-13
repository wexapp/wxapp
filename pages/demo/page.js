Page({
    onLoad() {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy;

              console.log(res);
            }
        })
    }
});