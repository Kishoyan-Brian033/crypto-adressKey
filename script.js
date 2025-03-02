document.addEventListener("DOMContentLoaded", function () {
    let attempts = 0;

    // Load sound files
    const typingSound = document.getElementById("typingSound");
    const failSound = document.getElementById("failSound");
    const deniedSound = document.getElementById("deniedSound");
    const successSound = document.getElementById("successSound");

    document.getElementById("start").addEventListener("click", function () {
        const status = document.querySelector(".status");
        const keyInput = document.getElementById("keyInput");
        const alertBox = document.getElementById("customAlert");

        // Reset UI and play typing sou"nd
        status.innerText = "Brute-force attack in progress...";
        keyInput.value = "";
        typingSound.play();

        const fakeKeys = ["U", "L", "B", "Y", "X", "M", "Z", "Q", "R"];
        let i = 0;

        let typingEffect = setInterval(() => {
            keyInput.value += fakeKeys[Math.floor(Math.random() * fakeKeys.length)] + " ";
            i++;

            if (i > 16) {
                clearInterval(typingEffect);
                typingSound.pause();
                typingSound.currentTime = 0;
                attempts++;

                if (attempts === 1) {
                    status.innerText = "Retry Again!";
                    failSound.play();
                } else if (attempts === 2) {
                    status.innerText = "Access Denied!";
                    alertBox.innerText = "ACCESS DENIED";
                    alertBox.style.display = "block";
                    deniedSound.play();
                } else if (attempts === 3) {
                    // Start final successful attempt
                    attempts = 0;
                    alertBox.style.display = "none";
                    
                    // Run fake successful brute-force
                    status.innerText = "Finalizing decryption...";
                    typingSound.play();
                    
                    // Create new typing effect for successful attempt
                    let successTyping = setInterval(() => {
                        keyInput.value += fakeKeys[Math.floor(Math.random() * fakeKeys.length)] + " ";
                        i++;
                        
                        if (i > 32) { // Longer sequence for success
                            clearInterval(successTyping);
                            typingSound.pause();
                            typingSound.currentTime = 0;
                            
                            // Show success message
                            status.innerText = "Successful Recovery!";
                            alertBox.innerText = "✅ ACCESS GRANTED ";
                            alertBox.style.backgroundColor = "#00ff00";
                            alertBox.style.color = "black";
                            alertBox.style.display = "block";
                            successSound.play();
                            
                            // Hide after 5 seconds
                            setTimeout(() => {
                                alertBox.style.display = "none";
                            }, 5000);
                        }
                    }, 100); // Faster typing for success sequence
                }
            }
        }, 200);
    });
});