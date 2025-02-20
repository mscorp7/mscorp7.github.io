const wss = new WebSocket('https://nodechatapp-7dk4.onrender.com');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
let userName = prompt("Please enter your name:") || "Anonymous";


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(message, isSelf = false) {
    const timestamp = getCurrentTime();
    const formattedMessage = `${message} <span style="color: white; font-size: 10px;">${timestamp}</span>`;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSelf ? 'self' : 'other');

    messageElement.innerHTML = formattedMessage;

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message when clicking the button
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const formattedMessage = `${userName}: ${message}`;
        wss.send(JSON.stringify({ user: userName, message: message })); // Send username and message
        appendMessage(formattedMessage, true); // Show own message
        messageInput.value = '';
    }
});

// Handle incoming messages
wss.onmessage = (event) => {
    try {
        const receivedData = JSON.parse(event.data); // Parse received JSON
        appendMessage(`${receivedData.user}: ${receivedData.message}`, false); // Show received message
    } catch (error) {
        console.error('Error parsing received message:', error);
    }
};

wss.onopen = () => {
    console.log('Connected to WebSocket server');
};

wss.onclose = () => {
    console.log('WebSocket connection closed.');
    setTimeout(() => {
        console.log('Reconnecting...');
        wss = new WebSocket('wss://localhost:8080');
    }, 3000);
};

wss.onerror = (error) => {
    console.error('WebSocket error:', error);
};
