function _() {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    document.body.style.cssText = "background:black;color:white;font-size:2em;text-align:center;padding:0;margin:0;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;position:relative;";

    let gravityMode = false;
    let gravityX = 0;
    let gravityY = 1;
    let heartInterval;
    let allHearts = [];

    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:5;pointer-events:none;";
    overlay.style.maskImage = "radial-gradient(circle 120px at 0px 0px, transparent 40%, black 60%)";
    overlay.style.webkitMaskImage = "radial-gradient(circle 120px at 0px 0px, transparent 40%, black 60%)";
    document.body.appendChild(overlay);

    const gravityBtn = document.createElement("button");
    gravityBtn.innerHTML = "🌍";
    gravityBtn.style.cssText = "position:fixed;top:20px;right:20px;width:50px;height:50px;border:none;border-radius:50%;background:rgba(255,255,255,0.2);color:white;font-size:1.5rem;cursor:pointer;z-index:15;backdrop-filter:blur(10px);transition:all 0.3s ease;";
    gravityBtn.addEventListener('mouseenter', () => {
        gravityBtn.style.background = "rgba(255,255,255,0.3)";
        gravityBtn.style.transform = "scale(1.1)";
    });
    gravityBtn.addEventListener('mouseleave', () => {
        gravityBtn.style.background = "rgba(255,255,255,0.2)";
        gravityBtn.style.transform = "scale(1)";
    });
    document.body.appendChild(gravityBtn);

    const loveText = document.createElement("h1");
    loveText.innerHTML = '<span style="font-size:0.9rem">ONLY IF I COULD SAY- </span><br><span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span> <span style="font-family:\'Dancing Script\', cursive;">Tumhari muskaan mein mera saara jahaan basta hai..!</span> <span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span>';
    loveText.style.cssText = "color:pink;font-size:1.9rem;margin-bottom:20px;z-index:10;position:relative;";
    document.body.appendChild(loveText);
    const hiddenMessage = document.createElement("div");
    hiddenMessage.innerHTML = "I love you..! &lt;3";
    hiddenMessage.style.cssText = "position:fixed;bottom:20px;left:20px;color:#ff69b4;font-size:1.2rem;font-family:'Dancing Script', cursive;font-weight:600;z-index:8;text-shadow:0 0 10px rgba(255,105,180,0.5);";
    document.body.appendChild(hiddenMessage);

    function handleOrientation(event) {
        if (gravityMode && event.gamma !== null && event.beta !== null) {
            gravityX = Math.max(-1, Math.min(1, event.gamma / 45));
            gravityY = Math.max(-1, Math.min(1, event.beta / 45));
        }
    }

    function requestOrientationPermission() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }

    if (window.DeviceOrientationEvent) {
        requestOrientationPermission();
    }

    function updateTorch(x, y) {
        const overlayOpacity = gravityMode ? 0.85 : 0.95;
        overlay.style.background = `rgba(0,0,0,${overlayOpacity})`;
        overlay.style.maskImage = `radial-gradient(circle 120px at ${x}px ${y - 3}px, transparent 40%, black 60%)`;
        overlay.style.webkitMaskImage = `radial-gradient(circle 120px at ${x}px ${y - 3}px, transparent 40%, black 60%)`;
    }

    document.addEventListener('mousemove', (e) => {
        updateTorch(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        updateTorch(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        updateTorch(touch.clientX, touch.clientY);
    });


    const imageList = [
        "image1.png",
        "image2.png",
        "image3.png",
        "image4.png",
        "image5.png",
        "image6.png",
        "image7.png",
        "image8.png",
        "image9.png",
        "image10.png",
        "image11.png",
        "image12.png",
        "image13.png",
        "image14.png",
        "image15.png"
    ];

    let currentImageIndex = 0;

    function createHeart() {
        const sh = document.createElement("div");
        const startX = Math.random() * 100;
        const startY = gravityMode ? Math.random() * 100 : 0;
        const positionProperty = gravityMode ? 'top' : 'bottom';

        sh.velocityX = 0;
        sh.velocityY = 0;
        sh.life = gravityMode ? Infinity : 8000;
        sh.timeoutId = null;
        sh.size = Math.random() * 80 + 60;

        sh.style.cssText = `position:absolute;left:${startX}vw;${positionProperty}:${startY}vh;font-size:${sh.size}px;opacity:0.9;z-index:1;transition:all 0.1s ease-out;`;

        const heartContainer = document.createElement("div");
        heartContainer.style.cssText = "position:relative;display:inline-block;";

        const heartEmoji = document.createElement("span");
        heartEmoji.innerHTML = '❤️';
        heartEmoji.style.cssText = "font-family:'Apple Color Emoji', 'Segoe UI Emoji', 'NotoColorEmoji', sans-serif;";

        const heartImage = document.createElement("div");
        const currentImage = imageList[currentImageIndex % imageList.length];
        heartImage.style.cssText = `
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            width:0.8em;
            height:0.8em;
            background-image:url('https://raw.githubusercontent.com/guest3301/willyoubemyvalentine/refs/heads/main/images/${currentImage}');
            background-size:cover;
            background-position:center;
            background-repeat:no-repeat;
            z-index:2;
 clip-path:polygon(50% 5%, 83% 20%, 100% 50%, 83% 80%, 50% 95%, 17% 80%, 0% 50%, 17% 20%);
            `;

        currentImageIndex = (currentImageIndex + 1) % imageList.length;

        heartContainer.appendChild(heartEmoji);
        heartContainer.appendChild(heartImage);
        sh.appendChild(heartContainer);

        document.body.appendChild(sh);
        allHearts.push(sh);
        if (allHearts.length > 15) {
            allHearts.splice(15);// main nahin chahata browser hang hojaye...

        }
        if (!gravityMode) {
            sh.style.animation = `floatUp ${Math.random() * 4 + 4}s linear infinite`;
            sh.timeoutId = setTimeout(() => {
                sh.remove();
                const index = allHearts.indexOf(sh);
                if (index > -1) allHearts.splice(index, 1);
            }, 10000);
        }

        return sh;
    }

    function updatePhysics() {
        if (!gravityMode) return;

        allHearts.forEach((heart, index) => {
            if (!heart.parentNode) {
                allHearts.splice(index, 1);
                return;
            }


            const massRatio = heart.size / 140;
            const acceleration = 0.5 / massRatio;
            const damping = 0.96 + (massRatio * 0.02);

            heart.velocityX += gravityX * acceleration;
            heart.velocityY += gravityY * acceleration;

            heart.velocityX *= damping;
            heart.velocityY *= damping;
            if (Math.abs(heart.velocityX) < 0.01) heart.velocityX = 0;
            if (Math.abs(heart.velocityY) < 0.01) heart.velocityY = 0;

            const rect = heart.getBoundingClientRect();
            const currentX = (rect.left / window.innerWidth) * 100;
            const currentY = (rect.top / window.innerHeight) * 100;

            const newX = Math.max(0, Math.min(95, currentX + heart.velocityX));
            const newY = Math.max(0, Math.min(95, currentY + heart.velocityY));

            heart.style.left = `${newX}vw`;
            heart.style.top = `${newY}vh`;
            heart.style.bottom = 'auto';

            const bounceReduction = Math.max(0.3, 0.6 * massRatio); // Small hearts lose more energy (0.3), big hearts lose less (0.6)
            if (newX <= 0 || newX >= 95) heart.velocityX *= -bounceReduction;
            if (newY <= 0 || newY >= 95) heart.velocityY *= -bounceReduction;
        });

        requestAnimationFrame(updatePhysics);
    }

    gravityBtn.addEventListener('click', () => {
        gravityMode = !gravityMode;
        gravityBtn.style.background = gravityMode ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)";

        if (gravityMode) {
            clearInterval(heartInterval);

            allHearts.forEach(heart => {
                if (heart.timeoutId) {
                    clearTimeout(heart.timeoutId);
                    heart.timeoutId = null;
                }
                heart.style.animation = 'none';
                const rect = heart.getBoundingClientRect();
                heart.style.left = `${(rect.left / window.innerWidth) * 100}vw`;
                heart.style.top = `${(rect.top / window.innerHeight) * 100}vh`;
                heart.style.bottom = 'auto';
                heart.velocityX = (Math.random() - 0.5) * 2;
                heart.velocityY = (Math.random() - 0.5) * 2;
            });

            updatePhysics();

            if (!window.DeviceOrientationEvent) {
                gravityX = 0;
                gravityY = 1;
            }

        } else {
            allHearts.forEach(heart => {
                heart.style.animation = `floatUp ${Math.random() * 4 + 4}s linear infinite`;
                heart.style.bottom = '0';
                heart.style.top = 'auto';

                heart.timeoutId = setTimeout(() => {
                    if (heart.parentNode) {
                        heart.remove();
                        const index = allHearts.indexOf(heart);
                        if (index > -1) allHearts.splice(index, 1);
                    }
                }, 10000);
            });

            heartInterval = setInterval(createHeart, 400);
        }

        overlay.style.background = `rgba(0,0,0,${gravityMode ? 0.65 : 0.95})`;
    });

    heartInterval = setInterval(createHeart, 400);

    const s = document.createElement("style");
    s.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');@keyframes floatUp{0%{transform:translateY(0);opacity:1;}100%{transform:translateY(-100vh);opacity:0;}}`;
    document.head.appendChild(s);

    const a = new Audio("https://github.com/guest3301/willyoubemyvalentine/raw/refs/heads/main/Pal%20Pal%20Dil%20Ke%20Paas%20%28Blackmail%29.mp3");
    a.loop = true;
    a.volume = 0;

    const fadeIn = () => {
        let v = 0;
        const iv = setInterval(() => {
            if (v >= 1) {
                clearInterval(iv);
                return;
            }
            a.volume = v;
            v += 0.05;
        }, 200);
    };

    a.play()
        .then(() => {
            // 4 minutes 3 seconds
            a.currentTime = 243;
            fadeIn();
        })
        .catch(() => alert("Tap to play music! "));
};
_();
// Designed with love ❤️ assisted by copilot.