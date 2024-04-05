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

    const quips = [ // introduction section quip array
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
    dynamicText.innerHTML = "|"; // Initialize with cursor
    let currentQuipIndex = -1; // Prepare to display the initial quip

    function typeQuip(quip) {
        let currentChar = 0;
        dynamicText.innerHTML = ""; // Clear for the new quip

        function typeCharacter() {
            if (currentChar < quip.length) {
                dynamicText.innerHTML = quip.substring(0, currentChar + 1) + '<span class="cursor">|</span>';
                currentChar++;
                setTimeout(typeCharacter, 100); // Typing speed
            } else {
                // Finished typing. Prepare for the next quip with a delay
                setTimeout(() => {
                    nextQuip(); // Schedule the next quip
                }, 2000); // 2-second delay after typing finishes
            }
        }

        typeCharacter();
    }

    function nextQuip() {
        currentQuipIndex = (currentQuipIndex + 1) % (quips.length + 1); // Loop through quips, including the initial special one

        if (currentQuipIndex === 0) {
            // Special initial quip
            typeQuip("and I am a cybersecurity analyst.");
        } else {
            // Random quip from the list
            const quip = quips[Math.floor(Math.random() * quips.length)];
            typeQuip(quip);
        }
    }

    nextQuip(); // Start with the initial quip
});
