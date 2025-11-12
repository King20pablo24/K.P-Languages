// Simulated AI conversation practice

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const aiResponses = [
    "That's interesting! Can you tell me more?",
    "Great job! How do you say that in your native language?",
    "I understand. Let's practice some vocabulary related to that topic.",
    "Excellent pronunciation! Try saying it again a bit slower.",
    "Good question! In English, we often say...",
    "Well done! Now, can you ask me a question?",
    "I like how you used that grammar structure. Keep practicing!",
    "That's a common phrase. Did you know there's also a more formal way to say it?"
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(userMessage) {
    // Simple keyword-based responses (in a real app, this would use NLP)
    const lowerMessage = userMessage.toLowerCase();
    let response = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "Hello! How are you today?";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat')) {
        response = "Food is a great topic! What's your favorite dish?";
    } else if (lowerMessage.includes('weather')) {
        response = "The weather can be tricky in English. How's the weather where you are?";
    } else if (lowerMessage.includes('travel')) {
        response = "Travel vocabulary is very useful! Where would you like to go?";
    }

    return response;
}

sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse = getAIResponse(message);
            addMessage(aiResponse);
        }, 1000);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
