document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageBtn = document.getElementById("send-message-btn");
    const sendLocationBtn = document.getElementById("send-location-btn");
  
    function addMessageToChat(message, isUserMessage) {
      const messageElement = document.createElement("div");
      messageElement.classList.add(isUserMessage ? "user-message" : "server-message");
      messageElement.innerHTML = message;
      chatMessages.appendChild(messageElement);
    }
  
    const socket = new WebSocket("wss://echo-ws-service.herokuapp.com/");
  
    socket.onopen = function(event) {
      addMessageToChat("Соединение установлено", false);
    };
  
    socket.onmessage = function(event) {
      const message = event.data;
      if (!isLocationMessage(message)) {
        addMessageToChat("Сервер: " + message, false);
      }
    };
  
    socket.onerror = function(error) {
      addMessageToChat("Ошибка: " + error.message, false);
    };
  
    sendMessageBtn.addEventListener("click", function() {
      const message = messageInput.value.trim();
      if (message !== "") {
        addMessageToChat("Вы: " + message, true);
        socket.send(message);
        messageInput.value = "";
      }
    });
  
    sendLocationBtn.addEventListener("click", function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const mapLink = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ваше местоположение</a>`;
          addMessageToChat("Вы: " + mapLink, true);
          socket.send(mapLink);
        }, function(error) {
          addMessageToChat("Ошибка получения геолокации: " + error.message, true);
        });
      } else {
        addMessageToChat("Геолокация не поддерживается в вашем браузере", true);
      }
    });
  
    function isLocationMessage(message) {
      return message.startsWith("<a href=\"https://www.openstreetmap.org/");
    }
  });
  