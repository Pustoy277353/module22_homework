function show() {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        alert("Размеры экрана: " + screenWidth + "x" + screenHeight + "\nКоординаты местоположения: " + latitude + ", " + longitude);
      }, function(error) {
        if (error.code == error.PERMISSION_DENIED) {
          alert("Размеры экрана: " + screenWidth + "x" + screenHeight + "\nИнформация о местоположении недоступна");
        }
      });
    } else {
      alert("Размеры экрана: " + screenWidth + "x" + screenHeight + "\nИнформация о местоположении недоступна");
    }
  }