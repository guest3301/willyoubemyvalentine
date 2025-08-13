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
    loveText.innerHTML = '<span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span> <span style="font-family:\'Dancing Script\', cursive;">I Love You</span> <span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span>';
    loveText.style.cssText = "color:pink;font-size:1.9rem;margin-bottom:20px;z-index:10;position:relative;";
    document.body.appendChild(loveText);

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
        "/image0.png",
        "/image1.png", 
        "/image.png"
    ];
    let currentImageIndex = 0;

    function createHeart() {
        const sh = document.createElement("div");
        const startX = Math.random() * 100;
        const startY = gravityMode ? Math.random() * 100 : 0;
        const positionProperty = gravityMode ? 'top' : 'bottom';
        
        sh.style.cssText = `position:absolute;left:${startX}vw;${positionProperty}:${startY}vh;font-size:${Math.random()*80+60}px;opacity:0.9;z-index:1;transition:all 0.1s ease-out;`;
        
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
            background-image:url('${currentImage}');
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
        
        sh.velocityX = 0;
        sh.velocityY = 0;
        sh.life = gravityMode ? Infinity : 8000;
        sh.timeoutId = null;
        
        document.body.appendChild(sh);
        allHearts.push(sh);
        
        if (!gravityMode) {
            sh.style.animation = `floatUp ${Math.random()*4+4}s linear infinite`;
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
            
            heart.velocityX += gravityX * 0.5;
            heart.velocityY += gravityY * 0.5;
            
            heart.velocityX *= 0.98;
            heart.velocityY *= 0.98;
            
            const rect = heart.getBoundingClientRect();
            const currentX = (rect.left / window.innerWidth) * 100;
            const currentY = (rect.top / window.innerHeight) * 100;
            
            const newX = Math.max(0, Math.min(95, currentX + heart.velocityX));
            const newY = Math.max(0, Math.min(95, currentY + heart.velocityY));
            
            heart.style.left = `${newX}vw`;
            heart.style.top = `${newY}vh`;
            heart.style.bottom = 'auto';
            
            if (newX <= 0 || newX >= 95) heart.velocityX *= -0.7;
            if (newY <= 0 || newY >= 95) heart.velocityY *= -0.7;
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
                heart.style.animation = `floatUp ${Math.random()*4+4}s linear infinite`;
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
        
        overlay.style.background = `rgba(0,0,0,${gravityMode ? 0.85 : 0.95})`;
    });

    heartInterval = setInterval(createHeart, 400);
    
    const s = document.createElement("style");
    s.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');@keyframes floatUp{0%{transform:translateY(0);opacity:1;}100%{transform:translateY(-100vh);opacity:0;}}`;
    document.head.appendChild(s);
    
    const a = new Audio("https://github.com/guest3301/willyoubemyvalentine/raw/refs/heads/main/Mera%20Dil%20Yeh%20Pukare%20Aaja%20(From%20'Nagin%201959').mp3");
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
            a.currentTime = 87;
            fadeIn();
        })
        .catch(() => alert("Tap to play music! "));
};
_()
