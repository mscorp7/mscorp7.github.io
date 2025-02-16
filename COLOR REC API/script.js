const startBtn = document.getElementById('start-btn');
const loadingAnimation = document.querySelector('.loading');

startBtn.addEventListener('click', startListening);

function startListening() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    // Show loading animation
    loadingAnimation.style.visibility = 'visible';

    recognition.onresult = function(event) {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      document.body.style.backgroundColor = speechResult;
      console.log(`Changed background to: ${speechResult}`);

      setTimeout(() => {
        alert(`Changed background to: ${speechResult}`);
      }, 1000);

      // Hide loading animation
      loadingAnimation.style.visibility = 'hidden';
    };

    recognition.onerror = function(event) {
      console.error(`Error occurred: ${event.error}`);
      alert("Could not recognize your input. Please try again.");
      // Hide loading animation
      loadingAnimation.style.visibility = 'hidden';
    };

    recognition.start();
  } else {
    alert("Speech Recognition is not supported in this browser.");
  }
}
