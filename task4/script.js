document.getElementById("timezoneButton").addEventListener("click", function () {
    const resultDiv = document.getElementById("result");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const { timezone, date_time_txt } = data;
                    resultDiv.innerHTML = `<p>Временная зона: ${timezone}</p><p>Местное время: ${date_time_txt}</p>`;
                })
                .catch(error => {
                    resultDiv.textContent = "Ошибка получения данных.";
                });
        }, () => {
            resultDiv.textContent = "Ошибка получения местоположения.";
        });
    } else {
        resultDiv.textContent = "Геолокация не поддерживается вашим браузером.";
    }
});
