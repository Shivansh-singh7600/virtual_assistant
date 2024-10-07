let box = document.querySelector(".box");
let btn = document.querySelector("button");

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1.5;
    speakInput.volume = 1;
    speakInput.lang = 'en-IN';
    window.speechSynthesis.speak(speakInput);
};

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();

    console.log("Current hour is: ", hour); // Debugging line to check the hour

    // Reworked time range logic
    if (hour >= 0 && hour < 12) {
        speakFunc("Good morning sir, How can I help you!");
    } else if (hour >= 12 && hour < 18) { // Changed to '18' to include the correct range for afternoon
        speakFunc("Good afternoon sir, How can I help you!");
    } else {
        speakFunc("Good evening sir, How can I help you!");
    }
};

window.onload = () => {
    setTimeout(() => {
        speakFunc("Hello sir");
        greetingFunc();
    }, 500); // Adding a slight delay
};

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        let recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;
            handleCommands(spokenText.toLowerCase());
            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        };
        recognition.start();
    } else {
        alert("Your Browser does not support voice input!");
    }
};

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
    startVoiceInput();
};

const handleCommands = (command) => {
    console.log(command);
    if (command.includes("hello") || command.includes("hey") || command.includes("hi")) {
        speakFunc("Hello sir, how can I help you!");
    } else if (command.includes("who are you") || command.includes("developed") || command.includes("who are you")) {
        speakFunc("I am a Virtual Assistant, developed by Shivansh Singh!");
    } else if (command.includes("open font awesome library") || command.includes("font awesome code") || command.includes("font awesome")) {
        speakFunc("Opening... Font Awesome website!");
        window.open("https://cdnjs.com/libraries/font-awesome");
    } else if (command.includes("open youtube") || command.includes("youtube")) {
        speakFunc("Opening... YouTube!");
        window.open("https://www.youtube.com");
    } else if (command.includes("open google") || command.includes("google")) {
        speakFunc("Opening... Google!");
        window.open("https://www.google.com");
    } else if (command.includes("open facebook") || command.includes("facebook")) {
        speakFunc("Opening... Facebook!");
        window.open("https://www.facebook.com");
    } else if (command.includes("tell me time") || command.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        speakFunc(time);
    } else if (command.includes("tell me date") || command.includes("date")) {
        let time = new Date().toLocaleString(undefined, { day: 'numeric', month: 'long' });
        speakFunc(time);
    } else if (command.includes("calculator") || command.includes("cal")) {
        speakFunc("Opening... calculator!");
        window.open("https://www.google.com/search?q=calculator");
    } else if (command.includes("open instagram") || command.includes("instagram")) {
        speakFunc("Opening... Instagram!");
        window.open("https://www.instagram.com");
    } else {
        speakFunc(`This is what I found on the internet regarding ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
};