document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.getElementById('introduction');
    let hue = 0;

    function updateBackgroundColor() { // animates the introduction section background grandient changes
        hue += 1; // adjust to change animation speed
        introSection.style.backgroundColor = `hsl(${hue}, 75%, 60%)`;

        if (hue >= 360) hue = 0; // resets the hue to keep the value within the color wheel range

        requestAnimationFrame(updateBackgroundColor);
    }

    requestAnimationFrame(updateBackgroundColor);

    const quips = [ // introduction quip array
        "and I am a cybersecurity analyst.",
        "and I am tired.",
        "and I am going crazy.",
        "and I am giving up.",
        "and I am silently judging your password strength.",
        "and I've seen cleaner code in a ransomware note.",
        "and I consider coffee as a primary method of debugging.",
        "and I speak fluent sarcasm and Python.",
        "and I think '404' is also the number of my social interactions.",
        "and I sometimes ask for advice from my compiler errors.",
        "and I believe in the power of ctrl + z more than fate.",
        "and I've been known to whisper sweet nothings to my firewall.",
        "and I'm currently in a complicated relationship with JavaScript.",
        "and I practice safe hex.",
        "and I've had more late-night dates with my computer than I care to admit.",
        "and I'm convinced my code is a form of modern art.",
        "and I know secret handshakes with all the AI bots.",
        "and I'm on a quest to make 'fetch' happen in more than just Mean Girls.",
        "and I'm allergic to open Wi-Fi networks.",
        "and I've had deeper conversations with chatbots than with some humans.",
        "and I sometimes fantasize about code that writes itself.",
    ];

    const dynamicText = document.getElementById("dynamic-text");
    const cursor = document.querySelector(".cursor");
    let currentQuipIndex = 0; // Start with the first quip

    function typeQuip(quip) {
        let currentChar = 0;
        dynamicText.textContent = ''; // Clear the text container
        
        function typeCharacter() {
            if (currentChar < quip.length) {
                dynamicText.textContent += quip.charAt(currentChar);
                currentChar++;
                setTimeout(typeCharacter, 100); // Adjust typing speed
            } else {
                // Wait 2 seconds after typing finishes before starting the next quip
                setTimeout(nextQuip, 2000);
            }
        }

        typeCharacter();
    }

    function nextQuip() {
        // Display the initial quip on first load, then randomize
        if (currentQuipIndex === 0 && !dynamicText.textContent) {
            typeQuip("and I am a cybersecurity analyst."); // Display the first quip immediately on load
        } else {
            const randomIndex = Math.floor(Math.random() * quips.length);
            typeQuip(quips[randomIndex]);
        }
        currentQuipIndex++; // Ensure the initial condition becomes false in subsequent calls
    }

    nextQuip(); // Kick off the first quip
});
