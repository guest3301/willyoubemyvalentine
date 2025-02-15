function _() {
    const r = ["With every heartbeat, I find myself loving you more.", "In your eyes, I see my forever.", "If love had a shape, it would be your embrace.", "You're the poetry my heart has been longing to write.", "Every second with you is a memory I want to relive.", "You are the calm in my storm, my lighthouse in the dark.", "Even in silence, our souls whisper to each other.", "Loving you is like breathing—effortless and essential.", "You’re not just in my thoughts, you’re in my heartbeat.", "Somewhere between hello and goodbye, I found forever in you."];
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    document.body.style.cssText = "background:black;color:white;font-size:2em;text-align:center;padding:0;margin:0;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;";
    const loveText = document.createElement("h1");
    loveText.innerHTML = '<span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span> <span style="font-family:\'Dancing Script\', cursive;">I Love You</span> <span style="font-family: \'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span>';
    loveText.style.cssText = "color:pink;font-size:1.9rem;margin-bottom:20px;z-index:10;";
    document.body.appendChild(loveText);
    const heart = document.createElement("div");
    heart.style.cssText = "position:absolute;top:55%;left:50%;width:150px;height:150px;background:red;transform:translate(-50%,-50%) scale(1);--_m:radial-gradient(#000 69%,#0000 70%) 84.5%/50%;-webkit-mask-box-image: var(--_m);mask-border:var(--_m);clip-path:polygon(-41% 0,50% 91%, 141% 0);animation:beat 1s infinite alternate ease-in-out;opacity:0.6;";
    document.body.appendChild(heart);
    const txt = document.createElement("div");
    txt.style.cssText = "position:relative;z-index:2;margin-top:20px;width:80%;min-height:2em;overflow-wrap:break-word;word-break:break-word;white-space:normal;text-align:center;font-family:'Dancing Script', cursive;";
    document.body.appendChild(txt);
    let ci = 0,
        li = 0;

    function typeWriter() {
        if (li < r[ci].length) {
            txt.innerHTML = r[ci].substring(0, li + 1) + '<span class="caret">|</span>';
            li++;
            setTimeout(typeWriter, 100)
        }
        else {
            setTimeout(() => {
                let erase = setInterval(() => {
                    li--;
                    txt.innerHTML = r[ci].substring(0, li) + '<span class="caret">|</span>';
                    if (li === 0) {
                        clearInterval(erase);
                        ci = (ci + 1) % r.length;
                        setTimeout(typeWriter, 500)
                    }
                }, 50)
            }, 1500)
        }
    }
    typeWriter();
    setInterval(() => {
        const sh = document.createElement("div");
        sh.innerHTML = '<span style="font-family:\'Apple Color Emoji\', \'Segoe UI Emoji\', \'NotoColorEmoji\', sans-serif;">❤️</span>';
        sh.style.cssText = `position:absolute;left:${Math.random()*100}vw;bottom:0;font-size:${Math.random()*30+10}px;animation:floatUp ${Math.random()*3+2}s linear infinite;opacity:0.9;`;
        document.body.appendChild(sh);
        setTimeout(() => sh.remove(), 3000)
    }, 300);
    const s = document.createElement("style");
    s.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');@keyframes beat{0%{transform:translate(-50%,-50%) scale(1);}100%{transform:translate(-50%,-50%) scale(1.2);}}@keyframes blink{0%,100%{opacity:0;}50%{opacity:1;}}@keyframes floatUp{0%{transform:translateY(0);opacity:1;}100%{transform:translateY(-100vh);opacity:0;}}.caret{display:inline-block;animation:blink 1s infinite;}`;
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
        .catch(() => alert("Tap to play music! "))
};
_()
